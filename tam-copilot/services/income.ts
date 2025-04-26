interface IncomeCreate {
    income_date: string;
    source: string;
    category: string;
    description: string;
    amount: number;
    invoice_id?: string;
    student_id?: string;
}

interface Income extends IncomeCreate {
    id: string;
}

const API_URL = process.env.API_BASE_URL;

export async function createIncome(income: IncomeCreate): Promise<Income> {
    try {
        const response = await fetch(`${API_URL}/income/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(income),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error creating income:', error);
        throw error;
    }
}

export async function getIncome(): Promise<Income[]> {
    try {
        const response = await fetch(`${API_URL}/income`);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error fetching income:', error);
        throw error;
    }
}

// Example usage:
/*
const newIncome: IncomeCreate = {
    income_date: "2024-03-20",
    source: "Tuition Payment",
    category: "Tuition",
    description: "Monthly tuition payment",
    amount: 1500.00,
    invoice_id: "INV-001",
    student_id: "STU-001"
};

// Create income
createIncome(newIncome)
    .then(income => console.log('Created income:', income))
    .catch(error => console.error('Error:', error));

// Get all income
getIncome()
    .then(incomes => console.log('All income:', incomes))
    .catch(error => console.error('Error:', error));
*/
