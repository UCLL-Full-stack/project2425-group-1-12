import { NewBuild } from "@types";

const apiUrl = "http://localhost:3000"; //TODO: change this .env later

export const BuildService = {
    getAllBuilds: async () => {
        try {
            const tokenData = localStorage.getItem("loggedInUser");
            let token: string | null = null;
            if (tokenData) token = JSON.parse(tokenData).token;

            const res = await fetch(apiUrl + `/builds`, {
                method: "GET",
                headers: {
                    "Accept": "application/json",
                    "Authorization": `Bearer ${token}`
                },
            });
            if (!res.ok) throw new Error(`Builds could not be fetched`);
            return await res.json();
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Error fetching builds: ${error.message}`);
            } else {
                throw new Error('An unknown error occurred while fetching builds.');
            }
        }
    },

    createBuild: async (build: NewBuild) => {
        try {
            const tokenData = localStorage.getItem("loggedInUser");
            let token: string | null = null;
            if (tokenData) token = JSON.parse(tokenData).token;

            const res = await fetch(apiUrl + `/builds`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(build),
            });

            if (!res.ok) throw new Error(`Build could not be created`);
            const response = await res.json()

            if (sessionStorage.getItem('shoppingCart')) {
                const shoppingCart = JSON.parse(sessionStorage.getItem('shoppingCart') as string);
                shoppingCart.push(response.id);
                sessionStorage.setItem('shoppingCart', JSON.stringify(shoppingCart));
            } else {
                sessionStorage.setItem('shoppingCart', JSON.stringify([response.id]));
            }

            return response;
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Error creating build: ${error.message}`);
            } else {
                throw new Error('An unknown error occurred while creating a build.');
            }
        }
    },

    getBuildsFromUser: async () => {
        try {
            const tokenData = localStorage.getItem("loggedInUser");
            let token: string | null = null;
            if (tokenData) token = JSON.parse(tokenData).token;

            const res = await fetch(apiUrl + `/builds`, {
                method: "GET",
                headers: {
                    "Accept": "application/json",
                    "Authorization": `Bearer ${token}`
                },
            });
            if (!res.ok) throw new Error(`Builds could not be fetched`);
            return await res.json();
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Error fetching builds: ${error.message}`);
            } else {
                throw new Error('An unknown error occurred while fetching builds.');
            }
        }
    },

    getBuildFromId: async (id: number) => {
        try {
            const tokenData = localStorage.getItem("loggedInUser");
            let token: string | null = null;
            if (tokenData) token = JSON.parse(tokenData).token;

            const res = await fetch(apiUrl + "/builds/" + id, {
                method: "GET",
                headers: {
                    "Accept": "application/json",
                    "Authorization": `Bearer ${token}`
                },
            });
            if (!res.ok) throw new Error(`Build could not be fetched`);
            return await res.json();
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Error fetching build: ${error.message}`);
            } else {
                throw new Error('An unknown error occurred while fetching build.');
            }
        }
    },
}

