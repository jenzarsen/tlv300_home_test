import dotenv from 'dotenv';

dotenv.config();

export const config = {
  app: {
    port: process.env.EXP_PORT || 3000
  },
  api: {
    key: process.env.API_KEY,
    baseUrl : process.env.BASE_URL
  }
};