import authenticateToken from '@core/server/middlewares/authenticateToken';
import userController from '@api/controllers/userController';
import userDbRepository from '@application/repositories/userRepository';
import userDbRepositoryMongoDB from '@core/database/mongoDB/repositories/userModelRepository';
import {routerGenerator} from '../routerGenerator';

const router = routerGenerator();

const controller = userController(
  userDbRepository,
  userDbRepositoryMongoDB,
);

router.get('/', controller.fetchAllUsers);
router.get('/:id', authenticateToken, controller.fetchUserById);
router.post('/', controller.addNewUser);
router.post('/login', controller.login);
router.post('/logout/:id', controller.logout);
router.put('/:id', authenticateToken, controller.updateUserById);
router.delete('/:id', authenticateToken, controller.deleteUserById);

export default router;
