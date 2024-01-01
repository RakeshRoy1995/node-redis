import { Router } from 'express';
import {
 getUserList
} from '../controllers/user.controller';

const router = Router();

router.get('/all-user', getUserList);


export default router;
