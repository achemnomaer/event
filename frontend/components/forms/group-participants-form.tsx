"use client";

import { Trash2, UserPlus } from "lucide-react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

export function GroupParticipantsForm() {
  const { control } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "groupParticipants.participants",
  });

  return (
    <div className="space-y-6">
      {/* header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Group Participants</h3>

        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() =>
            append({ firstName: "", lastName: "", email: "", phoneNumber: "" })
          }
        >
          <UserPlus className="h-4 w-4 mr-2" />
          Add Participant
        </Button>
      </div>

      {/* empty state */}
      {fields.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          <UserPlus className="h-12 w-12 mx-auto mb-3 opacity-20" />
          <p>No additional participants added</p>
          <p className="text-sm">
            You can add group members who will attend with you
          </p>
        </div>
      )}

      {/* participants list */}
      {fields.map((field, idx) => (
        <Card key={field.id} className="relative">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 h-8 w-8 text-muted-foreground hover:text-destructive"
            onClick={() => remove(idx)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>

          <CardContent className="pt-6 grid gap-4 sm:grid-cols-2">
            {/* first name */}
            <FormField
              control={control}
              name={`groupParticipants.participants.${idx}.firstName`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input placeholder="First name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* last name */}
            <FormField
              control={control}
              name={`groupParticipants.participants.${idx}.lastName`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Last name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* email */}
            <FormField
              control={control}
              name={`groupParticipants.participants.${idx}.email`}
              render={({ field }) => (
                <FormItem className="sm:col-span-2">
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="Email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* phone (optional) */}
            <FormField
              control={control}
              name={`groupParticipants.participants.${idx}.phoneNumber`}
              render={({ field }) => (
                <FormItem className="sm:col-span-2">
                  <FormLabel>Phone Number (optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="Phone number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
