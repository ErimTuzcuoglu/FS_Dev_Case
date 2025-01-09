import {User} from '../models/User';

export default function userModelRepository() {
  const getAll = () => User.find();
  const findById = (id) => User.findById(id);
  const findBy = (field) => User.findOne(field);

  const signUp = ({
    name,
    email,
    hashedPassword,
  }) => {
    const newUser = new User({
      name,
      email,
      hashedPassword,
    });
    return newUser.save();
  };

  const updateById = (id, {name, email, hashedPassword}) => {
    return User.findOneAndUpdate(
      {_id: id},
      {
        $set: {
          name,
          email,
          hashedPassword,
        },
      },
      {new: true},
    );
  };

  const deleteById = async (id) => {
    return User.findByIdAndDelete(id);
  };

  return {
    getAll,
    findById,
    findBy,
    signUp,
    updateById,
    deleteById,
  };
}
