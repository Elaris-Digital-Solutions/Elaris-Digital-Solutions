import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { FileText, Building2, ShieldCheck, Scale, Mail } from "lucide-react";
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

const sectionIndex = [
  { id: "banco-datos", title: "Banco de datos y titularidad" },
  { id: "finalidades", title: "Finalidades del tratamiento" },
  { id: "tipos-datos", title: "Datos que pueden ser tratados" },
  { id: "veracidad", title: "Veracidad y origen de la informacion" },
  { id: "caracter-facultativo", title: "Caracter facultativo y consecuencias" },
  { id: "transferencias", title: "Transferencias y encargados" },
  { id: "arco", title: "Derechos ARCO y revocatoria" },
  { id: "autoridad", title: "Autoridad de control" },
  { id: "conservacion", title: "Plazo de conservacion" },
  { id: "seguridad", title: "Seguridad de la informacion" },
  { id: "confidencialidad", title: "Confidencialidad" },
  { id: "modificaciones", title: "Modificaciones de la politica" },
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

const DataPolicies = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [location.pathname]);

  return (
    <div className="relative min-h-screen overflow-x-hidden overflow-y-auto bg-[#F8FAFC]">
      <SeoHead page="data-policy" />
      <Navbar />

      <main className="relative pt-28 pb-16">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-0 h-72 w-[72rem] -translate-x-1/2 bg-[radial-gradient(circle_at_center,rgba(47,100,255,0.16),transparent_62%)]" />
          <div className="absolute -left-20 top-52 h-80 w-80 rounded-full bg-blue-100/50 blur-3xl" />
          <div className="absolute -right-24 top-[40rem] h-80 w-80 rounded-full bg-cyan-100/50 blur-3xl" />
        </div>

        <section className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[minmax(0,1fr)_290px]">
            <article className="space-y-6">
              <header className="rounded-2xl border border-slate-200 bg-white/95 p-6 shadow-sm backdrop-blur-sm sm:p-10">
                <div className="inline-flex items-center gap-2 rounded-full border border-[#2F64FF]/25 bg-[#2F64FF]/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[#2F64FF]">
                  <FileText className="h-3.5 w-3.5" />
                  Proteccion de Datos
                </div>

                <h1 className="mt-4 text-3xl font-bold tracking-tight text-[#071540] sm:text-4xl">
                  Políticas de Datos
                </h1>
                <p className="mt-3 text-sm text-slate-500">Última actualización: 17/03/2026</p>

                <p className="mt-6 leading-relaxed text-slate-700">
                  En cumplimiento de lo dispuesto por la Ley N. 29733, Ley de Proteccion de Datos Personales, y su
                  Reglamento aprobado por Decreto Supremo N. 003-2013-JUS, ELARIS S.A.C.S ("Elaris"), identificada
                  con RUC N. 20615598071, pone en conocimiento de sus clientes, prospectos y usuarios la politica
                  aplicable al tratamiento de sus datos personales.
                </p>

                <div className="mt-6 flex flex-wrap gap-2 text-xs sm:text-sm">
                  <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 font-medium text-slate-700">
                    Ley N. 29733
                  </span>
                  <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 font-medium text-slate-700">
                    D.S. N. 003-2013-JUS
                  </span>
                  <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 font-medium text-slate-700">
                    RUC 20615598071
                  </span>
                </div>
              </header>

              <SectionCard id="banco-datos" index={1} title="Banco de datos y titularidad">
                <p>
                  Los datos personales seran almacenados en el banco de datos denominado "Clientes" y en repositorios
                  operativos relacionados con la prestacion de servicios. Elaris es responsable del tratamiento de
                  dichos datos dentro del marco legal vigente.
                </p>
              </SectionCard>

              <SectionCard id="finalidades" index={2} title="Finalidades del tratamiento">
                <p>
                  Tratamos datos personales con finalidades principales: atender consultas, preparar propuestas,
                  celebrar y ejecutar relaciones contractuales, coordinar proyectos, gestionar soporte y postventa,
                  asi como responder reclamaciones, dudas o comentarios.
                </p>
                <p>
                  Asimismo, cuando exista consentimiento previo, expreso, libre e informado, los datos podran ser
                  utilizados para finalidades accesorias como comunicaciones publicitarias, novedades, invitaciones o
                  acciones de marketing digital.
                </p>
              </SectionCard>

              <SectionCard id="tipos-datos" index={3} title="Datos que pueden ser tratados">
                <ul className="list-disc space-y-2 pl-5">
                  <li>
                    Datos de identificacion: nombres y apellidos, documento de identidad, cargo, empresa y/o razon
                    social cuando corresponda.
                  </li>
                  <li>Datos de contacto: correo electronico, telefono, direccion y canales de comunicacion.</li>
                  <li>
                    Datos economicos o transaccionales vinculados a contrataciones corporativas, facturacion y
                    cobranza, cuando resulte aplicable.
                  </li>
                  <li>
                    Datos operativos del proyecto: requerimientos, alcance, cronogramas, observaciones y trazabilidad
                    de atencion.
                  </li>
                </ul>
              </SectionCard>

              <SectionCard id="veracidad" index={4} title="Veracidad y origen de la informacion">
                <p>
                  Al proporcionar datos personales, el titular declara que estos le corresponden o que cuenta con
                  facultades suficientes para suministrarlos, y que la informacion es verdadera, completa, exacta y
                  vigente.
                </p>
              </SectionCard>

              <SectionCard
                id="caracter-facultativo"
                index={5}
                title="Caracter facultativo y consecuencias"
              >
                <p>
                  La entrega de datos personales es, en principio, voluntaria. No obstante, si no se proporcionan los
                  datos necesarios para una finalidad especifica, Elaris podria verse imposibilitada de ejecutar
                  correctamente la atencion comercial, contractual o de soporte solicitada.
                </p>
              </SectionCard>

              <SectionCard id="transferencias" index={6} title="Transferencias y encargados">
                <p>
                  Los datos personales solo seran compartidos con terceros cuando sea necesario para la prestacion de
                  servicios, por obligacion legal o con consentimiento del titular. No realizamos transferencias
                  nacionales o internacionales distintas a las estrictamente necesarias para operar nuestros servicios
                  digitales y contractuales.
                </p>
              </SectionCard>

              <SectionCard id="arco" index={7} title="Derechos ARCO y revocatoria">
                <p>
                  El titular puede ejercer sus derechos de acceso, rectificacion, cancelacion y oposicion (ARCO), asi
                  como revocar su consentimiento o limitar el uso y divulgacion de sus datos personales.
                </p>
                <p>
                  Para ello, podra enviar su solicitud al correo contact@elarisdigitalsolutions.com o dirigirse al
                  domicilio fiscal consignado en esta politica.
                </p>
              </SectionCard>

              <SectionCard id="autoridad" index={8} title="Autoridad de control">
                <p>
                  Si consideras que tu solicitud no fue atendida conforme a ley, puedes presentar una reclamacion ante
                  la Autoridad Nacional de Proteccion de Datos Personales del Ministerio de Justicia y Derechos Humanos
                  del Peru.
                </p>
                <p>
                  Formulario de referencia:
                  {" "}
                  <a
                    href="https://www.minjus.gob.pe/wp-content/uploads/2018/12/FORMULARIO-DE-PROCEDIMIENTO-TRILATERAL-DE-TUTELA.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-[#2F64FF] hover:underline"
                  >
                    Procedimiento trilateral de tutela
                  </a>
                  .
                </p>
              </SectionCard>

              <SectionCard id="conservacion" index={9} title="Plazo de conservacion">
                <p>
                  Los datos personales se conservaran mientras dure la relacion contractual y, una vez finalizada,
                  hasta por diez (10) anos, conforme a los plazos de prescripcion aplicables y a potenciales
                  responsabilidades legales. Cuando exista consentimiento para finalidades adicionales, los datos se
                  conservaran hasta su revocatoria.
                </p>
              </SectionCard>

              <SectionCard id="seguridad" index={10} title="Seguridad de la informacion">
                <p>
                  En aplicacion del principio de seguridad, Elaris implementa medidas tecnicas, administrativas y
                  organizativas razonables para proteger los datos personales frente a adulteracion, perdida,
                  consulta, uso o acceso no autorizado o fraudulento.
                </p>
              </SectionCard>

              <SectionCard id="confidencialidad" index={11} title="Confidencialidad">
                <p>
                  El tratamiento de datos personales se realiza bajo deber de confidencialidad por parte de Elaris y
                  de las personas que intervienen en el proceso, conforme a las condiciones descritas en esta politica
                  y la normativa aplicable.
                </p>
              </SectionCard>

              <SectionCard id="modificaciones" index={12} title="Modificaciones de la politica">
                <p>
                  Elaris se reserva el derecho de modificar esta Politica para adaptarla a cambios normativos,
                  regulatorios, jurisprudenciales o de operacion interna. Toda actualizacion sera publicada en esta
                  pagina con su fecha de vigencia.
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
                    <ShieldCheck className="h-4 w-4 text-[#2F64FF]" />
                    Cumplimiento
                  </h2>
                  <div className="mt-3 space-y-2 text-sm text-slate-700">
                    <p><span className="font-semibold">Norma base:</span> Ley N. 29733</p>
                    <p><span className="font-semibold">Reglamento:</span> D.S. N. 003-2013-JUS</p>
                    <p><span className="font-semibold">RUC:</span> 20615598071</p>
                  </div>

                  <a
                    href="https://www.minjus.gob.pe/wp-content/uploads/2018/12/FORMULARIO-DE-PROCEDIMIENTO-TRILATERAL-DE-TUTELA.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-medium text-slate-700 transition-colors hover:border-[#2F64FF]/30 hover:text-[#2F64FF]"
                  >
                    <Scale className="h-4 w-4" />
                    Ir a formulario MINJUS
                  </a>

                  <a
                    href="mailto:contact@elarisdigitalsolutions.com"
                    className="mt-2 inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-medium text-slate-700 transition-colors hover:border-[#2F64FF]/30 hover:text-[#2F64FF]"
                  >
                    <Mail className="h-4 w-4" />
                    Contacto de datos
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

export default DataPolicies;