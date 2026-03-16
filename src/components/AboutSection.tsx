import { motion } from "framer-motion";
import { Sparkles, Users, TrendingUp } from "lucide-react";

const features = [
  {
    icon: Sparkles,
    title: "Experiência Única",
    description: "Um evento que une cultura, gastronomia, moda e entretenimento em um só lugar.",
  },
  {
    icon: Users,
    title: "Networking Premium",
    description: "Conecte-se com empreendedores, investidores e consumidores qualificados.",
  },
  {
    icon: TrendingUp,
    title: "Visibilidade Real",
    description: "Exponha sua marca para milhares de visitantes em um ambiente de alto padrão.",
  },
];

const AboutSection = () => {
  return (
    <section id="about" className="section-padding">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">
            O que é o <span className="text-gradient-gold">Capital Mix</span>?
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Um evento inovador que reúne os melhores expositores em gastronomia, moda, arte e lifestyle.
            Um novo movimento que valoriza marcas locais e cria oportunidades reais.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="bg-card rounded-xl p-8 border border-border/30 hover:border-primary/20 transition-colors duration-300"
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-5">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-display text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed text-sm">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
