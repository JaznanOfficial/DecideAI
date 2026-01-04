"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";

import { PasswordInput } from "@/components/ui/password-input"
import { authClient } from "@/lib/auth-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z
	.object({
		password: z.string().min(8, "Password must be at least 8 characters"),
		confirmPassword: z.string(),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords do not match",
		path: ["confirmPassword"],
	});

export function ResetPasswordForm({
	className,
	...props
}: React.ComponentProps<"div">) {
	const router = useRouter();
	const searchParams = useSearchParams();
	const token = searchParams.get("token"); // Better-Auth usually passes 'token'
    // NOTE: Sometimes the param might be 'code' or 'token' depending on config. Assuming 'token' based on Better-Auth docs/defaults.

	const [isLoading, setIsLoading] = useState(false);

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			password: "",
			confirmPassword: "",
		},
	});

	async function onSubmit(values: z.infer<typeof formSchema>) {
		if (!token) {
			toast.error("Invalid reset link. Token missing.");
			return;
		}

		setIsLoading(true);
		await authClient.resetPassword(
			{
				newPassword: values.password,
				token: token,
			},
			{
				onSuccess: () => {
					toast.success("Password reset successfully. Please login.");
					router.push("/login");
					setIsLoading(false);
				},
				onError: (ctx) => {
					toast.error(ctx.error.message ?? "Something went wrong.");
					setIsLoading(false);
				},
			},
		);
	}

	return (
		<div className={cn("flex flex-col gap-6", className)} {...props}>
			<Card>
				<CardHeader>
					<CardTitle>Reset Password</CardTitle>
					<CardDescription>
						Enter your new password below.
					</CardDescription>
				</CardHeader>
				<CardContent>
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
							<FormField
								control={form.control}
								name="password"
								render={({ field }) => (
									<FormItem>
										<FormLabel>New Password</FormLabel>
										<FormControl>
											<PasswordInput {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="confirmPassword"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Confirm Password</FormLabel>
										<FormControl>
											<PasswordInput {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<Button type="submit" className="w-full" disabled={isLoading}>
								{isLoading ? "Resetting..." : "Reset Password"}
							</Button>
						</form>
					</Form>
				</CardContent>
			</Card>
		</div>
	);
}
