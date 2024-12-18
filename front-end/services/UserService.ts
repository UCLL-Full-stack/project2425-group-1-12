import { User } from "@types";

const apiUrl = "http://localhost:3000";

export const UserService = {
    getUserByEmail: async (email: string) => {
        try {
          const tokenData = localStorage.getItem('loggedInUser');
          let token: string | null = null;
          let email: string | null = null;
          if(tokenData){
            token = JSON.parse(tokenData).token;
            email = JSON.parse(tokenData).email;
          }
          const res = await fetch(apiUrl + `/users/email/${email}`, {
            method: "GET",
            headers: {
              "Accept": "application/json",
              "Authorization": `Bearer ${token}`,
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

    updateUser: async (updateData: {email: string, name?: string, address?: string, password?:string}) => {
        try {
            const tokenData = localStorage.getItem('loggedInUser');
            const token = tokenData ? JSON.parse(tokenData).token : null;
    
            const response = await fetch(apiUrl + '/users/updateUser', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(updateData),
            });
    
            if (!response.ok) {
                throw new Error(`Login failed: ${response.statusText}`);
            }
    
            return await response.json();
        } catch (error) {
            throw new Error(`${error}`);
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
