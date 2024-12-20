import { User } from '../model/user';
import { AuthenticationResponse, LoginCredentials, UpdateUserInput, UserInput } from '../types';
import userDB from '../repository/user.db';
import bcrypt from 'bcrypt';
import { generateJwtToken } from '../util/jwt';
import { Role } from '@prisma/client';
import { UnauthorizedError } from 'express-jwt';

const getAllUsers = async (role: Role): Promise<User[]> => {
    if (role === 'admin') {
        return await userDB.getAllUsers();
    } else {
        throw new UnauthorizedError("credentials_required", { message:`${role}` });
    }
};

const getUserById = async (id: number): Promise<User> => {
    const user = await userDB.getUserById({ id });
    if (!user) throw new Error(`User with id ${id} not found`);
    return user;
};

const getUserByEmail = async (email: string): Promise<User> => {
    const user = await userDB.getUserByEmail({ email: email.toLowerCase() });
    if (!user) throw new Error(`User with email ${email} not found`);
    return user;
};

const registerUser = async (userInput: UserInput): Promise<User> => {
    const existingUser = await userDB.getUserByEmail({ email: userInput.email.toLowerCase() });
    if (existingUser) {
        throw new Error(`User with email ${userInput.email} already exists`);
    }

    const user = new User({
        ...userInput,
        email: userInput.email.toLowerCase(),
        orders: [],
    });
    return await userDB.registerUser({ user });
};

const updateUser = async (updateData: UpdateUserInput): Promise<User> => {
    const updatedUser = await userDB.updateUser(updateData);
    return updatedUser;
};

const authenticate = async (loginCredentials: LoginCredentials): Promise<AuthenticationResponse> => {
    const user = await getUserByEmail(loginCredentials.email);

    const isValidPasswd = await bcrypt.compare(loginCredentials.password, user.getPassword());
    if (!isValidPasswd) throw new Error('Incorrect password');

    return {
        token: generateJwtToken(loginCredentials.email,user.getRole()),
        email: loginCredentials.email,
        name : `${user.getName()}`,
        id: user.getId(),
        role: `${user.getRole()}`,
    };
};

export default {
    authenticate,
    getAllUsers,
    getUserById,
    getUserByEmail,
    registerUser,
    updateUser,
};