import partDB from "../repository/part.db";
import buildDB from "../repository/build.db";
import { Build } from "../model/build";
import { BuildInput } from "../types";

const getAllBuilds = async (): Promise<Build[]> => {
    return await buildDB.getAllBuilds();
};

const getBuildById = async ({ id }: {id: number}): Promise<Build | null> => {
    const build = await buildDB.getBuildById({ id });
    if (!build) throw new Error(`Build with id ${id} does not exist`);
    return build;
};

const createBuild = async ( buildInput: BuildInput ): Promise<Build> => {
    const parts = await Promise.all(
        buildInput.parts.map(async (partInput) => {
            const partId = partInput.id
            if (!partId) throw new Error('Part id is required');

            const part = await partDB.getPartById({ id: partId });
            if (!part) throw new Error(`part with id ${partId} not found`);
            return part;
        })
    );

    const totalPartsPrice = parts.reduce((total, part) => total + part.getPrice(), 0);
    const totalPrice = totalPartsPrice + (buildInput.preBuild ? 100 : 0);

    const build = new Build({
        name: buildInput.name,
        parts,
        price: totalPrice,
        preBuild: buildInput.preBuild,
    });
    const createdBuild = await buildDB.createBuild(build);
    return createdBuild;
};

export default {
    getAllBuilds,
    getBuildById,
    createBuild,
};