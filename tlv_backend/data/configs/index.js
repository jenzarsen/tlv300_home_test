import dotenv from 'dotenv';

dotenv.config();

export const config = {
  app: {
    port: process.env.EXP_PORT || 3000,
    env: process.env.NODE_ENV || 'development'
  },
  api: {
    cocBaseUrl: process.env.BASE_URL_COC,
    ckBaseUrl: process.env.BASE_URL_CK,
    authToken: process.env.AUTH_TOKEN
  }
};