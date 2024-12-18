import { Build } from "../model/build";
import { Order } from "../model/order";
import { Part } from "../model/part";

type Role = 'admin' | 'staff' | 'user';

// TODO: change Build and Order to BuildInput and OrderInput

type AuthenticationResponse = {
    token: string;
    email: string;
    name: string;
    id?: number;
}

type UserInput = {
    id?: number;
    name: string;
    email: string;
    password: string;
    address: string;
    orders: Order[];
}

type PartInput = {
    id?: number;
    name: string;
    brand: string;
    type: string;
    price: number;
}

type OrderInput = {
    id?: number;
    builds: Build[];
    price: number;
    orderStatus: string;
    orderDate: Date;
    userId: number;
}

type BuildInput = {
    id?: number;
    name: string;
    parts: PartInput[];
    preBuild: boolean;
}

type LoginCredentials = {
    email: string;
    password: string;
}

type UpdateUserInput = {
    email: string
    name?:string
    address?:string
    password?:string
}

export {
    Role,
    AuthenticationResponse,
    UserInput,
    PartInput,
    OrderInput,
    BuildInput,
    LoginCredentials,
    UpdateUserInput,
}