import partDB from "../../repository/part.db";
import partService from "../../service/part.service";


test('when fetching all parts, then all parts are returned', async () => {
    // given
    const mockParts = [
        { id: 1, name: "RTX 4060", brand: "Nvidia", type: "GPU", price: 300 },
        { id: 2, name: "Ryzen 5600X", brand: "AMD", type: "CPU", price: 200 },
    ];
    partDB.getAllParts = jest.fn().mockResolvedValue(mockParts);

    // when
    const parts = await partService.getAllParts();

    // then
    expect(partDB.getAllParts).toHaveBeenCalledTimes(1);
    expect(parts).toEqual(mockParts);
});

test('given a valid part ID, when fetching a part by ID, then the part is returned', async () => {
    // given
    const partId = 1;
    const mockPart = { id: 1, name: "RTX 4060", brand: "Nvidia", type: "GPU", price: 300 };

    partDB.getPartById = jest.fn().mockResolvedValue(mockPart);

    // when
    const part = await partService.getPartById(partId);

    // then
    expect(partDB.getPartById).toHaveBeenCalledTimes(1);
    expect(partDB.getPartById).toHaveBeenCalledWith({ id: partId });
    expect(part).toEqual(mockPart);
});

test('given an invalid part ID, when fetching a part by ID, then an error is thrown', async () => {
    // given
    const partId = 99;
    partDB.getPartById = jest.fn().mockResolvedValue(null);

    // when

    // then
    await expect(partService.getPartById(partId)).rejects.toThrowError(
        `Part with id ${partId} not found`
    );
});

test('given a valid part name, when fetching a part by name, then the part is returned', async () => {
    // given
    const partName = "RTX 4060";
    const mockPart = { id: 1, name: "RTX 4060", brand: "Nvidia", type: "GPU", price: 300 };

    partDB.getPartByName = jest.fn().mockResolvedValue(mockPart);

    // when
    const part = await partService.getPartByName(partName);

    // then
    expect(partDB.getPartByName).toHaveBeenCalledTimes(1);
    expect(partDB.getPartByName).toHaveBeenCalledWith({ name: partName });
    expect(part).toEqual(mockPart);
});

test('given an invalid part name, when fetching a part by name, then an error is thrown', async () => {
    // given
    const partName = "Invalid Part";
    partDB.getPartByName = jest.fn().mockResolvedValue(null);

    // when

    // then
    await expect(partService.getPartByName(partName)).rejects.toThrowError(
        `Part with name ${partName} not found`
    );
});
