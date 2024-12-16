export type User = {
    id?: number;
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
    price: number;
    preBuild: boolean;
}

export type Order = {
    id?: number;
    builds: Build[];
    price: number;
    orderStatus: string;
    orderDate: Date;
}