type Auth = "user" | "guest" | "all"

declare module "#app" {
  interface PageMeta {
    auth?: Auth
  }
}

// It is always important to ensure you import/export something when augmenting a type
export {}
