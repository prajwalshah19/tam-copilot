// Base types for common fields
export type UUID = string
export type DateString = string // Format: YYYY-MM-DD
export type TimeString = string // Format: HH:MM AM/PM

// Income object
export interface Income {
  incomeId: UUID
  incomeDate: DateString
  source: string
  category: IncomeCategory
  description: string
  amount: number
  invoiceId?: string
  studentId?: UUID
}

export type IncomeCategory =
  | "Tuition Fee"
  | "Registration Fee"
  | "Late Pickup Fee"
  | "Fundraiser"
  | "Donation"
  | "Other"

// Student object
export interface Student {
  studentId: string
  firstName: string
  lastName: string
  dateOfBirth: DateString
  primaryContactName?: string
  primaryContactEmail?: string
  primaryContactPhone?: string
  enrollmentStatus?: StudentEnrollmentStatus
}

export type StudentEnrollmentStatus = "Active" | "Inactive" | "Graduated" | "Pending"

// Enrollment object
export interface Enrollment {
  enrollmentId: UUID
  studentId: UUID
  programName?: string
  startDate: DateString
  endDate?: DateString
  status: EnrollmentStatus
}

export type EnrollmentStatus = "Active" | "Completed" | "Cancelled" | "Pending"

// Transaction object
export interface Transaction {
  transactionId: UUID
  transactionDate: DateString
  description: string
  amount: number // Positive for inflows, negative for outflows
  type: TransactionType
  runningBalance?: number
  relatedExpenseId?: UUID
  relatedIncomeId?: string // Can be multiple IDs separated by semicolons
}

export type TransactionType = "Income" | "Expense" | "Transfer" | "Opening Balance"

// Calendar Event object
export interface CalendarEvent {
  eventId: UUID
  eventDate: DateString
  eventType: EventType
  description: string
  startTime?: TimeString
  endTime?: TimeString
}

export type EventType = "Holiday" | "School Closure" | "Parent Meeting" | "School Event" | "Field Trip" | "Other"

// Expense data
export interface ExpenseData {
  expenseId?: UUID
  date: string
  category: string
  description: string
  amount: number
  vendor: string
  paymentMethod: string
}

// Message for chat
export interface Message {
  id: string
  content: string
  sender: "user" | "ai"
  timestamp: Date
}
