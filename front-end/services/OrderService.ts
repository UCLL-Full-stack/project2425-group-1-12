const apiUrl = "http://localhost:3000"; //TODO: change this .env later

export const OrderService = {
    getAllBuildsByUserId: async () => {
        try {
            const tokenData = localStorage.getItem("loggedInUser");
            let token: string | null = null;
            let userId: number = -1;
            if (tokenData) {
                token = JSON.parse(tokenData).token;
                userId = JSON.parse(tokenData).id;
            }

            const res = await fetch(apiUrl + `/orders/builds/user/` + userId, {
                method: "GET",
                headers: {
                    "Accept": "application/json",
                    "Authorization": `Bearer ${token}`
                },
            });
            if (!res.ok) throw new Error(`User builds could not be fetched`);
            return await res.json();
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Error fetching user builds: ${error.message}`);
            } else {
                throw new Error('An unknown error occurred while fetching user builds.');
            }
        }
    },

    getAllOrders: async () => {
        try {
            const tokenData = localStorage.getItem("loggedInUser");
            let token: string | null = null;
            if (tokenData) {
                token = JSON.parse(tokenData).token;
            }

            const res = await fetch(apiUrl + '/orders/', {
                method: "GET",
                headers: {
                    "Accept": "application/json",
                    "Authorization": `Bearer ${token}`
                },
            });
            if (!res.ok) throw new Error(`Could not get orders`);
            return await res.json();
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Error fetching orders: ${error.message}`);
            } else {
                throw new Error('An unknown error occurred while fetching orders.');
            }
        }
    },

    createOrder: async () => {
        try {
            const tokenData = localStorage.getItem("loggedInUser");
            let token: string | null = null;
            let userId: number = -1;
            if (tokenData) {
                token = JSON.parse(tokenData).token;
                userId = JSON.parse(tokenData).id;
            }

            const shoppingCart = JSON.parse(sessionStorage.getItem('shoppingCart') as string);
            if (!shoppingCart) throw new Error('Shopping cart empty');

            const order = {
                userId,
                builds: shoppingCart.map((id: number) => ({ id })),
                orderStatus: 'processing',
            };

            const res = await fetch(apiUrl + `/orders`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(order),
            });

            if (!res.ok) throw new Error(`Build could not be created`);
            sessionStorage.removeItem('shoppingCart');

            return await res.json();
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Error creating order: ${error.message}`);
            } else {
                throw new Error('An unknown error occurred while creating a order.');
            }
        }
    }
}