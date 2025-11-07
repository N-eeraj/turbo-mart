/**
 * Admin roles used for authorization and access control.
 *
 * @readonly
 * @enum
 * 
 * @property SUPER_ADMIN = 0 - Highest level admin with full privileges.
 * @property ADMIN = 1 - Standard admin with permission based access.
 */
export enum Roles {
  SUPER_ADMIN,
  ADMIN,
}

/**
 * Permission levels representing different management roles and access rights.
 *
 * @readonly
 * @enum
 * 
 * @property RETAILER_MANAGER = 0 - Permission to manage retailers.
 * @property CATALOGUE_MANAGER = 1 - Permission to manage product catalogues.
 * @property DELIVERY_PERSON_MANAGER = 2 - Permission to manage delivery personnel.
 * @property FINANCE_MANAGER = 3 - Permission to manage financial operations.
 * @property DATA_ANALYST = 4 - Permission to analyze data and generate reports.
 */
export enum Permissions {
  RETAILER_MANAGER,
  CATALOGUE_MANAGER,
  DELIVERY_PERSON_MANAGER,
  FINANCE_MANAGER,
  DATA_ANALYST,
}
