"use client";

import { useEffect, useMemo, useState } from "react";
import type { CSSProperties } from "react";
import type { LucideIcon } from "lucide-react";
import {
	AppWindow,
	Bot,
	Rocket,
	ShoppingBag,
	Smartphone,
	ExternalLink,
} from "lucide-react";
import { useI18n } from "@/lib/i18n";

interface Option {
	title: string;
	description: string;
	image: string;
	Icon: LucideIcon;
	url?: string;
}

const projectConfigs = [

	{
		slug: "karMa",
		image: "/assets/kar-ma.webp",
		Icon: Rocket,
		url: "https://kar-ma.netlify.app/",
	},
	{
		slug: "papeleraLatinoamericana",
		image: "/assets/papelera-latinoamericana.png",
		Icon: Bot,
		url: "https://papelera-latinoamericana.netlify.app",
	},
	{
		slug: "diegoJoyero",
		image: "/assets/diego-joyero.webp",
		Icon: ShoppingBag,
		url: "https://diego-joyero.netlify.app/",
	},
	{
		slug: "salcedoJewels",
		image: "/assets/salcedo.webp",
		Icon: Smartphone,
		url: "https://salcedo-jewels.vercel.app/",
	},
] as const;

const InteractiveSelector = () => {
	const [activeIndex, setActiveIndex] = useState(0);
	const [animatedOptions, setAnimatedOptions] = useState<number[]>([]);
	const [headerVisible, setHeaderVisible] = useState(false);
	const { t } = useI18n();

	const options = useMemo<Option[]>(
		() =>
			projectConfigs.map((config) => ({
				title: t(`portfolio.projects.${config.slug}.title`),
				description: t(`portfolio.projects.${config.slug}.description`),
				image: config.image,
				Icon: config.Icon,
				url: config.url,
			})),
		[t]
	);

	useEffect(() => {
		setHeaderVisible(true);
	}, []);

	useEffect(() => {
		const timers = options.map((_, index) =>
			window.setTimeout(() => {
				setAnimatedOptions((prev) =>
					prev.includes(index) ? prev : [...prev, index],
				);
			}, 180 * index),
		);

		return () => {
			timers.forEach((timer) => window.clearTimeout(timer));
		};
	}, [options]);

	const handleOptionClick = (index: number) => {
		if (index !== activeIndex) {
			setActiveIndex(index);
		} else {
			// Si ya está activo y tiene URL, abrir enlace
			const option = options[index];
			if (option.url) {
				window.open(option.url, '_blank');
			}
		}
	};

	return (
		<section className="relative flex w-full flex-col items-center justify-center overflow-visible bg-transparent px-4 py-12 text-slate-900">
			<div className="w-full max-w-4xl text-center">
				<h2
					className="text-4xl font-extrabold tracking-tight drop-shadow-lg sm:text-5xl"
					style={{
						opacity: headerVisible ? 1 : 0,
						transform: headerVisible ? "translateY(0)" : "translateY(-20px)",
						transition: "opacity 0.8s ease-in-out, transform 0.8s ease-in-out",
					}}
				>
					<span className="text-slate-900">{t("portfolio.headingNormal")}</span>
					<span className="text-[#2F64FF]">{t("portfolio.headingAccent")}</span>
				</h2>
				<p
					className="mt-4 text-lg font-medium text-slate-600 sm:text-xl"
					style={{
						opacity: headerVisible ? 1 : 0,
						transform: headerVisible ? "translateY(0)" : "translateY(-20px)",
						transition: "opacity 0.8s ease-in-out 0.3s, transform 0.8s ease-in-out 0.3s",
					}}
				>
					{t("portfolio.description")}
				</p>
			</div>

			<div className="mt-16 flex w-full max-w-[1200px] flex-col items-center">
				<div className="flex w-full items-stretch gap-0 overflow-hidden bg-transparent p-0 sm:min-h-[420px]">
					{options.map((option, index) => {
						const isActive = activeIndex === index;
						const optionStyles: CSSProperties = {
							backgroundImage: `url('${option.image}')`,
							backgroundSize: isActive ? "auto 100%" : "auto 120%",
							backgroundPosition: "center",
							backfaceVisibility: "hidden" as const,
							opacity: animatedOptions.includes(index) ? 1 : 0,
							transform: animatedOptions.includes(index)
								? "translateX(0)"
								: "translateX(-60px)",
							minWidth: "60px",
							minHeight: "420px",
							margin: 0,
							borderRadius: 0,
							borderWidth: "2px",
							borderStyle: "solid" as const,
							borderColor: isActive ? "#2F64FF" : "#E2E8F0",
							cursor: "pointer",
							backgroundColor: "#F7FAFC",
							boxShadow: isActive
								? "0 20px 60px rgba(47,100,255,0.25)"
								: "0 10px 30px rgba(16,24,40,0.12)",
							flex: isActive ? "7 1 0%" : "1 1 0%",
							zIndex: isActive ? 10 : 1,
							display: "flex",
							flexDirection: "column" as const,
							justifyContent: "flex-end" as const,
							position: "relative" as const,
							overflow: "hidden" as const,
							willChange: "flex-grow, box-shadow, background-size, background-position",
							transition: "all 0.7s ease-in-out",
						};

						const shadowStyles: CSSProperties = {
							position: "absolute" as const,
							left: 0,
							right: 0,
							bottom: isActive ? 0 : -40,
							height: "120px",
							pointerEvents: "none" as const,
							boxShadow: isActive
								? "inset 0 -120px 120px -120px rgba(0,0,0,0.8), inset 0 -120px 120px -80px rgba(0,0,0,0.6)"
								: "inset 0 -120px 0px -120px rgba(0,0,0,0.8), inset 0 -120px 0px -80px rgba(0,0,0,0.6)",
							transition: "all 0.7s ease-in-out",
						};

						const titleStyles: CSSProperties = {
							opacity: isActive ? 1 : 0,
							transform: isActive ? "translateX(0)" : "translateX(25px)",
							transition: "all 0.7s ease-in-out",
						};

						const descStyles: CSSProperties = {
							opacity: isActive ? 1 : 0,
							transform: isActive ? "translateX(0)" : "translateX(25px)",
							transition: "all 0.7s ease-in-out",
						};

						return (
							<button
								key={option.title}
								type="button"
								className="relative flex cursor-pointer flex-col justify-end overflow-hidden text-left focus:outline-none"
								style={optionStyles}
								onClick={() => handleOptionClick(index)}
							>
								{/* Shadow overlay */}
								<div style={shadowStyles} />

								{/* Content */}
								<div className="pointer-events-none relative z-10 flex w-full items-center gap-3 px-4 pb-5">
									<div className="flex h-11 w-11 min-w-[44px] max-w-[44px] flex-shrink-0 items-center justify-center rounded-full border-2 border-slate-300 bg-[rgba(32,32,32,0.85)] shadow-[0_1px_4px_rgba(0,0,0,0.18)] backdrop-blur-[10px]">
										<option.Icon className="h-6 w-6 text-white" />
									</div>
									<div className="flex flex-col text-white flex-1">
										<span className="text-lg font-bold" style={titleStyles}>
											{option.title}
										</span>
										<span className="text-base text-gray-300" style={descStyles}>
											{option.description}
										</span>
									</div>
									{isActive && option.url && (
										<div
											className="pointer-events-auto flex h-8 w-8 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm border border-white/30 hover:bg-white/30 transition-colors cursor-pointer"
											style={titleStyles}
											onClick={(e) => {
												e.stopPropagation();
												window.open(option.url, '_blank');
											}}
										>
											<ExternalLink className="h-4 w-4 text-white" />
										</div>
									)}
								</div>
							</button>
						);
					})}
				</div>
			</div>
		</section>
	);
};

export default InteractiveSelector;
