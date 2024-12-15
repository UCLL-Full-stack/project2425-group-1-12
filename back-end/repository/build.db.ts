import { Build } from "../model/build";
import database from './database';

const getAllBuilds = async (): Promise<Build[]> => {
    try {
        const buildPrisma = await database.build.findMany({
            include: {
                parts: true,
            },
        });
        return buildPrisma.length > 0 ? buildPrisma.map(Build.from) : [];
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const getBuildById = async ({ id }: { id: number }): Promise<Build | null> => {
    try {
        const buildPrisma = await database.build.findUnique({
            where: { id },
            include: {parts: true},
        });
        return buildPrisma ? Build.from(buildPrisma) : null;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const createBuild = async (build: Build): Promise<Build> => {
    try {
        const buildPrisma = await database.build.create({
            data: {
                parts: {
                    connect: build.getParts().map((part) => ({ id: part.getId() })),
                },
                price: build.getPrice(),
                preBuild: build.getPreBuild(),
            },
            include: {parts: true},
        });

        return Build.from(buildPrisma);
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
}

export default {
    getAllBuilds,
    getBuildById,
    createBuild,
}