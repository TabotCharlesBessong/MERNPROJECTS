"use client";
import { z } from "zod";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Logo from "@/components/logo";
import { resetPasswordMutationFn } from "@/lib/api";
import { ArrowLeft, Frown, Loader } from "lucide-react";
import { toast } from "@/hooks/use-toast";

export default function ResetPassword() {
  const navigate = useNavigate();

  const [params] = useSearchParams();
  const code = params.get("code");
  const exp = Number(params.get("exp"));
  const now = Date.now();

  const isValid = code && exp && exp > now;

  const { mutate, isPending } = useMutation({
    mutationFn: resetPasswordMutationFn,
  });

  const formSchema = z
    .object({
      password: z.string().trim().min(1, {
        message: "Password is required",
      }),
      confirmPassword: z.string().trim().min(1, {
        message: "Confirm password is required",
      }),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Password does not match",
      path: ["confirmPassword"],
    });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if (!code) {
      navigate("/forgot-password?email=");
      return;
    }
    const data = {
      password: values.password,
      verificationCode: code,
    };
    mutate(data, {
      onSuccess: () => {
        toast({
          title: "Success",
          description: "Password reset successfully",
        });
        navigate("/");
      },
      onError: (error) => {
        console.log(error);
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
      },
    });
  };

  return (
    <main className="w-full min-h-[590px] h-full max-w-full flex items-center justify-center ">
      <>
        {isValid ? (
          <div className="w-full h-full p-5 rounded-md">
            <Logo />
            <h1
              className="text-xl tracking-[-0.16px] dark:text-[#fcfdffef] font-bold mb-1.5 mt-8
        text-center sm:text-left"
            >
              Set up a new password
            </h1>
            <p className="mb-6 text-center sm:text-left text-[15px] dark:text-[#f1f7feb5] font-normal">
              Your password must be different from your previous one.
            </p>
            <Form {...form}>
              <form
                className="flex flex-col gap-6"
                onSubmit={form.handleSubmit(onSubmit)}
              >
                <div className="mb-0">
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="dark:text-[#f1f7feb5] text-sm">
                          New password
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            autoComplete="off"
                            placeholder="Enter your password"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="mb-0">
                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="dark:text-[#f1f7feb5] text-sm">
                          Confirm new password
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            autoComplete="off"
                            placeholder="Enter your password again"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <Button
                  disabled={isPending}
                  className="w-full text-[15px] h-[40px] text-white font-semibold"
                >
                  {isPending && <Loader className="animate-spin" />}
                  Reset password
                </Button>
              </form>
            </Form>
          </div>
        ) : (
          <div className="w-full h-[80vh] flex flex-col gap-2 items-center justify-center rounded-md">
            <div className="size-[48px]">
              <Frown size="48px" className="animate-bounce text-red-500" />
            </div>
            <h2 className="text-xl tracking-[-0.16px] dark:text-[#fcfdffef] font-bold">
              Invalid or expired reset link
            </h2>
            <p className="mb-2 text-center text-sm text-muted-foreground dark:text-[#f1f7feb5] font-normal">
              You can request a new password reset link
            </p>
            <Link to="/forgot-password?email=">
              <Button className="h-[40px]">
                <ArrowLeft />
                Go to forgot password
              </Button>
            </Link>
          </div>
        )}
      </>
    </main>
  );
}
