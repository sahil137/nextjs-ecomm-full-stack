"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ButtonLoading } from "../ui/button-loading";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import * as z from "zod";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
  name: z.string().min(1),
});

type RegisterFormValues = z.infer<typeof registerSchema>;

const RegistrationForm = () => {
  const router = useRouter();
  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const { isPending, mutateAsync } = useMutation({
    mutationFn: (values: RegisterFormValues) =>
      axios
        .post(`http://localhost:3000/api/register`, values)
        .then((res) => res.data),
  });

  async function onSubmit(values: RegisterFormValues) {
    try {
      const res = await mutateAsync({
        ...values,
      });
      console.log(res);
      toast.success(res.message);
      router.push("/login");
    } catch (error: any) {
      console.log(error);
      toast.error(error.message);
    }
  }

  return (
    <main className="h-full">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="max-w-md space-y-4"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="John Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="abc@gmail.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-center">
            {isPending ? (
              <ButtonLoading />
            ) : (
              <Button type="submit">Submit</Button>
            )}
          </div>
        </form>
      </Form>
    </main>
  );
};

export default RegistrationForm;
