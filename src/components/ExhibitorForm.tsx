import { useState, type ChangeEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Check, Upload } from "lucide-react";

type PersonType = "pf" | "pj";

interface FormData {
  person_type: PersonType;
  // PF
  full_name: string;
  brand_name_pf: string;
  cpf: string;
  phone_pf: string;
  email_pf: string;
  // PJ
  razao_social: string;
  nome_fantasia: string;
  cnpj: string;
  responsible_name: string;
  phone_pj: string;
  email_pj: string;
  // Address
  cep: string;
  address: string;
  number: string;
  complement: string;
  neighborhood: string;
  city: string;
  state: string;
  // Exhibitor info
  segment: string;
  brand_description: string;
  products: string;
  price_range: string;
  instagram: string;
  website: string;
  // Operations
  needs_energy: string;
  sells_food: string;
  needs_larger_space: string;
  stand_people: string;
  special_needs: string;
  // Files
  logo: File | null;
  product_photos: FileList | null;
  document_file: File | null;
  address_proof: File | null;
  // Terms
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
  needs_energy: "", sells_food: "", needs_larger_space: "", needs_larger_space: "", stand_people: "", special_needs: "",
  logo: null, product_photos: null, document_file: null, address_proof: null,
  terms_truth: false, terms_event: false, terms_contact: false,
};

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <h4 className="font-display text-lg font-semibold text-primary mb-4 mt-8 first:mt-0">
    {children}
  </h4>
);

const InputField = ({
  label, name, type = "text", value, onChange, required = true, placeholder = "",
}: {
  label: string; name: string; type?: string; value: string;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  required?: boolean; placeholder?: string;
}) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-sm text-muted-foreground">{label}{required && " *"}</label>
    {type === "textarea" ? (
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        className="input-premium min-h-[100px] resize-y"
      />
    ) : (
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        className="input-premium"
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
  <div className="flex flex-col gap-1.5">
    <label className="text-sm text-muted-foreground">{label}{required && " *"}</label>
    <select name={name} value={value} onChange={onChange} required={required} className="input-premium">
      <option value="">Selecione...</option>
      {options.map((o) => (
        <option key={o.value} value={o.value}>{o.label}</option>
      ))}
    </select>
  </div>
);

const FileField = ({
  label, name, onChange, multiple = false, accept,
}: {
  label: string; name: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  multiple?: boolean; accept?: string;
}) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-sm text-muted-foreground">{label}</label>
    <label className="input-premium flex items-center gap-3 cursor-pointer hover:border-primary/40">
      <Upload className="w-4 h-4 text-muted-foreground flex-shrink-0" />
      <span className="text-muted-foreground text-sm">Escolher arquivo</span>
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
  <label className="flex items-start gap-3 cursor-pointer group">
    <div className={`w-5 h-5 rounded border flex-shrink-0 mt-0.5 flex items-center justify-center transition-all duration-200 ${
      checked ? "bg-primary border-primary" : "border-border/50 bg-secondary/30"
    }`}>
      {checked && <Check className="w-3 h-3 text-primary-foreground" />}
    </div>
    <input type="checkbox" name={name} checked={checked} onChange={onChange} className="hidden" />
    <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">{label}</span>
  </label>
);

