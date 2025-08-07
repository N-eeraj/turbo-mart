import cors from "cors"

import {
  ALLOWED_ORIGINS,
} from "#src/config/server"

const corsMiddleware = cors({
  origin: (origin: string, callback: (error: null | Error, _success?: boolean) => void) => {
    if (!origin || ALLOWED_ORIGINS.includes(origin)) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  credentials: true,
})

export default corsMiddleware
