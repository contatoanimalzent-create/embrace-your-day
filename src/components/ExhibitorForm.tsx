import { useState, type ChangeEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Upload, ArrowRight, Sparkles } from "lucide-react";

type PersonType = "pf" | "pj";

interface FormData {
  person_type: PersonType;
  full_name: string;
  brand_name_pf: string;
  cpf: string;
  phone_pf: string;
  email_pf: string;
  razao_social: string;
  nome_fantasia: string;
  cnpj: string;
  responsible_name: string;
  phone_pj: string;
  email_pj: string;
  cep: string;
  address: string;
  number: string;
  complement: string;
  neighborhood: string;
  city: string;
  state: string;
  segment: string;
  brand_description: string;
  products: string;
  price_range: string;
  instagram: string;
  website: string;
  needs_energy: string;
  sells_food: string;
  needs_larger_space: string;
  stand_people: string;
  special_needs: string;
  logo: File | null;
  product_photos: FileList | null;
  document_file: File | null;
  address_proof: File | null;
  terms_truth: boolean;
  terms_event: boolean;
  terms_contact: boolean;
}

const initialForm: FormData = {
  person_type: "pf",
  full_name: "", brand_name_pf: "", cpf: "", phone_pf: "", email_pf: "",
  razao_social: "", nome_fantasia: "", cnpj: "", responsible_name: "", phone_pj: "", email_pj: "",
  cep: "", address: "", number: "", complement: "", neighborhood: "", city: "", state: "",
  segment: "", brand_description: "", products: "", price_range: "", instagram: "", website: "",
  needs_energy: "", sells_food: "", needs_larger_space: "", stand_people: "", special_needs: "",
  logo: null, product_photos: null, document_file: null, address_proof: null,
  terms_truth: false, terms_event: false, terms_contact: false,
};

const STEPS = [
  { id: 1, label: "Identidade" },
  { id: 2, label: "Endereço" },
  { id: 3, label: "Marca" },
  { id: 4, label: "Operação" },
  { id: 5, label: "Arquivos" },
  { id: 6, label: "Termos" },
];

// ─── Field primitives ────────────────────────────────────────────────────────

const fieldBase =
  "w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none transition-all duration-200 focus:border-[#C9A84C]/60 focus:bg-white/[0.07] focus:shadow-[0_0_0_3px_rgba(201,168,76,0.08)] hover:border-white/20";

const InputField = ({
  label, name, type = "text", value, onChange, required = true, placeholder = "",
}: {
  label: string; name: string; type?: string; value: string;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  required?: boolean; placeholder?: string;
}) => (
  <div className="flex flex-col gap-2">
    <label className="text-xs font-medium tracking-widest uppercase text-white/40">
      {label}{required && <span className="text-[#C9A84C] ml-1">*</span>}
    </label>
    {type === "textarea" ? (
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        rows={4}
        className={`${fieldBase} resize-none leading-relaxed`}
      />
    ) : (
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        className={fieldBase}
      />
    )}
  </div>
);

const SelectField = ({
  label, name, value, onChange, options, required = true,
}: {
  label: string; name: string; value: string;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  options: { value: string; label: string }[]; required?: boolean;
}) => (
  <div className="flex flex-col gap-2">
    <label className="text-xs font-medium tracking-widest uppercase text-white/40">
      {label}{required && <span className="text-[#C9A84C] ml-1">*</span>}
    </label>
    <select
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      className={`${fieldBase} appearance-none cursor-pointer`}
      style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23ffffff40' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`, backgroundRepeat: "no-repeat", backgroundPosition: "right 14px center" }}
    >
      <option value="" className="bg-[#0e0e0e]">Selecione...</option>
      {options.map((o) => (
        <option key={o.value} value={o.value} className="bg-[#0e0e0e]">{o.label}</option>
      ))}
    </select>
  </div>
);

const FileField = ({
  label, name, onChange, multiple = false, accept, fileName,
}: {
  label: string; name: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  multiple?: boolean; accept?: string; fileName?: string;
}) => (
  <div className="flex flex-col gap-2">
    <label className="text-xs font-medium tracking-widest uppercase text-white/40">{label}</label>
    <label className="relative flex items-center gap-3 bg-white/[0.04] border border-dashed border-white/15 rounded-xl px-4 py-3 cursor-pointer hover:border-[#C9A84C]/40 hover:bg-white/[0.06] transition-all duration-200 group">
      <div className="w-8 h-8 rounded-lg bg-[#C9A84C]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#C9A84C]/20 transition-colors">
        <Upload className="w-4 h-4 text-[#C9A84C]" />
      </div>
      <span className="text-sm text-white/40 group-hover:text-white/60 transition-colors truncate">
        {fileName || "Escolher arquivo"}
      </span>
      <input type="file" name={name} onChange={onChange} multiple={multiple} accept={accept} className="hidden" />
    </label>
  </div>
);

