import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

const benefits = [
  "Stand exclusivo com sua identidade visual",
  "Exposição para milhares de visitantes qualificados",
  "Divulgação nas redes sociais oficiais do evento",
  "Networking com outros empreendedores",
  "Infraestrutura completa e suporte técnico",
  "Ambiente premium e curado",
  "Cobertura de mídia e imprensa",
  "Certificado de participação",
];

const BenefitsSection = () => {
  return (
    <section id="benefits" className="section-padding relative">
      <div className="absolute inset-0 bg-gold-glow opacity-30" />
      <div className="relative max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">
            Por que <span className="text-gradient-gold">expor</span>?
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Vantagens exclusivas para quem faz parte do Capital Mix.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          {benefits.map((benefit, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="flex items-start gap-3 p-4 rounded-lg bg-card/50 border border-border/20"
            >
              <div className="w-6 h-6 rounded-full bg-primary/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Check className="w-3.5 h-3.5 text-primary" />
              </div>
              <span className="text-sm text-secondary-foreground">{benefit}</span>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <Button variant="hero" size="lg" asChild>
            <a href="#exhibitor">Quero ser expositor</a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
