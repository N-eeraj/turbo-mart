import {
  AttributeType,
} from "@app/database/mongoose/enums/catalogue/attribute"
import {
  type AttributeObject,
} from "@app/database/mongoose/models/Catalogue/Attributes"

export type AttributeObjectBase = AttributeObject<AttributeType>
export type AttributeObjectWithoutVariant = Omit<AttributeObjectBase, "variant">
