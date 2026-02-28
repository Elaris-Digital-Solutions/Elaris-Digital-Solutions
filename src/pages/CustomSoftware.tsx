import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
    ChevronDown, Hexagon, Code2, Link2,
    Settings2, Activity, ShieldCheck, Zap,
    LayoutDashboard, Server, Brain, Building2, CheckCircle2,
    Database, Cloud, Lock, Quote
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
                                        { name: "React", svg: <img src="/assets/React.svg" alt="React" className="w-5 h-5 object-contain" /> },
                                        { name: "Node.js", svg: <img src="/assets/NodeJS.svg" alt="Node.js" className="w-5 h-5 object-contain" /> },
                                        { name: "Python", svg: <img src="/assets/Python.svg" alt="Python" className="w-5 h-5 object-contain" /> },
                                        { name: "TypeScript", svg: <img src="/assets/TypeScript.svg" alt="TypeScript" className="w-5 h-5 object-contain" /> },
                                        { name: "Next.js", svg: <img src="/assets/Next.svg" alt="Next.js" className="w-5 h-5 object-contain" /> },
                                        { name: "AWS", svg: <img src="/assets/AWS.svg" alt="AWS" className="w-5 h-5 object-contain" /> },
                                        { name: "MongoDB", svg: <img src="/assets/MongoDB.svg" alt="MongoDB" className="w-5 h-5 object-contain" /> },
                                        { name: "Docker", svg: <img src="/assets/Docker.png" alt="Docker" className="w-5 h-5 object-contain" /> }
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

                {/* 7.5 SOCIAL PROOF */}
                <section className="py-20 lg:py-24 bg-white border-b border-t border-slate-100 overflow-hidden relative">
                    <div className="container mx-auto px-6 max-w-4xl text-center relative z-10">
                        <Quote className="mx-auto w-12 h-12 text-[#2F64FF] mb-8 opacity-40" />
                        <p className="text-xl md:text-2xl lg:text-3xl font-light italic leading-relaxed mb-8 text-[#071540]">
                            "Migrar de múltiples sistemas genéricos a una plataforma centralizada y desarrollada a medida por ELARIS fue la mejor decisión técnica para escalar. Ahora la tecnología se adapta a nuestras reglas de negocio, y no al revés."
                        </p>
                        <div>
                            <p className="font-semibold text-lg text-[#071540]">Directora / Founder</p>
                            <p className="text-[#2F64FF] font-medium tracking-wide mt-1">Salcedo Jewels</p>
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

                {/* 9.5 FOMO / SCARCITY BANNER */}
                <section className="py-6 pb-20 bg-white border-t border-slate-100 relative z-10">
                    <div className="container mx-auto px-6 max-w-3xl text-center">
                        <div className="border border-yellow-400/50 bg-yellow-50/80 rounded-2xl p-5 shadow-sm">
                            <p className="text-yellow-800 font-medium text-sm sm:text-base leading-relaxed">
                                <span className="font-bold underline text-yellow-900 mr-2">Importante:</span>
                                Solo aceptamos 3 nuevos proyectos de ingeniería profunda por trimestre para garantizar calidad. Agenda hoy.
                            </p>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
            <FloatingWhatsappButton />

            {/* CRO: STICKY MOBILE CTA */}
            <div className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] z-[60]">
                <a href="#contacto" className="flex items-center justify-center w-full bg-[#2F64FF] text-white text-base py-3.5 rounded-full font-semibold shadow-[0_8px_24px_rgba(47,100,255,0.4)] active:scale-95 transition-transform backdrop-blur-md">
                    Agendar Consultoría
                </a>
            </div>
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
