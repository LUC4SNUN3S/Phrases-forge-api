import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('production'),
  APP_PORT: z
    .string()
    .nonempty()
    .transform((port) => Number(port)),

  POSTGRES_HOST: z.string().nonempty(),
  POSTGRES_PORT: z
    .string()
    .nonempty()
    .transform((port) => Number(port)),
  POSTGRES_USER: z.string().nonempty(),
  POSTGRES_PASSWORD: z.string().nonempty(),
  POSTGRES_DB: z.string().nonempty(),
  X_API_KEY: z.string().nonempty(),
});

const validateEnvironmentVariables = () => {
  return envSchema.parse(process.env);
};

export const env = validateEnvironmentVariables();
