"use client";

import { Button, type ButtonProps } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Shield } from "lucide-react";
import { useState } from "react";

interface ReviewerApplicationProps extends ButtonProps {
	variant?: "default" | "secondary" | "outline";
}

export default function ReviewerApplication({
	variant = "default",
	...props
}: ReviewerApplicationProps) {
	const [open, setOpen] = useState(false);
	const [step, setStep] = useState(1);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [formData, setFormData] = useState({
		expertise: [] as string[],
		experience: "",
		motivation: "",
		specialization: "",
		agreeToGuidelines: false,
		agreeToTimeCommitment: false,
	});

	const handleExpertiseChange = (value: string) => {
		if (formData.expertise.includes(value)) {
			setFormData({
				...formData,
				expertise: formData.expertise.filter((item) => item !== value),
			});
		} else {
			if (formData.expertise.length < 5) {
				setFormData({
					...formData,
					expertise: [...formData.expertise, value],
				});
			}
		}
	};

	const handleInputChange = (field: string, value: string | boolean) => {
		setFormData({
			...formData,
			[field]: value,
		});
	};

	const handleSubmit = async () => {
		setIsSubmitting(true);

		// In a real app, this would send the application data to an API
		await new Promise((resolve) => setTimeout(resolve, 1500));

		setIsSubmitting(false);
		setStep(3); // Move to success step
	};

	const isStep1Valid =
		formData.expertise.length > 0 &&
		formData.experience.trim().length >= 50 &&
		formData.motivation.trim().length >= 50;

	const isStep2Valid =
		formData.specialization.trim().length >= 20 &&
		formData.agreeToGuidelines &&
		formData.agreeToTimeCommitment;

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button variant={variant} {...props}>
					<Shield className="mr-2 h-4 w-4" />
					Apply to Become a Reviewer
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[600px]">
				{step === 1 && (
					<>
						<DialogHeader>
							<DialogTitle>Reviewer Application - Step 1 of 2</DialogTitle>
							<DialogDescription>
								Tell us about your expertise and experience
							</DialogDescription>
						</DialogHeader>
						<div className="grid gap-4 py-4">
							<div className="space-y-2">
								<Label>Areas of Expertise (select up to 5)</Label>
								<div className="grid grid-cols-2 gap-2">
									{[
										"Politics",
										"Technology",
										"Science",
										"Health",
										"Business",
										"Environment",
										"Education",
										"Sports",
										"Entertainment",
										"Culture",
										"International Affairs",
										"Economics",
										"Law",
										"Social Issues",
										"Media",
									].map((area) => (
										<div key={area} className="flex items-center space-x-2">
											<Checkbox
												id={`expertise-${area}`}
												checked={formData.expertise.includes(area)}
												onCheckedChange={() => handleExpertiseChange(area)}
												disabled={
													!formData.expertise.includes(area) &&
													formData.expertise.length >= 5
												}
											/>
											<Label htmlFor={`expertise-${area}`} className="text-sm">
												{area}
											</Label>
										</div>
									))}
								</div>
								<p className="text-muted-foreground text-xs">
									Selected: {formData.expertise.length}/5
								</p>
							</div>

							<div className="space-y-2">
								<Label htmlFor="experience">
									Relevant Experience
									<span className="ml-1 text-muted-foreground text-xs">
										(min 50 characters)
									</span>
								</Label>
								<Textarea
									id="experience"
									placeholder="Describe your background, education, or professional experience relevant to fact-checking or your areas of expertise"
									value={formData.experience}
									onChange={(e) =>
										handleInputChange("experience", e.target.value)
									}
									className="min-h-[100px]"
								/>
								<p className="text-muted-foreground text-xs">
									{formData.experience.length} characters
								</p>
							</div>

							<div className="space-y-2">
								<Label htmlFor="motivation">
									Motivation
									<span className="ml-1 text-muted-foreground text-xs">
										(min 50 characters)
									</span>
								</Label>
								<Textarea
									id="motivation"
									placeholder="Why do you want to become a reviewer? What motivates you to help verify news on SahihNews?"
									value={formData.motivation}
									onChange={(e) =>
										handleInputChange("motivation", e.target.value)
									}
									className="min-h-[100px]"
								/>
								<p className="text-muted-foreground text-xs">
									{formData.motivation.length} characters
								</p>
							</div>
						</div>
						<DialogFooter>
							<Button variant="outline" onClick={() => setOpen(false)}>
								Cancel
							</Button>
							<Button onClick={() => setStep(2)} disabled={!isStep1Valid}>
								Next Step
							</Button>
						</DialogFooter>
					</>
				)}

				{step === 2 && (
					<>
						<DialogHeader>
							<DialogTitle>Reviewer Application - Step 2 of 2</DialogTitle>
							<DialogDescription>
								Final details and agreements
							</DialogDescription>
						</DialogHeader>
						<div className="grid gap-4 py-4">
							<div className="space-y-2">
								<Label htmlFor="specialization">
									Specialization
									<span className="ml-1 text-muted-foreground text-xs">
										(min 20 characters)
									</span>
								</Label>
								<Textarea
									id="specialization"
									placeholder="What specific topics within your areas of expertise are you most knowledgeable about?"
									value={formData.specialization}
									onChange={(e) =>
										handleInputChange("specialization", e.target.value)
									}
									className="min-h-[80px]"
								/>
								<p className="text-muted-foreground text-xs">
									{formData.specialization.length} characters
								</p>
							</div>

							<div className="space-y-4">
								<div className="flex items-start space-x-2">
									<Checkbox
										id="guidelines"
										checked={formData.agreeToGuidelines}
										onCheckedChange={(checked) =>
											handleInputChange("agreeToGuidelines", checked === true)
										}
									/>
									<div className="grid gap-1.5 leading-none">
										<Label htmlFor="guidelines" className="text-sm">
											I agree to follow the SahihNews Reviewer Guidelines
										</Label>
										<p className="text-muted-foreground text-xs">
											This includes maintaining objectivity, citing sources, and
											following the review process.
										</p>
									</div>
								</div>

								<div className="flex items-start space-x-2">
									<Checkbox
										id="time-commitment"
										checked={formData.agreeToTimeCommitment}
										onCheckedChange={(checked) =>
											handleInputChange(
												"agreeToTimeCommitment",
												checked === true,
											)
										}
									/>
									<div className="grid gap-1.5 leading-none">
										<Label htmlFor="time-commitment" className="text-sm">
											I can commit to reviewing content regularly
										</Label>
										<p className="text-muted-foreground text-xs">
											While there's no minimum requirement, staying active helps
											maintain review quality.
										</p>
									</div>
								</div>
							</div>
						</div>
						<DialogFooter className="flex-col gap-2 sm:flex-row">
							<Button variant="outline" onClick={() => setStep(1)}>
								Back
							</Button>
							<Button
								onClick={handleSubmit}
								disabled={!isStep2Valid || isSubmitting}
							>
								{isSubmitting ? "Submitting..." : "Submit Application"}
							</Button>
						</DialogFooter>
					</>
				)}

				{step === 3 && (
					<>
						<DialogHeader>
							<DialogTitle>Application Submitted!</DialogTitle>
							<DialogDescription>
								Thank you for applying to become a SahihNews reviewer
							</DialogDescription>
						</DialogHeader>
						<div className="py-6 text-center">
							<div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/20">
								<Shield className="h-8 w-8 text-green-600" />
							</div>
							<h3 className="mb-2 font-medium text-lg">Application Received</h3>
							<p className="mb-4 text-muted-foreground">
								Our team will review your application and get back to you within
								5-7 business days.
							</p>
							<p className="text-sm">
								While you wait, you can continue to build your credibility by
								posting accurate news and participating in the community.
							</p>
						</div>
						<DialogFooter>
							<Button onClick={() => setOpen(false)}>Close</Button>
						</DialogFooter>
					</>
				)}
			</DialogContent>
		</Dialog>
	);
}
