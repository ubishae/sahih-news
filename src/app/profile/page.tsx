"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { api } from "@/trpc/react";
import { useForm } from "@tanstack/react-form";
import { Loader } from "lucide-react";
import { toast } from "sonner";

export default function ProfilePage() {
	const { data: profile, isLoading: isProfileLoading } =
		api.profile.me.useQuery();
	const { mutate: updateProfile, isPending: isUpdatePending } =
		api.profile.update.useMutation();
	const utils = api.useUtils();

	const form = useForm({
		defaultValues: {
			username: profile?.username ?? "",
			displayName: profile?.displayName ?? "",
		},
		onSubmit: ({ value }) => {
			updateProfile(value, {
				onSuccess: () => {
					toast.success("Profile updated successfully");
				},
				onError: (error) => {
					toast.error(error.message);
				},
			});
		},
	});

	return (
		<div className="container max-w-2xl py-10">
			<Card>
				<CardHeader>
					<CardTitle>Profile Settings</CardTitle>
				</CardHeader>
				<CardContent>
					<form
						onSubmit={(e) => {
							e.preventDefault();
							e.stopPropagation();
							form.handleSubmit();
						}}
						className="space-y-6"
					>
						{isProfileLoading ? (
							<div className="space-y-6">
								<div className="space-y-2">
									<Skeleton className="h-5 w-32" />
									<Skeleton className="h-10 w-full" />
								</div>
								<div className="space-y-2">
									<Skeleton className="h-5 w-40" />
									<Skeleton className="h-10 w-full" />
								</div>
							</div>
						) : (
							<div className="space-y-6">
								<div className="space-y-2">
									<Label htmlFor="username" className="font-medium text-sm">
										Username
									</Label>
									<form.Field
										name="username"
										validators={{
											onChangeAsync: async ({ value }) => {
												// Skip validation if empty or unchanged from profile
												if (!value || value === profile?.username) {
													return undefined;
												}

												// Check for spaces or special characters
												if (/[^a-zA-Z0-9_]/.test(value)) {
													return "Username can only contain letters, numbers, and underscores";
												}

												// Check if username exists
												const existing =
													await utils.profile.existingUsername.fetch(value);
												if (existing) {
													return "Username already exists";
												}

												return undefined;
											},
										}}
										children={(field) => (
											<div>
												<Input
													id={field.name}
													name={field.name}
													value={field.state.value}
													onBlur={field.handleBlur}
													onChange={(e) => field.handleChange(e.target.value)}
													className="w-full"
													placeholder="Enter your username"
												/>
												{field.state.meta.isValidating && (
													<p className="mt-1 text-muted-foreground text-xs">
														Checking username...
													</p>
												)}
												{!field.state.meta.isValidating &&
													field.state.meta.errors && (
														<p className="mt-1 text-destructive text-xs">
															{field.state.meta.errors.join(", ")}
														</p>
													)}
											</div>
										)}
									/>
								</div>

								<div className="space-y-2">
									<Label htmlFor="displayName" className="font-medium text-sm">
										Display Name
									</Label>
									<form.Field
										name="displayName"
										children={(field) => (
											<div>
												<Input
													id={field.name}
													name={field.name}
													value={field.state.value}
													onBlur={field.handleBlur}
													onChange={(e) => field.handleChange(e.target.value)}
													className="w-full"
													placeholder="Enter your display name"
												/>
											</div>
										)}
									/>
								</div>
							</div>
						)}

						<form.Subscribe
							selector={(state) => [state.canSubmit, state.isSubmitting]}
							children={([canSubmit, isSubmitting]) => (
								<Button
									type="submit"
									className="w-full sm:w-auto"
									disabled={
										!canSubmit ||
										isSubmitting ||
										isProfileLoading ||
										isUpdatePending
									}
								>
									{isSubmitting || isUpdatePending ? (
										<>
											<Loader className="mr-2 h-4 w-4 animate-spin" />
											Saving...
										</>
									) : (
										"Save Changes"
									)}
								</Button>
							)}
						/>
					</form>
				</CardContent>
			</Card>
		</div>
	);
}
