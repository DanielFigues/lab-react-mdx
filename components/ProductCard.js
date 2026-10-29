import Image from "next/image";
import Link from "next/link";

export default function ProductCard({
  slug,
  name,
  category,
  description,
  image,
  alt,
}) {
  return (
    <article className="product-card">
      <div className="product-card__media">
        <Image
          src={image}
          alt={alt}
          width={800}
          height={600}
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
        />
      </div>
      <div className="product-card__body">
        {category ? (
          <p className="product-card__category">{category}</p>
        ) : null}
        <h3 className="product-card__title">
          <Link className="product-card__link" href={`/produtos/${slug}`}>
            {name}
          </Link>
        </h3>
        {description ? (
          <p className="product-card__description">{description}</p>
        ) : null}
      </div>
    </article>
  );
}
