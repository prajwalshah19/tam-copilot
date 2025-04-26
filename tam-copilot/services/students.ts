// services/students.ts
interface StudentCreate {
    first_name: string;
    last_name: string;
    date_of_birth: string;  
    primary_contact_name?: string;
    primary_contact_email?: string;
    primary_contact_phone?: string;
    enrollment_status?: string;
}

interface Student extends StudentCreate {
    id: string;
}

const API_URL = process.env.API_BASE_URL;

export async function createStudent(student: StudentCreate): Promise<Student> {
    try {
        const response = await fetch(`${API_URL}/students`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(student),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error creating student:', error);
        throw error;
    }
}

export async function getStudents(): Promise<Student[]> {
    try {
        const response = await fetch(`${API_URL}/students`);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error fetching students:', error);
        throw error;
    }
}