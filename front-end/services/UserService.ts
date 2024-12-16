import { User } from "@types";

const apiUrl = "http://localhost:3000";

export const UserService = {
    getUserByEmail: async (email: string) => {
        try {
            const res = await fetch(apiUrl + `/users/email/${email}`, {
                method: "GET",
                headers: {
                    "Accept": "application/json",
                },
            });
            if (!res.ok) {
                throw new Error(`User not found: ${email}`);
            }
            return await res.json();
        } catch (error) {
            throw new Error(`Error fetching user: ${error}`);
        }
    },

    registerUser: async (user: User) => {
        try {
            const res = await fetch(apiUrl + "/users/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(user),
            });
            if (!res.ok) {
                throw new Error('Registration failed');
            }
            return true;
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Error: ${error.message}`);
            } else {
                throw new Error('It ain’t work, idk why.');
            }
        }
    },

    updateUser: async (user: User) => {
        try {
            const res = await fetch(apiUrl + "/users/update", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(user),
            });
            if (!res.ok) {
                throw new Error('Update failed');
            }
            return await res.json();
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Error: ${error.message}`);
            } else {
                throw new Error('It ain’t work, idk why.');
            }
        }
    },

    login: async (userInput: { email: string; password: string; }) => {
        try {
            const res = await fetch(apiUrl + "/users/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userInput),
            });

            if (!res.ok) {
                throw new Error(`Login failed: ${res.statusText}`);
            }

            const jsonResponse = await res.json();
            localStorage.setItem('loggedInUser', JSON.stringify(jsonResponse));
            return jsonResponse;
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Error during login: ${error.message}`);
            } else {
                throw new Error('An unknown error occurred during login.');
            }
        }
    }
};
