import Image from "next/image";
import Link from "next/link";
import EditorialContent from "@/components/EditorialContent";
import ProductCard from "@/components/ProductCard";
import TeamCard from "@/components/TeamCard";
import { BRAND } from "@/config/brand";
import { getContent, listContent } from "@/lib/content.mjs";

const hasText = (value) => typeof value === "string" && value.trim() !== "";

export async function generateMetadata() {
  const empresa = await getContent("paginas", "empresa");
  return {
    title: {
      absolute: empresa?.frontmatter?.title || `${BRAND.name} — ${BRAND.tagline}`,
    },
    description:
      empresa?.frontmatter?.lead ||
      `Conheça os cafés e acessórios da ${BRAND.name}.`,
  };
}

export default async function Home() {
  const [empresa, produtos, equipe] = await Promise.all([
    getContent("paginas", "empresa"),
    listContent("produtos"),
    listContent("equipe"),
  ]);

  const firstProduct = produtos[0]?.frontmatter ?? {};
  const heroImage =
    hasText(firstProduct.image) && hasText(firstProduct.alt)
      ? firstProduct
      : null;

  return (
    <>
      <section className="hero" aria-labelledby="inicio-titulo">
        <div className="container hero__inner">
          <div className="hero__content">
            <p className="eyebrow">
              {empresa ? "Empresa" : BRAND.tagline}
            </p>
            <h1 id="inicio-titulo">
              {empresa?.frontmatter?.title || BRAND.name}
            </h1>
            {empresa?.frontmatter?.lead ? (
              <p className="lead">{empresa.frontmatter.lead}</p>
            ) : null}
            <Link className="button button--primary" href="#produtos">
              Ver produtos
            </Link>
          </div>
          {heroImage ? (
            <div className="hero__media">
              <Image
                src={heroImage.image}
                alt={heroImage.alt}
                width={1200}
                height={900}
                sizes="(min-width: 1024px) 45vw, 100vw"
                priority
              />
            </div>
          ) : null}
        </div>
      </section>

      <section
        id="produtos"
        className="section section--alt"
        aria-labelledby="produtos-titulo"
      >
        <div className="container">
          <p className="eyebrow">Produtos</p>
          <h2 id="produtos-titulo">Cafés e acessórios da casa</h2>
          <p className="section__lead">
            Escolha o lote ou a peça que combina com a sua rotina.
          </p>
          {produtos.length ? (
            <ul className="card-grid product-grid">
              {produtos.map(({ slug, frontmatter }) => (
                <li key={slug}>
                  <ProductCard
                    slug={slug}
                    name={frontmatter.name}
                    category={frontmatter.category}
                    description={frontmatter.description}
                    image={frontmatter.image}
                    alt={frontmatter.alt}
                  />
                </li>
              ))}
            </ul>
          ) : (
            <p className="empty-state">Nenhum produto cadastrado por enquanto.</p>
          )}
        </div>
      </section>

      <section
        id="empresa"
        className="section"
        aria-labelledby="empresa-titulo"
      >
        <div className="container company">
          <div className="company__intro">
            <p className="eyebrow">Empresa</p>
            <h2 id="empresa-titulo">
              {empresa?.frontmatter?.title || BRAND.name}
            </h2>
            {empresa?.frontmatter?.lead ? (
              <p className="lead">{empresa.frontmatter.lead}</p>
            ) : null}
          </div>
          <div className="company__body">
            {empresa ? (
              <EditorialContent source={empresa.content} />
            ) : (
              <p className="empty-state">
                A apresentação da empresa não está disponível no momento.
              </p>
            )}
          </div>
        </div>
      </section>

      <section
        id="equipe"
        className="section section--alt"
        aria-labelledby="equipe-titulo"
      >
        <div className="container">
          <p className="eyebrow">Equipe</p>
          <h2 id="equipe-titulo">Quem faz a casa</h2>
          <p className="section__lead">
            Pessoas que torram, preparam e selecionam cada lote.
          </p>
          {equipe.length ? (
            <ul className="card-grid team-grid">
              {equipe.map(({ slug, frontmatter, content }) => (
                <li key={slug}>
                  <TeamCard
                    slug={slug}
                    name={frontmatter.name}
                    position={frontmatter.position}
                    image={frontmatter.image}
                    alt={frontmatter.alt}
                  >
                    <EditorialContent source={content} />
                  </TeamCard>
                </li>
              ))}
            </ul>
          ) : (
            <p className="empty-state">
              Nenhum integrante cadastrado por enquanto.
            </p>
          )}
        </div>
      </section>
    </>
  );
}
