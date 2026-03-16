import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

const benefits = [
  "Stand com identidade visual e posicionamento estratégico",
  "Fluxo de público qualificado durante todo o evento",
  "Exposição nas mídias e comunicação oficial",
  "Conexão com marcas, criadores e empreendedores",
  "Infraestrutura completa e suporte no local",
  "Ambiente visual premium e curadoria de expositores",
  "Presença em conteúdo e cobertura do evento",
  "Participação em um evento com proposta diferenciada",
];

const BenefitsSection = () => {
  return (
    <section
      id="benefits"
      className="relative overflow-hidden bg-black px-6 py-24 md:px-10 md:py-32"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,180,0,0.10),transparent_30%)]" />
      <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />

      <div className="relative z-10 mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14 max-w-2xl"
        >
          <p className="mb-5 text-[11px] font-medium uppercase tracking-[0.34em] text-primary md:text-xs">
            Para Expositores
          </p>

          <h2 className="text-3xl font-semibold leading-tight text-white md:text-5xl lg:text-6xl">
            Por que fazer parte do Capital Mix
          </h2>

          <p className="mt-6 text-base leading-relaxed text-white/70 md:text-lg">
            Mais do que presença, o evento foi pensado para gerar percepção,
            movimento e oportunidade real para as marcas envolvidas.
          </p>
        </motion.div>

        <div className="grid gap-4 md:grid-cols-2">
          {benefits.map((benefit, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="flex items-start gap-4 rounded-xl border border-white/10 bg-white/[0.04] px-5 py-4 backdrop-blur-sm transition-all duration-300 hover:border-primary/30 hover:bg-white/[0.06]"
            >
              <div className="mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full border border-white/15 bg-primary/15">
                <Check className="h-3.5 w-3.5 text-primary" />
              </div>

              <span className="text-sm leading-relaxed text-white/75 md:text-[15px]">
                {benefit}
              </span>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-14 flex justify-start"
        >
          <Button variant="hero" size="lg" asChild>
            <a href="#exhibitor">Quero Expor</a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default BenefitsSection;