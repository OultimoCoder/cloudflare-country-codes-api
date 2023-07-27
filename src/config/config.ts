import { z } from 'zod'
import { Environment } from '../../bindings'

const envVarsSchema = z.object({
  ENV: z.union([z.literal('production'), z.literal('development'), z.literal('test')])
})

export interface Config {
  env: 'production' | 'development' | 'test'
}

let config: Config

export const getConfig = (env: Environment['Bindings']) => {
  if (config) {
    return config
  }
  const envVars = envVarsSchema.parse(env)
  config = {
    env: envVars.ENV
  }
  return config
}
