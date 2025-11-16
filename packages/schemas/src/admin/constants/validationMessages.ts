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

export const CONFIRM_PASSWORD = {
  ...PASSWORD,
  mismatch: "Passwords do not match",
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
  valid: "Invalid file format, use (jpg, jpeg, png, webp, avif, heic)",
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
        positive: "Please enter a positive number",
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

export const PRODUCT = {
  subcategory: {
    required: "Please select a subcategory",
  },
  brand: {
    required: "Please select a brand",
  },
  name: {
    required: "Please enter a product name",
  },
  attributes: {
    attribute: {
      required: "Please select an attribute",
      subcategoryRequired: "The selected subcategory requires this attribute",
    },
    valueOrVariant: {
      required: "Please enter a value or variants",
      either: "Please enter either a value or a variant, not both",
    },
    value: {
      required: "Please enter a value",
      attributeRequired: "The selected attribute requires a value",
    },
    variants: {
      attributeRequired: "The selected attribute requires variants",
      minLength: "Please add at least 1 variant",
      value: {
        required: "Please enter a variant value",
      },
      slug: {
        required: "Please enter a variant slug",
      },
    },
  },
  skuList: {
    minLength: "Please add at least 1 SKU",
    media: {
      image: {
        required: "Please choose an image",
        maxSize: "Please use a smaller image (Max 512KB)",
        valid: "Invalid image format (jpeg, png, webp, heic, gif)",
      },
      video: {
        required: "Please choose an video",
        maxSize: "Please use a smaller video (Max 5MB)",
        valid: "Invalid video format (mp4, webm, ogg)",
      },
    },
    variant: {
      slug: {
        required: "Please select the slug for this variant",
      },
    },
  },
}
