/* eslint-disable @typescript-eslint/no-explicit-any */

import * as Boom from "@hapi/boom";
import { Request, RouteOptions } from "@hapi/hapi";
import * as Sdk from "@reservoir0x/sdk";
import Joi from "joi";

import { redb } from "@/common/db";
import { logger } from "@/common/logger";
import { config } from "@/config/index";
import { getNetworkSettings } from "@/config/network";
import { getBlurRoyalties } from "@/utils/blur";
import * as marketplaceFees from "@/utils/marketplace-fees";

type Marketplace = {
  name: string;
  imageUrl: string;
  fee: {
    bps: number;
  };
  royalties?: {
    minBps: number;
    maxBps: number;
  };
  orderbook: string | null;
  orderKind: string | null;
  listingEnabled: boolean;
  minimumBidExpiry?: number;
  minimumPrecision?: string;
  supportedBidCurrencies: string[];
};

const version = "v1";

export const getCollectionSupportedMarketplacesV1Options: RouteOptions = {
  description: "Supported marketplaces by collection",
  notes: "Supported marketplaces by collection",
  tags: ["api", "Collections"],
  plugins: {
    "hapi-swagger": {
      order: 5,
    },
  },
  validate: {
    params: Joi.object({
      collection: Joi.string()
        .lowercase()
        .required()
        .description(
          "Filter to a particular collection, e.g. `0x8d04a8c79ceb0889bdd12acdf3fa9d207ed3ff63`"
        ),
    }),
  },
  response: {
    schema: Joi.object({
      marketplaces: Joi.array().items(
        Joi.object({
          name: Joi.string(),
          imageUrl: Joi.string(),
          fee: Joi.object({
            bps: Joi.number(),
          }),
          royalties: Joi.object({
            minBps: Joi.number(),
            maxBps: Joi.number(),
          }),
          orderbook: Joi.string().allow(null),
          orderKind: Joi.string().allow(null),
          listingEnabled: Joi.boolean(),
          minimumBidExpiry: Joi.number(),
          minimumPrecision: Joi.string(),
          supportedBidCurrencies: Joi.array().items(Joi.string()),
        })
      ),
    }),
  },
  handler: async (request: Request) => {
    const params = request.params as any;

    try {
      const collectionResult = await redb.oneOrNone(
        `
          SELECT
            collections.new_royalties,
            collections.marketplace_fees,
            collections.contract
          FROM collections
          JOIN contracts
            ON collections.contract = contracts.address
          WHERE collections.id = $/collection/
          LIMIT 1
        `,
        { collection: params.collection }
      );

      if (!collectionResult) {
        throw Boom.badRequest(`Collection ${params.collection} not found`);
      }

      const ns = getNetworkSettings();

      const marketplaces: Marketplace[] = [
        {
          name: "Reservoir",
          imageUrl: `https://${ns.subDomain}.reservoir.tools/redirect/sources/reservoir/logo/v2`,
          fee: {
            bps: 0,
          },
          orderbook: "reservoir",
          orderKind: "seaport-v1.4",
          listingEnabled: true,
          supportedBidCurrencies: Object.keys(ns.supportedBidCurrencies),
        },
        {
          name: "LooksRare",
          imageUrl: `https://${ns.subDomain}.reservoir.tools/redirect/sources/looksrare/logo/v2`,
          fee: {
            bps: 200,
          },
          orderbook: "looks-rare",
          orderKind: "looks-rare-v2",
          listingEnabled: false,
          minimumBidExpiry: 15 * 60,
          supportedBidCurrencies: [Sdk.Common.Addresses.Weth[config.chainId]],
        },
        {
          name: "X2Y2",
          imageUrl: `https://${ns.subDomain}.reservoir.tools/redirect/sources/x2y2/logo/v2`,
          fee: {
            bps: 50,
          },
          orderbook: "x2y2",
          orderKind: "x2y2",
          listingEnabled: false,
          supportedBidCurrencies: [Sdk.Common.Addresses.Weth[config.chainId]],
        },
      ];

      // Handle OpenSea
      {
        let openseaMarketplaceFees: { bps: number; recipient: string }[] =
          collectionResult.marketplace_fees?.opensea;
        if (collectionResult.marketplace_fees?.opensea == null) {
          openseaMarketplaceFees = await marketplaceFees.getCollectionOpenseaFees(
            params.collection,
            collectionResult.contract
          );
        }

        const openseaRoyalties: { bps: number; recipient: string }[] =
          collectionResult.new_royalties?.opensea;

        let maxOpenseaRoyaltiesBps: number | undefined;
        if (openseaRoyalties) {
          maxOpenseaRoyaltiesBps = openseaRoyalties
            .map(({ bps }) => bps)
            .reduce((a, b) => a + b, 0);
        }

        marketplaces.push({
          name: "OpenSea",
          imageUrl: `https://${ns.subDomain}.reservoir.tools/redirect/sources/opensea/logo/v2`,
          fee: {
            bps: openseaMarketplaceFees[0]?.bps ?? 0,
          },
          royalties: maxOpenseaRoyaltiesBps
            ? {
                minBps: Math.min(maxOpenseaRoyaltiesBps, 50),
                maxBps: maxOpenseaRoyaltiesBps,
              }
            : undefined,
          orderbook: "opensea",
          orderKind: "seaport-v1.4",
          listingEnabled: false,
          minimumBidExpiry: 15 * 60,
          supportedBidCurrencies: Object.keys(ns.supportedBidCurrencies),
        });
      }

      // Handle Blur
      if (Sdk.Blur.Addresses.Beth[config.chainId]) {
        const royalties = await getBlurRoyalties(params.collection);
        marketplaces.push({
          name: "Blur",
          imageUrl: `https://${ns.subDomain}.reservoir.tools/redirect/sources/blur.io/logo/v2`,
          fee: {
            bps: 0,
          },
          royalties: royalties
            ? {
                minBps: royalties.minimumRoyaltyBps,
                // If the maximum royalty is not available for Blur, use the OpenSea one
                maxBps:
                  royalties.maximumRoyaltyBps ??
                  marketplaces[marketplaces.length - 1].royalties?.maxBps,
              }
            : undefined,
          orderbook: "blur",
          orderKind: "blur",
          listingEnabled: false,
          minimumPrecision: "0.01",
          minimumBidExpiry: 10 * 24 * 60 * 60,
          supportedBidCurrencies: [Sdk.Blur.Addresses.Beth[config.chainId]],
        });
      }

      marketplaces.forEach((marketplace) => {
        let listableOrderbooks = ["reservoir"];
        switch (config.chainId) {
          case 1: {
            listableOrderbooks = ["reservoir", "opensea", "looks-rare", "x2y2", "blur"];
            break;
          }
          case 4: {
            listableOrderbooks = ["reservoir", "opensea", "looks-rare"];
            break;
          }
          case 5: {
            listableOrderbooks = ["reservoir", "opensea", "looks-rare", "x2y2"];
            break;
          }
          case 10: {
            listableOrderbooks = ["reservoir", "opensea"];
            break;
          }
          case 137: {
            listableOrderbooks = ["reservoir", "opensea"];
            break;
          }
        }

        marketplace.listingEnabled = !!(
          marketplace.orderbook && listableOrderbooks.includes(marketplace.orderbook)
        );
      });

      return { marketplaces };
    } catch (error) {
      logger.error(
        `get-collection-supported-marketplaces-${version}-handler`,
        `Handler failure: ${error}`
      );
      throw error;
    }
  },
};
