/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Calendar,
  User,
  Building,
  Users,
  CheckCircle,
  Clock,
  AlertCircle,
} from "lucide-react";
import { formatCurrency, formatDate } from "@/lib/utils";
import { RegistrationDetails } from "./registration-details";
import { PaymentActions } from "./payment-actions";

interface RegistrationCardProps {
  registration: any;
  registeredEvents: any[];
  onMakePayment: (registration: any, isFullPayment?: boolean) => void;
  onDeleteRegistration: (registrationId: string) => Promise<void>;
}

export function RegistrationCard({
  registration,
  registeredEvents,
  onMakePayment,
  onDeleteRegistration,
}: RegistrationCardProps) {
  const hasOutstanding = (registration.remaining_amount || 0) > 0;
  const paymentProgress =
    registration.total_amount > 0
      ? ((registration.paid_amount || 0) / registration.total_amount) * 100
      : 0;
  const canDelete = (registration.paid_amount || 0) === 0;

  const getPaymentStatusBadge = (status: string) => {
    switch (status) {
      case "succeeded":
        return (
          <Badge className="bg-green-100 text-green-800 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800">
            <CheckCircle className="w-3 h-3 mr-1" />
            Paid
          </Badge>
        );
      case "pending":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-400 dark:border-yellow-800">
            <Clock className="w-3 h-3 mr-1" />
            Pending
          </Badge>
        );
      case "failed":
        return (
          <Badge className="bg-red-100 text-red-800 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800">
            <AlertCircle className="w-3 h-3 mr-1" />
            Failed
          </Badge>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-4">
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-3">
              <CardTitle className="text-base lg:text-lg">
                Registration #
                {registration.registration_number || registration.id.slice(-8)}
              </CardTitle>
              {getPaymentStatusBadge(registration.payment_status)}
            </div>

            <div className="flex flex-wrap items-center gap-4 text-xs lg:text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Calendar className="w-3 h-3 lg:w-4 lg:h-4" />
                {formatDate(registration.created_at)}
              </div>
              <div className="flex items-center gap-1">
                {registration.registration_type === "consultancy" ? (
                  <Building className="w-3 h-3 lg:w-4 lg:h-4" />
                ) : (
                  <User className="w-3 h-3 lg:w-4 lg:h-4" />
                )}
                {registration.registration_type === "consultancy"
                  ? "Consultancy"
                  : "Student/Guest"}
              </div>
              {(registration.group_size || 1) > 1 && (
                <div className="flex items-center gap-1">
                  <Users className="w-3 h-3 lg:w-4 lg:h-4" />
                  {registration.group_size} people
                </div>
              )}
            </div>
          </div>

          <div className="text-center lg:text-right">
            <div className="text-xl lg:text-2xl font-bold">
              {formatCurrency(registration.total_amount || 0)}
            </div>
            <div className="text-xs lg:text-sm text-muted-foreground">
              Total Amount
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4 lg:space-y-6">
        {/* Payment Progress */}
        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span>Payment Progress</span>
            <span>{Math.round(paymentProgress)}% Complete</span>
          </div>
          <Progress value={paymentProgress} className="h-2" />

          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-sm lg:text-lg font-semibold text-green-600">
                {formatCurrency(registration.paid_amount || 0)}
              </div>
              <div className="text-xs text-muted-foreground">Paid</div>
            </div>
            <div>
              <div className="text-sm lg:text-lg font-semibold text-orange-600">
                {formatCurrency(registration.remaining_amount || 0)}
              </div>
              <div className="text-xs text-muted-foreground">Remaining</div>
            </div>
            <div>
              <div className="text-sm lg:text-lg font-semibold">
                {formatCurrency(registration.total_amount || 0)}
              </div>
              <div className="text-xs text-muted-foreground">Total</div>
            </div>
          </div>
        </div>

        {/* Discount Information */}
        {registration.discount_applied && (
          <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
            <div className="flex items-center gap-2">
              <Badge
                variant="secondary"
                className="bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-400"
              >
                Discount Applied
              </Badge>
              <span className="text-sm font-medium">
                {registration.discount_applied.replace("_", " ")} discount
              </span>
            </div>
            <span className="font-semibold text-green-600 dark:text-green-400">
              -{formatCurrency(registration.discount_amount || 0)}
            </span>
          </div>
        )}

        {/* Registration Details Accordion */}
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="details">
            <AccordionTrigger className="text-sm lg:text-base cursor-pointer max-w-sm py-1.5 px-2 bg-accent hover:bg-accent/80 text-accent-foreground mb-4">
              View Registration Details
            </AccordionTrigger>
            <RegistrationDetails
              registration={registration}
              registeredEvents={registeredEvents}
            />
          </AccordionItem>
        </Accordion>

        {/* Payment Actions */}
        <PaymentActions
          registration={registration}
          hasOutstanding={hasOutstanding}
          canDelete={canDelete}
          onMakePayment={onMakePayment}
          onDeleteRegistration={onDeleteRegistration}
        />
      </CardContent>
    </Card>
  );
}
