import mongoose from 'mongoose';
import { createClient } from 'redis';
import { error, info } from './logger';

const NAMESPACE = 'Database';

export const connectRedis = async () => {
    const client = await createClient()
  .on('error', err => console.log('Redis Client Error', err))
  .connect();

  return client
};
