import { useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "@/assets/capital-mix-logo.png";

const navLinks = [
  { label: "Início", href: "#hero" },
  { label: "O Evento", href: "#about" },
  { label: "Benefícios", href: "#benefits" },
  { label: "Contato", href: "#contato" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-black/60 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:h-20 md:px-8">

        {/* Logo */}
        <a href="#hero" className="relative z-10 flex items-center">
          <img
            src={logo}
            alt="Capital Mix"
            className="h-10 md:h-12 object-contain drop-shadow-[0_8px_20px_rgba(0,0,0,0.6)]"
          />
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[11px] uppercase tracking-[0.25em] text-white/60 hover:text-white transition-all duration-300 font-medium"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* CTA Desktop */}
        <div className="hidden md:flex items-center gap-4">
          <a
            href="#expositor"
            className="rounded-full border border-white/20 px-5 py-2 text-[11px] uppercase tracking-[0.25em] text-white/80 hover:bg-white hover:text-black transition-all duration-300"
          >
            Quero Expor
          </a>
        </div>

        {/* Mobile Button */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-white relative z-10"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "100vh" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-black/95 backdrop-blur-xl"
          >
            <div className="flex flex-col items-center justify-center h-full gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="text-sm uppercase tracking-[0.3em] text-white/70 hover:text-white transition-all"
                >
                  {link.label}
                </a>
              ))}

              <a
                href="#expositor"
                onClick={() => setOpen(false)}
                className="mt-4 rounded-full border border-white/30 px-6 py-3 text-sm uppercase tracking-[0.3em] text-white hover:bg-white hover:text-black transition-all"
              >
                Quero Expor
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;