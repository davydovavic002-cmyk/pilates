import { Link, useParams, Navigate } from 'react-router-dom';
import { legalDocuments, legalLinks } from '../data/legal';
import { STUDIO } from '../data/images';
import { Footer } from '../components/layout/Footer';
import { isPortfolioEmbed } from '../embed/portfolioEmbed';

export function LegalPage() {
  const { slug } = useParams<{ slug: string }>();
  const doc = slug ? legalDocuments[slug] : null;

  if (!doc) return <Navigate to="/legal/privacy" replace />;

  return (
    <>
      <article className="max-w-3xl mx-auto px-6 lg:px-8 py-12 lg:py-16">
        <Link
          to="/"
          className="text-[11px] tracking-[0.15em] uppercase text-laurel/55 hover:text-laurel-deep transition-colors mb-8 inline-block"
        >
          ← Back to home
        </Link>

        <h1 className="font-serif text-4xl text-laurel-deep mb-2">{doc.title}</h1>
        <p className="text-xs text-laurel/50 mb-10">Last updated: {doc.updated} · {STUDIO.name}</p>

        <div className="space-y-8">
          {doc.sections.map((section) => (
            <section key={section.heading}>
              <h2 className="font-serif text-xl text-laurel-deep mb-3">{section.heading}</h2>
              <p className="text-sm text-laurel/75 leading-relaxed">{section.body}</p>
            </section>
          ))}
        </div>

        <nav className="mt-14 pt-8 border-t border-misty/30">
          <p className="text-[10px] tracking-[0.2em] uppercase text-laurel/45 mb-4">Other documents</p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {legalLinks
              .filter((l) => !l.to.endsWith(doc.slug))
              .map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="text-sm text-laurel/65 hover:text-laurel-deep transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
          </ul>
        </nav>
      </article>
      {!isPortfolioEmbed() && <Footer />}
    </>
  );
}
