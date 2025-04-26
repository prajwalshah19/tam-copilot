interface QueryResponse {
    message: string;
}

const API_URL = process.env.API_BASE_URL;

export async function executeProcessQuery(question: string): Promise<string> {
    try {
        const response = await fetch(`${API_URL}/query`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ question }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data: QueryResponse = await response.json();
        return data.message;
    } catch (error) {
        console.error('Error executing process query:', error);
        throw error;
    }
}
