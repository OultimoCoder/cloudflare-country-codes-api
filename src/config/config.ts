import { z } from 'zod'

const envVarsSchema = z.object({
  ENV: z.union([z.literal('production'), z.literal('development'), z.literal('test')]),
  CORS_ORIGINS: z.array(z.string()).optional().default(['*']),
})

export interface Config {
  env: 'production' | 'development' | 'test'
  cors: {
    origins: string[]
  }
}

let config: Config

export const getConfig = (env: Environment['Bindings']) => {
  if (config) {
    return config
  }
  const envVars = envVarsSchema.parse({ ...env, CORS_ORIGINS: JSON.parse(env.CORS_ORIGINS) })
  config = {
    env: envVars.ENV,
    cors: {
      origins: envVars.CORS_ORIGINS
    }
  }
  return config
}
