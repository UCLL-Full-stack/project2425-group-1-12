// import { Part } from "../../model/part";
// import partDB from "../../repository/part.db";
// import partService from "../../service/part.service";


// jest.mock("../../repository/part.db")

// describe("Project Service Tests", () => {
//     afterEach(() => {
//         jest.clearAllMocks();
//     });

//     describe("getAllParts", () => {
//         it("Should return all parts", async () => {
//             const mockProjects = [
//                 new Part({
//                     id: 1,
//                     name: "Test CPU",
//                     type: "CPU",
//                     brand: "Test Brand",
//                     price: 200,
//                 }),
//             ];
//             (partDB.getAllParts as jest.Mock).mockResolvedValue(mockProjects);

//             const result = await partService.getAllParts();

//             expect(partDB.getAllParts).toHaveBeenCalledTimes(1);
//             expect(result).toEqual(mockProjects);
//         });
//     });

//     describe('getPartById', () => {
//         it('Should return the part', async () => {
//             const mockProject = new Part({
//                                     id: 1,
//                                     name: "Test CPU",
//                                     type: "CPU",
//                                     brand: "Test Brand",
//                                     price: 200,
//                                 });
//             (partDB.getPartById as jest.Mock).mockResolvedValue(mockProject);

//             const result = await partService.getPartById(1);

//             expect(partDB.getPartById).toHaveBeenCalledWith({ id: 1 });
//             expect(result).toEqual(mockProject);
//         });

//         it('Should throw an error if the part is not found', async () => {
//             (partDB.getPartById as jest.Mock).mockResolvedValue(null);
//             await expect(partService.getPartById(5)).rejects.toThrow('Part with id 5 not found');
//         });
//     });

//     describe('')
// });

