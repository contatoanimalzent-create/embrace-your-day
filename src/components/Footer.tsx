import logoTurismo from "@/assets/logo-secretaria-turismo.png";
import logoIDS from "@/assets/logo-instituto-ids.png";

const Footer = () => {
  return (
    <footer className="relative pt-16 pb-10 px-4 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C9A84C]/30 to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_0%,rgba(201,168,76,0.04),transparent)]" />

      <div className="relative max-w-4xl mx-auto">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-12 sm:gap-0 mb-14">
          <div className="flex flex-col items-center gap-5 sm:flex-1">
            <span className="text-[10px] uppercase tracking-[0.4em] text-white/30 font-semibold">Fomento</span>
            <div className="w-64 h-36 bg-white/[0.06] border border-white/10 rounded-2xl p-2 flex items-center justify-center hover:border-white/20 hover:bg-white/[0.09] transition-all duration-300">
              <img src={logoTurismo} alt="Secretaria de Turismo - GDF" className="w-full h-full object-contain scale-125" style={{ filter: "brightness(1.15) contrast(1.05)" }} />
            </div>
          </div>

          <div className="hidden sm:flex flex-col items-center gap-1 px-8">
            <div className="w-px h-6 bg-gradient-to-b from-transparent to-white/15" />
            <div className="w-1 h-1 rounded-full bg-[#C9A84C]/50" />
            <div className="w-px h-6 bg-gradient-to-b from-white/15 to-transparent" />
          </div>

          <div className="flex flex-col items-center gap-5 sm:flex-1">
            <span className="text-[10px] uppercase tracking-[0.4em] text-white/30 font-semibold">Realização</span>
            <a href="https://www.idsoficial.com/" target="_blank" rel="noopener noreferrer"
              className="group w-64 h-36 bg-white/[0.06] border border-white/10 rounded-2xl px-8 py-6 flex items-center justify-center hover:border-[#C9A84C]/30 hover:bg-white/[0.09] hover:shadow-[0_0_24px_rgba(201,168,76,0.08)] transition-all duration-300 block">
              <img src={logoIDS} alt="Instituto IDS" className="w-2/3 h-2/3 object-contain group-hover:scale-105 transition-transform duration-300" style={{ filter: "brightness(1.05)" }} />
            </a>
          </div>
        </div>

        <div className="border-t border-white/[0.06] pt-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <p className="text-[11px] text-white/20 tracking-wide">
            © {new Date().getFullYear()} Capital Mix — Todos os direitos reservados
          </p>
          <p className="text-[11px] text-white/15 tracking-wide">
            Estacionamento 12, Parque da Cidade · Brasília, DF
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;