import Header from "@/components/header";
import AccountSettings from "@/components/settings/account-settings";
import AppearanceSettings from "@/components/settings/appearance-settings";
import ContentSettings from "@/components/settings/content-settings";
import DataSettings from "@/components/settings/data-settings";
import NotificationSettings from "@/components/settings/notification-settings";
import PrivacySettings from "@/components/settings/privacy-settings";
import ProfileSettings from "@/components/settings/profile-settings";
import SettingsSidebar from "@/components/settings/settings-sidebar";
import VerificationSettings from "@/components/settings/verification-settings";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Settings | SahihNews",
	description: "Manage your SahihNews account settings and preferences",
};

interface SettingsPageProps {
	searchParams: Promise<{ tab?: string }>;
}

export default async function SettingsPage({ searchParams }: SettingsPageProps) {
	const resolvedParams = await searchParams;
	const tab = resolvedParams.tab || "profile";

	return (
		<div className="min-h-screen bg-background">
			<Header />
			<main className="container mx-auto max-w-6xl px-4 py-6">
				<h1 className="mb-6 font-bold text-2xl">Settings</h1>

				<div className="flex flex-col gap-6 md:flex-row">
					<div className="flex-shrink-0 md:w-64">
						<SettingsSidebar activeTab={tab} />
					</div>

					<div className="flex-1">
						<Tabs value={tab} className="w-full">
							<TabsContent value="profile" className="mt-0">
								<ProfileSettings />
							</TabsContent>

							<TabsContent value="account" className="mt-0">
								<AccountSettings />
							</TabsContent>

							<TabsContent value="notifications" className="mt-0">
								<NotificationSettings />
							</TabsContent>

							<TabsContent value="privacy" className="mt-0">
								<PrivacySettings />
							</TabsContent>

							<TabsContent value="content" className="mt-0">
								<ContentSettings />
							</TabsContent>

							<TabsContent value="verification" className="mt-0">
								<VerificationSettings />
							</TabsContent>

							<TabsContent value="appearance" className="mt-0">
								<AppearanceSettings />
							</TabsContent>

							<TabsContent value="data" className="mt-0">
								<DataSettings />
							</TabsContent>
						</Tabs>
					</div>
				</div>
			</main>
		</div>
	);
}
