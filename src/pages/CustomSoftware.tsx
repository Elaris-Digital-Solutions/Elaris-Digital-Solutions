import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
    ChevronDown, Hexagon, Code2, Link2,
    Settings2, Activity, ShieldCheck, Zap,
    LayoutDashboard, Server, Brain, Building2, CheckCircle2,
    Database, Cloud, Lock
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Contact from "@/components/Contact";
import FloatingWhatsappButton from "@/components/ui/floating-whatsapp-button";
import SeoHead from "@/components/SeoHead";
import SyntheticHero from "@/components/ui/synthetic-hero";

import esData from "@/locales/es.json";
const copy = esData.customSoftware;

export default function CustomSoftware() {
    const location = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location.pathname]);

    return (
        <div
            id="custom-software-page"
            className="relative min-h-screen overflow-x-hidden overflow-y-auto bg-[#F8FAFC]"
        >
            <SeoHead
                title={copy.seo.title}
                description={copy.seo.description}
            />
            <Navbar />

            <main className="site-sections">
                {/* 1. HERO SECTION */}
                <SyntheticHero
                    title={copy.hero.title}
                    description={copy.hero.description}
                    badgeLabel={copy.hero.badgeLabel}
                    badgeText={copy.hero.badgeText}
                    ctaButtons={[
                        { text: copy.hero.ctas.primary, href: "#contacto", primary: true },
                    ]}
                    consolePhrases={copy.hero.consolePhrases}
                    microDetails={copy.hero.benefits}
                />

                {/* 2. PROBLEMAS QUE RESOLVEMOS */}
                <section className="py-20 lg:py-28 bg-white relative">
                    <div className="container mx-auto px-6 max-w-7xl">
                        <div className="text-center mb-16 max-w-3xl mx-auto">
                            <h2 className="text-4xl md:text-5xl font-light tracking-tight text-[#071540] mb-6">
                                {copy.problems.titleNormal}
                                <span className="font-semibold text-[#2F64FF] block md:inline md:ml-3">
                                    {copy.problems.titleAccent}
                                </span>
                            </h2>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8">
                            {copy.problems.items.map((item, idx) => (
                                <div key={idx} className="bg-[#F8FAFC] p-8 rounded-2xl border border-slate-100 hover:border-[#2F64FF]/30 transition-colors">
                                    <div className="w-12 h-12 rounded-xl bg-[#2F64FF]/10 flex items-center justify-center mb-6">
                                        <Activity className="text-[#2F64FF] w-6 h-6" />
                                    </div>
                                    <h3 className="text-xl font-medium text-[#071540] mb-3">{item.title}</h3>
                                    <p className="text-slate-600 leading-relaxed font-light">{item.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* 4. BENEFICIOS CLAVE */}
                <section className="py-20 lg:py-28 bg-[#F0F4FF] relative">
                    <div className="container mx-auto px-6 max-w-7xl">
                        <div className="text-center mb-16 max-w-3xl mx-auto">
                            <h2 className="text-4xl md:text-5xl font-light tracking-tight text-[#071540] mb-6">
                                {copy.benefits.titleNormal}
                                <span className="font-semibold text-[#2F64FF]">
                                    {copy.benefits.titleAccent}
                                </span>
                            </h2>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {[
                                { icon: <Zap className="w-6 h-6 text-[#2F64FF]" /> },
                                { icon: <Settings2 className="w-6 h-6 text-[#2F64FF]" /> },
                                { icon: <ShieldCheck className="w-6 h-6 text-[#2F64FF]" /> },
                                { icon: <Link2 className="w-6 h-6 text-[#2F64FF]" /> }
                            ].map((extra, idx) => (
                                <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100/50 hover:shadow-md transition-shadow">
                                    <div className="w-12 h-12 rounded-full bg-[#2F64FF]/10 flex items-center justify-center mb-5">
                                        {extra.icon}
                                    </div>
                                    <h3 className="text-lg font-medium text-[#071540] mb-2">{copy.benefits.items[idx].title}</h3>
                                    <p className="text-sm text-slate-500 font-light leading-relaxed">{copy.benefits.items[idx].description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* 5. QUÉ TIPO DE SOFTWARE DESARROLLAMOS */}
                <section className="py-20 lg:py-28 bg-white">
                    <div className="container mx-auto px-6 max-w-7xl">
                        <div className="text-center mb-16 max-w-3xl mx-auto">
                            <h2 className="text-4xl md:text-5xl font-light tracking-tight text-[#071540] mb-6">
                                {copy.types.titleNormal}
                                <span className="font-semibold text-[#071540] relative block md:inline md:ml-3">
                                    {copy.types.titleAccent}
                                    <span className="absolute bottom-1 left-0 w-full h-3 bg-[#2F64FF]/20 -z-10" />
                                </span>
                            </h2>
                        </div>

                        <div className="grid md:grid-cols-2 gap-x-12 gap-y-16">
                            {[
                                <Building2 className="w-6 h-6 text-slate-800" />,
                                <LayoutDashboard className="w-6 h-6 text-slate-800" />,
                                <Server className="w-6 h-6 text-slate-800" />,
                                <Hexagon className="w-6 h-6 text-slate-800" />,
                                <Brain className="w-6 h-6 text-slate-800" />
                            ].map((icon, idx) => {
                                const item = copy.types.items[idx];
                                if (!item) return null;
                                return (
                                    <div key={idx} className="flex gap-6 items-start group">
                                        <div className="w-14 h-14 rounded-2xl bg-[#F0F4FF] flex items-center justify-center flex-shrink-0 group-hover:bg-[#2F64FF] group-hover:text-white transition-colors duration-300 [&>svg]:transition-colors [&>svg]:group-hover:text-white">
                                            {icon}
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-medium text-[#071540] mb-2">{item.title}</h3>
                                            <p className="text-slate-600 font-light leading-relaxed">{item.description}</p>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </section>

                {/* 6. NUESTRO PROCESO */}
                <section className="py-20 lg:py-28 bg-white">
                    <div className="container mx-auto px-6 max-w-7xl">
                        <div className="mb-16">
                            <h2 className="text-4xl md:text-5xl font-light tracking-tight mb-2 text-[#071540]">
                                {copy.process.titleNormal}
                            </h2>
                            <span className="text-4xl md:text-5xl font-medium text-[#2F64FF]">
                                {copy.process.titleAccent}
                            </span>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {copy.process.steps.map((step, idx) => (
                                <div key={idx} className="relative p-8 rounded-2xl border border-transparent hover:border-[#2F64FF]/20 hover:bg-white hover:shadow-xl transition-all group">
                                    <div className="text-[#2F64FF]/30 font-medium text-5xl absolute top-6 right-6 z-0 pointer-events-none group-hover:text-[#2F64FF]/50 transition-colors">
                                        {String(idx + 1).padStart(2, '0')}
                                    </div>
                                    <div className="relative z-10">
                                        <h3 className="text-xl font-semibold mb-3 mt-4 text-[#071540]">{step.name}</h3>
                                        <p className="text-slate-600 font-light leading-relaxed">{step.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* 7. DIFERENCIALES & STACK */}
                <section className="py-20 lg:py-28 bg-[#F0F4FF] border-b border-slate-100">
                    <div className="container mx-auto px-6 max-w-7xl">
                        <div className="grid lg:grid-cols-2 gap-16">
                            {/* Diferenciales */}
                            <div>
                                <h2 className="text-3xl md:text-4xl font-light tracking-tight text-[#071540] mb-8">
                                    {copy.differentials.titleNormal}
                                    <span className="font-semibold text-[#2F64FF]">
                                        {copy.differentials.titleAccent}
                                    </span>
                                </h2>
                                <div className="space-y-6">
                                    {copy.differentials.items.map((item, idx) => (
                                        <div key={idx} className="flex gap-4 items-center">
                                            <div className="w-8 h-8 rounded-full bg-[#2F64FF]/10 flex items-center justify-center flex-shrink-0">
                                                <CheckCircle2 className="w-5 h-5 text-[#2F64FF]" />
                                            </div>
                                            <span className="text-lg text-slate-700 font-medium">{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Stack */}
                            <div>
                                <h2 className="text-3xl md:text-4xl font-light tracking-tight text-[#071540] mb-8">
                                    {copy.tech.titleNormal}
                                    <span className="font-semibold text-[#2F64FF]">
                                        {copy.tech.titleAccent}
                                    </span>
                                </h2>
                                <div className="flex flex-wrap gap-4">
                                    {[
                                        { name: "React", svg: <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#61DAFB]" fill="currentColor"><path d="M12 22.1c-4.4 0-8.3-1.6-10.4-3.9 1.6 1.4 4.5 2.5 7.9 2.8-.5-.8-.9-1.8-1.1-2.9-2.3-.3-4.4-1.1-5.9-2.2-.6-1-.8-2-.8-2.9 0-1.8 1.4-3.4 3.8-4.7-1-.6-1.5-1.4-1.5-2.2 0-1.8 2.6-3.3 6.1-4.2C9.4 1 9.7-.1 9.9-.9c1.4.3 2.9.4 4.4.4s3-.1 4.5-.4c.2.8.5 1.9-.2 2.8 3.5.9 6.1 2.4 6.1 4.2 0 .8-.5 1.5-1.5 2.2 2.5 1.3 3.8 2.9 3.8 4.7 0 1-.2 2-.8 2.9-1.5 1.1-3.6 1.9-5.9 2.2-.2 1.1-.6 2-1.1 2.9 3.4-.3 6.3-1.4 7.9-2.8-2.1 2.3-6 3.9-10.4 3.9zm-4.6-6.6c.1.9.4 1.8.8 2.6-1.5-.2-2.8-.7-3.8-1.5-.3-.4-.4-.8-.4-1.2 0-.8.6-1.6 1.6-2.4 1.1 1.2 2.2 1.9 3.5 2.1l-.1-.2c-.5-1-.9-2.2-1.1-3.5-1.4.6-2.6 1.5-3.3 2.5.4.8 1.7 1.3 2.8 1.6zm8-.5c1.4-.2 2.5-1 3.5-2.1 1 .7 1.6 1.6 1.6 2.4 0 .4-.1.8-.4 1.2-1 .8-2.4 1.3-3.8 1.5.4-.8.7-1.7.8-2.6-.9 1.5-1.3 2.6-1.7 3.6l-.1.2zm-2.8-8.5c-.3-1-.8-1.9-1.5-2.7-1 1-2.1 1.6-3.4 1.8 2.8.4 5.3 1.2 7 2.3-.9-1-2.1-1.6-3.4-1.8zm2.4 6.7c1.7-1 3.6-2.3 5-3.8-1.2-1.5-3.3-2.6-5.8-3.3-.2 1.3-.6 2.5-1.2 3.6.8.9 1.5 2 2 3.2M7.2 9.5c.6-1 1.4-2 2.5-2.8-1.3-.2-2.5-.7-3.4-1.8-.7.8-1.2 1.7-1.5 2.7.9 1 2.1 1.6 3.4 1.8l-1-.2c-3.5 1.2-5.4 2.8-5.4 4.5 0 .8.6 1.5 1.6 2.2l1.6-1.8c.4-1.2.9-2.2 1.5-3.2v-1.1c0-1.8.9-3.4 2.2-4.5zM12 17.1c-1.3 0-2.4-1.1-2.4-2.4s1.1-2.4 2.4-2.4 2.4 1.1 2.4 2.4-1.1 2.4-2.4 2.4z" /></svg> },
                                        { name: "Node.js", svg: <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#339933]" fill="currentColor"><path d="M11.832 24c-1.258 0-2.607-.264-3.921-.77-3.992-1.536-6.666-4.992-7.589-8.73A11.18 11.18 0 0 1 .135 11.23c-.1-.703-.131-1.423-.105-2.155a11.1 11.1 0 0 1 12.37-10.45 11.11 11.11 0 0 1 9.875 12.872c-.89 4.316-4.582 7.828-8.914 8.783A11.127 11.127 0 0 1 11.832 24zm4.276-13.784h-4.63v4.632h4.63v-4.632zM8.342 5.093h4.63v4.632h-4.63V5.093zm-4.63 7.88H8.34v4.632H3.713v-4.632zm6.604-5.242a.5.5 0 0 0-.5.5v2.339a.5.5 0 0 0 .5.5h2.338a.5.5 0 0 0 .5-.5V8.23a.5.5 0 0 0-.5-.5h-2.338zm3.623 4.298a2.5 2.5 0 0 0-2.5 2.5v2.888a.5.5 0 0 0 .5.5h6.641a.5.5 0 0 0 .5-.5v-4.888a2.5 2.5 0 0 0-2.5-2.5h-2.641l-2.64-2.64a.5.5 0 0 0-.853.353v2.887zM6.9 10.49a2.5 2.5 0 0 0-2.5 2.5v2.887a.5.5 0 0 0 .5.5h6.64a.5.5 0 0 0 .5-.5v-4.887a2.5 2.5 0 0 0-2.5-2.5H6.91l-2.64-2.64a.5.5 0 0 0-.853.353v2.887zM8.342 9.043v-.681a2.5 2.5 0 0 1 2.5-2.5h2.887l2.64-2.64a.5.5 0 0 1 .853.353v4.297a2.5 2.5 0 0 1-2.5 2.5H8.342v-.681z" /></svg> },
                                        { name: "Python", svg: <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#3776AB]" fill="currentColor"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-3.5 17.5c-.828 0-1.5-.672-1.5-1.5s.672-1.5 1.5-1.5 1.5.672 1.5 1.5-.672 1.5-1.5 1.5zm7-7c-.828 0-1.5-.672-1.5-1.5s.672-1.5 1.5-1.5 1.5.672 1.5 1.5-.672 1.5-1.5 1.5zm-5-3.5V5.5c0-.828.672-1.5 1.5-1.5s1.5.672 1.5 1.5v1.5h-3zm1.5 5.5c-3.033 0-5.5-2.467-5.5-5.5V5.5c0-.828.672-1.5 1.5-1.5h1V1c0-.552-.448-1-1-1H3C1.343 0 0 1.343 0 3v5c0 3.033 2.467 5.5 5.5 5.5h5.5c.828 0 1.5.672 1.5 1.5v3.5c0 .552.448 1 1 1h5c1.657 0 3-1.343 3-3V12c0-3.033-2.467-5.5-5.5-5.5h-5.5C8.467 6.5 6 8.967 6 12v1.5c0 .828-.672 1.5-1.5 1.5S3 14.328 3 13.5v-3C3 7.467 5.467 5 8.5 5h1c.828 0 1.5.672 1.5 1.5v1.5c0 3.033 2.467 5.5 5.5 5.5h1.5C18.533 13.5 21 11.033 21 8V3c0-1.657-1.343-3-3-3h-5c-.552 0-1 .448-1 1v3H12V2.5c0-.828-.672-1.5-1.5-1.5s-1.5.672-1.5 1.5v2.5h-3c-1.657 0-3 1.343-3 3v5c0 1.657 1.343 3 3 3h3v1.5c0 .828.672 1.5 1.5 1.5s1.5-.672 1.5-1.5zm-1.5-7C10.672 5.5 10 6.172 10 7V8.5C10 9.328 10.672 10 11.5 10S13 9.328 13 8.5V7c0-.828-.672-1.5-1.5-1.5z" /></svg> },
                                        { name: "TypeScript", svg: <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#3178C6]" fill="currentColor"><path d="M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0H1.125zM11.66 21.035c-2.348 0-4.048-1.536-4.048-4.267V10.74h2.51v5.753c0 1.393.73 2.122 1.77 2.122 1.107 0 1.838-.73 1.838-2.122v-5.753h2.508v6.028c0 2.73-1.698 4.267-4.578 4.267zM20.246 21V10.74h2.511v10.26h-2.511zm1.255-11.492c-.822 0-1.48-.66-1.48-1.484s.658-1.485 1.48-1.485c.817 0 1.478.66 1.478 1.485s-.66 1.484-1.478 1.484zM10.887 8.016v-2.51h7.838v2.51h-2.664v10.871H13.55V8.016h-2.663z" /></svg> },
                                        { name: "Next.js", svg: <svg viewBox="0 0 24 24" className="w-5 h-5 text-slate-800" fill="currentColor"><path d="M12 24C5.373 24 0 18.627 0 12S5.373 0 12 0s12 5.373 12 12-5.373 12-12 12zm.22-5.786l8.471-12.008c-.287-.31-.59-.607-.9-.884h-1.396l-7.466 10.603V4.991H9.015v13.223zM4.99 4.992v14.016H6.91V8.527l6.556 10.481c1.23-.332 2.373-.896 3.397-1.63L8.683 4.992H4.99z" /></svg> },
                                        { name: "AWS", svg: <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#FF9900]" fill="currentColor"><path d="M16.92 12.01c-.13-.12-.22-.32-.22-.5 0-.25.13-.5.35-.63 1.05-.66 1.62-1.74 1.62-3V7.5c0-1.02-.37-2.02-1-2.78-1.03-1.2-2.73-1.65-4.48-1.12-1.71.53-2.9 2.1-2.9 3.88v.6c0 1.44-.92 2.65-2.26 3.03-.27.08-.57-.02-.73-.24C7.14 10.63 7 10.38 7 10.12V8.5C7 5.46 9.46 3 12.5 3c2.75 0 5.12 2.05 5.5 4.79v.11c0 1.05-.18 2.08-.53 3.05-.15.42-.4.8-.75 1.1-.12.1-.28.2-.44.2-.18 0-.36-.08-.48-.22-.22-.25-.37-.56-.47-.88-.1-.32-.12-.66-.12-1v-.5c0-.44-.36-.8-1-1.12-.08-.04-.15 0-.15.08 0 .42-.14.83-.4 1.14-.3.35-.73.57-1.18.63-.58.07-1.17-.18-1.52-.65-.3-.42-.45-.96-.38-1.52.07-.62.38-1.17.86-1.54.43-.33.98-.5 1.54-.5.48 0 .93.18 1.28.48.16.14.36.2.56.2s.38-.1.53-.26c.27-.3.24-.76-.06-1.02-.55-.47-1.28-.73-2.05-.73-1 0-1.97.45-2.62 1.25C9.74 5.3 9.4 6.3 9.4 7.37v.38c0 .88.45 1.68 1.18 2.15.54.34 1.16.48 1.78.4.88-.13 1.64-.67 2.08-1.46.22-.4.32-.86.32-1.3v-.38c0-.6.13-1.18.35-1.72.33-.82.88-1.48 1.58-1.9.96-.58 2.12-.6 3.07-.12 1.05.5 1.67 1.55 1.67 2.72v.38c0 1.34-1.05 2.5-2.38 2.65-.25.03-.5.1-.73.2v-.03zM21 16H3c-.55 0-1 .45-1 1s.45 1 1 1h18c.55 0 1-.45 1-1s-.45-1-1-1z" /></svg> },
                                        { name: "PostgreSQL", svg: <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#336791]" fill="currentColor"><path d="M22.043 14.65c-.753.864-1.71 1.587-2.793 2.126-.45.225-.918.42-1.4.588-.232-.016-.46-.035-.688-.066a5.719 5.719 0 0 1-4.832-4.14A5.625 5.625 0 0 1 11.233 13.9c-.878-.454-1.84-1.066-2.883-1.815-1.306-.94-2.645-2.106-3.868-3.32-.962-.964-1.878-2.008-2.617-2.997-.975-1.31-1.734-2.584-2.14-3.567-.223-.538-.372-.988-.415-1.29 0-.01.002-.016.002-.022 1.83 2.454 4.148 5.12 7.026 8.046.29.294.618.634.982.983L9 9.387c-1.636-1.574-3.486-3.085-5.328-4.32-.828-.557-1.68-.142-2.176.623C.95 6.54.55 7.5.313 8.528A13.295 13.295 0 0 0 .193 11a13.344 13.344 0 0 0 1.488 5.617c.05.093.097.186.15.28A13.284 13.284 0 0 0 6.64 21.602c2.086 1.155 4.545 1.748 7.025 1.748h.044c3.96-.03 7.643-1.75 10.155-4.482.262-.284.444-.616.444-.95 0-.25-.098-.497-.265-.7zm-8.312-3.66c1.17 0 2.115-.947 2.115-2.113s-.946-2.112-2.115-2.112c-1.166 0-2.114.946-2.114 2.112 0 1.166.948 2.113 2.114 2.113zm0-8.91C8.75 2.08 4.093 5.483 1.94 9.4 4.524 7.234 7.66 5.6 11.233 4.79v2.543l5.006-2.69L11.234 1.4v2.443C6.39 4.76 1.815 8.948.337 14.39A14.248 14.248 0 0 1 .132 11c0-.12.003-.23.01-.35.123-1.97 1.196-4.52 3.39-6.72A14.24 14.24 0 0 1 13.731.814zm4.276 9.537c0-2.366-1.928-4.298-4.29-4.298-2.35 0-4.267 1.91-4.288 4.263l.36 1.785a5.558 5.558 0 0 1 2.37-1.636 2.923 2.923 0 0 1-.564-1.737c0-1.618 1.306-2.924 2.91-2.924s2.91 1.306 2.91 2.924c0 1.15-.658 2.152-1.614 2.62a5.578 5.578 0 0 1 1.78.9 4.86 4.86 0 0 0 .425-2zm-3.14 3.737c.78.266 1.488.665 2.126 1.173a.856.856 0 0 1-.295 1.542.8.8 0 0 1-.358-.06.842.842 0 0 1-.41-.58a4.11 4.11 0 0 0-4.084-3.14h-.002c-1.278 0-2.434.57-3.218 1.464-.192.215-.466.335-.74.335a1.006 1.006 0 0 1-.682-.26 1.037 1.037 0 0 1-.035-1.467c1.1-1.246 2.7-2.036 4.47-2.04h.003a5.617 5.617 0 0 1 3.23 1.028z" /></svg> },
                                        { name: "Docker", svg: <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#2496ED]" fill="currentColor"><path d="M11.66 15.114H24c0 0-.254-2.825-3.037-3.04.161-1.096-1.248-2.006-2.853-2.006h-5.228V7.954H9.697v2.11h-3.18V8.455H3.33V6.344H.15v5.827H9.7v2.943zm-7.904-5.06h3.184v2.107H3.756zM8.53 10.05v2.11h3.18v-2.11zM8.53 6.89v2.108h3.18v-2.11zM8.53 3.73v2.11h3.18v-2.11zM.15 16.168h23.702v1.055H.15zM23.85 18.28H.15v2.11h23.7z" /></svg> }
                                    ].map((tech, idx) => (
                                        <div key={idx} className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl border border-slate-200 bg-white shadow-sm hover:border-[#2F64FF]/30 hover:shadow-md transition-all cursor-default group">
                                            <div className="group-hover:scale-110 transition-transform">{tech.svg}</div>
                                            <span className="text-slate-700 font-medium text-sm group-hover:text-[#2F64FF] transition-colors">{tech.name}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 8. CASOS DE USO */}
                <section className="py-20 lg:py-28 bg-[#F8FAFC]">
                    <div className="container mx-auto px-6 max-w-7xl">
                        <div className="text-center mb-16 max-w-3xl mx-auto">
                            <h2 className="text-4xl md:text-5xl font-light tracking-tight text-[#071540] mb-6">
                                {copy.useCases.titleNormal}
                                <span className="font-semibold text-[#2F64FF]">
                                    {copy.useCases.titleAccent}
                                </span>
                            </h2>
                        </div>
                        <div className="grid md:grid-cols-2 gap-8">
                            {copy.useCases.items.map((uc, idx) => (
                                <div key={idx} className="bg-white p-10 rounded-3xl shadow-sm border border-slate-100 flex flex-col justify-center h-full">
                                    <div className="w-14 h-14 bg-[#2F64FF]/10 rounded-2xl flex items-center justify-center mb-6">
                                        <Code2 className="w-7 h-7 text-[#2F64FF]" />
                                    </div>
                                    <h3 className="text-2xl font-semibold text-[#071540] mb-4">{uc.title}</h3>
                                    <p className="text-lg text-slate-600 font-light leading-relaxed">{uc.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* 9. FAQ SEO */}
                <section className="py-20 lg:py-32 bg-white">
                    <div className="container mx-auto px-6 max-w-3xl">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-light tracking-tight text-[#071540] mb-4">
                                {copy.faq.titleNormal}
                                <span className="font-semibold">
                                    {copy.faq.titleAccent}
                                </span>
                            </h2>
                        </div>

                        <div className="space-y-4">
                            {copy.faq.items.map((item, idx) => (
                                <FaqItem key={idx} faq={item} />
                            ))}
                        </div>
                    </div>
                </section>

                <Contact />
            </main>

            <Footer />
            <FloatingWhatsappButton />
        </div>
    );
}

const FaqItem = ({ faq }: { faq: { q: string, a: string } }) => {
    const [open, setOpen] = useState(false);
    return (
        <div className="border border-slate-200 bg-white rounded-2xl overflow-hidden transition-all duration-300">
            <button
                onClick={() => setOpen(!open)}
                className="w-full flex justify-between items-center p-6 text-left hover:bg-slate-50 transition-colors"
            >
                <span className="text-lg font-medium text-[#071540] pr-8">{faq.q}</span>
                <div className={`flex-shrink-0 w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center transition-transform duration-300 ${open ? 'rotate-180 bg-[#2F64FF] border-[#2F64FF] text-white' : 'text-slate-400'}`}>
                    <ChevronDown className="w-5 h-5" />
                </div>
            </button>
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                    >
                        <div className="px-6 pb-6 text-slate-600 font-light leading-relaxed border-t border-slate-100 pt-4 mt-2 mx-6">
                            {faq.a}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
