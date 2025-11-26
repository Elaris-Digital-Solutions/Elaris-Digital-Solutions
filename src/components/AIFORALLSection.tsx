import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useI18n } from "@/lib/i18n";
import SmartImage from "@/components/ui/smart-image";
import { Users, ExternalLink } from "lucide-react";

export default function AIFORALLSection() {
    const { t } = useI18n();

    const projects = [
        {
            key: "nuestroBarrio",
            image: "/assets/nuestro-barrio-nuestra-historia.webp",
            url: "https://nuestro-barrio-nuestra-historia.netlify.app/",
            color: "text-blue-500",
            bg: "bg-blue-50",
        },
        {
            key: "pictoLink",
            image: "/assets/pictolink.png",
            url: "https://picto-link.netlify.app/", // No URL provided yet, or maybe I should use a placeholder? The image shows "Probar la plataforma", so maybe it's live? I'll leave it null for now or ask. User didn't provide URL.
            color: "text-indigo-500",
            bg: "bg-indigo-50",
        },
    ];

    return (
        <section className="py-20 sm:py-32 bg-slate-50 relative overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-blue-100/30 blur-3xl" />
                <div className="absolute top-[40%] -right-[10%] w-[40%] h-[40%] rounded-full bg-indigo-100/30 blur-3xl" />
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-16 max-w-3xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <h2 className="text-3xl font-extrabold tracking-tight drop-shadow-sm sm:text-4xl lg:text-5xl mb-6">
                            <span className="text-slate-900">{t("aiForAll.titleNormal")}</span>
                            <span style={{ color: "#2F64FF" }}>{t("aiForAll.titleAccent")}</span>
                        </h2>
                        <p className="text-lg text-gray-600">
                            {t("aiForAll.description")}
                        </p>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
                    {projects.map((item, index) => (
                        <motion.div
                            key={item.key}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-100 group flex flex-col"
                        >
                            {/* Image Area */}
                            <div className="relative h-48 overflow-hidden">
                                <SmartImage
                                    src={item.image}
                                    alt={t(`aiForAll.projects.${item.key}.title`)}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-60" />
                                {item.url && (
                                    <a
                                        href={item.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="absolute bottom-4 right-4 p-2 bg-white/90 rounded-full text-slate-900 hover:bg-white transition-colors"
                                    >
                                        <ExternalLink className="w-4 h-4" />
                                    </a>
                                )}
                            </div>

                            {/* Content Area */}
                            <div className="p-6 flex-1 flex flex-col">
                                <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-[#2F64FF] transition-colors">
                                    {t(`aiForAll.projects.${item.key}.title`)}
                                </h3>
                                <p className="text-gray-600 leading-relaxed text-sm flex-1">
                                    {t(`aiForAll.projects.${item.key}.description`)}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
