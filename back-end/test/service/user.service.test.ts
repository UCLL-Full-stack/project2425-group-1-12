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
    // partDB.getPartById = mockPartDBGetPartById.mockResolvedValue(part);
    // buildDB.getBuildById = mockBuildDBGetBuildById.mockResolvedValue(build);

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


