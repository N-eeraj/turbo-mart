import connectMongoDB from "@app/database/mongoose/connect.ts"
import Subcategory from "@app/database/mongoose/models/Catalogue/Subcategory.ts"
import {
  AttributeType,
} from "@app/database/mongoose/models/Catalogue/Attributes.ts"

export default class Temporary {
  static async execute(..._args: Array<unknown>) {
    connectMongoDB(async () => {
      const subcategory = new Subcategory({
        category: "68e006fc56f54a9415173411",
        name: "Smart Phone",
        slug: "smrt-phn",
        attributes: [
          {
            name: "Processor",
            type: AttributeType.TEXT,
            mandatory: true,
            metadata: {
              maxLength: 100,
              test: true,
            },
            test: true,
          },
          {
            name: "Screen Size",
            type: AttributeType.NUMBER,
            mandatory: true,
            metadata: {
              min: 5,
              max: 7,
              unit: "inches",
              template: "{{value}} {{unit}}",
              test: true,
            },
            test: true,
          },
          {
            name: "NFC",
            type: AttributeType.BOOLEAN,
            mandatory: false,
            test: true,
          },
          {
            name: "Operating System",
            type: AttributeType.SELECT,
            mandatory: true,
            metadata: {
              type: AttributeType.TEXT,
              options: [
                "Android",
                "iOS",
              ],
              test: true,
            },
            test: true,
          },
          {
            name: "Refresh Rates",
            type: AttributeType.MULTI_SELECT,
            mandatory: false,
            metadata: {
              type: AttributeType.NUMBER,
              options: [
                {
                  value: 30,
                  unit: "Hz",
                  template: "{{value}} {{unit}}",
                  test: true,
                },
                {
                  value: 60,
                  unit: "Hz",
                  template: "{{value}} {{unit}}",
                  test: true,
                },
                {
                  value: 90,
                  unit: "Hz",
                  template: "{{value}} {{unit}}",
                  test: true,
                },
                {
                  value: 120,
                  test: true,
                  unit: "Hz",
                  template: "{{value}} {{unit}}",
                },
              ],
              test: true,
            },
            test: true,
          },
          {
            name: "Colors",
            type: AttributeType.COLOR,
            mandatory: true,
            test: true,
          },
          {
            name: "Released On",
            type: AttributeType.DATE,
            mandatory: true,
            metadata: {
              min: new Date(),
              test: true,
            },
            test: true,
          },
          {
            name: "Stuff",
            type: AttributeType.JSON,
            mandatory: false,
            metadata: {
              metaStuff1: "abc",
              metaStuff2: 123,
              metaStuff3: [
                "abc",
                123,
              ],
              metaStuff4: {
                abc: 123
              },
            },
            test: true,
          },
        ],
        test: true,
      })
  
      await subcategory.save()
      process.exit(0)
    })
  }
}
