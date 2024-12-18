const apiUrl = "http://localhost:3000"; //TODO: change this .env later

export const PartService = {
    getAllParts: async () => {
        try {
            const tokenData = localStorage.getItem("loggedInUser");
            let token: string | null = null;
            if (tokenData) token = JSON.parse(tokenData).token;

            const res = await fetch(apiUrl + `/parts`, {
                method: "GET",
                headers: {
                    "Accept": "application/json",
                    "Authorization": `Bearer ${token}`
                },
            });
            if (!res.ok) throw new Error(`Parts could not be fetched`);
            return await res.json();
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Error fetching parts: ${error.message}`);
            } else {
                throw new Error('An unknown error occurred while fetching parts.');
            }
        }
    },
}