export const EMAIL = {
  required: "Please enter an email",
  valid: "Please enter a valid email",
}

export const PASSWORD = {
  required: "Please enter a password"
}

export const NEW_PASSWORD = {
  ...PASSWORD,
  minLength: "Please enter at least 6 characters",
  lowercaseRequired: "Please include at least 1 lowercase",
  uppercaseRequired: "Please include at least 1 uppercase",
  numberRequired: "Please include at least 1 number",
  format: "Invalid password format"
}

export const USER_NAME = {
  required: "Please enter a name",
}

export const ROLE = {
  required: "Please select a role",
  valid: "Please select a valid role",
}

export const PERMISSIONS = {
  required: "Please select permission",
  valid: "Please select valid permissions",
  minLength: "Please select at least 1 permission",
}

export const PROFILE_PICTURE = {
  required: "Please choose a file",
  maxSize: "Please use a smaller file (Max 1MB)",
  valid: "Invalid file format (jpeg, png, webp, heic)",
}

export const NOTIFICATION_STATE = {
  required: "Read value is required",
  valid: "Invalid read value",
}

export const NOTIFICATION_IDS = {
  individual: {
    required: "Notification id is required",
  },
  list: {
    minLength: "Please select at least 1 notification",
  },
}
