import connectMongoDB from "@app/database/mongoose/connect.ts"
import SubCategory, {
  AttributeType,
} from "@app/database/mongoose/models/Catalogue/SubCategory.ts"

export default class Temporary {
  static async execute(..._args: Array<unknown>) {
    connectMongoDB(async () => {
      const subCategory = new SubCategory({
        category: "68e006fc56f54a9415173411",
        name: "Smart Phone",
        slug: "smrt-phn",
        attributes: [
          {
            name: "Processor",
            type: AttributeType.TEXT,
            mandatory: true,
            metaData: {
              maxLength: 100,
              test: true,
            },
            test: true,
          },
          {
            name: "Screen Size",
            type: AttributeType.NUMBER,
            mandatory: true,
            metaData: {
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
            metaData: {
              type: AttributeType.TEXT,
              options: [
                "Android",
                "iOS",
                {}
              ],
              test: true,
            },
            test: true,
          },
          {
            name: "Refresh Rates",
            type: AttributeType.MULTI_SELECT,
            mandatory: false,
            metaData: {
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
            metaData: {
              min: new Date(),
              test: true,
            },
            test: true,
          },
          {
            name: "Stuff",
            type: AttributeType.JSON,
            mandatory: false,
            metaData: {
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
  
      await subCategory.save()
      process.exit(0)
    })
  }
}
