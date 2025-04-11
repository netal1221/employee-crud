"use client"

import type React from "react"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { ArrowLeft, Save } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Sample employee data - in a real app, this would come from an API
const employees = [
  {
    id: "1",
    name: "John Smith",
    email: "john.smith@example.com",
    department: "Engineering",
    position: "Senior Developer",
    joinDate: "2021-05-12",
    status: "Active",
    phone: "+1 (555) 123-4567",
    address: "123 Tech Lane, San Francisco, CA",
    manager: "Jane Doe",
    salary: "$120,000",
  },
  {
    id: "2",
    name: "Sarah Johnson",
    email: "sarah.johnson@example.com",
    department: "Marketing",
    position: "Marketing Manager",
    joinDate: "2020-03-15",
    status: "Active",
    phone: "+1 (555) 987-6543",
    address: "456 Market Street, New York, NY",
    manager: "Michael Scott",
    salary: "$95,000",
  },
  {
    id: "3",
    name: "Michael Brown",
    email: "michael.brown@example.com",
    department: "Finance",
    position: "Financial Analyst",
    joinDate: "2022-01-10",
    status: "Active",
    phone: "+1 (555) 456-7890",
    address: "789 Money Road, Chicago, IL",
    manager: "Robert Smith",
    salary: "$85,000",
  },
  {
    id: "4",
    name: "Emily Davis",
    email: "emily.davis@example.com",
    department: "Human Resources",
    position: "HR Specialist",
    joinDate: "2019-11-05",
    status: "On Leave",
    phone: "+1 (555) 234-5678",
    address: "321 People Avenue, Boston, MA",
    manager: "David Wilson",
    salary: "$78,000",
  },
  {
    id: "5",
    name: "Robert Wilson",
    email: "robert.wilson@example.com",
    department: "Engineering",
    position: "Frontend Developer",
    joinDate: "2021-08-22",
    status: "Active",
    phone: "+1 (555) 876-5432",
    address: "654 Code Boulevard, Seattle, WA",
    manager: "John Smith",
    salary: "$92,000",
  },
]

export default function EditEmployeePage() {
  const params = useParams()
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    email: "",
    phone: "",
    address: "",
    department: "",
    position: "",
    manager: "",
    joinDate: "",
    status: "",
    salary: "",
  })

  useEffect(() => {
    // In a real app, this would be an API call
    const foundEmployee = employees.find((emp) => emp.id === params.id)

    if (foundEmployee) {
      // Format salary to remove $ and commas for the input
      const formattedSalary = foundEmployee.salary.replace("$", "").replace(",", "")

      setFormData({
        ...foundEmployee,
        salary: formattedSalary,
      })
    }

    setLoading(false)
  }, [params.id])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would be an API call to update the employee
    console.log("Updating employee:", formData)
    router.push(`/employees/${params.id}`)
  }

  if (loading) {
    return <div className="container mx-auto py-10">Loading...</div>
  }

  if (!formData.id) {
    return <div className="container mx-auto py-10">Employee not found</div>
  }

  return (
    <div className="container mx-auto py-10">
      <div className="mb-6">
        <Button variant="outline" asChild>
          <Link href={`/employees/${params.id}`}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Details
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Edit Employee</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" name="phone" value={formData.phone} onChange={handleChange} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input id="address" name="address" value={formData.address} onChange={handleChange} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="department">Department</Label>
                <Select value={formData.department} onValueChange={(value) => handleSelectChange("department", value)}>
                  <SelectTrigger id="department">
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Engineering">Engineering</SelectItem>
                    <SelectItem value="Marketing">Marketing</SelectItem>
                    <SelectItem value="Finance">Finance</SelectItem>
                    <SelectItem value="Human Resources">Human Resources</SelectItem>
                    <SelectItem value="Sales">Sales</SelectItem>
                    <SelectItem value="Operations">Operations</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="position">Position</Label>
                <Input id="position" name="position" value={formData.position} onChange={handleChange} required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="manager">Manager</Label>
                <Input id="manager" name="manager" value={formData.manager} onChange={handleChange} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="joinDate">Join Date</Label>
                <Input
                  id="joinDate"
                  name="joinDate"
                  type="date"
                  value={formData.joinDate}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select value={formData.status} onValueChange={(value) => handleSelectChange("status", value)}>
                  <SelectTrigger id="status">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="On Leave">On Leave</SelectItem>
                    <SelectItem value="Terminated">Terminated</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="salary">Salary</Label>
                <Input id="salary" name="salary" value={formData.salary} onChange={handleChange} />
              </div>
            </div>

            <div className="flex justify-end">
              <Button type="submit">
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
