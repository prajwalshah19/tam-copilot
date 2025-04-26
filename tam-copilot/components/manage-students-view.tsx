"use client"

import { useState, useEffect } from "react"
import { PlusCircle, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { StudentForm } from "@/components/student-form"
import type { Student, StudentEnrollmentStatus } from "@/lib/types"
import { getStudents } from "@/services/students"
import { toast } from "sonner"

export function ManageStudentsView() {
  const [students, setStudents] = useState<Student[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [isAddStudentOpen, setIsAddStudentOpen] = useState(false)

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const fetchedStudents = await getStudents()
        const transformedStudents = fetchedStudents.map(student => ({
          studentId: student.id,
          firstName: student.first_name,
          lastName: student.last_name,
          dateOfBirth: student.date_of_birth,
          primaryContactName: student.primary_contact_name,
          primaryContactEmail: student.primary_contact_email,
          primaryContactPhone: student.primary_contact_phone,
          enrollmentStatus: student.enrollment_status?.charAt(0).toUpperCase() + student.enrollment_status?.slice(1).toLowerCase()
        }))
        setStudents(transformedStudents as Student[])
      } catch (error) {
        console.error("Error fetching students:", error)
        toast.error("Failed to fetch students")
      }
    }

    fetchStudents()
  }, [])

  const filteredStudents = students.filter((student, index, self) => {
    // First check for duplicates
    const isDuplicate = self.findIndex(s => 
        s.firstName === student.firstName && 
        s.lastName === student.lastName
    ) !== index;
    
    if (isDuplicate) return false;

    // Then apply the existing filters
    const matchesSearch =
        student.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.primaryContactName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.primaryContactEmail?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === "all" || student.enrollmentStatus === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const getStatusBadgeColor = (status: StudentEnrollmentStatus | undefined) => {
    switch (status) {
      case "Active":
        return "bg-green-500 hover:bg-green-600"
      case "Inactive":
        return "bg-gray-500 hover:bg-gray-600"
      case "Graduated":
        return "bg-blue-500 hover:bg-blue-600"
      case "Pending":
        return "bg-yellow-500 hover:bg-yellow-600"
      default:
        return "bg-gray-500 hover:bg-gray-600"
    }
  }

  const handleAddStudent = (studentData: Partial<Student>) => {
    const newStudent: Student = {
      studentId: (students.length + 1).toString(),
      firstName: studentData.firstName || "",
      lastName: studentData.lastName || "",
      dateOfBirth: studentData.dateOfBirth || "",
      primaryContactName: studentData.primaryContactName,
      primaryContactEmail: studentData.primaryContactEmail,
      primaryContactPhone: studentData.primaryContactPhone,
      enrollmentStatus: studentData.enrollmentStatus,
    }

    setStudents([...students, newStudent])
    setIsAddStudentOpen(false)
  }

  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-primary">Manage Students</CardTitle>
          <Button className="bg-primary hover:bg-primary/90" onClick={() => setIsAddStudentOpen(true)}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Student
          </Button>
        </CardHeader>
        <CardContent>
          <div className="mb-6 flex flex-col gap-4 md:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search students..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Inactive">Inactive</SelectItem>
                <SelectItem value="Graduated">Graduated</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Date of Birth</TableHead>
                  <TableHead>Primary Contact</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStudents.length > 0 ? (
                  filteredStudents.map((student) => (
                    <TableRow key={student.studentId}>
                      <TableCell className="font-medium">
                        {student.firstName} {student.lastName}
                      </TableCell>
                      <TableCell>{student.dateOfBirth}</TableCell>
                      <TableCell>
                        <div>{student.primaryContactName}</div>
                        <div className="text-sm text-muted-foreground">{student.primaryContactEmail}</div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusBadgeColor(student.enrollmentStatus)}>
                          {student.enrollmentStatus}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} className="h-24 text-center">
                      No students found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Dialog open={isAddStudentOpen} onOpenChange={setIsAddStudentOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Add New Student</DialogTitle>
            <DialogDescription>Enter the student's information below. Click save when you're done.</DialogDescription>
          </DialogHeader>
          <StudentForm onSubmit={handleAddStudent} onCancel={() => setIsAddStudentOpen(false)} />
        </DialogContent>
      </Dialog>
    </div>
  )
}
