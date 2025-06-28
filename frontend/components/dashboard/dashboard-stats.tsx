"use client"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Receipt, CheckCircle, Clock, DollarSign, Filter, X } from "lucide-react"
import { formatCurrency } from "@/lib/utils"

type FilterType = "all" | "completed" | "pending" | "total"

interface DashboardStatsProps {
  totalRegistrations: number
  completedPayments: number
  pendingPayments: number
  totalSpent: number
  activeFilter: FilterType
  onFilterChange: (filter: FilterType) => void
}

export function DashboardStats({
  totalRegistrations,
  completedPayments,
  pendingPayments,
  totalSpent,
  activeFilter,
  onFilterChange,
}: DashboardStatsProps) {
  const handleFilterClick = (filter: FilterType) => {
    onFilterChange(activeFilter === filter ? "all" : filter)
  }

  return (
    <div className="space-y-4 lg:space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        <Card
          className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
            activeFilter === "total" ? "ring-2 ring-primary" : ""
          }`}
          onClick={() => handleFilterClick("total")}
        >
          <CardContent className="p-4 lg:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs lg:text-sm font-medium text-muted-foreground">Total Registrations</p>
                <p className="text-xl lg:text-2xl font-bold">{totalRegistrations}</p>
              </div>
              <div className="flex flex-col items-center">
                <Receipt className="h-6 w-6 lg:h-8 lg:w-8 text-muted-foreground" />
                {activeFilter === "total" && <Filter className="h-3 w-3 text-primary mt-1" />}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card
          className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
            activeFilter === "completed" ? "ring-2 ring-green-500" : ""
          }`}
          onClick={() => handleFilterClick("completed")}
        >
          <CardContent className="p-4 lg:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs lg:text-sm font-medium text-muted-foreground">Completed Payments</p>
                <p className="text-xl lg:text-2xl font-bold">{completedPayments}</p>
              </div>
              <div className="flex flex-col items-center">
                <CheckCircle className="h-6 w-6 lg:h-8 lg:w-8 text-green-500" />
                {activeFilter === "completed" && <Filter className="h-3 w-3 text-green-500 mt-1" />}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card
          className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
            activeFilter === "pending" ? "ring-2 ring-yellow-500" : ""
          }`}
          onClick={() => handleFilterClick("pending")}
        >
          <CardContent className="p-4 lg:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs lg:text-sm font-medium text-muted-foreground">Pending Payments</p>
                <p className="text-xl lg:text-2xl font-bold">{pendingPayments}</p>
              </div>
              <div className="flex flex-col items-center">
                <Clock className="h-6 w-6 lg:h-8 lg:w-8 text-yellow-500" />
                {activeFilter === "pending" && <Filter className="h-3 w-3 text-yellow-500 mt-1" />}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 lg:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs lg:text-sm font-medium text-muted-foreground">Total Spent</p>
                <p className="text-xl lg:text-2xl font-bold">{formatCurrency(totalSpent)}</p>
              </div>
              <DollarSign className="h-6 w-6 lg:h-8 lg:w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Active Filter Display */}
      {activeFilter !== "all" && (
        <div className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg">
          <Filter className="h-4 w-4" />
          <span className="text-sm font-medium">
            Showing {activeFilter === "total" ? "all" : activeFilter} registrations
          </span>
          <Button variant="ghost" size="sm" onClick={() => onFilterChange("all")} className="ml-auto h-6 w-6 p-0">
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  )
}
