import Image from "next/image";

export default function TeamCard({ slug, name, position, image, alt, children }) {
  return (
    <article id={`integrante-${slug}`} className="team-card">
      <div className="team-card__media">
        <Image
          src={image}
          alt={alt}
          width={800}
          height={800}
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
        />
      </div>
      <div className="team-card__body">
        <h3 className="team-card__name">{name}</h3>
        {position ? <p className="team-card__position">{position}</p> : null}
        {children ? <div className="team-card__bio">{children}</div> : null}
      </div>
    </article>
  );
}
