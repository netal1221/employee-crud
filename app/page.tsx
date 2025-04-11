import Link from "next/link"
import { PlusCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { EmployeeTable } from "@/components/employee-table"

export default function HomePage() {
  return (
    <div className="container mx-auto py-10">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Employee Management</h1>
        <Link href="/employees/new">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Employee
          </Button>
        </Link>
      </div>
      <div className="rounded-lg border bg-card shadow">
        <EmployeeTable />
      </div>
    </div>
  )
}
