import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { FileText, Building2, Landmark, Mail } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingWhatsappButton from "@/components/ui/floating-whatsapp-button";
import SeoHead from "@/components/SeoHead";

const legalCompanyData = [
  { label: "Razón social", value: "ELARIS S.A.C.S" },
  { label: "Número de RUC", value: "20615598071" },
  { label: "Nombre comercial", value: "ELARIS DIGITAL SOLUTIONS" },
  { label: "Tipo de contribuyente", value: "SOC.POR ACCIONES CERRADA SIMPLIFICA" },
  {
    label: "Domicilio fiscal",
    value: "JR. TACNA NRO. 207 DPTO. 801 CND. SURCO VIEJO LIMA - LIMA - LIMA",
  },
];

const serviceLines = [
  {
    title: "Optimizacion Digital para Crecimiento",
    items: [
      "Desarrollo de e-commerce a medida",
      "Integracion de pasarelas de pago y logistica",
      "Arquitectura SEO-first",
    ],
  },
  {
    title: "Automatizacion Inteligente de Procesos",
    items: [
      "IA aplicada a flujos de trabajo",
      "Gestion documental inteligente",
      "Integracion de ecosistemas (ERP, SAP, CRM)",
    ],
  },
  {
    title: "Arquitectura y Modernizacion Tecnologica",
    items: [
      "Modernizacion de sistemas",
      "Arquitecturas cloud robustas",
      "Optimizacion de costos de infraestructura TI",
    ],
  },
];

const sectionIndex = [
  { id: "titularidad", title: "Titularidad del sitio y alcance" },
  { id: "quien-puede-usar", title: "Quien puede usar el sitio" },
  { id: "servicios", title: "Servicios ofrecidos por Elaris" },
  { id: "condiciones-comerciales", title: "Condiciones comerciales y contratacion" },
  { id: "cambios-oferta", title: "Derecho a cambiar la oferta" },
  { id: "propiedad-intelectual", title: "Propiedad intelectual y uso permitido" },
  { id: "contenido-usuario", title: "Contenido proporcionado por usuarios" },
  { id: "suspension", title: "Suspension o terminacion de acceso" },
  { id: "indemnizacion", title: "Indemnizacion" },
  { id: "responsabilidad", title: "Garantias y limitacion de responsabilidad" },
  { id: "promocionales", title: "Comunicaciones y contenido promocional" },
  { id: "modificaciones", title: "Modificaciones de estos terminos" },
  { id: "jurisdiccion", title: "Ley aplicable y jurisdiccion" },
  { id: "contacto", title: "Contacto y soporte" },
] as const;

type SectionCardProps = {
  id: string;
  index: number;
  title: string;
  children: React.ReactNode;
};

const SectionCard = ({ id, index, title, children }: SectionCardProps) => (
  <section
    id={id}
    className="scroll-mt-32 rounded-2xl border border-slate-200 bg-white/95 p-6 shadow-sm backdrop-blur-sm transition-all duration-300 hover:border-[#2F64FF]/35 hover:shadow-md sm:p-8"
  >
    <div className="mb-4 flex items-center gap-3">
      <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#2F64FF]/10 text-sm font-bold text-[#2F64FF]">
        {index}
      </span>
      <h2 className="text-xl font-semibold text-[#071540]">{title}</h2>
    </div>
    <div className="space-y-3 leading-relaxed text-slate-700">{children}</div>
  </section>
);

