import {
    User as UserPrisma,
    Order as OrderPrisma,
    Part as PartPrisma,
    Build as BuildPrisma,
} from "@prisma/client";
import { Order } from "./order";


export class User {
    private id?: number;
    private name: string;
    private email: string;
    private password: string;
    private address: string;
    private orders: Order[];

    constructor(user: {
        id?: number;
        name: string;
        email: string;
        password: string;
        address: string;
        orders?: Order[];
    }) {
        this.validate(user)

        this.id = user.id;
        this.name = user.name;
        this.email = user.email;
        this.password = user.password;
        this.address = user.address;

        // If orders is not given, orders will be set as an empty list
        if (!user.orders) {
            this.orders = []
        } else {
            this.orders = user.orders;
        }
    }

    validate(user: {
        name: string;
        email: string;
        password: string;
        address: string;
    }) {
        if (!user.name) {throw new Error('Name cannot be empty');}
        if (!user.email) {throw new Error('Email cannot be empty');}
        if (!user.password) {throw new Error('Password cannot be empty');}
        if (!user.address) {throw new Error('Address cannot be empty');}

        if (!this.validateEmail(user.email)) {
            throw new Error('Invalid email format');
        }
        if (!user.password || user.password.length < 8) {
            throw new Error('Password must be at least 8 characters');
        }
    }

    static from ({
        id,
        name,
        email,
        password,
        address,
        orders,
    }: UserPrisma & {
        orders: (OrderPrisma & { builds: (BuildPrisma & { parts: PartPrisma[] })[] })[],
    }): User {
        return new User({
            id,
            name,
            email,
            password,
            address,
            orders: orders ? orders.map((order) => Order.fromShallow(order)) : [],
        });
    }

    static fromShallow({
        id,
        name,
        email,
        address,
    }: UserPrisma): User {
        return new User({
            id,
            name,
            email,
            password: '********', // For passing validation checks upon user creation
            address,
            orders: [], // No orders reference in shallow conversion
        });
    }


    private validateEmail(email: string): boolean {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    public getOrderSummaries() {
        if (!this.orders) return [];
        return this.orders.map(order => order.getSummary());
    }


    public addOrder(order: Order) {
        this.orders.push(order);
    }

    public toJson() {
        return {
            id: this.id,
            name: this.name,
            email: this.email,
            address: this.address,
            orderSummaries: this.getOrderSummaries(),
        }
    }

    getId(): number | undefined {
        return this.id;
    }

    getEmail(): string {
        return this.email;
    }

    getName(): string {
        return this.name;
    }

    getPassword(): string {
        return this.password;
    }

    getAddress(): string {
        return this.address;
    }

    getOrders(): Order[] {
        return this.orders;
    }
}