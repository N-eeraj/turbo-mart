/**
 * Notification types for admins.
 *
 * @readonly
 * @enum
 * 
 * @property SYSTEM = 0 - System generated notification.
 * @property SELLER_REGISTRATION_REQUEST = 1 - A seller has requested for registration.
 * @property DELIVERY_PERSON_REGISTRATION_REQUEST = 2 - A delivery person has requested for registration.
 * @property SELLER_CATALOGUE_REQUEST = 3 - A seller has requested for a new catalogue.
 */
export enum NotificationType {
  SYSTEM,
  SELLER_REGISTRATION_REQUEST,
  DELIVERY_PERSON_REGISTRATION_REQUEST,
  SELLER_CATALOGUE_REQUEST,
}