const CheckboxField = ({
  label, name, checked, onChange,
}: {
  label: string; name: string; checked: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}) => (
  <label className="flex items-start gap-4 cursor-pointer group">
    <div className={`w-5 h-5 rounded-md flex-shrink-0 mt-0.5 flex items-center justify-center border transition-all duration-200 ${
      checked
        ? "bg-[#C9A84C] border-[#C9A84C] shadow-[0_0_12px_rgba(201,168,76,0.4)]"
        : "border-white/15 bg-white/[0.04] group-hover:border-white/30"
    }`}>
      {checked && <Check className="w-3 h-3 text-black" strokeWidth={3} />}
    </div>
    <input type="checkbox" name={name} checked={checked} onChange={onChange} className="hidden" />
    <span className="text-sm text-white/50 group-hover:text-white/80 transition-colors leading-relaxed">{label}</span>
  </label>
);

// ─── Step Indicator ──────────────────────────────────────────────────────────

const StepIndicator = ({ current }: { current: number }) => (
  <div className="flex items-center justify-center gap-0 mb-10 overflow-x-auto pb-1">
    {STEPS.map((step, i) => {
      const done = current > step.id;
      const active = current === step.id;
      return (
        <div key={step.id} className="flex items-center">
          <div className="flex flex-col items-center gap-1.5">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border transition-all duration-300 ${
              done
                ? "bg-[#C9A84C] border-[#C9A84C] text-black shadow-[0_0_16px_rgba(201,168,76,0.5)]"
                : active
                ? "bg-transparent border-[#C9A84C] text-[#C9A84C] shadow-[0_0_12px_rgba(201,168,76,0.3)]"
                : "bg-transparent border-white/15 text-white/30"
            }`}>
              {done ? <Check className="w-3.5 h-3.5" strokeWidth={3} /> : step.id}
            </div>
            <span className={`text-[10px] tracking-widest uppercase font-medium transition-colors hidden sm:block ${
              active ? "text-[#C9A84C]" : done ? "text-white/60" : "text-white/20"
            }`}>{step.label}</span>
          </div>
          {i < STEPS.length - 1 && (
            <div className={`w-8 sm:w-12 h-px mx-1 mb-4 transition-all duration-500 ${
              current > step.id ? "bg-[#C9A84C]/60" : "bg-white/10"
            }`} />
          )}
        </div>
      );
    })}
  </div>
);

// ─── Section Title ────────────────────────────────────────────────────────────

const SectionTitle = ({ children, sub }: { children: React.ReactNode; sub?: string }) => (
  <div className="mb-6">
    <h4 className="text-lg font-bold text-white tracking-tight">{children}</h4>
    {sub && <p className="text-sm text-white/35 mt-1">{sub}</p>}
  </div>
);

// ─── Main Component ───────────────────────────────────────────────────────────

const ExhibitorForm = () => {
  const [form, setForm] = useState<FormData>(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [step, setStep] = useState(1);
  const [fileNames, setFileNames] = useState<Record<string, string>>({});

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      setForm((prev) => ({ ...prev, [name]: (e.target as HTMLInputElement).checked }));
    } else if (type === "file") {
      const input = e.target as HTMLInputElement;
      const files = input.files;
      setForm((prev) => ({ ...prev, [name]: input.multiple ? files : files?.[0] || null }));
      if (files && files.length > 0) {
        setFileNames((prev) => ({
          ...prev,
          [name]: input.multiple ? `${files.length} arquivo(s)` : files[0].name,
        }));
      }
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = () => setSubmitted(true);

  const isPF = form.person_type === "pf";

  const states = ["AC","AL","AP","AM","BA","CE","DF","ES","GO","MA","MT","MS","MG","PA","PB","PR","PE","PI","RJ","RN","RS","RO","RR","SC","SP","SE","TO"].map((s) => ({ value: s, label: s }));

  const canNext = () => {
    if (step === 1) return isPF
      ? !!(form.full_name && form.cpf && form.phone_pf && form.email_pf)
      : !!(form.razao_social && form.cnpj && form.responsible_name && form.phone_pj && form.email_pj);
    if (step === 2) return !!(form.cep && form.address && form.number && form.neighborhood && form.city && form.state);
    if (step === 3) return !!(form.segment && form.brand_description && form.products && form.price_range && form.instagram);
    if (step === 4) return !!(form.needs_energy && form.sells_food && form.needs_larger_space && form.stand_people);
    if (step === 5) return true;
    if (step === 6) return form.terms_truth && form.terms_event && form.terms_contact;
    return true;
  };

  const slideVariants = {
    enter: { opacity: 0, x: 40 },
    center: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -40 },
  };

  return (
    <section id="expositor" className="relative py-24 px-4 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[#080808]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(201,168,76,0.08),transparent)]" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C9A84C]/30 to-transparent" />

      <div className="relative max-w-2xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 bg-[#C9A84C]/10 border border-[#C9A84C]/20 rounded-full px-4 py-1.5 text-xs text-[#C9A84C] tracking-widest uppercase font-medium mb-6">
            <Sparkles className="w-3 h-3" />
            Seja um Expositor
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white leading-[1.05] tracking-tight mb-4">
            Traga sua marca para o{" "}
            <span className="relative">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C9A84C] via-[#E8CC7A] to-[#C9A84C]">
                Capital Mix
              </span>
            </span>
          </h2>
          <p className="text-white/40 max-w-md mx-auto text-sm leading-relaxed">
            Preencha o formulário e nossa equipe entrará em contato para confirmar sua participação.
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {submitted ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="relative bg-white/[0.03] border border-white/10 rounded-2xl p-12 text-center overflow-hidden"
            >
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_50%,rgba(201,168,76,0.06),transparent)]" />
              <div className="relative">
                <div className="w-20 h-20 rounded-full bg-[#C9A84C]/10 border border-[#C9A84C]/30 flex items-center justify-center mx-auto mb-8 shadow-[0_0_40px_rgba(201,168,76,0.2)]">
                  <Check className="w-9 h-9 text-[#C9A84C]" strokeWidth={2.5} />
                </div>
                <h3 className="text-2xl font-black text-white mb-3 tracking-tight">Cadastro enviado!</h3>
                <p className="text-white/40 text-sm leading-relaxed max-w-xs mx-auto">
                  Recebemos suas informações. Nossa equipe entrará em contato em breve via WhatsApp ou e-mail.
                </p>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/[0.02] border border-white/8 rounded-2xl overflow-hidden"
              style={{ borderColor: "rgba(255,255,255,0.06)" }}
            >
              {/* Form header bar */}
              <div className="px-6 pt-8 pb-0">
                <StepIndicator current={step} />
              </div>

              {/* Step content */}
              <div className="px-6 sm:px-10 pb-10">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={step}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.28, ease: "easeOut" }}
                  >
                    {/* STEP 1 — Identidade */}
                    {step === 1 && (
                      <div>
                        <SectionTitle sub="Informe os dados do responsável pela marca">
                          Quem é você?
                        </SectionTitle>

                        {/* Person type toggle */}
                        <div className="flex gap-3 mb-6">
                          {(["pf", "pj"] as PersonType[]).map((type) => (
                            <button
                              key={type}
                              type="button"
                              onClick={() => setForm((prev) => ({ ...prev, person_type: type }))}
                              className={`flex-1 py-3 px-4 rounded-xl text-sm font-medium border transition-all duration-200 ${
                                form.person_type === type
                                  ? "bg-[#C9A84C]/10 border-[#C9A84C]/50 text-[#C9A84C] shadow-[0_0_20px_rgba(201,168,76,0.1)]"
                                  : "bg-white/[0.03] border-white/10 text-white/40 hover:border-white/20 hover:text-white/60"
                              }`}
                            >
                              {type === "pf" ? "Pessoa Física (CPF)" : "Pessoa Jurídica (CNPJ)"}
                            </button>
                          ))}
                        </div>

                        <div className="grid sm:grid-cols-2 gap-4">
                          <AnimatePresence mode="wait">
                            {isPF ? (
                              <motion.div key="pf" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="contents">
                                <InputField label="Nome completo" name="full_name" value={form.full_name} onChange={handleChange} />
                                <InputField label="Nome da marca" name="brand_name_pf" value={form.brand_name_pf} onChange={handleChange} />
                                <InputField label="CPF" name="cpf" value={form.cpf} onChange={handleChange} placeholder="000.000.000-00" />
                                <InputField label="Telefone / WhatsApp" name="phone_pf" value={form.phone_pf} onChange={handleChange} type="tel" placeholder="(00) 00000-0000" />
                                <div className="sm:col-span-2">
                                  <InputField label="E-mail" name="email_pf" value={form.email_pf} onChange={handleChange} type="email" placeholder="seu@email.com" />
                                </div>
                              </motion.div>
                            ) : (
                              <motion.div key="pj" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="contents">
                                <InputField label="Razão social" name="razao_social" value={form.razao_social} onChange={handleChange} />
                                <InputField label="Nome fantasia" name="nome_fantasia" value={form.nome_fantasia} onChange={handleChange} />
                                <InputField label="CNPJ" name="cnpj" value={form.cnpj} onChange={handleChange} placeholder="00.000.000/0000-00" />
                                <InputField label="Nome do responsável" name="responsible_name" value={form.responsible_name} onChange={handleChange} />
                                <InputField label="Telefone / WhatsApp" name="phone_pj" value={form.phone_pj} onChange={handleChange} type="tel" placeholder="(00) 00000-0000" />
                                <InputField label="E-mail" name="email_pj" value={form.email_pj} onChange={handleChange} type="email" placeholder="contato@empresa.com" />
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </div>
                    )}

                    {/* STEP 2 — Endereço */}
                    {step === 2 && (
                      <div>
                        <SectionTitle sub="Endereço comercial ou residencial">Onde você está?</SectionTitle>
                        <div className="grid sm:grid-cols-2 gap-4">
                          <InputField label="CEP" name="cep" value={form.cep} onChange={handleChange} placeholder="00000-000" />
                          <InputField label="Endereço" name="address" value={form.address} onChange={handleChange} />
                          <InputField label="Número" name="number" value={form.number} onChange={handleChange} />
                          <InputField label="Complemento" name="complement" value={form.complement} onChange={handleChange} required={false} placeholder="Apto, sala..." />
                          <InputField label="Bairro" name="neighborhood" value={form.neighborhood} onChange={handleChange} />
                          <InputField label="Cidade" name="city" value={form.city} onChange={handleChange} />
                          <SelectField label="Estado" name="state" value={form.state} onChange={handleChange} options={states} />
                        </div>
                      </div>
                    )}

                    {/* STEP 3 — Marca */}
                    {step === 3 && (
                      <div>
                        <SectionTitle sub="Conte sobre o que você vende e representa">Sua marca</SectionTitle>
                        <div className="grid sm:grid-cols-2 gap-4">
                          <InputField label="Segmento" name="segment" value={form.segment} onChange={handleChange} placeholder="Ex: Gastronomia, Moda..." />
                          <InputField label="Faixa de preço" name="price_range" value={form.price_range} onChange={handleChange} placeholder="Ex: R$20 – R$200" />
                          <InputField label="Instagram" name="instagram" value={form.instagram} onChange={handleChange} placeholder="@suamarca" />
                          <InputField label="Site" name="website" value={form.website} onChange={handleChange} required={false} placeholder="https://" />
                        </div>
                        <div className="grid gap-4 mt-4">
                          <InputField label="Descrição da marca" name="brand_description" value={form.brand_description} onChange={handleChange} type="textarea" placeholder="Fale sobre sua marca, história, propósito..." />
                          <InputField label="Produtos que irá expor" name="products" value={form.products} onChange={handleChange} type="textarea" placeholder="Liste os principais produtos ou serviços..." />
                        </div>
                      </div>
                    )}

                    {/* STEP 4 — Operação */}
                    {step === 4 && (
                      <div>
                        <SectionTitle sub="Nos ajude a preparar o espaço ideal para você">Operação no evento</SectionTitle>
                        <div className="grid sm:grid-cols-2 gap-4">
                          <SelectField label="Precisa de energia elétrica?" name="needs_energy" value={form.needs_energy} onChange={handleChange} options={[{ value: "sim", label: "Sim" }, { value: "nao", label: "Não" }]} />
                          <SelectField label="Vai vender alimentos / bebidas?" name="sells_food" value={form.sells_food} onChange={handleChange} options={[{ value: "sim", label: "Sim" }, { value: "nao", label: "Não" }]} />
                          <SelectField label="Precisa de espaço maior?" name="needs_larger_space" value={form.needs_larger_space} onChange={handleChange} options={[{ value: "sim", label: "Sim" }, { value: "nao", label: "Não" }]} />
                          <InputField label="Pessoas no stand" name="stand_people" value={form.stand_people} onChange={handleChange} type="number" placeholder="Ex: 2" />
                        </div>
                        <div className="mt-4">
                          <InputField label="Necessidades especiais" name="special_needs" value={form.special_needs} onChange={handleChange} type="textarea" required={false} placeholder="Acessibilidade, montagem especial, equipamentos..." />
                        </div>
                      </div>
                    )}

                    {/* STEP 5 — Arquivos */}
                    {step === 5 && (
                      <div>
                        <SectionTitle sub="Formatos aceitos: JPG, PNG, PDF">Documentos e arquivos</SectionTitle>
                        <div className="grid sm:grid-cols-2 gap-4">
                          <FileField label="Logo da marca" name="logo" onChange={handleChange} accept="image/*" fileName={fileNames.logo} />
                          <FileField label="Fotos dos produtos" name="product_photos" onChange={handleChange} multiple accept="image/*" fileName={fileNames.product_photos} />
                          <FileField label="Documento (CPF ou CNPJ)" name="document_file" onChange={handleChange} accept="image/*,.pdf" fileName={fileNames.document_file} />
                          <FileField label="Comprovante de endereço" name="address_proof" onChange={handleChange} accept="image/*,.pdf" fileName={fileNames.address_proof} />
                        </div>
                        <p className="text-xs text-white/25 mt-4 leading-relaxed">
                          Os arquivos são usados exclusivamente para validação do cadastro e não serão compartilhados com terceiros.
                        </p>
                      </div>
                    )}

                    {/* STEP 6 — Termos */}
                    {step === 6 && (
                      <div>
                        <SectionTitle sub="Leia e confirme as declarações abaixo">Quase lá!</SectionTitle>
                        <div className="flex flex-col gap-5">
                          <CheckboxField
                            label="Declaro que todas as informações fornecidas são verdadeiras e de minha responsabilidade."
                            name="terms_truth"
                            checked={form.terms_truth}
                            onChange={handleChange}
                          />
                          <CheckboxField
                            label="Li e concordo com os termos e regulamento do evento Capital Mix."
                            name="terms_event"
                            checked={form.terms_event}
                            onChange={handleChange}
                          />
                          <CheckboxField
                            label="Autorizo o contato via WhatsApp e e-mail para comunicações sobre o evento."
                            name="terms_contact"
                            checked={form.terms_contact}
                            onChange={handleChange}
                          />
                        </div>

                        {/* Summary card */}
                        <div className="mt-8 bg-white/[0.03] border border-white/8 rounded-xl p-5" style={{ borderColor: "rgba(255,255,255,0.05)" }}>
                          <p className="text-xs text-white/30 uppercase tracking-widest font-medium mb-3">Resumo do cadastro</p>
                          <div className="grid grid-cols-2 gap-y-2 text-sm">
                            <span className="text-white/35">Tipo</span>
                            <span className="text-white/70">{isPF ? "Pessoa Física" : "Pessoa Jurídica"}</span>
                            <span className="text-white/35">Nome</span>
                            <span className="text-white/70 truncate">{isPF ? form.full_name : form.razao_social}</span>
                            <span className="text-white/35">Segmento</span>
                            <span className="text-white/70 truncate">{form.segment || "—"}</span>
                            <span className="text-white/35">Instagram</span>
                            <span className="text-white/70 truncate">{form.instagram || "—"}</span>
                            <span className="text-white/35">Cidade</span>
                            <span className="text-white/70">{form.city ? `${form.city} / ${form.state}` : "—"}</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>

                {/* Navigation */}
                <div className="flex items-center justify-between mt-10 pt-6 border-t border-white/[0.06]">
                  <button
                    type="button"
                    onClick={() => setStep((s) => Math.max(1, s - 1))}
                    className={`text-sm text-white/40 hover:text-white/70 transition-colors px-2 ${step === 1 ? "invisible" : ""}`}
                  >
                    ← Voltar
                  </button>

                  {step < 6 ? (
                    <button
                      type="button"
                      onClick={() => setStep((s) => s + 1)}
                      disabled={!canNext()}
                      className="flex items-center gap-2 bg-[#C9A84C] hover:bg-[#d4b45a] disabled:opacity-30 disabled:cursor-not-allowed text-black text-sm font-bold px-7 py-3 rounded-xl transition-all duration-200 shadow-[0_0_24px_rgba(201,168,76,0.25)] hover:shadow-[0_0_32px_rgba(201,168,76,0.4)]"
                    >
                      Próximo
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={handleSubmit}
                      disabled={!canNext()}
                      className="flex items-center gap-2 bg-[#C9A84C] hover:bg-[#d4b45a] disabled:opacity-30 disabled:cursor-not-allowed text-black text-sm font-bold px-7 py-3 rounded-xl transition-all duration-200 shadow-[0_0_24px_rgba(201,168,76,0.3)] hover:shadow-[0_0_40px_rgba(201,168,76,0.5)]"
                    >
                      Cadastrar minha marca
                      <Sparkles className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default ExhibitorForm;