import type { CollectionEntry } from "astro:content";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { ListItem } from "../ui/list-item";
import BrandIcon from "../ui/brand-icon";
import { HandshakeIcon, ShieldUser } from "lucide-react";

export interface LinksProps {
	app: CollectionEntry<"apps">
}

export function Links({ app }: LinksProps) {
	if (
		!app.data.githubUrl &&
		!app.data.gitlabUrl &&
		!app.data.termsAndConditionsUrl &&
		!app.data.privacyPolicyUrl	
	) return null;

	return (
		<Card>
			<CardHeader>
				<CardTitle>
					Links
				</CardTitle>
			</CardHeader>
			<CardContent className="flex flex-col gap-2">
				{app.data.termsAndConditionsUrl ?
					<ListItem
						title="Terms and conditions"
						subtitle={app.data.termsAndConditionsUrl.split("://")[1]}
						external
						separator={!!app.data.privacyPolicyUrl}
						href={app.data.termsAndConditionsUrl}
						left={
							<HandshakeIcon
								width={24}
								height={24}
							/>
						}
					/>
				: null}
				{app.data.privacyPolicyUrl ?
					<ListItem
						title="Terms and conditions"
						subtitle={app.data.privacyPolicyUrl.split("://")[1]}
						external
						href={app.data.privacyPolicyUrl}
						separator={!!app.data.githubUrl}
						left={
							<ShieldUser
								width={24}
								height={24}
							/>
						}
					/>
				: null}
				{app.data.githubUrl ?
					<ListItem
						title="GitHub Repo"
						subtitle={new URL(app.data.githubUrl).pathname.slice(1)}
						external
						href={app.data.githubUrl}
						separator={!!app.data.gitlabUrl}
						left={
							<BrandIcon
								icon="github"
								width={24}
								height={24}
							/>
						}
					/>
				: null}
				{app.data.gitlabUrl ?
					<ListItem
						title="GitLab Repo"
						subtitle={new URL(app.data.gitlabUrl).pathname.slice(1)}
						external
						href={app.data.gitlabUrl}
						left={
							<BrandIcon
								icon="gitlab"
								width={24}
								height={24}
							/>
						}
					/>
				: null}
			</CardContent>
		</Card>
	)
}