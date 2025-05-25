// Environment variables
export const ENV = {
  APP_NAME: process.env.APP_NAME || 'DecentOdds',
  APP_ENV: process.env.APP_ENV || 'development',
  APP_PORT: process.env.APP_PORT || 3000,
  BASE_URL: process.env.BASE_URL || 'http://localhost:3000',
  
  // Database
  DB_HOST: process.env.DB_HOST || 'localhost',
  DB_PORT: process.env.DB_PORT || 5432,
  DB_NAME: process.env.DB_NAME || 'decentodds_db',
  DB_USER: process.env.DB_USER || 'decentodds_user',
  DB_PASSWORD: process.env.DB_PASSWORD || '',

  // Auth
  JWT_SECRET: process.env.JWT_SECRET || 'your_jwt_secret_key_here',
  SESSION_SECRET: process.env.SESSION_SECRET || 'your_session_secret_key_here',

  // Blockchain
  CHAIN_ID: process.env.CHAIN_ID || 137,
  WEB3_PROVIDER_URL: process.env.WEB3_PROVIDER_URL || 'https://polygon-rpc.com',
  TOKEN_CONTRACT_ADDRESS: process.env.TOKEN_CONTRACT_ADDRESS || '',

  // Token
  TOKEN_NAME: process.env.TOKEN_NAME || 'DODDS',
  TOKEN_SYMBOL: process.env.TOKEN_SYPSYMBOL || 'DODDS',
  TOKEN_DECIMALS: process.env.TOKEN_DECIMALS || 18,

  // WalletConnect
  WALLETCONNECT_PROJECT_ID: process.env.WALLETCONNECT_PROJECT_ID || '',

  // Email
  EMAIL_FROM: process.env.EMAIL_FROM || 'noreply@decentodds.com',
  SMTP_HOST: process.env.SMTP_HOST || 'smtp.mailtrap.io',
  SMTP_PORT: process.env.SMTP_PORT || 587,
  SMTP_USER: process.env.SMTP_USER || '',
  SMTP_PASS: process.env.SMTP_PASS || ''
};
