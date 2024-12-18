
export type Role = 'admin' | 'staff' | 'user';

export type User = {
    id?: number;
    role : Role;
    name: string;
    email: string;
    password: string;
    address: string;
    orders: Order[];
}

export type Part = {
    id?: number;
    name: string;
    brand: string;
    type: string;
    price: number;
}

export type Build = {
    id?: number;
    name: string;
    parts: Part[];
    preBuild: boolean;
}

export type Order = {
    id?: number;
    builds: Build[];
    price: number;
    orderStatus: string;
    orderDate: Date;
}