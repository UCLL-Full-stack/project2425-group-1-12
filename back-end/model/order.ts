import {
    Order as OrderPrisma,
    Build as BuildPrisma,
    User as UserPrisma,
    Part as PartPrisma,
} from "@prisma/client";
import { Build } from "./build";
import { User } from "./user";

export class Order {
    private id?: number;
    private builds: Build[];
    private price: number;
    private orderStatus: string;
    private orderDate: Date;
    private user?: User;

    constructor(order: {
        id?: number;
        builds: Build[];
        price: number;
        orderStatus: string;
        orderDate: Date;
        user?: User;
    }) {
        this.validate(order);

        this.id = order.id;
        this.builds = order.builds;
        this.price = order.price;
        this.orderStatus = order.orderStatus;
        this.orderDate = order.orderDate;
        this.user = order.user;
    }

    validate(order: {
        builds: Build[];
        price: number;
        orderStatus: string;
        orderDate: Date ;
        user?: User;
    }) {
        if (!order.orderStatus) {
            throw new Error('OrderStatus cannot be empty');
        }
        if (order.price <= 0) {
            throw new Error('Order must have positive and non zero price')
        }
        if (new Date(order.orderDate) > new Date()) {
            throw new Error('Order date cannot be in the future');
        }
    }

    static from ({
        id,
        builds,
        price,
        orderStatus,
        orderDate,
        user,
    }: OrderPrisma & {
        user?: UserPrisma,
        builds: (BuildPrisma & {parts: PartPrisma[] })[],
    }): Order {
        return new Order({
            id,
            builds: builds.map((build) => Build.from(build)),
            price,
            orderStatus,
            orderDate,
            user: user ? User.fromShallow(user) : undefined,
        });
    }

    static fromShallow({
        id,
        builds,
        price,
        orderStatus,
        orderDate,
    }: OrderPrisma & { builds: (BuildPrisma & {parts: PartPrisma[] })[] }): Order {
        return new Order({
            id,
            builds: builds.map((build) => Build.from(build)),
            price,
            orderStatus,
            orderDate,
            user: undefined, // No user reference in shallow conversion
        });
    }

    public getSummary() {
        return {
            id: this.id,
            buildsAmount: this.builds.length,
            price: this.price,
            orderStatus: this.orderStatus,
            orderDate: this.orderDate,
        }
    }

    getId(): number | undefined {
        return this.id;
    }

    getBuilds(): Build[] {
        return this.builds;
    }

    getPrice(): number {
        return this.price;
    }

    getOrderStatus(): string {
        return this.orderStatus;
    }

    getOrderDate(): Date {
        return this.orderDate;
    }

    getUser(): User | undefined {
        return this.user;
    }
}