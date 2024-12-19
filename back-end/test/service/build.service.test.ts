import { PartInput } from '../../types';
import { Part } from '../../model/part';
import partDB from '../../repository/part.db';
import buildDB from '../../repository/build.db';
import buildService from '../../service/build.service';

const partInput: PartInput = {
    id: 1,
    name: "RTX 4060",
    brand: "Nvidia",
    type: "GPU",
    price: 300,
};

const part = new Part({
    ...partInput,
});

let mockPartDBGetPartById: jest.Mock;
let createBuildMock: jest.Mock;

beforeEach(() => {
    mockPartDBGetPartById = jest.fn();
    createBuildMock = jest.fn();
});

afterEach(() => {
    jest.clearAllMocks();
});

test('given a valid build, when build is created, then build is created with those values', async () => {
    // given
    partDB.getPartById = mockPartDBGetPartById.mockResolvedValue(part);

    buildDB.createBuild = createBuildMock;

    // when
    await buildService.createBuild({
            parts: [partInput],
            name: "Test Build",
            preBuild: false,
    });

    // then
    expect(createBuildMock).toHaveBeenCalledTimes(1);
    expect(createBuildMock).toHaveBeenCalledWith(
        expect.objectContaining({
            parts: [part],
            name: "Test Build",
            preBuild: false,
            price: 300,
        })
    );
});


