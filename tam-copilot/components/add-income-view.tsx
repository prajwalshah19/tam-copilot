"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { Income } from "@/lib/types"
import { createIncome } from "@/services/income"
import { toast } from "sonner"

export function AddIncomeView() {
  const [formData, setFormData] = useState<Partial<Income>>({
    incomeDate: "",
    source: "",
    category: undefined,
    description: "",
    amount: 0,
    invoiceId: "",
    studentId: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: Number.parseFloat(value) || 0 }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSaveIncome = async (data: Partial<Income>) => {
    try {
      // Transform the data to match the API's expected format
      const incomeData = {
        income_date: data.incomeDate || new Date().toISOString().split('T')[0],
        source: data.source || "",
        category: data.category || "",
        description: data.description || "",
        amount: data.amount || 0,
        invoice_id: data.invoiceId || undefined,
        student_id: data.studentId || undefined
      }

      const createdIncome = await createIncome(incomeData)
      console.log("Income created:", createdIncome)
      
      // Show success message
      toast.success("Income record created successfully")
      
      // Reset form after successful submission
      setFormData({
        incomeDate: "",
        source: "",
        category: undefined,
        description: "",
        amount: 0,
        invoiceId: "",
        studentId: "",
      })
    } catch (error) {
      console.error("Error creating income:", error)
      toast.error("Failed to create income record")
    }
  }

  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-primary">Add New Income</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="incomeDate">Income Date</Label>
                <Input
                  id="incomeDate"
                  name="incomeDate"
                  type="date"
                  value={formData.incomeDate}
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="source">Source</Label>
                <Input
                  id="source"
                  name="source"
                  placeholder="Enter source name"
                  value={formData.source}
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select
                  value={formData.category as string}
                  onValueChange={(value) => handleSelectChange("category", value)}
                >
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Tuition Fee">Tuition Fee</SelectItem>
                    <SelectItem value="Registration Fee">Registration Fee</SelectItem>
                    <SelectItem value="Late Pickup Fee">Late Pickup Fee</SelectItem>
                    <SelectItem value="Fundraiser">Fundraiser</SelectItem>
                    <SelectItem value="Donation">Donation</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="amount">Amount ($)</Label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground">$</span>
                  <Input
                    id="amount"
                    name="amount"
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    className="pl-7"
                    value={formData.amount === 0 ? "" : formData.amount}
                    onChange={handleNumberChange}
                  />
                </div>
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Enter income description"
                  value={formData.description}
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="invoiceId">Invoice ID (Optional)</Label>
                <Input
                  id="invoiceId"
                  name="invoiceId"
                  placeholder="Enter invoice ID"
                  value={formData.invoiceId}
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="studentId">Student ID (Optional)</Label>
                <Input
                  id="studentId"
                  name="studentId"
                  placeholder="Enter student ID"
                  value={formData.studentId}
                  onChange={handleChange}
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <Button onClick={() => handleSaveIncome(formData)} className="bg-primary hover:bg-primary/90">
            Save Income
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
