type Role = 'admin' | 'staff' | 'user';

type AuthenticationResponse = {
    token: string;
    email: string;
    name: string;
    id?: number;
    role: Role;
}

type UserInput = {
    id?: number;
    role: Role;
    name: string;
    email: string;
    password: string;
    address: string;
    orders: OrderInput[];
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
    builds: BuildInput[];
    orderStatus: string;
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