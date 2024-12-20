// Execute: npx ts-node util/seed.ts
import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

const main = async () => {
    await prisma.build.deleteMany();
    await prisma.order.deleteMany();
    await prisma.part.deleteMany();
    await prisma.user.deleteMany();

    // USERS
    const admin = await prisma.user.create({
        data: {
            name: "Joe Biden",
            role: 'admin',
            email: "joe.biden@us.gov",
            password: await bcrypt.hash('CannotRemember',12),
            address: 'Where am i',
        },
    });

    const staff = await prisma.user.create({
        data: {
            name:'Bernie Sanders',
            role:'staff',
            email:'bernie.sanders@yahoo.com',
            password: await bcrypt.hash('FeelTheBern',12),
            address: 'Somewhere in Vermont',
        },
    });

    const user1 = await prisma.user.create({
        data: {
            name: 'Barack Obama',
            role: 'user',
            email: 'barack.obama@gmail.com',
            password: await bcrypt.hash('YesYouCan', 12),
            address: '1600 Pennsylvania Ave NW, Washington, DC',
        },
    });

    const user2 = await prisma.user.create({
        data: {
            name: 'Neil Armstrong',
            role: 'user',
            email: 'neil.armstrong@nasamail.gov',
            password: await bcrypt.hash('OneSmallStep', 12),
            address: 'Apollo Blvd, Wapakoneta, OH'
        }
    });

    const user3 = await prisma.user.create({
        data: {
            name: 'Stephen Hawking',
            role: 'user',
            email: 'stephen.hawking@cambridge.ac.uk',
            password: await bcrypt.hash('BigBang42', 12),
            address: 'University of Cambridge, Cambridge, UK'
        }
    });



    // PARTS

        // CPU
    const cpu1 = await prisma.part.create({ data: { name: 'Ryzen 5600X', brand: 'AMD', type: 'CPU', price: 150 } });
    const cpu2 = await prisma.part.create({ data: { name: 'Ryzen 7600X', brand: 'AMD', type: 'CPU', price: 220 } });
    const cpu3 = await prisma.part.create({ data: { name: 'Ryzen 7800X', brand: 'AMD', type: 'CPU', price: 320 } });
    const cpu4 = await prisma.part.create({ data: { name: 'Ryzen 9800X', brand: 'AMD', type: 'CPU', price: 400 } });
    const cpu5 = await prisma.part.create({ data: { name: 'Core i7 14700K', brand: 'Intel', type: 'CPU', price: 400 } });
    const cpu6 = await prisma.part.create({ data: { name: 'Core Ultra 7 265K', brand: 'Intel', type: 'CPU', price: 400 } });

        // GPU
    const gpu1 = await prisma.part.create({ data: { name: 'Radeon RX 7800 XT', brand: 'AMD', type: 'GPU', price: 500 } });
    const gpu2 = await prisma.part.create({ data: { name: 'Radeon RX 7900 XTX', brand: 'AMD', type: 'GPU', price: 1000 } });
    const gpu3 = await prisma.part.create({ data: { name: 'Geforce RTX 4060', brand: 'Nvidia', type: 'GPU', price: 300 } });
    const gpu4 = await prisma.part.create({ data: { name: 'Geforce RTX 4080', brand: 'Nvidia', type: 'GPU', price: 1000 } });
    const gpu5 = await prisma.part.create({ data: { name: 'Geforce RTX 4090', brand: 'Nvidia', type: 'GPU', price: 1200 } });
    const gpu6 = await prisma.part.create({ data: { name: 'Radeon RX 7700 XT', brand: 'AMD', type: 'GPU', price: 400 } });

        // MOTHERBOARD
    const motherboard1 = await prisma.part.create({ data: { name: 'ROG STRIX B550-F', brand: 'ASUS', type: 'Motherboard', price: 200 } });
    const motherboard2 = await prisma.part.create({ data: { name: 'MPG Z790 EDGE', brand: 'MSI', type: 'Motherboard', price: 300 } });
    const motherboard3 = await prisma.part.create({ data: { name: 'B660M AORUS', brand: 'GIGABYTE', type: 'Motherboard', price: 150 } });
    const motherboard4 = await prisma.part.create({ data: { name: 'X670E PG Lightning', brand: 'ASRock', type: 'Motherboard', price: 250 } });

        // RAM
    const ram1 = await prisma.part.create({ data: { name: 'Vengeance LPX 16GB DDR4-3200', brand: 'Corsair', type: 'RAM', price: 60 } });
    const ram2 = await prisma.part.create({ data: { name: 'Trident Z5 RGB 32GB DDR5-6000', brand: 'G.SKILL', type: 'RAM', price: 120 } });
    const ram3 = await prisma.part.create({ data: { name: 'Fury Beast 16GB DDR5-3600', brand: 'Kingston', type: 'RAM', price: 50 } });
    const ram4 = await prisma.part.create({ data: { name: 'Team T-Force Delta RGB 32GB DDR4-4000', brand: 'Team Group', type: 'RAM', price: 90 } });

        // CASE
    const case1 = await prisma.part.create({ data: { name: 'H510', brand: 'NZXT', type: 'Case', price: 70 } });
    const case2 = await prisma.part.create({ data: { name: '4000D Airflow', brand: 'Corsair', type: 'Case', price: 80 } });
    const case3 = await prisma.part.create({ data: { name: 'MasterBox NR600', brand: 'Cooler Master', type: 'Case', price: 60 } });
    const case4 = await prisma.part.create({ data: { name: 'Meshify C', brand: 'Fractal Design', type: 'Case', price: 100 } });

        // PSU
    const psu1 = await prisma.part.create({ data: { name: 'RM850x', brand: 'Corsair', type: 'PSU', price: 130 } });
    const psu2 = await prisma.part.create({ data: { name: 'SuperNOVA 750 G5', brand: 'EVGA', type: 'PSU', price: 120 } });
    const psu3 = await prisma.part.create({ data: { name: 'Focus GX-650', brand: 'Seasonic', type: 'PSU', price: 110 } });
    const psu4 = await prisma.part.create({ data: { name: 'V850 SFX', brand: 'Cooler Master', type: 'PSU', price: 150 } });

        // STORAGE
    const storage1 = await prisma.part.create({ data: { name: '970 EVO Plus 1TB', brand: 'Samsung', type: 'Storage', price: 100 } });
    const storage2 = await prisma.part.create({ data: { name: 'Black SN850X 2TB', brand: 'Western Digital', type: 'Storage', price: 200 } });
    const storage3 = await prisma.part.create({ data: { name: 'MX500 1TB', brand: 'Crucial', type: 'Storage', price: 80 } });
    const storage4 = await prisma.part.create({ data: { name: 'Barracuda 4TB HDD', brand: 'Seagate', type: 'Storage', price: 100 } });


    // BUILDS

    const build1Parts = [ cpu1, gpu3, motherboard1, ram1, case1, psu3, storage1]
    const build1 = await prisma.build.create({
        data: {
            name: 'Budget Gaming PC',
            price: build1Parts.reduce((sum, part) => sum + part.price, 0),
            preBuild: true,
            parts: { connect: build1Parts.map(part => ({ id: part.id })) },
        },
    });

    const build2Parts = [ cpu4 , gpu2, motherboard2, ram2, case2, psu2, storage2, storage4 ]
    const build2 = await prisma.build.create({
        data: {
            name: 'AMD Powerhouse',
            price: build2Parts.reduce((sum, part) => sum + part.price, 0),
            preBuild: false,
            parts: { connect: build2Parts.map(part => ({ id: part.id })) },
        },
    });

    const build3Parts = [cpu2, gpu6, motherboard2, ram2, case2, psu3, storage2];
    const build3 = await prisma.build.create({
        data: {
            name: 'AMD Mid-Range',
            price: build3Parts.reduce((sum, part) => sum + part.price, 0),
            preBuild: false,
            parts: { connect: build3Parts.map(part => ({ id: part.id })) },
        },
    });

    const build4Parts = [cpu4, gpu5, motherboard2, ram2, case3, psu1, storage3];
    const build4 = await prisma.build.create({
        data: {
            name: 'Nvidia x AMD',
            price: build4Parts.reduce((sum, part) => sum + part.price, 0),
            preBuild: false,
            parts: { connect: build4Parts.map(part => ({ id: part.id })) },
        },
    });



    // ORDERS

    const order1Builds = [build1];
    const order1 = await prisma.order.create({
        data: {
            price: order1Builds.reduce((sum, build) => sum + build.price, 0),
            orderStatus: 'shipping',
            orderDate: new Date(),
            builds: {connect: order1Builds.map(build => ({ id: build.id })) },
            user: {connect: { id: user1.id }},
        },
    });

    const order2Builds = [build2];
    const order2 = await prisma.order.create({
        data: {
            price: order2Builds.reduce((sum, build) => sum + build.price, 0),
            orderStatus: 'preparing',
            orderDate: new Date(),
            builds: {connect: order2Builds.map(build => ({ id: build.id })) },
            user: {connect: { id: user1.id }},
        },
    });

    const order3Builds = [build3, build4];
    const order3 = await prisma.order.create({
        data: {
            price: order3Builds.reduce((sum, build) => sum + build.price, 0),
            orderStatus: 'preparing',
            orderDate: new Date(),
            builds: {connect: order3Builds.map(build => ({ id: build.id })) },
            user: {connect: { id: user1.id }},
        },
    });
};

(async () => {
    try {
        await main();
        await prisma.$disconnect();
        console.log('Database seeded!');
    } catch (error) {
        console.error(error);
        await prisma.$disconnect();
        process.exit(1);
    }
})();