const TermsAndConditions = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [location.pathname]);

  return (
    <div className="relative min-h-screen overflow-x-hidden overflow-y-auto bg-[#F8FAFC]">
      <SeoHead page="terms-and-conditions" />
      <Navbar />

      <main className="relative pt-28 pb-16">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-0 h-72 w-[72rem] -translate-x-1/2 bg-[radial-gradient(circle_at_center,rgba(47,100,255,0.17),transparent_62%)]" />
          <div className="absolute -left-20 top-56 h-80 w-80 rounded-full bg-blue-100/50 blur-3xl" />
          <div className="absolute -right-24 top-[42rem] h-80 w-80 rounded-full bg-indigo-100/50 blur-3xl" />
        </div>

        <section className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[minmax(0,1fr)_290px]">
            <article className="space-y-6">
              <header className="rounded-2xl border border-slate-200 bg-white/95 p-6 shadow-sm backdrop-blur-sm sm:p-10">
                <div className="inline-flex items-center gap-2 rounded-full border border-[#2F64FF]/25 bg-[#2F64FF]/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[#2F64FF]">
                  <FileText className="h-3.5 w-3.5" />
                  Marco Legal
                </div>

                <h1 className="mt-4 text-3xl font-bold tracking-tight text-[#071540] sm:text-4xl">
                  Términos &amp; Condiciones
                </h1>
                <p className="mt-3 text-sm text-slate-500">Última actualización: 17/03/2026</p>

                <p className="mt-6 leading-relaxed text-slate-700">
                  Este sitio web es propiedad y esta operado por ELARIS S.A.C.S ("Elaris"), identificada con RUC N.
                  20615598071. Estos Terminos y Condiciones regulan el uso del sitio web y los servicios ofrecidos
                  por Elaris Digital Solutions. Al acceder o usar este sitio, confirmas que has leido, entendido y
                  aceptas estar legalmente vinculado por estos Terminos.
                </p>

                <div className="mt-6 flex flex-wrap gap-2 text-xs sm:text-sm">
                  <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 font-medium text-slate-700">
                    RUC 20615598071
                  </span>
                  <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 font-medium text-slate-700">
                    Lima, Peru
                  </span>
                  <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 font-medium text-slate-700">
                    Servicios B2B
                  </span>
                </div>
              </header>

              <SectionCard id="titularidad" index={1} title="Titularidad del sitio y alcance">
                <p>
                  El sitio presenta informacion institucional y comercial sobre servicios de tecnologia para empresas,
                  incluyendo desarrollo de software, automatizacion e integraciones. Este documento constituye un
                  acuerdo vinculante entre Elaris y cualquier visitante, cliente potencial o usuario.
                </p>
              </SectionCard>

              <SectionCard id="quien-puede-usar" index={2} title="Quien puede usar el sitio">
                <p>
                  Para usar este sitio y/o contratar servicios, debes tener al menos 18 anos de edad, o la mayoria de
                  edad legal en tu jurisdiccion, y capacidad suficiente para celebrar acuerdos legalmente vinculantes.
                  No puedes usar el sitio si hacerlo esta prohibido por ley aplicable.
                </p>
              </SectionCard>

              <SectionCard id="servicios" index={3} title="Servicios ofrecidos por Elaris">
                <p>
                  Elaris ofrece servicios B2B personalizados. La contratacion efectiva de cualquier servicio se realiza
                  mediante propuesta comercial y/o contrato especifico.
                </p>
                <div className="mt-4 space-y-4">
                  {serviceLines.map((line) => (
                    <div key={line.title} className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                      <h3 className="font-semibold text-[#071540]">{line.title}</h3>
                      <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-700">
                        {line.items.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </SectionCard>

              <SectionCard
                id="condiciones-comerciales"
                index={4}
                title="Condiciones comerciales y contratacion"
              >
                <ul className="list-disc space-y-2 pl-5">
                  <li>
                    Las condiciones economicas, plazos, entregables, hitos y formas de pago se definen en cada
                    propuesta y/o contrato.
                  </li>
                  <li>
                    Salvo pacto expreso en contrario, Elaris presta servicios profesionales y no vende productos
                    fisicos mediante el sitio.
                  </li>
                  <li>
                    Cuando aplique una politica de devolucion o reembolso, esta sera establecida en el contrato
                    correspondiente. No aplica reembolso automatico por horas ya ejecutadas, servicios ya prestados o
                    entregables aprobados por el cliente.
                  </li>
                </ul>
              </SectionCard>

              <SectionCard id="cambios-oferta" index={5} title="Derecho a cambiar la oferta">
                <p>
                  Elaris puede modificar, ampliar, restringir o descontinuar temporal o permanentemente
                  funcionalidades, servicios, contenidos o secciones del sitio sin generar responsabilidad por dichos
                  cambios.
                </p>
              </SectionCard>

              <SectionCard
                id="propiedad-intelectual"
                index={6}
                title="Propiedad intelectual y uso permitido"
              >
                <p>
                  El sitio, su codigo, marca, textos, diseno, logotipos, piezas visuales, documentos y demas activos
                  son propiedad de Elaris o de terceros licenciantes. Queda prohibida su reproduccion, distribucion,
                  transformacion o uso comercial no autorizado.
                </p>
              </SectionCard>

              <SectionCard id="contenido-usuario" index={7} title="Contenido proporcionado por usuarios">
                <p>
                  Si envias informacion, archivos, marcas, imagenes u otros contenidos a Elaris mediante formularios,
                  correo u otros canales, declaras que cuentas con derechos suficientes sobre dicho contenido y que su
                  envio no infringe derechos de terceros.
                </p>
              </SectionCard>

              <SectionCard id="suspension" index={8} title="Suspension o terminacion de acceso">
                <p>
                  Elaris puede restringir, suspender o bloquear el acceso al sitio o a determinados servicios cuando
                  detecte usos abusivos, actividades ilegales, fraude, intentos de intrusion, suplantacion u otras
                  conductas contrarias a estos Terminos o a la normativa aplicable.
                </p>
              </SectionCard>

              <SectionCard id="indemnizacion" index={9} title="Indemnizacion">
                <p>
                  El usuario acepta indemnizar y mantener indemne a Elaris frente a reclamaciones, danos, sanciones,
                  costos u honorarios (incluyendo defensa legal razonable) derivados del uso indebido del sitio,
                  incumplimiento de estos Terminos o vulneracion de derechos de terceros.
                </p>
              </SectionCard>

              <SectionCard
                id="responsabilidad"
                index={10}
                title="Garantias y limitacion de responsabilidad"
              >
                <ul className="list-disc space-y-2 pl-5">
                  <li>
                    Elaris presta sus servicios profesionales bajo estandares tecnicos y criterios de calidad
                    acordados con el cliente en cada propuesta o contrato.
                  </li>
                  <li>
                    Elaris respondera por danos directos debidamente acreditados cuando se deriven de dolo o culpa
                    grave en el cumplimiento de obligaciones contractuales asumidas expresamente.
                  </li>
                  <li>
                    Salvo norma imperativa en contrario, Elaris no sera responsable por danos indirectos,
                    consecuenciales, lucro cesante o perdida de datos originados por factores externos fuera de su
                    control razonable (incluyendo fallas de terceros, infraestructura ajena o incumplimientos del
                    cliente).
                  </li>
                  <li>
                    Ninguna disposicion limita derechos irrenunciables reconocidos por normativa de proteccion al
                    consumidor o normas de orden publico.
                  </li>
                </ul>
              </SectionCard>

              <SectionCard
                id="promocionales"
                index={11}
                title="Comunicaciones y contenido promocional"
              >
                <p>
                  Cuando nos otorgues consentimiento, podremos enviarte comunicaciones comerciales y de novedades por
                  correo electronico o canales equivalentes. Puedes retirar tu consentimiento en cualquier momento
                  mediante los mecanismos de baja o escribiendo a contact@elarisdigitalsolutions.com.
                </p>
              </SectionCard>

              <SectionCard id="modificaciones" index={12} title="Modificaciones de estos terminos">
                <p>
                  Elaris puede modificar estos Terminos para reflejar cambios operativos, comerciales o normativos. La
                  version vigente sera la publicada en esta pagina junto con su fecha de actualizacion. El uso
                  continuo del sitio implica aceptacion de la version actual.
                </p>
              </SectionCard>

              <SectionCard id="jurisdiccion" index={13} title="Ley aplicable y jurisdiccion">
                <p>
                  Estos Terminos se rigen por las leyes de la Republica del Peru. Cualquier controversia relacionada
                  con el sitio o con estos Terminos sera sometida a la jurisdiccion de los jueces y tribunales
                  competentes del distrito judicial de Lima, salvo norma imperativa en contrario.
                </p>
              </SectionCard>

              <SectionCard id="contacto" index={14} title="Contacto y soporte">
                <p>
                  Para consultas sobre estos Terminos o solicitudes de atencion, puedes escribir a
                  contact@elarisdigitalsolutions.com.
                </p>
              </SectionCard>

              <section className="rounded-2xl border border-slate-200 bg-white/95 p-6 shadow-sm backdrop-blur-sm sm:p-8">
                <div className="mb-4 flex items-center gap-2 text-[#071540]">
                  <Building2 className="h-5 w-5 text-[#2F64FF]" />
                  <h2 className="text-xl font-semibold">Datos Legales de la Empresa</h2>
                </div>
                <dl className="divide-y divide-slate-200 rounded-xl border border-slate-200 bg-slate-50 text-sm">
                  {legalCompanyData.map((item) => (
                    <div
                      key={item.label}
                      className="grid gap-1 px-4 py-3 sm:grid-cols-[260px_1fr] sm:gap-3 sm:px-5"
                    >
                      <dt className="font-semibold text-slate-700">{item.label}</dt>
                      <dd className="text-slate-600">{item.value}</dd>
                    </div>
                  ))}
                </dl>
              </section>
            </article>

            <aside className="hidden lg:block">
              <div className="sticky top-28 space-y-4">
                <section className="rounded-2xl border border-slate-200 bg-white/95 p-5 shadow-sm backdrop-blur-sm">
                  <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">Indice legal</h2>
                  <ul className="mt-3 space-y-2 text-sm">
                    {sectionIndex.map((item, idx) => (
                      <li key={item.id}>
                        <a href={`#${item.id}`} className="text-slate-700 transition-colors hover:text-[#2F64FF]">
                          {idx + 1}. {item.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </section>

                <section className="rounded-2xl border border-slate-200 bg-white/95 p-5 shadow-sm backdrop-blur-sm">
                  <h2 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-slate-500">
                    <Landmark className="h-4 w-4 text-[#2F64FF]" />
                    Identificacion
                  </h2>
                  <div className="mt-3 space-y-2 text-sm text-slate-700">
                    <p><span className="font-semibold">Razon social:</span> ELARIS S.A.C.S</p>
                    <p><span className="font-semibold">RUC:</span> 20615598071</p>
                    <p><span className="font-semibold">Nombre comercial:</span> ELARIS DIGITAL SOLUTIONS</p>
                  </div>

                  <a
                    href="mailto:contact@elarisdigitalsolutions.com"
                    className="mt-4 inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-medium text-slate-700 transition-colors hover:border-[#2F64FF]/30 hover:text-[#2F64FF]"
                  >
                    <Mail className="h-4 w-4" />
                    Contacto legal
                  </a>
                </section>
              </div>
            </aside>
          </div>
        </section>
      </main>

      <Footer />
      <FloatingWhatsappButton />
    </div>
  );
};

export default TermsAndConditions;