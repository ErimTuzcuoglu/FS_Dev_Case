import {Router} from '../router';
import userRouter from './user';

const router = Router();

router.use('/users', userRouter);

export default router;

