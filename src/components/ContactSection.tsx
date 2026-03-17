import { useState, type ChangeEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Mail, Phone, MapPin, Send, Sparkles, Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";

interface ContactForm {
  name: string; email: string; phone: string; subject: string; message: string;
}

const initialForm: ContactForm = { name: "", email: "", phone: "", subject: "", message: "" };

const fieldBase = "w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none transition-all duration-200 focus:border-[#C9A84C]/60 focus:bg-white/[0.07] focus:shadow-[0_0_0_3px_rgba(201,168,76,0.08)] hover:border-white/20";

const ContactSection = () => {
  const [form, setForm] = useState<ContactForm>(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const canSubmit = !!(form.name && form.email && form.subject && form.message);

  const handleSubmit = async () => {
    if (!canSubmit) return;
    setLoading(true); setError(null);
    try {
      const { error: dbError } = await supabase.from("contacts").insert({
        name: form.name, email: form.email, phone: form.phone,
        subject: form.subject, message: form.message,
      });
      if (dbError) throw dbError;
      setSubmitted(true);
    } catch (err: any) { setError("Erro ao enviar mensagem. Tente novamente."); console.error(err); }
    finally { setLoading(false); }
  };

  const infos = [
    {
      icon: <MapPin className="w-4 h-4 text-[#C9A84C]" />,
      label: "Local — Ver no Mapa",
      value: "Estacionamento 12 — Parque da Cidade",
      sub: "Ao lado do Parque Ana Lídia · Brasília, DF",
      href: "https://share.google/Y5f1iHLEEJbiIeeqr",
    },
    {
      icon: <Mail className="w-4 h-4 text-[#C9A84C]" />,
      label: "E-mail",
      value: "institutonacionalids@gmail.com",
      sub: "Respondemos em até 24h",
      href: "mailto:institutonacionalids@gmail.com",
    },
    {
      icon: <Phone className="w-4 h-4 text-[#C9A84C]" />,
      label: "WhatsApp / Telefone",
      value: "+55 (61) 99307-3003",
      sub: "Seg a Sex · 9h às 18h",
      href: "https://wa.me/5561993073003",
    },
  ];

  const subjects = [
    { value: "expositor", label: "Quero ser expositor" }, { value: "patrocinio", label: "Patrocínio e parcerias" },
    { value: "imprensa", label: "Imprensa" }, { value: "visitante", label: "Informações para visitantes" },
    { value: "outro", label: "Outro assunto" },
  ];

  return (
    <section id="contato" className="relative py-24 px-4 overflow-hidden">
      <div className="absolute inset-0 bg-[#080808]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(201,168,76,0.06),transparent)]" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C9A84C]/30 to-transparent" />
      <div className="relative max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-[#C9A84C]/10 border border-[#C9A84C]/20 rounded-full px-4 py-1.5 text-xs text-[#C9A84C] tracking-widest uppercase font-medium mb-6"><Sparkles className="w-3 h-3" />Fale Conosco</div>
          <h2 className="text-3xl sm:text-5xl font-black text-white leading-[1.05] tracking-tight mb-4">Entre em{" "}<span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C9A84C] via-[#E8CC7A] to-[#C9A84C]">Contato</span></h2>
          <p className="text-white/40 max-w-md mx-auto text-sm leading-relaxed">Dúvidas, parcerias ou informações sobre o evento — estamos aqui para ajudar.</p>
        </motion.div>
        <div className="grid lg:grid-cols-5 gap-8">
          <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="lg:col-span-2 flex flex-col gap-4">
            {infos.map((info, i) => {
              const inner = (
                <>
                  <div className="w-9 h-9 rounded-xl bg-[#C9A84C]/10 border border-[#C9A84C]/20 flex items-center justify-center flex-shrink-0 mt-0.5">{info.icon}</div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-white/30 font-semibold mb-1">{info.label}</p>
                    <p className="text-sm font-semibold text-white/80">{info.value}</p>
                    <p className="text-xs text-white/35 mt-0.5 leading-relaxed">{info.sub}</p>
                  </div>
                </>
              );
              const cls = "bg-white/[0.03] border border-white/[0.06] rounded-2xl p-5 flex items-start gap-4 hover:border-[#C9A84C]/20 hover:bg-white/[0.05] transition-all duration-300";
              return info.href ? <a key={i} href={info.href} target="_blank" rel="noopener noreferrer" className={cls}>{inner}</a> : <div key={i} className={cls}>{inner}</div>;
            })}
            <div className="bg-white/[0.02] border border-white/[0.05] rounded-2xl overflow-hidden relative p-5">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_70%_at_50%_50%,rgba(201,168,76,0.05),transparent)]" />
              <div className="relative z-10 text-center mb-4">
                <MapPin className="w-6 h-6 text-[#C9A84C]/50 mx-auto mb-2" />
                <p className="text-xs text-white/25 leading-relaxed">Brasília · DF<br />Estacionamento 12 — Parque da Cidade</p>
              </div>
              <div className="relative z-10 flex gap-3">
                <a href="https://share.google/Y5f1iHLEEJbiIeeqr" target="_blank" rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 bg-white/[0.05] border border-white/10 rounded-xl py-2.5 text-xs text-white/50 hover:border-[#C9A84C]/40 hover:text-white/80 hover:bg-white/[0.08] transition-all duration-200">
                  <MapPin className="w-3.5 h-3.5 text-[#C9A84C]" />
                  Google Maps
                </a>
                <a href="https://waze.com/ul?ll=-15.7942287,-47.9303303&navigate=yes" target="_blank" rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 bg-white/[0.05] border border-white/10 rounded-xl py-2.5 text-xs text-white/50 hover:border-[#C9A84C]/40 hover:text-white/80 hover:bg-white/[0.08] transition-all duration-200">
                  <svg className="w-3.5 h-3.5 text-[#C9A84C]" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2zm-1 5a1 1 0 100 2 1 1 0 000-2zm4 0a1 1 0 100 2 1 1 0 000-2zm-2 3c-2.485 0-4.5 1.567-4.5 3.5 0 1.16.7 2.188 1.781 2.844C10.093 17.53 10 18.257 10 19h4c0-.743-.093-1.47-.281-2.156C14.8 16.188 15.5 15.16 15.5 14c0-1.933-2.015-3.5-4.5-3.5z"/></svg>
                  Waze
                </a>
              </div>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }} className="lg:col-span-3">
            <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-6 sm:p-8">
              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div key="success" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center justify-center py-16 text-center">
                    <div className="w-16 h-16 rounded-full bg-[#C9A84C]/10 border border-[#C9A84C]/30 flex items-center justify-center mb-6 shadow-[0_0_32px_rgba(201,168,76,0.2)]"><Check className="w-7 h-7 text-[#C9A84C]" strokeWidth={2.5} /></div>
                    <h3 className="text-xl font-black text-white mb-2 tracking-tight">Mensagem enviada!</h3>
                    <p className="text-white/40 text-sm max-w-xs leading-relaxed">Obrigado pelo contato. Nossa equipe responderá em breve.</p>
                    <button onClick={() => { setForm(initialForm); setSubmitted(false); }} className="mt-8 text-xs text-[#C9A84C]/60 hover:text-[#C9A84C] transition-colors tracking-widest uppercase">Enviar nova mensagem</button>
                  </motion.div>
                ) : (
                  <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <div className="grid sm:grid-cols-2 gap-4 mb-4">
                      <div className="flex flex-col gap-2">
                        <label className="text-xs font-medium tracking-widest uppercase text-white/40">Nome <span className="text-[#C9A84C]">*</span></label>
                        <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="Seu nome" className={fieldBase} />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="text-xs font-medium tracking-widest uppercase text-white/40">E-mail <span className="text-[#C9A84C]">*</span></label>
                        <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="seu@email.com" className={fieldBase} />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="text-xs font-medium tracking-widest uppercase text-white/40">WhatsApp</label>
                        <input type="tel" name="phone" value={form.phone} onChange={handleChange} placeholder="(00) 00000-0000" className={fieldBase} />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="text-xs font-medium tracking-widest uppercase text-white/40">Assunto <span className="text-[#C9A84C]">*</span></label>
                        <select name="subject" value={form.subject} onChange={handleChange} className={`${fieldBase} appearance-none cursor-pointer`} style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23ffffff40' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`, backgroundRepeat: "no-repeat", backgroundPosition: "right 14px center" }}>
                          <option value="" className="bg-[#0e0e0e]">Selecione...</option>
                          {subjects.map((s) => <option key={s.value} value={s.value} className="bg-[#0e0e0e]">{s.label}</option>)}
                        </select>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2 mb-6">
                      <label className="text-xs font-medium tracking-widest uppercase text-white/40">Mensagem <span className="text-[#C9A84C]">*</span></label>
                      <textarea name="message" value={form.message} onChange={handleChange} placeholder="Escreva sua mensagem..." rows={5} className={`${fieldBase} resize-none leading-relaxed`} />
                    </div>
                    {error && <p className="text-red-400 text-sm mb-4 text-center">{error}</p>}
                    <button type="button" onClick={handleSubmit} disabled={!canSubmit || loading} className="w-full flex items-center justify-center gap-2 bg-[#C9A84C] hover:bg-[#d4b45a] disabled:opacity-30 disabled:cursor-not-allowed text-black text-sm font-bold px-7 py-3.5 rounded-xl transition-all duration-200 shadow-[0_0_24px_rgba(201,168,76,0.25)]">
                      {loading ? <><Loader2 className="w-4 h-4 animate-spin" />Enviando...</> : <><Send className="w-4 h-4" />Enviar mensagem</>}
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;