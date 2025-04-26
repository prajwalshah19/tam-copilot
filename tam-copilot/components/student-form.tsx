"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { Student, StudentEnrollmentStatus } from "@/lib/types"
import { createStudent } from "@/services/students"
import { toast } from "sonner"

interface StudentFormProps {
  onSubmit: (student: Partial<Student>) => void
  onCancel: () => void
  initialData?: Partial<Student>
}

export function StudentForm({ onSubmit, onCancel, initialData }: StudentFormProps) {
  const [formData, setFormData] = useState<Partial<Student>>(
    initialData || {
      firstName: "",
      lastName: "",
      dateOfBirth: "",
      primaryContactName: "",
      primaryContactEmail: "",
      primaryContactPhone: "",
      enrollmentStatus: "Active",
    },
  )

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (value: StudentEnrollmentStatus) => {
    setFormData((prev) => ({ ...prev, enrollmentStatus: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (!formData.firstName || !formData.lastName || !formData.dateOfBirth) {
        toast.error("Please fill in all required fields")
        return
      }

      const studentData = {
        first_name: formData.firstName,
        last_name: formData.lastName,
        date_of_birth: formData.dateOfBirth,
        primary_contact_name: formData.primaryContactName || undefined,
        primary_contact_email: formData.primaryContactEmail || undefined,
        primary_contact_phone: formData.primaryContactPhone || undefined,
        enrollment_status: formData.enrollmentStatus || undefined
      }

      const createdStudent = await createStudent(studentData)
      console.log("Student created:", createdStudent)
      
      // Show success message
      toast.success("Student record created successfully")
      
      // Call the original onSubmit with the form data
      onSubmit(formData)
    } catch (error) {
      console.error("Error creating student:", error)
      toast.error("Failed to create student record")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="firstName">First Name</Label>
          <Input id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName">Last Name</Label>
          <Input id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="dateOfBirth">Date of Birth</Label>
          <Input
            id="dateOfBirth"
            name="dateOfBirth"
            type="date"
            value={formData.dateOfBirth}
            onChange={handleChange}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="enrollmentStatus">Enrollment Status</Label>
          <Select
            value={formData.enrollmentStatus}
            onValueChange={(value) => handleSelectChange(value as StudentEnrollmentStatus)}
          >
            <SelectTrigger id="enrollmentStatus">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Active">Active</SelectItem>
              <SelectItem value="Inactive">Inactive</SelectItem>
              <SelectItem value="Graduated">Graduated</SelectItem>
              <SelectItem value="Pending">Pending</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="primaryContactName">Primary Contact Name</Label>
          <Input
            id="primaryContactName"
            name="primaryContactName"
            value={formData.primaryContactName}
            onChange={handleChange}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="primaryContactEmail">Primary Contact Email</Label>
          <Input
            id="primaryContactEmail"
            name="primaryContactEmail"
            type="email"
            value={formData.primaryContactEmail}
            onChange={handleChange}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="primaryContactPhone">Primary Contact Phone</Label>
          <Input
            id="primaryContactPhone"
            name="primaryContactPhone"
            value={formData.primaryContactPhone}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" className="bg-primary hover:bg-primary/90">
          Save Student
        </Button>
      </div>
    </form>
  )
}
