import { Request, Response } from 'express';
import { createClient } from 'redis';
import logger from '../config/logger';
import User from '../models/User.Model';
import { hashPassword  , tokenGenerator , tokenVarify } from '../middlewares/auth-hash';
import { formatError } from '../utils/error.util';
import { connectRedis } from '../config/redis.config';
var crypto = require('crypto');
const NAMESPACE = 'User Controller';


export const getUserList = async (req: Request, res: Response) => {
    try {
        const client = await connectRedis()

        const value = await client.get('user');

        if (value) {
            res.json({data : value});
        }else{
            const users = await User.find({}).select('_id email api_token');
            await client.set('user', JSON.stringify(users) );
            res.json({data : users});
        }
        await client.disconnect();


        
        
    } catch (err) {
        logger.error(NAMESPACE, 'Error getting users');
        return res.status(500).json(formatError('Server error'));
    }
};