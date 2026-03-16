import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import heroBg from "@/assets/hero-bg.jpg";
import logo from "@/assets/capital-mix-logo.png";

const HeroSection = () => {
  return (
    <section id="hero" className="relative min-h-screen overflow-hidden bg-black">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBg})` }}
      />

      <div className="absolute inset-0 bg-black/65" />
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-black/25" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30" />

      <div className="absolute -left-24 top-24 h-72 w-72 rounded-full bg-primary/20 blur-3xl" />
      <div className="absolute bottom-10 right-0 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl items-center px-6 pb-16 pt-28 md:px-10 lg:px-12">
        <div className="grid w-full items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="max-w-3xl">
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-5 text-[11px] font-medium uppercase tracking-[0.34em] text-white/65 md:text-xs"
            >
              Esplanada dos Ministérios • Brasília/DF
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.08 }}
              className="text-4xl font-semibold leading-[0.98] text-white md:text-6xl lg:text-7xl"
            >
              Um novo encontro entre
              <span className="block text-primary">
                cultura, gastronomia e experiências.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.16 }}
              className="mt-6 max-w-2xl text-base leading-relaxed text-white/75 md:text-xl"
            >
              O Capital Mix nasce para reunir público, marcas e ativações em um
              evento vibrante, visual e memorável no coração de Brasília.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.24 }}
              className="mt-10 flex flex-col gap-4 sm:flex-row"
            >
              <Button variant="hero" size="lg" asChild className="min-w-[220px]">
                <a href="#about">Conhecer o Evento</a>
              </Button>

              <Button
                variant="hero-outline"
                size="lg"
                asChild
                className="min-w-[220px]"
              >
                <a href="#exhibitor">Quero Expor</a>
              </Button>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.18 }}
            className="flex items-center justify-center lg:justify-end"
          >
            <div className="relative w-full max-w-[520px]">
              <div className="absolute inset-0 rounded-[2rem] bg-primary/15 blur-3xl" />
              <div className="relative rounded-[2rem] border border-white/10 bg-black/35 p-6 shadow-[0_30px_80px_rgba(0,0,0,0.45)] backdrop-blur-md md:p-8">
                <img
                  src={logo}
                  alt="Capital Mix"
                  className="w-full object-contain drop-shadow-[0_18px_36px_rgba(0,0,0,0.55)]"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.8 }}
          className="flex h-9 w-5 items-start justify-center rounded-full border border-white/20 pt-1.5"
        >
          <div className="h-1.5 w-1 rounded-full bg-white/50" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;