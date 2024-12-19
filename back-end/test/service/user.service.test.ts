// import { BuildInput, OrderInput, PartInput } from '../../types';
// import { Part } from '../../model/part';
// import partDB from '../../repository/part.db';
// import buildDB from '../../repository/build.db';
import userDB from '../../repository/user.db';
import userService from '../../service/user.service';
// import { Build } from '../../model/build';
// import { Order } from '../../model/order';

// const partInput: PartInput = {
//     id: 1,
//     name: "RTX 4060",
//     brand: "Nvidia",
//     type: "GPU",
//     price: 300,
// };

// const part = new Part({ ...partInput });

// const buildInput: BuildInput = {
//     parts: [partInput],
//     name: "Test Build",
//     preBuild: false,
// };

// const build = new Build({
//     id: 1,
//     parts: [part],
//     name: "Test Build",
//     preBuild: false,
//     price: 300,
// });

// let mockPartDBGetPartById: jest.Mock;
// let mockBuildDBGetBuildById: jest.Mock;

let registerUserMock: jest.Mock;

beforeEach(() => {
    // mockPartDBGetPartById = jest.fn();
    // mockBuildDBGetBuildById = jest.fn();

    registerUserMock = jest.fn();
});

afterEach(() => {
    jest.clearAllMocks();
});

test('given a valid user, when user is created, then user is created with those values', async () => {
    // given
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


test('when fetching all users, then all users are returned', async () => {
    // given
    const mockUsers = [
        { id: 1, name: "User One", email: "user1@example.com", role: "user" },
        { id: 2, name: "User Two", email: "user2@example.com", role: "admin" },
    ];
    userDB.getAllUsers = jest.fn().mockResolvedValue(mockUsers);

    // when
    const users = await userService.getAllUsers();

    // then
    expect(userDB.getAllUsers).toHaveBeenCalledTimes(1);
    expect(users).toEqual(mockUsers);
});

test('given a valid user ID, when fetching a user by ID, then the user is returned', async () => {
    // given
    const userId = 1;
    const mockUser = { id: 1, name: "User One", email: "user1@example.com", role: "user" };

    userDB.getUserById = jest.fn().mockResolvedValue(mockUser);

    // when
    const user = await userService.getUserById(userId);

    // then
    expect(userDB.getUserById).toHaveBeenCalledTimes(1);
    expect(userDB.getUserById).toHaveBeenCalledWith({ id: userId });
    expect(user).toEqual(mockUser);
});

test('given an invalid user ID, when fetching a user by ID, then an error is thrown', async () => {
    // given
    const userId = 99;
    userDB.getUserById = jest.fn().mockResolvedValue(null);

    // when

    // then
    await expect(userService.getUserById(userId)).rejects.toThrow(
        `User with id ${userId} not found`
    );
});

test('given a valid email, when fetching a user by email, then the user is returned', async () => {
    // given
    const email = "user1@example.com";
    const mockUser = { id: 1, name: "User One", email: "user1@example.com", role: "user" };

    userDB.getUserByEmail = jest.fn().mockResolvedValue(mockUser);

    // when
    const user = await userService.getUserByEmail(email);

    // then
    expect(userDB.getUserByEmail).toHaveBeenCalledTimes(1);
    expect(userDB.getUserByEmail).toHaveBeenCalledWith({ email: email.toLowerCase() });
    expect(user).toEqual(mockUser);
});

test('given an invalid email, when fetching a user by email, then an error is thrown', async () => {
    // given
    const email = "invalid@example.com";
    userDB.getUserByEmail = jest.fn().mockResolvedValue(null);

    // when

    // then
    await expect(userService.getUserByEmail(email)).rejects.toThrow(
        `User with email ${email} not found`
    );
});
