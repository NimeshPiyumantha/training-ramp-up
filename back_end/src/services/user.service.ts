import { DeleteResult, InsertResult, UpdateResult } from 'typeorm';
import { appDataSource } from '../configs/datasource.config';
import { sendNotification } from '../util/notification.util';
import { User } from '../models/user.models';

export const getAllUsers = async (): Promise<Array<User>> => {
  try {
    const users: Array<User> = await appDataSource.manager
      .getRepository(User)
      .find({ order: { email: 'DESC' } });

    if (users.length === 0) {
      throw new Error('No students found');
    }

    return users;
  } catch (error) {
    throw error;
  }
};

export const getUserByOne = async (search: string): Promise<User | null> => {
  try {
    const userRepository = await appDataSource.manager.getRepository(User);
    const user = await userRepository.findOne({
      where: [
        { name: search },
        { address: search },
        { mobileNumber: search },
        { email: search },
      ],
    });

    if (!user) {
      throw new Error('No user found');
    }

    return user;
  } catch (error) {
    throw error;
  }
};

export const createUser = async (userData: User): Promise<InsertResult> => {
  try {
    const newUser: InsertResult = await appDataSource.manager
      .getRepository(User)
      .insert(userData);
    sendNotification(
      'New User Added',
      'A New User has been Added to the Database.',
    );
    return newUser;
  } catch (error) {
    throw error;
  }
};

export const updateUser = async (
  email: string,
  userData: User,
): Promise<UpdateResult | null> => {
  try {
    const updatedUser: UpdateResult = await appDataSource.manager
      .getRepository(User)
      .update(email, userData);

    if (updatedUser.affected === 0) {
      throw new Error('User not found');
    }
    sendNotification(
      'User Updated',
      'A User has been Updated in the Database.',
    );
    return updatedUser;
  } catch (error) {
    throw error;
  }
};

export const deleteUser = async (id: string): Promise<DeleteResult> => {
  try {
    const deleteResult: DeleteResult = await appDataSource.manager
      .getRepository(User)
      .delete(id);

    if (deleteResult.affected === 0) {
      throw new Error('User not found');
    }
    sendNotification(
      'User Deleted',
      'A User has been Deleted from the Database.',
    );
    return deleteResult;
  } catch (error) {
    throw error;
  }
};
