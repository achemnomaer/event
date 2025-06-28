"use client"

/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button"
import { CreditCard, DollarSign, AlertCircle } from "lucide-react"
import { DeleteRegistrationDialog } from "./delete-registration-dialog"

interface PaymentActionsProps {
  registration: any
  hasOutstanding: boolean
  canDelete: boolean
  onMakePayment: (registration: any, isFullPayment?: boolean) => void
  onDeleteRegistration: (registrationId: string) => Promise<void>
}

export function PaymentActions({
  registration,
  hasOutstanding,
  canDelete,
  onMakePayment,
  onDeleteRegistration,
}: PaymentActionsProps) {
  return (
    <div className="pt-4 border-t">
      <div className="flex flex-col sm:flex-row gap-3">
        {hasOutstanding ? (
          <>
            <Button variant="outline" className="flex-1" onClick={() => onMakePayment(registration, false)}>
              <CreditCard className="w-4 h-4 mr-2" />
              Make Payment
            </Button>
            <Button className="flex-1" onClick={() => onMakePayment(registration, true)}>
              <DollarSign className="w-4 h-4 mr-2" />
              Pay Full Balance
            </Button>
          </>
        ) : (
          <div className="flex-1 text-center py-2 text-green-600 dark:text-green-400 font-medium">
            ✓ Payment Complete
          </div>
        )}
        {canDelete ? (
          <DeleteRegistrationDialog
            registrationId={registration.id}
            registrationNumber={registration.registration_number || registration.id.slice(-8)}
            onDelete={onDeleteRegistration}
          />
        ) : (
          <div className="flex items-center text-xs text-muted-foreground">
            <AlertCircle className="w-3 h-3 mr-1" />
            Cannot delete - payment made
          </div>
        )}
      </div>
    </div>
  )
}
