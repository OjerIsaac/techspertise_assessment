import * as Joi from 'joi';

export const envVarsSchema = Joi.object({
  PORT: Joi.number().default(3000),

  JWT_SECRET: Joi.string().required(),

  DB_HOST: Joi.string().required(),
  DB_PORT: Joi.number().required(),
  DB_USERNAME: Joi.string().required(),
  DB_PASSWORD: Joi.string().required(),
  DB_NAME: Joi.string().required(),

  BUCKET_NAME: Joi.string().optional(),
  BUCKET_ENDPOINT: Joi.string().optional(),
  BUCKET_ACCESS_KEY: Joi.string().optional(),
  BUCKET_SECRET_KEY: Joi.string().optional(),
  BUCKET_REGION: Joi.string().optional(),

  SMTP_HOST: Joi.string().optional(),
  SMTP_PORT: Joi.number().optional(),
  SMTP_USERNAME: Joi.string().optional(),
  SMTP_PASSWORD: Joi.string().optional(),
  SMTP_FROM: Joi.string().optional(),

  REDIS_HOST: Joi.string().optional(),
  REDIS_PORT: Joi.number().optional(),
  REDIS_USERNAME: Joi.string().optional(),
  REDIS_PASSWORD: Joi.string().optional(),
});
