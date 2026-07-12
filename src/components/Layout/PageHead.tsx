export function PageHead({eyebrow, title, text}: {
  eyebrow: string;
  title: string;
  text: string;
}) {
  return <div className="page-head">
    <div className="eyebrow">{eyebrow}</div>
    <h1>{title}</h1>
    <p>{text}</p>
  </div>;
}
