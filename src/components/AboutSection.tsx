import { motion } from "framer-motion";
import { Sparkles, Users, TrendingUp } from "lucide-react";

const features = [
  {
    icon: Sparkles,
    title: "Experiência que marca",
    description:
      "Muito mais que uma feira: um encontro entre cultura, gastronomia, marcas, ativações e atmosfera.",
  },
  {
    icon: Users,
    title: "Público e conexões",
    description:
      "Um ambiente pensado para aproximar marcas, empreendedores, criadores e consumidores com real potencial de relacionamento.",
  },
  {
    icon: TrendingUp,
    title: "Presença e visibilidade",
    description:
      "Exposição em um contexto forte, visual e memorável, capaz de gerar percepção de valor e oportunidade de negócio.",
  },
];

const AboutSection = () => {
  return (
    <section
      id="about"
      className="relative overflow-hidden bg-black px-6 py-24 md:px-10 md:py-32"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,180,0,0.10),transparent_26%),radial-gradient(circle_at_bottom_right,rgba(255,140,0,0.08),transparent_22%)]" />
      <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="grid items-start gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65 }}
            className="max-w-xl"
          >
            <p className="mb-5 text-[11px] font-medium uppercase tracking-[0.34em] text-primary md:text-xs">
              Sobre o Evento
            </p>

            <h2 className="text-3xl font-semibold leading-tight text-white md:text-5xl lg:text-6xl">
              O Capital Mix nasce para ser um evento com identidade, energia e presença.
            </h2>

            <p className="mt-6 text-base leading-relaxed text-white/72 md:text-lg">
              Um projeto criado para reunir experiências, marcas e público em um
              ambiente visualmente forte, contemporâneo e fora do padrão comum.
            </p>

            <p className="mt-5 text-base leading-relaxed text-white/58 md:text-lg">
              Mais do que ocupar espaço, a proposta é criar desejo, circulação,
              conexão e percepção real de valor para quem participa e para quem expõe.
            </p>
          </motion.div>

          <div className="grid gap-5 md:grid-cols-3 lg:grid-cols-1">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: i * 0.12 }}
                className="group rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-7 backdrop-blur-sm transition-all duration-300 hover:border-primary/30 hover:bg-white/[0.06]"
              >
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-primary/10 transition-all duration-300 group-hover:bg-primary/15">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>

                <h3 className="text-xl font-semibold text-white">
                  {feature.title}
                </h3>

                <p className="mt-3 text-sm leading-relaxed text-white/62 md:text-[15px]">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;