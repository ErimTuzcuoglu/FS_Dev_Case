import {authenticateToken} from '../../../application/middlewares';
import userController from '../../../api/controllers/userController';
import userDbRepository from '../../../application/repositories/userRepository';
import userDbRepositoryMongoDB from '../../database/mongoDB/repositories/userModelRepository';
import {Router} from '../router';

const router = Router();

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
