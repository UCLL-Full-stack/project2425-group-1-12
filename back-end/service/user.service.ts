import { User } from '../model/user';
import { AuthenticationResponse, LoginCredentials, UserInput } from '../types';
import userDB from '../repository/user.db';
import bcrypt from 'bcrypt';
import { generateJwtToken } from '../util/jwt';

const getAllUsers = async (): Promise<User[]> => {
    return await userDB.getAllUsers();
};

// TODO: change these get users to Promise<User | null>

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

const registerUser = async (userInput: UserInput): Promise<AuthenticationResponse> => {
    const existingUser = await userDB.getUserByEmail({ email: userInput.email.toLowerCase() });
    if (existingUser) {
        throw new Error(`User with email ${userInput.email} already exists`);
    }

    const user = new User(userInput);
    await userDB.registerUser({ user });
    const token = generateJwtToken(userInput.email);
    console.log(token)
    return {
        token,
        email: userInput.email,
        name: `${userInput.name}`,
    };
};

const authenticate = async (loginCredentials: LoginCredentials): Promise<AuthenticationResponse> => {
    const user = await getUserByEmail(loginCredentials.email);

    const isValidPasswd = await bcrypt.compare(loginCredentials.password, user.getPassword());
    if (!isValidPasswd) throw new Error('Incorrect password');

    return {
        token: generateJwtToken( loginCredentials.email ),
        email: loginCredentials.email,
        name : `${user.getName()}`,
    };
};

export default {
    authenticate,
    getAllUsers,
    getUserById,
    getUserByEmail,
    registerUser,
};