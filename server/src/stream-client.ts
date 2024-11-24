import './config'
import { StreamClient } from '@stream-io/node-sdk';

const apiKey = process.env.VITE_API_KEY;
const apiSecret = process.env.VITE_SECRET_KEY;

export const client = new StreamClient(apiKey!, apiSecret!);
