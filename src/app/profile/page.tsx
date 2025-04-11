"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/trpc/react";
import { useForm } from "@tanstack/react-form";
import { Loader } from "lucide-react";
import { toast } from "sonner";

export default function ProfilePage() {
	const { data: profile, isLoading: isProfileLoading } =
		api.profile.me.useQuery();
	const { mutate: updateProfile } = api.profile.update.useMutation();
	const utils = api.useUtils();

	const form = useForm({
		defaultValues: {
			username: profile?.username ?? "",
			displayName: profile?.displayName ?? "",
		},
		onSubmit: ({ value }) => {
			console.log(value);
			updateProfile(value, {
				onSuccess: () => {
					toast("Profile updated successfully", { duration: 3000 });
				},
				onError: (error) => {
					toast.error(error.message, { duration: 3000 });
				},
			});
		},
	});

	return (
		<form
			onSubmit={(e) => {
				e.preventDefault();
				e.stopPropagation();
				form.handleSubmit();
			}}
			className="space-y-4"
		>
			{isProfileLoading ? (
				<div className="space-y-4">
					<Skeleton className="h-10 w-full" />
					<Skeleton className="h-10 w-full" />
				</div>
			) : (
				<div className="space-y-4">
					<div>
						<Label
							htmlFor="username"
							className="mb-1 block font-medium text-sm"
						>
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
									/>
									{field.state.meta.errors ? (
										<span>
											{field.state.meta.isValidating ? (
												<span className="text-gray-500 text-xs">
													Checking username...
												</span>
											) : (
												<em
													className={
														field.state.meta.errors.length > 0
															? "text-red-500 text-xs"
															: "text-green-500 text-xs"
													}
												>
													{field.state.meta.errors.join(", ")}
												</em>
											)}
										</span>
									) : null}
								</div>
							)}
						/>
					</div>

					<div>
						<Label
							htmlFor="displayName"
							className="mb-1 block font-medium text-sm"
						>
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
						disabled={!canSubmit || isSubmitting || isProfileLoading}
					>
						{isSubmitting ? (
							<Loader className="h-4 w-4 animate-spin" />
						) : (
							"Save Changes"
						)}
					</Button>
				)}
			/>
		</form>
	);
}
