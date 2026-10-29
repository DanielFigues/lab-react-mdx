import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container">
      <h1>Página não encontrada</h1>
      <p>Confira o slug e se o arquivo MDX existe na coleção.</p>
      <Link href="/">Voltar ao início</Link>
    </div>
  );
}
