"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { ArrowLeft, Edit, Trash2, User } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DeleteEmployeeDialog } from "@/components/delete-employee-dialog"

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

export default function EmployeeDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [employee, setEmployee] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)

  useEffect(() => {
    // In a real app, this would be an API call
    const foundEmployee = employees.find((emp) => emp.id === params.id)
    setEmployee(foundEmployee || null)
    setLoading(false)
  }, [params.id])

  const handleDeleteConfirm = () => {
    // In a real app, this would be an API call
    router.push("/")
  }

  if (loading) {
    return <div className="container mx-auto py-10">Loading...</div>
  }

  if (!employee) {
    return <div className="container mx-auto py-10">Employee not found</div>
  }

  return (
    <div className="container mx-auto py-10">
      <div className="mb-6">
        <Button variant="outline" asChild>
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to List
          </Link>
        </Button>
      </div>

      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold tracking-tight flex items-center">
          <User className="mr-2 h-6 w-6" />
          {employee.name}
        </h1>
        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <Link href={`/employees/${employee.id}/edit`}>
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </Link>
          </Button>
          <Button variant="destructive" onClick={() => setDeleteDialogOpen(true)}>
            <Trash2 className="mr-2 h-4 w-4" />
            Delete
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="grid grid-cols-1 gap-4">
              <div className="grid grid-cols-3 gap-4">
                <dt className="font-medium text-gray-500">Email</dt>
                <dd className="col-span-2">{employee.email}</dd>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <dt className="font-medium text-gray-500">Phone</dt>
                <dd className="col-span-2">{employee.phone}</dd>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <dt className="font-medium text-gray-500">Address</dt>
                <dd className="col-span-2">{employee.address}</dd>
              </div>
            </dl>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Employment Details</CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="grid grid-cols-1 gap-4">
              <div className="grid grid-cols-3 gap-4">
                <dt className="font-medium text-gray-500">Department</dt>
                <dd className="col-span-2">{employee.department}</dd>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <dt className="font-medium text-gray-500">Position</dt>
                <dd className="col-span-2">{employee.position}</dd>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <dt className="font-medium text-gray-500">Manager</dt>
                <dd className="col-span-2">{employee.manager}</dd>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <dt className="font-medium text-gray-500">Join Date</dt>
                <dd className="col-span-2">{new Date(employee.joinDate).toLocaleDateString()}</dd>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <dt className="font-medium text-gray-500">Status</dt>
                <dd className="col-span-2">
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      employee.status === "Active" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {employee.status}
                  </span>
                </dd>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <dt className="font-medium text-gray-500">Salary</dt>
                <dd className="col-span-2">{employee.salary}</dd>
              </div>
            </dl>
          </CardContent>
        </Card>
      </div>

      <DeleteEmployeeDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  )
}
