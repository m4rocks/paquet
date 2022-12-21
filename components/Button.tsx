import type { JSX } from "preact";
import { btn, btnOutset } from "@/lib/ui.ts";
import { tw } from "twind";
import Icon, { Props as IconProps } from "@/components/Icon.tsx";

export type Props = {
	icon?: string;
	iconProps?: IconProps;
	fullWidth?: boolean;
	children?: string;
	outlined?: boolean;
	red?: boolean;
};

export default function Button(props: Props & JSX.IntrinsicElements["button"]) {
	return (
		<button
			{...props}
			class={`
				${!props.disabled && props.outlined ? tw(btnOutset) : tw(btn)}
				relative rounded px-8 py-2 text-base
				${props.red ? "border-red-500" : "border-current"}
				
				${
				props.outlined
					? `bg-light border shadow-outset-light dark:(bg-dark shadow-outset-dark) ${
						props.red ? "text-red-500" : "text-current"
					}`
					: `${props.red ? "bg-red-500" : "bg-primary"} text-light`
			}
				flex flex-row flex-nowrap gap-2 justify-center items-center
				
				${props.disabled ? "opacity-25 cursor-not-allowed" : ""}

				${props.fullWidth ? "w-full" : ""}
				${props.class || ""}
			`}
		>
			{props.icon &&
				(
					<Icon
						name={props.icon}
						width={18}
						height={18}
						inline
						class={!props.outlined ? "filter invert" : undefined}
						{...props.iconProps}
					/>
				)}
			{props.children}
		</button>
	);
}
