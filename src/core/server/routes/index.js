import {routerGenerator} from '../routerGenerator';
import userRouter from './user';

const router = routerGenerator();

router.use('/users', userRouter);

export default router;

