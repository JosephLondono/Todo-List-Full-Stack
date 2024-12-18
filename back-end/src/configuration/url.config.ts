import { registerAs } from '@nestjs/config';

export default registerAs('url', () => ({
  urlFrontDev: process.env.URL_FRONTEND_LOCAL,
  urlFrontProd: process.env.URL_FRONTEND_PROD,
}));
