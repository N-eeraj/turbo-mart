import type mongoose from "mongoose"

import {
  Roles,
  Permissions,
} from "@app/database/mongoose/models/Admin/User.ts"
import {
  AttributeType,
} from "@app/database/mongoose/models/Catalogue/Attributes.ts"

import ProfileSchema from "#jsonDocs/schemas/profile" with { type: "json" }
import NotificationSchema from "#jsonDocs/schemas/notification" with { type: "json" }
import CategorySchema from "#jsonDocs/schemas/catalogue/category" with { type: "json" }
import SubcategorySchema from "#jsonDocs/schemas/catalogue/subcategory" with { type: "json" }
import BrandSchema from "#jsonDocs/schemas/catalogue/brand" with { type: "json" }
import {
  loginJSONSchema,
  forgotPasswordJSONSchema,
  resetPasswordJSONSchema,
} from "#schemas/auth"
import {
  profileUpdateJSONSchema,
  passwordUpdateJSONSchema,
  profilePictureJSONSchema,
  notificationReadStatusJSONSchema,
  notificationReadStatusBulkJSONSchema,
  adminJSONSchema,
  adminCreationJSONSchema,
  adminUpdateJSONSchema,
} from "#schemas/user"
import {
  categoryCreationJSONSchema,
  categoryUpdateJSONSchema,
} from "#schemas/admin/catalogue/category"
import {
  subcategoryCreationJSONSchema,
  subcategoryUpdateJSONSchema,
  subcategoryAttributeUpdateJSONSchema,
} from "#schemas/admin/catalogue/subcategory"
import {
  brandCreationJSONSchema,
  brandUpdateJSONSchema,
} from "#schemas/admin/catalogue/brand"

const LimitOptionSchema = {
  "type": "number",
  "description": "Number of records to be retrieved.",
  "default": 10
}
const SkipOptionSchema = {
  "type": "number",
  "description": "Number of records to be skipped.",
  "default": 0
}

const SortOrderSchema = {
  type: [
    "string",
    "number"
  ],
  description: "Defines the order in which results are sorted.\n- `\"asc\"` Sort results in ascending order.\n- `\"ascending\"` Same as \"asc\", for readability.\n- `\"desc\"` Sort results in descending order.\n- `\"descending\"` Same as \"desc\", for readability.\n- `1` Sort results in ascending order - numeric form.\n- `-1` Sort results in descending order - numeric form.",
  enum: [
    "asc",
    "ascending",
    "desc",
    "descending",
    1,
    -1,
  ] satisfies Array<mongoose.SortOrder>,
}

const RolesEnum = {
  type: "number",
  description: "Defines user roles and their access levels.\n- `0` - `SUPER_ADMIN`: Highest level admin with full privileges.\n- `1` - `ADMIN`: Standard admin with permission-based access.",
  enum: [
    Roles.SUPER_ADMIN,
    Roles.ADMIN,
  ] satisfies Array<Roles>,
}

const PermissionsEnum = {
  type: "number",
  description: "Defines role-based permissions within the system.\n- `0` - `RETAILER_MANAGER`: Permission to manage retailers.\n- `1` - `CATALOGUE_MANAGER`: Permission to manage product catalogues.\n- `2` - `DELIVERY_PERSON_MANAGER`: Permission to manage delivery personnel.\n- `3` - `FINANCE_MANAGER`: Permission to manage financial operations.\n- `4` - `DATA_ANALYST`: Permission to analyze data and generate reports.",
  enum: [
    Permissions.CATALOGUE_MANAGER,
    Permissions.DATA_ANALYST,
    Permissions.DELIVERY_PERSON_MANAGER,
    Permissions.FINANCE_MANAGER,
    Permissions.RETAILER_MANAGER,
  ] satisfies Array<Permissions>,
}

const SubcategoryAttributeTypesEnum = {
  type: "number",
  description: "Types for subcategory attributes.\n- `0` - `TEXT`: Free-form text input.\n- `1` - `NUMBER`: Numeric value.\n- `2` - `BOOLEAN`: Boolean value.\n- `3` - `SELECT`: Single option from a predefined list.\n- `4` - `MULTI_SELECT`: Multiple options from a predefined list.\n- `5` - `COLOR`: Color value, for attributes that require a color.\n- `6` - `DATE`: Date or timestamp value.\n- `7` - `JSON`: Structured data stored as a key-value JSON object.",
  enum: [
    AttributeType.TEXT,
    AttributeType.NUMBER,
    AttributeType.BOOLEAN,
    AttributeType.SELECT,
    AttributeType.MULTI_SELECT,
    AttributeType.COLOR,
    AttributeType.DATE,
    AttributeType.JSON,
  ] satisfies Array<AttributeType>,
}

const ResponseSchemas = {
  ProfileSchema,
  NotificationSchema,
  CategorySchema,
  SubcategorySchema,
  BrandSchema,
}

const UtilitySchemas = {
  LimitOptionSchema,
  SkipOptionSchema,
  SortOrderSchema,
  RolesEnum,
  PermissionsEnum,
  SubcategoryAttributeTypesEnum,
}

const schemas = {
  LoginSchema: loginJSONSchema,
  ForgotPasswordSchema: forgotPasswordJSONSchema,
  ResetPasswordSchema: resetPasswordJSONSchema,
  ProfileUpdateSchema: profileUpdateJSONSchema,
  PasswordUpdateSchema: passwordUpdateJSONSchema,
  ProfilePictureSchema: profilePictureJSONSchema,
  NotificationReadStatusSchema: notificationReadStatusJSONSchema,
  NotificationReadStatusBulkSchema: notificationReadStatusBulkJSONSchema,
  AdminSchema: adminJSONSchema,
  AdminCreationSchema: adminCreationJSONSchema,
  AdminUpdateSchema: adminUpdateJSONSchema,
  CategoryCreationSchema: categoryCreationJSONSchema,
  CategoryUpdateSchema: categoryUpdateJSONSchema,
  SubcategoryCreationSchema: subcategoryCreationJSONSchema,
  SubcategoryUpdateSchema: subcategoryUpdateJSONSchema,
  SubcategoryAttributeUpdateSchema: subcategoryAttributeUpdateJSONSchema,
  BrandCreationSchema: brandCreationJSONSchema,
  BrandUpdateSchema: brandUpdateJSONSchema,
  ...ResponseSchemas,
  ...UtilitySchemas,
}

export default schemas
