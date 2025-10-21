'use client';

import Image from 'next/image';
import Link from 'next/link';
import { cvData } from '../data/cv-data';

export default function CV1Page() {
  return (
    <div className="min-h-screen bg-gray-100 print:bg-white">
      {/* Navigation */}
      <div className="print:hidden bg-white shadow-sm sticky top-0 z-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900 md:text-2xl text-lg">
              CV DE CAROLINE KARPEL<br className="md:hidden" />
              <span className="md:inline"> </span>VERSION 1 ✨
            </h1>
            <div className="flex items-center gap-4">
              <div className="flex gap-2">
                <button
                  onClick={() => window.print()}
                  className="px-4 py-2 border-2 border-gray-900 text-gray-900 text-sm uppercase tracking-wider hover:bg-gray-900 hover:text-white transition-colors"
                >
                  IMPRIMER
                </button>
                <Link
                  href="/"
                  className="px-4 py-2 bg-gray-900 text-white text-sm uppercase tracking-wider hover:bg-gray-800 transition-colors"
                >
                  RETOUR
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CV 1 - Classique élégant avec touches de couleur */}
      <div className="py-8 print:py-0 px-6 md:px-12">
        <div className="print:w-[210mm] print:h-[297mm] print:m-0 print:p-0">
          <div className="max-w-4xl mx-auto bg-white p-4 print:p-4 shadow-lg print:shadow-none">
            {/* Header sans photo */}
            <div className="border-b-2 border-blue-600 pb-1 mb-1">
              <h1 className="text-3xl font-bold uppercase tracking-wider mb-0.5 text-blue-600">{cvData.nom}</h1>
              <p className="text-base text-blue-800 uppercase tracking-wide font-semibold">{cvData.posteActuel}</p>
              <p className="text-sm text-gray-700 mt-0.5">{cvData.localisation} · 📧 {cvData.email} · 📱 {cvData.telephone}</p>
            </div>

            {/* Profil Professionnel */}
            <section className="mb-1">
              <h2 className="text-sm font-bold uppercase tracking-wider border-b-2 border-blue-600 pb-0.5 mb-0.5 text-blue-600">PROFIL PROFESSIONNEL</h2>
              <p className="text-xs text-gray-700 leading-snug">{cvData.profil}</p>
            </section>

            {/* Expérience Professionnelle */}
            <section className="mb-1">
              <h2 className="text-sm font-bold uppercase tracking-wider border-b-2 border-blue-600 pb-0.5 mb-0.5 text-blue-600">EXPÉRIENCE PROFESSIONNELLE</h2>
              <div className="grid grid-cols-2 gap-2">
                {cvData.experiences?.map((exp, idx) => (
                  <div key={idx} className="border-l-4 border-blue-400 py-2 bg-blue-50">
                    <div className="mb-1 text-center">
                      <h3 className="text-lg font-bold text-blue-800">{exp.poste}</h3>
                      <p className="text-base text-blue-700 font-semibold">{exp.entreprise} · CDI</p>
                      <p className="text-base text-blue-700 font-semibold">{exp.duree}</p>
                    </div>
                    {exp.missions.length > 0 && (
                      <ul className="text-base text-gray-800 space-y-1 leading-relaxed mt-1 list-none">
                        {exp.missions.slice(0, 2).map((mission, midx) => (
                          <li key={midx} className="leading-relaxed">• {mission}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </section>

            {/* Formation et Compétences en 2 colonnes */}
            <div className="grid grid-cols-2 gap-2">
              {/* Formation */}
              <section>
                <h2 className="text-sm font-bold uppercase tracking-wider border-b-2 border-blue-600 pb-0.5 mb-0.5 text-blue-600 text-center">FORMATION</h2>
                <div className="bg-blue-50 p-2 border-l-4 border-blue-400 text-center">
                  <h3 className="text-sm font-bold text-blue-800 text-center">{cvData.formations?.[0]?.diplome || "Maîtrise de gestion (MSG)"}</h3>
                  <p className="text-xs text-blue-700 font-semibold text-center">{cvData.formations?.[0]?.etablissement || "Université Paris 1 Panthéon-Sorbonne"}</p>
                  <p className="text-xs text-gray-700 text-center">{cvData.formations?.[0]?.annee || "1995"} · Mention Bien</p>
                </div>
              </section>

              {/* Compétences */}
              <section>
                <h2 className="text-sm font-bold uppercase tracking-wider border-b-2 border-blue-600 pb-0.5 mb-0.5 text-blue-600 text-center">COMPÉTENCES CLÉS</h2>
                <div className="space-y-1">
                  <div className="bg-blue-50 p-1 border-l-4 border-blue-600 text-center">
                    <h3 className="text-xs font-bold uppercase text-blue-800 mb-0.5 text-center">Interpersonnelles</h3>
                    <p className="text-xs text-gray-800 leading-snug text-center">Communication · Négociation · Réactivité · Autonomie</p>
                  </div>
                  <div className="bg-blue-50 p-1 border-l-4 border-blue-600 text-center">
                    <h3 className="text-xs font-bold uppercase text-blue-800 mb-0.5 text-center">Techniques</h3>
                    <p className="text-xs text-gray-800 leading-snug text-center">CCMX · MS Office · Outils analytiques · Ciel</p>
                  </div>
                  <div className="bg-blue-50 p-1 border-l-4 border-blue-600 text-center">
                    <h3 className="text-xs font-bold uppercase text-blue-800 mb-0.5 text-center">Métier</h3>
                    <p className="text-xs text-gray-800 leading-snug text-center">Gestion B2B · Facturation · Import-export · Due diligence</p>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
