import type { CollectionEntry } from "astro:content";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { ListItem } from "../ui/list-item";
import BrandIcon from "../ui/brand-icon";
import { ArrowUpRightIcon, HandshakeIcon, ShieldUser } from "lucide-react";

export interface LinksProps {
	app: CollectionEntry<"apps">
}

const iconProps = { width: 20, height: 20 };

const repositoryPath = (url: string) => new URL(url).pathname.slice(1);

export function Links({ app }: LinksProps) {
	const { termsAndConditionsUrl, privacyPolicyUrl, githubUrl, gitlabUrl, playStoreUrl, appStoreUrl } = app.data;

	const links = [
		termsAndConditionsUrl && {
			title: "Terms and conditions",
			subtitle: termsAndConditionsUrl.split("://")[1],
			href: termsAndConditionsUrl,
			left: <HandshakeIcon {...iconProps}/>
		},
		privacyPolicyUrl && {
			title: "Privacy policy",
			subtitle: privacyPolicyUrl.split("://")[1],
			href: privacyPolicyUrl,
			left: <ShieldUser {...iconProps}/>
		},
		githubUrl && {
			title: "GitHub Repository",
			subtitle: repositoryPath(githubUrl),
			href: githubUrl,
			left: <BrandIcon icon="github" {...iconProps}/>
		},
		gitlabUrl && {
			title: "GitLab Repository",
			subtitle: repositoryPath(gitlabUrl),
			href: gitlabUrl,
			left: <BrandIcon icon="gitlab" {...iconProps}/>
		},
		playStoreUrl && {
			title: "Google Play",
			subtitle: "Also available on Android",
			href: playStoreUrl,
			left: <BrandIcon icon="googleplay" {...iconProps}/>
		},
		appStoreUrl && {
			title: "App Store",
			subtitle: "Also available on iOS",
			href: appStoreUrl,
			left: <BrandIcon icon="appstore" {...iconProps}/>
		}
	].filter((link) => !!link);

	if (links.length === 0) return null;

	return (
		<Card>
			<CardHeader>
				<CardTitle>
					Links
				</CardTitle>
			</CardHeader>
			<CardContent className="flex flex-col gap-2">
				{links.map((link, idx) => (
					<ListItem
						key={link.href}
						title={link.title}
						subtitle={link.subtitle}
						external
						href={link.href}
						separator={idx !== links.length - 1}
						left={<span className="flex size-10 shrink-0 items-center justify-center rounded-[30%] bg-accent">{link.left}</span>}
						right={<ArrowUpRightIcon className="size-5 text-muted-foreground transition-transform group-hover/list-item:-translate-y-0.5 group-hover/list-item:translate-x-0.5"/>}
					/>
				))}
			</CardContent>
		</Card>
	)
}
