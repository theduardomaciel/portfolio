import {
	Select,
	SelectContent,
	SelectItem,
	SelectLabel,
	SelectGroup,
	SelectScrollUp,
	SelectScrollDown,
	SelectTrigger,
	SelectValue,
} from "@components/ui/Select";

import { ReactComponent as LanguageIcon } from "src/assets/icons/language.svg";

import { defaultLang, locales } from "src/i18n/ui";

interface Props {
	lang?: string;
}

export default function LanguagePicker({ lang }: Props) {
	return (
		<Select
			defaultValue={defaultLang}
			value={lang}
			onValueChange={(value) => {
				console.log(value);
				window.location.replace(
					window.location.pathname.replace(
						lang as string,
						value as string
					)
				);
			}}
		>
			<SelectTrigger id="languageSwitch" className="border-0">
				<LanguageIcon
					className={"interactiveIcon"}
					fill="var(--primary-01)"
					id={"languageIcon"}
					width={20}
					height={20}
					aria-label="Language change button"
				/>
				<SelectValue placeholder="Idioma" />
			</SelectTrigger>
			<SelectContent>
				<SelectScrollUp />
				<SelectGroup>
					<SelectLabel>Idioma</SelectLabel>
					{Object.keys(locales).map((locale) => (
						<SelectItem key={locale} value={locale}>
							{locales[locale as keyof typeof locales]}
						</SelectItem>
					))}
				</SelectGroup>
				<SelectScrollDown />
			</SelectContent>
		</Select>
	);
}
