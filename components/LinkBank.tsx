"use client";
import { authFormSchema } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "./ui/form";
import CustomInput from "./CustomInput";

interface LinkBankProps {
  userId: string;
}
const LinkBank = ({ userId }: LinkBankProps) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const formSchema = authFormSchema();
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setLoading(true);

    try {
      const savedDetails = await saveUserDetails(data, userId);
      if (savedDetails) router.push("/");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <>
          <div className="flex gap-3">
            <CustomInput
              control={form.control}
              name="firstName"
              label="First Name"
              placeholder="Enter your firstname"
            />

            <CustomInput
              control={form.control}
              name="lastName"
              label="Last Name"
              placeholder="Enter your lastname"
            />
          </div>

          <CustomInput
            control={form.control}
            name="address"
            label="Address"
            placeholder="Enter your specific address"
          />

          <CustomInput
            control={form.control}
            name="city"
            label="City"
            placeholder="Enter your city "
          />
          <div className="flex gap-3">
            <CustomInput
              control={form.control}
              name="state"
              label="State"
              placeholder="Example: WB"
            />
            <CustomInput
              control={form.control}
              name="postalCode"
              label="Postal Code"
              placeholder="Example: 700001"
            />
          </div>
          <div className="flex gap-3">
            <CustomInput
              control={form.control}
              name="dateOfBirth"
              label="Date of Birth"
              placeholder="YYYY-MM-DD"
            />
            <CustomInput
              control={form.control}
              name="adhaar"
              label="Adhaar"
              placeholder="Example: 1234 5678 9000"
            />
          </div>
        </>
        {/* NOTE: As AythType is Not Null , It shows Main Submit Button */}
      </form>
    </Form>
  );
};

export default LinkBank;
