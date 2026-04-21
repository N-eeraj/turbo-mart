import connectMongoDB from "@app/database/mongoose/connect"
import Product from "@app/database/mongoose/models/Catalogue/Product"
import {
  StorageUnits,
} from "@app/definitions/measurement/units"

export default class Temporary {
  static async execute(..._args: Array<unknown>) {
    connectMongoDB(async () => {
      const product = new Product({
        subcategory: "6954f3888cf4d80f26b5cd14",
        brand: "69580a220b7806b67fb39481",
        name: "18 Pro Max Test",
        attributes: {
          properties: [
            {
              attribute: "695d4ea7c7875b34baa4b0ad", // text
              value: "A 20", // input
              label: "A 20", // copy of input
            },
            {
              attribute: "695e73cd0301a301b19b65c8", // boolean
              label: "Yes", // from meta
              value: true,
            },
            {
              attribute: "695e73cd0301a301b19b65ca", // json
              label: "Other specs", // from meta title
              value: {
                key1: "value1",
                key2: "value2",
              }, // table input
            },
            {
              attribute: "696281070301a301b19b6af6", // date
              label: "04-14-2026", // generated from value and meta
              value: new Date(), // date picker input
              meta: {
                format: "mm-dd-yyyy" // from a date format enum
              },
            },
            {
              attribute: "6967bf1b4d518c18b6fb1ead", // text select
              label: "Option 1", // option value
              value: "Option 1", // option value
              meta: {
                optionId: "69a9b9bd9af09e41f4a598f0" // option id
              },
            },
            {
              attribute: "6967bf1b4d518c18b6fb1ead", // number multi select
              label: "256 GB, 512 GB", // option label joined by separator
              value: [256,512], // option base values array
              meta: {
                optionIds: [
                  "69a9b9bd9af09e41f4a598eb",
                  "69a9b9bd9af09e41f4a598ee",
                ] // option ids
              },
            },
          ],
          variants: [
            {
              attribute: "695d50d4c7875b34baa4b109", // number
              values: [
                {
                  label: "128 GB", // input
                  value: 1024000000000, // input converted to smallest unit (gb to bits)
                  meta: {
                    unit: StorageUnits.GIGABYTE, // selected by user (Unit from attribute meta)
                  },
                  slug: "128gb", // user input
                },
                {
                  label: "256 GB", // input
                  value: 2048000000000, // input converted to smallest unit (gb to bits)
                  meta: {
                    unit: StorageUnits.GIGABYTE, // selected by user (Unit from attribute meta)
                  },
                  slug: "256gb", // user input
                },
              ]
            },
            {
              attribute: "695e73cd0301a301b19b65c9", // color
              values: [
                {
                  label: "My Blue", // input
                  value: "#0af", // color picker input
                  slug: "blue", // user input
                },
                {
                  label: "My Black", // input
                  value: "#112", // color picker input
                  slug: "black", // user input
                },
              ]
            },
          ],
        },
    })
  
      await product.save()
      process.exit(0)
    })
  }
}
