import { StreamClient } from '@stream-io/node-sdk';

const apiKey = process.env.API_KEY || '';
const apiSecret = process.env.SECRET_KEY || '';

export const client = new StreamClient(apiKey, apiSecret);
