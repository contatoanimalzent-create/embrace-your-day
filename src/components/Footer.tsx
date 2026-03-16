import logoTurismo from "@/assets/logo-secretaria-turismo.png";
import logoIDS from "@/assets/logo-instituto-ids.png";

const Footer = () => {
  return (
    <footer className="py-20 px-4 border-t border-border/20">
      <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-20">
        <div className="flex flex-col items-center gap-4">
          <span className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground/60">
            Fomento
          </span>
          <img
            src={logoTurismo}
            alt="Secretaria de Turismo - GDF"
            className="h-14 md:h-16 object-contain"
          />
        </div>
        <div className="flex flex-col items-center gap-4">
          <span className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground/60">
            Realização
          </span>
          <a
            href="https://www.idsoficial.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={logoIDS}
              alt="Instituto IDS"
              className="h-14 md:h-16 object-contain opacity-90 hover:opacity-100 transition-opacity duration-300"
            />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
