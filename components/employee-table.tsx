"use client"

import { useState } from "react"
import Link from "next/link"
import { Edit, MoreHorizontal, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DeleteEmployeeDialog } from "./delete-employee-dialog"

// Sample employee data - in a real app, this would come from an API
const initialEmployees = [
  {
    id: "1",
    name: "John Smith",
    email: "john.smith@example.com",
    department: "Engineering",
    position: "Senior Developer",
    joinDate: "2021-05-12",
    status: "Active",
  },
  {
    id: "2",
    name: "Sarah Johnson",
    email: "sarah.johnson@example.com",
    department: "Marketing",
    position: "Marketing Manager",
    joinDate: "2020-03-15",
    status: "Active",
  },
  {
    id: "3",
    name: "Michael Brown",
    email: "michael.brown@example.com",
    department: "Finance",
    position: "Financial Analyst",
    joinDate: "2022-01-10",
    status: "Active",
  },
  {
    id: "4",
    name: "Emily Davis",
    email: "emily.davis@example.com",
    department: "Human Resources",
    position: "HR Specialist",
    joinDate: "2019-11-05",
    status: "On Leave",
  },
  {
    id: "5",
    name: "Robert Wilson",
    email: "robert.wilson@example.com",
    department: "Engineering",
    position: "Frontend Developer",
    joinDate: "2021-08-22",
    status: "Active",
  },
]

export function EmployeeTable() {
  const [employees, setEmployees] = useState(initialEmployees)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [employeeToDelete, setEmployeeToDelete] = useState<string | null>(null)

  const handleDeleteClick = (id: string) => {
    setEmployeeToDelete(id)
    setDeleteDialogOpen(true)
  }

  const handleDeleteConfirm = () => {
    if (employeeToDelete) {
      setEmployees(employees.filter((emp) => emp.id !== employeeToDelete))
      setDeleteDialogOpen(false)
      setEmployeeToDelete(null)
    }
  }

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Department</TableHead>
            <TableHead>Position</TableHead>
            <TableHead>Join Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="w-[80px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {employees.map((employee) => (
            <TableRow key={employee.id}>
              <TableCell className="font-medium">
                <Link href={`/employees/${employee.id}`} className="hover:underline">
                  {employee.name}
                </Link>
              </TableCell>
              <TableCell>{employee.email}</TableCell>
              <TableCell>{employee.department}</TableCell>
              <TableCell>{employee.position}</TableCell>
              <TableCell>{new Date(employee.joinDate).toLocaleDateString()}</TableCell>
              <TableCell>
                <span
                  className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                    employee.status === "Active" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {employee.status}
                </span>
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <span className="sr-only">Open menu</span>
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <Link href={`/employees/${employee.id}/edit`}>
                      <DropdownMenuItem>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                    </Link>
                    <DropdownMenuItem
                      className="text-red-600 focus:text-red-600"
                      onClick={() => handleDeleteClick(employee.id)}
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <DeleteEmployeeDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={handleDeleteConfirm}
      />
    </>
  )
}
