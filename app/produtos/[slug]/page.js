import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import EditorialContent from "@/components/EditorialContent";
import { BRAND } from "@/config/brand";
import { getContent, listContent } from "@/lib/content.mjs";

const hasText = (value) => typeof value === "string" && value.trim() !== "";

const productName = (frontmatter) =>
  hasText(frontmatter?.name) ? frontmatter.name.trim() : "Produto";

export async function generateStaticParams() {
  return (await listContent("produtos")).map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const doc = await getContent("produtos", slug);

  if (!doc) {
    return {
      title: { absolute: `Produto não encontrado | ${BRAND.name}` },
    };
  }

  return {
    title: { absolute: `${productName(doc.frontmatter)} | ${BRAND.name}` },
    ...(hasText(doc.frontmatter?.description)
      ? { description: doc.frontmatter.description }
      : {}),
  };
}

export default async function Page({ params }) {
  const { slug } = await params;
  const doc = await getContent("produtos", slug);
  if (!doc) notFound();

  const { content } = doc;
  const frontmatter = doc.frontmatter ?? {};
  const name = productName(frontmatter);
  const category = hasText(frontmatter.category) ? frontmatter.category : null;
  const description = hasText(frontmatter.description)
    ? frontmatter.description
    : null;
  const showImage =
    hasText(frontmatter.image) && hasText(frontmatter.alt);

  return (
    <div className="container">
      <article className="product-detail">
        <Link className="product-detail__back" href="/#produtos">
          Voltar para os produtos
        </Link>

        <div
          className={
            showImage
              ? "product-detail__grid"
              : "product-detail__grid product-detail__grid--single"
          }
        >
          {showImage ? (
            <div className="product-detail__media">
              <Image
                src={frontmatter.image}
                alt={frontmatter.alt}
                width={1200}
                height={900}
                sizes="(min-width: 1024px) 50vw, 100vw"
              />
            </div>
          ) : null}

          <div className="product-detail__info">
            {category ? <p className="eyebrow">{category}</p> : null}
            <h1>{name}</h1>
            {description ? <p className="lead">{description}</p> : null}
            <EditorialContent source={content} />
          </div>
        </div>
      </article>
    </div>
  );
}
