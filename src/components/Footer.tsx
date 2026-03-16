import logoTurismo from "@/assets/logo-secretaria-turismo.png";
import logoIDS from "@/assets/logo-instituto-ids.png";

const Footer = () => {
  return (
    <footer className="py-16 px-4 border-t border-border/20">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-center gap-16">
        <div className="flex flex-col items-center gap-3">
          <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Fomento</span>
          <img src={logoTurismo} alt="Secretaria de Turismo" className="h-16 opacity-80" />
        </div>
        <div className="flex flex-col items-center gap-3">
          <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Realização</span>
          <a href="https://institutoids.org.br" target="_blank" rel="noopener noreferrer">
            <img src={logoIDS} alt="Instituto IDS" className="h-16 opacity-80 hover:opacity-100 transition-opacity" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
