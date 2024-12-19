import { Order } from "../model/order";
import { OrderInput } from "../types";
import orderDB from "../repository/order.db";
import userDB from "../repository/user.db";
import { Role } from "@prisma/client";
import { UnauthorizedError } from "express-jwt";

const getAllOrders = async (role: Role): Promise<Order[]> => {
    console.log('Role', role)
    if (role === 'staff' || role === 'admin') {
        return await orderDB.getAllOrders();
    } else {
        throw new UnauthorizedError("credentials_required", { message:`${role}` });
    }
}

const getAllBuildsByUserId = async ({ id }: { id: any }): Promise<any> => {
    return await orderDB.getAllBuildsByUserId(id);
};

const getOrderById = async (id: number): Promise<Order> => {
    const order = await orderDB.getOrderById({ id });
    if (!order) throw new Error(`Order with id ${id} does not exist`);
    return order;
};

const createOrder = async ( orderInput: OrderInput ): Promise<Order> => {
    const user = await userDB.getUserById({ id: orderInput.userId });
    if (!user) throw new Error('User not found');

    const order = new Order({
        builds: orderInput.builds,
        price: orderInput.price,
        orderStatus: orderInput.orderStatus,
        orderDate: orderInput.orderDate,
        user,
    });

    return await orderDB.createOrder(order);
};

export default {
    getAllOrders,
    getOrderById,
    createOrder,
    getAllBuildsByUserId,
};