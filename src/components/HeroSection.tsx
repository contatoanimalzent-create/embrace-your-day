import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import heroBg from "@/assets/hero-bg.jpg";
import logo from "@/assets/capital-mix-logo.png";

const HeroSection = () => {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroBg})` }}
      />
      <div className="absolute inset-0 bg-background/60" />

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6">
            <span className="text-gradient-gold">Capital Mix</span>
          </h1>
          <p className="text-lg md:text-xl text-secondary-foreground max-w-2xl mx-auto mb-4 leading-relaxed">
            O maior evento de cultura, gastronomia e negócios da capital.
          </p>
          <p className="text-muted-foreground mb-10">
            Uma experiência premium que conecta marcas, pessoas e oportunidades.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button variant="hero" size="lg" asChild>
            <a href="#exhibitor">Seja um Expositor</a>
          </Button>
          <Button variant="hero-outline" size="lg" asChild>
            <a href="#about">Saiba Mais</a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
