import { user as userCases } from '../../application/use-cases';

export default function userController(
  userRepository,
  userModelRepository,
) {
  const dbRepository = userRepository(userModelRepository());

  const fetchAllUsers = async (req, res, next) => {
    try {
      const users = await userCases.getAll(dbRepository);
      return res.apiResponse(users);
    } catch (error) {
      return next(error);
    }
  };

  const fetchUserById = async (req, res, next) => {
    try {
      const user = await userCases.findById(req.params.id, dbRepository);
      return res.apiResponse(user);
    } catch (error) {
      return next(error);
    }

  };

  const addNewUser = async (req, res, next) => {
    const { name, email, password } = req.body;

    try {
      const createdUser = await userCases.signUp({ name, email, password, userRepository: dbRepository });
      res.status(201);
      return res.apiResponse(createdUser);
    } catch (error) {
      return next(error);
    }
  };

  const deleteUserById = async (req, res, next) => {
    try {
      await userCases.deleteById(req.params.id, dbRepository);
      return res.apiResponse('User Deleted Succesfully');
    } catch (error) {
      return next(error);
    }

  };

  const updateUserById = async (req, res, next) => {
    const { name, email, password } = req.body;

    try {
      const updatedUser = await userCases.updateById({
        id: req.params.id,
        name,
        email,
        password,
        userRepository: dbRepository,
      });
      return res.apiResponse(updatedUser);
    } catch (error) {
      return next(error);
    }
  };

  const login = async (req, res, next) => {
    const { email, password } = req.body;

    try {
      const loginResponse = await userCases.login({ email, password, userRepository: dbRepository });
      res.status(201);
      return res.apiResponse(loginResponse);
    } catch (error) {
      return next(error);
    }
  };

  const logout = async (req, res, next) => {
    const { id } = req.query;

    try {
      const logoutResponse = await userCases.logout({ id, userRepository: dbRepository });
      res.status(201);
      return res.apiResponse(logoutResponse);
    } catch (error) {
      return next(error);
    }
  };

  return {
    fetchAllUsers,
    fetchUserById,
    addNewUser,
    updateUserById,
    deleteUserById,
    login,
    logout,
  };
}
