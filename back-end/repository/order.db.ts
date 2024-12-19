import { Order } from "../model/order";
import database from './database';

const getAllOrders = async (): Promise<Order[]> => {
    try {
        const orderPrisma = await database.order.findMany({
            include: {
                builds: { include: { parts: true } },
                user: true,
            },
        });
        return orderPrisma.map((orderPrisma) => Order.from(orderPrisma));
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const getOrderById = async ({ id }: { id: number }): Promise<Order | null> => {
    try {
        const orderPrisma = await database.order.findUnique({
            where: { id },
            include: {
                builds: { include: { parts: true } },
                user: true,
            },
        });
        return orderPrisma ? Order.from(orderPrisma) : null;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const createOrder = async (order: Order): Promise<Order> => {
    try {
        const user = order.getUser();
        if (!user) throw new Error('Cannot create error without user');

        const orderPrisma = await database.order.create({
            data: {
                builds: { connect: order.getBuilds().map((build) => ({ id: build.getId() })) },
                price: order.getPrice(),
                orderStatus: order.getOrderStatus(),
                orderDate: order.getOrderDate(),
                user: { connect: { id: user.getId() } },
            },
            include: {
                builds: { include: { parts: true } },
                user: true,
            },
        });

        return Order.from(orderPrisma);
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const getAllBuildsByUserId = async (userId: number) => {
    try {
        const userOrdersWithBuilds = await database.order.findMany({
            where: { userId },
            include: { builds: { include: { parts: true } } },
        });

        return userOrdersWithBuilds.flatMap(order => order.builds);
    } catch (error) {
        console.error("Error fetching builds for user:", error);
        throw new Error("Failed to fetch builds for the user.");
    }
};

export default {
    getAllOrders,
    getOrderById,
    createOrder,
    getAllBuildsByUserId,
};