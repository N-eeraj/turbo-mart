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

export const RESET_PASSWORD_URL = {
  required: "Redirect URL is required",
  valid: "Invalid URL format",
}

export const PASSWORD_RESET_TOKEN = {
  required: "Token is required",
  valid: "Invalid token",
}

export const LOGOUT_OTHERS_ON_RESET = {
  valid: "Invalid logoutOthers value"
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

export const CATEGORY = {
  name: {
    required: "Please enter a category name",
  },
  slug: {
    required: "Please enter a category slug",
  },
}

export const SUB_CATEGORY = {
  category: {
    required: "Please select a category",
  },
  name: {
    required: "Please enter a subcategory name",
  },
  slug: {
    required: "Please enter a subcategory slug",
  },
  attributes: {
    missingFields: "At least one of \"create\", \"update\", or \"delete\" field must be provided.",
    duplicateName: "Please enter unique attribute names",
    duplicateId: "Unique attributes required",
  },
}

export const ATTRIBUTE = {
  id: {
    required: "Attribute id is required",
  },
  name: {
    required: "Please enter an attribute name",
  },
  type: {
    required: "Please select an attribute type",
    valid: "Please select a valid attribute type",
  },
  required: {
    valid: "Please select a boolean value",
  },
  variant: {
    valid: "Please select a boolean value",
  },
  metadata: {
    text: {
      maxLength: {
        valid: "Please enter a valid max length",
      },
    },
    number: {
      min: {
        valid: "Please enter a valid number",
        maxValue: "Please enter a value smaller than the maximum value",
      },
      max: {
        valid: "Please enter a valid number",
        minValue: "Please enter a value larger than the minimum value",
      },
      unit: {
        valid: "Please enter a valid unit",
      },
      template: {
        valid: "Please enter a valid template",
      },
      base: {
        valid: "Please enter a valid number",
        minValue: "Please enter a value of at least 1",
      },
    },
    list: {
      required: "Please enter the required metadata",
      type: {
        required: "Please select a type",
        valid: "Please select a valid type",
      },
      text: {
        valid: "Please enter a valid option",
      },
      number: {
        required: "Please enter the required metadata",
        value: {
          valid: "Please enter a valid number",
        },
        unit: {
          valid: "Please enter a valid unit",
        },
        template: {
          valid: "Please enter a valid template",
        },
        base: {
          valid: "Please enter a valid number",
          minValue: "Please enter a value of at least 1",
        },
      },
      options: {
        minLength: "Please add at least 1 option",
      },
    },
    date: {
      min: {
        valid: "Please select a valid date",
        maxDate: "Please select a date before the maximum date",
      },
      max: {
        valid: "Please select a valid date",
        minDate: "Please select a date after the minimum date",
      },
    },
  },
}

export const BRAND = {
  name: {
    required: "Please enter a brand name",
  },
  slug: {
    required: "Please enter a brand slug",
  },
}