const ExhibitorForm = () => {
  const [form, setForm] = useState<FormData>(initialForm);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      setForm((prev) => ({ ...prev, [name]: (e.target as HTMLInputElement).checked }));
    } else if (type === "file") {
      const files = (e.target as HTMLInputElement).files;
      setForm((prev) => ({ ...prev, [name]: (e.target as HTMLInputElement).multiple ? files : files?.[0] || null }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const isPF = form.person_type === "pf";

  const states = [
    "AC","AL","AP","AM","BA","CE","DF","ES","GO","MA","MT","MS","MG",
    "PA","PB","PR","PE","PI","RJ","RN","RS","RO","RR","SC","SP","SE","TO",
  ].map((s) => ({ value: s, label: s }));

  return (
    <section id="exhibitor" className="section-padding relative">
      <div className="absolute inset-0 bg-gold-glow opacity-20" />
      <div className="relative max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">
            Seja um Expositor no <span className="text-gradient-gold">Capital Mix</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Cadastre sua marca e faça parte de um novo movimento.
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {submitted ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-card rounded-xl p-12 border border-primary/20 text-center shadow-gold"
            >
              <div className="w-16 h-16 rounded-full bg-primary/15 flex items-center justify-center mx-auto mb-6">
                <Check className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-display text-2xl font-bold mb-3">Cadastro enviado com sucesso!</h3>
              <p className="text-muted-foreground">Nossa equipe entrará em contato.</p>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onSubmit={handleSubmit}
              className="bg-card rounded-xl p-6 md:p-10 border border-border/30"
            >
              {/* Person type */}
              <SectionTitle>Tipo de Cadastro</SectionTitle>
              <div className="flex gap-4">
                {(["pf", "pj"] as PersonType[]).map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setForm((prev) => ({ ...prev, person_type: type }))}
                    className={`flex-1 py-3 rounded-lg text-sm font-medium transition-all duration-200 border ${
                      form.person_type === type
                        ? "bg-primary/10 border-primary/40 text-primary"
                        : "bg-secondary/30 border-border/30 text-muted-foreground hover:border-border/60"
                    }`}
                  >
                    {type === "pf" ? "Pessoa Física (CPF)" : "Pessoa Jurídica (CNPJ)"}
                  </button>
                ))}
              </div>

              {/* PF / PJ Fields */}
              <SectionTitle>{isPF ? "Dados Pessoais" : "Dados da Empresa"}</SectionTitle>
              <div className="grid sm:grid-cols-2 gap-4">
                <AnimatePresence mode="wait">
                  {isPF ? (
                    <motion.div key="pf" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="contents">
                      <InputField label="Nome completo" name="full_name" value={form.full_name} onChange={handleChange} />
                      <InputField label="Nome da marca" name="brand_name_pf" value={form.brand_name_pf} onChange={handleChange} />
                      <InputField label="CPF" name="cpf" value={form.cpf} onChange={handleChange} placeholder="000.000.000-00" />
                      <InputField label="Telefone (WhatsApp)" name="phone_pf" value={form.phone_pf} onChange={handleChange} type="tel" placeholder="(00) 00000-0000" />
                      <InputField label="E-mail" name="email_pf" value={form.email_pf} onChange={handleChange} type="email" />
                    </motion.div>
                  ) : (
                    <motion.div key="pj" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="contents">
                      <InputField label="Razão social" name="razao_social" value={form.razao_social} onChange={handleChange} />
                      <InputField label="Nome fantasia" name="nome_fantasia" value={form.nome_fantasia} onChange={handleChange} />
                      <InputField label="CNPJ" name="cnpj" value={form.cnpj} onChange={handleChange} placeholder="00.000.000/0000-00" />
                      <InputField label="Nome do responsável" name="responsible_name" value={form.responsible_name} onChange={handleChange} />
                      <InputField label="Telefone (WhatsApp)" name="phone_pj" value={form.phone_pj} onChange={handleChange} type="tel" placeholder="(00) 00000-0000" />
                      <InputField label="E-mail" name="email_pj" value={form.email_pj} onChange={handleChange} type="email" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Address */}
              <SectionTitle>Endereço</SectionTitle>
              <div className="grid sm:grid-cols-2 gap-4">
                <InputField label="CEP" name="cep" value={form.cep} onChange={handleChange} placeholder="00000-000" />
                <InputField label="Endereço" name="address" value={form.address} onChange={handleChange} />
                <InputField label="Número" name="number" value={form.number} onChange={handleChange} />
                <InputField label="Complemento" name="complement" value={form.complement} onChange={handleChange} required={false} />
                <InputField label="Bairro" name="neighborhood" value={form.neighborhood} onChange={handleChange} />
                <InputField label="Cidade" name="city" value={form.city} onChange={handleChange} />
                <SelectField label="Estado" name="state" value={form.state} onChange={handleChange} options={states} />
              </div>

              {/* Exhibitor info */}
              <SectionTitle>Informações do Expositor</SectionTitle>
              <div className="grid sm:grid-cols-2 gap-4">
                <InputField label="Segmento da marca" name="segment" value={form.segment} onChange={handleChange} placeholder="Ex: Gastronomia, Moda, Artesanato" />
                <InputField label="Faixa de preço" name="price_range" value={form.price_range} onChange={handleChange} placeholder="Ex: R$20 - R$150" />
                <InputField label="Instagram" name="instagram" value={form.instagram} onChange={handleChange} placeholder="@suamarca" />
                <InputField label="Site" name="website" value={form.website} onChange={handleChange} required={false} placeholder="https://" />
              </div>
              <div className="grid gap-4 mt-4">
                <InputField label="Descrição da marca" name="brand_description" value={form.brand_description} onChange={handleChange} type="textarea" placeholder="Conte um pouco sobre sua marca..." />
                <InputField label="Produtos que irá expor" name="products" value={form.products} onChange={handleChange} type="textarea" placeholder="Liste os principais produtos..." />
              </div>

              {/* Operations */}
              <SectionTitle>Operação no Evento</SectionTitle>
              <div className="grid sm:grid-cols-2 gap-4">
                <SelectField label="Precisa de energia?" name="needs_energy" value={form.needs_energy} onChange={handleChange} options={[{ value: "sim", label: "Sim" }, { value: "nao", label: "Não" }]} />
                <SelectField label="Vai vender alimentos ou bebidas?" name="sells_food" value={form.sells_food} onChange={handleChange} options={[{ value: "sim", label: "Sim" }, { value: "nao", label: "Não" }]} />
                <SelectField label="Precisa de espaço maior?" name="needs_larger_space" value={form.needs_larger_space} onChange={handleChange} options={[{ value: "sim", label: "Sim" }, { value: "nao", label: "Não" }]} />
                <InputField label="Quantas pessoas no stand?" name="stand_people" value={form.stand_people} onChange={handleChange} type="number" placeholder="Ex: 2" />
              </div>
              <div className="mt-4">
                <InputField label="Necessidades especiais" name="special_needs" value={form.special_needs} onChange={handleChange} type="textarea" required={false} placeholder="Descreva qualquer necessidade especial..." />
              </div>

              {/* Uploads */}
              <SectionTitle>Documentos e Arquivos</SectionTitle>
              <div className="grid sm:grid-cols-2 gap-4">
                <FileField label="Logo da marca" name="logo" onChange={handleChange} accept="image/*" />
                <FileField label="Fotos dos produtos" name="product_photos" onChange={handleChange} multiple accept="image/*" />
                <FileField label="Documento (CPF ou CNPJ)" name="document_file" onChange={handleChange} accept="image/*,.pdf" />
                <FileField label="Comprovante de endereço" name="address_proof" onChange={handleChange} accept="image/*,.pdf" />
              </div>

              {/* Terms */}
              <SectionTitle>Termos e Declarações</SectionTitle>
              <div className="flex flex-col gap-4">
                <CheckboxField label="Declaro que as informações são verdadeiras" name="terms_truth" checked={form.terms_truth} onChange={handleChange} />
                <CheckboxField label="Concordo com os termos do evento" name="terms_event" checked={form.terms_event} onChange={handleChange} />
                <CheckboxField label="Autorizo contato por WhatsApp e e-mail" name="terms_contact" checked={form.terms_contact} onChange={handleChange} />
              </div>

              <Button
                type="submit"
                variant="hero"
                size="lg"
                className="w-full mt-10"
                disabled={!form.terms_truth || !form.terms_event || !form.terms_contact}
              >
                Cadastrar minha marca
              </Button>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default ExhibitorForm;
