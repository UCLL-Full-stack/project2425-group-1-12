import { PartInput } from '../../types';
import { Part } from '../../model/part';
import { Build } from '../../model/build';
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

const build = new Build({
    id: 1,
    parts: [part],
    name: "Test Build",
    preBuild: false,
    price: 300,
});

let mockPartDBGetPartById: jest.Mock;
let mockBuildDBGetBuildById: jest.Mock;
let createBuildMock: jest.Mock;

beforeEach(() => {
    mockPartDBGetPartById = jest.fn();
    mockBuildDBGetBuildById = jest.fn();
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

test('given a valid build ID, when fetching the build, then the correct build is returned', async () => {
    // given
    buildDB.getBuildById = mockBuildDBGetBuildById.mockResolvedValue(build);

    // when
    const fetchedBuild = await buildService.getBuildById({ id: 1 });

    // then
    expect(mockBuildDBGetBuildById).toHaveBeenCalledTimes(1);
    expect(mockBuildDBGetBuildById).toHaveBeenCalledWith({ id: 1 });
    expect(fetchedBuild).toEqual(
        expect.objectContaining({
            id: 1,
            parts: [part],
            name: "Test Build",
            preBuild: false,
            price: 300,
        })
    );
});

test('given multiple builds in the database, when fetching all builds, then the correct builds are returned', async () => {
    // given
    const builds = [
        new Build({
            id: 1,
            parts: [part],
            name: "Test Build 1",
            preBuild: false,
            price: 300,
        }),
        new Build({
            id: 2,
            parts: [part],
            name: "Test Build 2",
            preBuild: true,
            price: 500,
        }),
    ];

    buildDB.getAllBuilds = jest.fn().mockResolvedValue(builds);

    // when
    const fetchedBuilds = await buildService.getAllBuilds();

    // then
    expect(buildDB.getAllBuilds).toHaveBeenCalledTimes(1);
    expect(fetchedBuilds).toEqual(
        expect.arrayContaining([
            expect.objectContaining({
                id: 1,
                name: "Test Build 1",
                preBuild: false,
                price: 300,
                parts: [part],
            }),
            expect.objectContaining({
                id: 2,
                name: "Test Build 2",
                preBuild: true,
                price: 500,
                parts: [part],
            }),
        ])
    );
});