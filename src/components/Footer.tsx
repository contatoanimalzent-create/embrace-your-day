import logoTurismo from "@/assets/logo-secretaria-turismo.png";
import logoIDS from "@/assets/logo-instituto-ids.png";

const Footer = () => {
  return (
    <footer className="py-16 md:py-20 px-4 border-t border-border/15">
      <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-16 sm:gap-24">
        <div className="flex flex-col items-center gap-4">
          <span className="text-[10px] uppercase tracking-[0.35em] text-muted-foreground/50 font-medium">
            Fomento
          </span>
          <img
            src={logoTurismo}
            alt="Secretaria de Turismo - GDF"
            className="h-12 md:h-14 object-contain opacity-85"
          />
        </div>
        <div className="w-px h-12 bg-border/20 hidden sm:block" />
        <div className="flex flex-col items-center gap-4">
          <span className="text-[10px] uppercase tracking-[0.35em] text-muted-foreground/50 font-medium">
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
              className="h-12 md:h-14 object-contain opacity-80 hover:opacity-100 transition-opacity duration-300"
            />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
