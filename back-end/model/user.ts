import {
    User as UserPrisma,
    Order as OrderPrisma,
    Part as PartPrisma,
    Build as BuildPrisma,
} from "@prisma/client";
import { Order } from "./order";
import { Role } from "../types";


export class User {
    private id?: number;
    private role: Role;
    private name: string;
    private email: string;
    private password: string;
    private address: string;
    private orders: Order[];

    constructor(user: {
        id?: number;
        role: Role;
        name: string;
        email: string;
        password: string;
        address: string;
        orders?: Order[];
    }) {
        this.validate(user);

        this.id = user.id;
        this.role = user.role;
        this.name = user.name;
        this.email = user.email;
        this.password = user.password;
        this.address = user.address;
        this.orders = user.orders || [];
    }

    validate(user: {
        name: string;
        role: Role;
        email: string;
        password: string;
        address: string;
    }) {
        if (!user.role) { throw new Error('Role cannot be empty'); }
        if (!user.name) { throw new Error('Name cannot be empty'); }
        if (!user.email) { throw new Error('Email cannot be empty'); }
        if (!user.password) { throw new Error('Password cannot be empty'); }
        if (!user.address) { throw new Error('Address cannot be empty'); }

        if (!this.validateEmail(user.email)) {
            throw new Error('Invalid email format');
        }
        if (user.password.length < 8) {
            throw new Error('Password must be at least 8 characters');
        }
    }

    static from({
        id,
        role,
        name,
        email,
        password,
        address,
        orders,
    }: UserPrisma & {
        role: Role;
        orders: (OrderPrisma & { builds: (BuildPrisma & { parts: PartPrisma[] })[] })[];
    }): User {
        return new User({
            id,
            role,
            name,
            email,
            password,
            address,
            orders: orders ? orders.map((order) => Order.fromShallow(order)) : [],
        });
    }

    static fromShallow({
        id,
        role = 'user',
        name,
        email,
        address,
    }: UserPrisma): User {
        return new User({
            id,
            role,
            name,
            email,
            password: '********',
            address,
            orders: [],
        });
    }

    private validateEmail(email: string): boolean {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    public getOrderSummaries() {
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
            role: this.role,
            orderSummaries: this.getOrderSummaries(),
        }
    }

    public getRole(): Role {
        return this.role;
    }

    public setRole(role: Role): void {
        this.role = role;
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
