import EditorialContent from "@/components/EditorialContent";
import ProductCard from "@/components/ProductCard";
import TeamCard from "@/components/TeamCard";
import { BRAND } from "@/config/brand";
import { getContent, listContent } from "@/lib/content.mjs";

export async function generateMetadata() {
  const empresa = await getContent("paginas", "empresa");
  return {
    title: {
      absolute: empresa?.frontmatter.title || `${BRAND.name} — ${BRAND.tagline}`,
    },
    description:
      empresa?.frontmatter.lead ||
      `Cafés e acessórios da ${BRAND.name}, torrefação artesanal em Minas Gerais.`,
  };
}

export default async function Home() {
  const [empresa, produtos, equipe] = await Promise.all([
    getContent("paginas", "empresa"),
    listContent("produtos"),
    listContent("equipe"),
  ]);

  return (
    <>
      <section id="empresa" className="hero" aria-labelledby="empresa-titulo">
        {empresa ? (
          <>
            <p className="eyebrow">Empresa</p>
            <h1 id="empresa-titulo">
              {empresa.frontmatter.title || BRAND.name}
            </h1>
            {empresa.frontmatter.lead ? (
              <p className="lead">{empresa.frontmatter.lead}</p>
            ) : null}
            <EditorialContent source={empresa.content} />
          </>
        ) : (
          <>
            <p className="eyebrow">{BRAND.tagline}</p>
            <h1 id="empresa-titulo">{BRAND.name}</h1>
            <p className="lead">
              A apresentação da empresa não está disponível no momento.
            </p>
          </>
        )}
      </section>

      <section
        id="produtos"
        className="section"
        aria-labelledby="produtos-titulo"
      >
        <h2 id="produtos-titulo">Produtos</h2>
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
      </section>

      <section id="equipe" className="section" aria-labelledby="equipe-titulo">
        <h2 id="equipe-titulo">Equipe</h2>
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
          <p className="empty-state">Nenhum integrante cadastrado por enquanto.</p>
        )}
      </section>
    </>
  );
}
