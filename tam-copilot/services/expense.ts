// services/expenses.ts
interface ExpenseCreate {
    category: string;
    description: string;
    amount: number;
    vendor?: string;
    payment_method?: string;
}

interface Expense extends ExpenseCreate {
    id: string;
}

const API_URL = process.env.API_BASE_URL;

export async function createExpense(expense: ExpenseCreate): Promise<Expense> {
    try {
        const response = await fetch(`${API_URL}/expenses/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(expense),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error creating expense:', error);
        throw error;
    }
}