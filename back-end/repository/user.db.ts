import { User } from '../model/user';
import { UpdateUserInput } from '../types';
import database from './database';
import bcrypt from 'bcrypt';

const getAllUsers = async (): Promise<User[]> => {
    try {
        const userPrisma = await database.user.findMany({
            include: { orders: { include: { builds: { include: { parts: true }, }, }, }, },
        });
        return userPrisma.length > 0 ? userPrisma.map(User.from) : [];
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const getUserById = async ({ id }: { id: number }): Promise<User | null> => {
    try {
        const userPrisma = await database.user.findUnique({
            where: { id },
            include: { orders: { include: { builds: { include: { parts: true }, }, }, }, },
        });
        return userPrisma ? User.from(userPrisma) : null;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const getUserByEmail = async ({ email }: { email: string }): Promise<User | null> => {
    try {
        const userPrisma = await database.user.findUnique({
            where: { email },
            include: { orders: { include: { builds: { include: { parts: true }, }, }, }, },
        });
        return userPrisma ? User.from(userPrisma) : null;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const registerUser = async ({ user }: { user: User }): Promise<User> => {
    try {
        const userPrisma = await database.user.create({
            data: {
                name: user.getName(),
                email: user.getEmail(),
                password: await bcrypt.hash(user.getPassword(), 12),
                address: user.getAddress(),
                orders: { create: [] },
            },
            include: { orders: { include: { builds: { include: { parts: true }, }, }, }, },
        });

        return User.from(userPrisma);
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const updateUser = async (updateData: UpdateUserInput): Promise<User> => {
    try {
        const currentUser = await database.user.findUnique({
            where: { email: updateData.email.toLowerCase() },
        });
        const updatedUserData: any = {};
        if (updateData.name) {
            updatedUserData.name = updateData.name;
        }
        if (updateData.address) {
            updatedUserData.address = updateData.address;
        }
        if (updateData.password) {
            updatedUserData.password = await bcrypt.hash(updateData.password, 12);
        }

        const updatedUserPrisma = await database.user.update({
            where: {email: updateData.email.toLowerCase()},
            data: updatedUserData,
            include: { orders: { include: { builds: { include: { parts: true }, }, }, }, },
        })


        return User.from(updatedUserPrisma);
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

export default {
    getAllUsers,
    getUserById,
    getUserByEmail,
    updateUser,
    registerUser,
};