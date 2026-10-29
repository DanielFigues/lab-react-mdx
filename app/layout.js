import Link from "next/link";
import { BRAND } from "@/config/brand";
import "./globals.css";

export const metadata = {
  title: {
    default: `${BRAND.name} — ${BRAND.tagline}`,
    template: `%s | ${BRAND.name}`,
  },
  description: `Conheça os cafés e acessórios da ${BRAND.name}.`,
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>
        <a className="skip-link" href="#conteudo">
          Pular para o conteúdo
        </a>
        <header className="site-header">
          <div className="container site-header__inner">
            <Link className="brand" href="/">
              <span className="brand__name">{BRAND.name}</span>
              <span className="brand__tagline">{BRAND.tagline}</span>
            </Link>
            <nav aria-label="Navegação principal">
              <ul className="site-nav">
                <li>
                  <Link href="/#produtos">Produtos</Link>
                </li>
                <li>
                  <Link href="/#empresa">Empresa</Link>
                </li>
                <li>
                  <Link href="/#equipe">Equipe</Link>
                </li>
              </ul>
            </nav>
          </div>
        </header>
        <main id="conteudo">{children}</main>
        <footer className="site-footer">
          <div className="container site-footer__inner">
            <div>
              <p className="site-footer__brand">
                {BRAND.name} · {BRAND.tagline}
              </p>
              <p>Torrefação artesanal em Minas Gerais.</p>
            </div>
            <p className="site-footer__credit">
              Fotos: Wikimedia Commons —{" "}
              <Link href="/atribuicoes.txt">Créditos das imagens</Link>.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
