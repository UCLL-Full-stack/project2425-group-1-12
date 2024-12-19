import { PartInput } from '../../types';
import { Part } from '../../model/part';
import partDB from '../../repository/part.db';
import buildDB from '../../repository/build.db';
import userDB from '../../repository/user.db';
import orderDB from '../../repository/order.db';
import userService from '../../service/user.service';
import orderService from '../../service/order.service';
import { Build } from '../../model/build';
import { UnauthorizedError } from 'express-jwt';

const partInput: PartInput = {
    id: 1,
    name: "RTX 4060",
    brand: "Nvidia",
    type: "GPU",
    price: 300,
};

const part = new Part({ ...partInput });

const build = new Build({
    id: 1,
    parts: [part],
    name: "Test Build",
    preBuild: false,
    price: 300,
});

let mockPartDBGetPartById: jest.Mock;
let mockBuildDBGetBuildById: jest.Mock;
let mockUserDBGetUserById: jest.Mock;

let registerUserMock: jest.Mock;

beforeEach(() => {
    mockPartDBGetPartById = jest.fn();
    mockBuildDBGetBuildById = jest.fn();
    mockUserDBGetUserById = jest.fn();

    registerUserMock = jest.fn();
});

afterEach(() => {
    jest.clearAllMocks();
});

test('given a valid user, when user is created, then user is created with those values', async () => {
    // given
    partDB.getPartById = mockPartDBGetPartById.mockResolvedValue(part);
    buildDB.getBuildById = mockBuildDBGetBuildById.mockResolvedValue(build);

    userDB.registerUser = registerUserMock;

    // when
    await userService.registerUser({
        role: "user",
        name: "Test User",
        email: "test@example.com",
        password: "testpassword",
        address: "test address",
        orders: [],
    });

    // then
    expect(registerUserMock).toHaveBeenCalledTimes(1);
    expect(registerUserMock).toHaveBeenCalledWith(
        expect.objectContaining({
            user: {
                role: "user",
                name: "Test User",
                email: "test@example.com",
                password: "testpassword",
                address: "test address",
                orders: [],
            }
        })
    );
});

test('given a staff role, when fetching all orders, then all orders are returned', async () => {
    // given
    const mockOrders = [
        { id: 1, userId: 1, builds: [build], orderStatus: 'processing' },
        { id: 2, userId: 2, builds: [build], orderStatus: 'completed' },
    ];

    orderDB.getAllOrders = jest.fn().mockResolvedValue(mockOrders);

    // when
    const orders = await orderService.getAllOrders('staff');

    // then
    expect(orderDB.getAllOrders).toHaveBeenCalledTimes(1);
    expect(orders).toEqual(mockOrders);
});

test('given a non-staff role, when fetching all orders, then an UnauthorizedError is thrown', async () => {
    // when & then
    await expect(orderService.getAllOrders('user')).rejects.toThrow(
        new UnauthorizedError("credentials_required", { message: "user" })
    );
});

test('given a valid user ID, when fetching builds by user ID, then builds are returned', async () => {
    // given
    const userId = 1;
    const mockBuilds = [build];
    orderDB.getAllBuildsByUserId = jest.fn().mockResolvedValue(mockBuilds);

    // when
    const builds = await orderService.getAllBuildsByUserId({ id: userId });

    // then
    expect(orderDB.getAllBuildsByUserId).toHaveBeenCalledTimes(1);
    expect(orderDB.getAllBuildsByUserId).toHaveBeenCalledWith(userId);
    expect(builds).toEqual(mockBuilds);
});

test('given a valid order ID, when fetching an order by ID, then the order is returned', async () => {
    // given
    const orderId = 1;
    const mockOrder = {
        id: 1,
        userId: 1,
        builds: [build],
        orderStatus: 'processing',
    };

    orderDB.getOrderById = jest.fn().mockResolvedValue(mockOrder);

    // when
    const order = await orderService.getOrderById(orderId);

    // then
    expect(orderDB.getOrderById).toHaveBeenCalledTimes(1);
    expect(orderDB.getOrderById).toHaveBeenCalledWith({ id: orderId });
    expect(order).toEqual(mockOrder);
});

test('given an invalid order ID, when fetching an order by ID, then an error is thrown', async () => {
    // given
    const orderId = 99;
    orderDB.getOrderById = jest.fn().mockResolvedValue(null);

    // when

    // then
    await expect(orderService.getOrderById(orderId)).rejects.toThrow(
        `Order with id ${orderId} does not exist`
    );
});
