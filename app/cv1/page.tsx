'use client';

import Image from 'next/image';
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
                <a
                  href="/"
                  className="px-4 py-2 bg-gray-900 text-white text-sm uppercase tracking-wider hover:bg-gray-800 transition-colors"
                >
                  RETOUR
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CV 1 - Classique élégant avec touches de couleur */}
      <div className="py-8 print:py-0 px-6 md:px-12">
        <div className="print:w-[210mm] print:min-h-[297mm] print:max-h-[594mm] print:m-0 print:p-0">
          <div className="max-w-4xl mx-auto bg-white p-16 shadow-lg print:shadow-none">
            {/* Header avec photo et infos principales */}
            <div className="border-b-4 border-blue-600 pb-8 mb-12 flex items-center gap-8">
              <div className="flex-shrink-0">
                <Image
                  src="/og-caroline-karpel.jpg"
                  alt="Caroline Karpel"
                  width={180}
                  height={180}
                  className="rounded-full border-8 border-blue-400 shadow-xl"
                />
              </div>
              <div className="flex-1">
                <h1 className="text-6xl font-bold uppercase tracking-wider mb-4 text-blue-600">{cvData.nom}</h1>
                <p className="text-2xl text-blue-800 uppercase tracking-wide font-semibold">{cvData.posteActuel}</p>
                <p className="text-lg text-gray-700 mt-3">{cvData.localisation}</p>
                <div className="mt-4 text-base text-gray-600">
                  <p>📧 {cvData.email}</p>
                  <p>📱 {cvData.telephone}</p>
                </div>
              </div>
            </div>

            {/* Profil Professionnel */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold uppercase tracking-wider border-b-4 border-blue-600 pb-3 mb-6 text-blue-600">PROFIL PROFESSIONNEL</h2>
              <p className="text-lg text-gray-700 leading-relaxed">{cvData.profil}</p>
            </section>

            {/* Expérience Professionnelle */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold uppercase tracking-wider border-b-4 border-blue-600 pb-3 mb-8 text-blue-600">EXPÉRIENCE PROFESSIONNELLE</h2>
              <div className="space-y-8">
                {cvData.experiences?.map((exp, idx) => (
                  <div key={idx} className="mb-10 border-l-8 border-blue-400 pl-8 py-4 bg-blue-50">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-2xl font-bold text-blue-800 mb-2">{exp.poste}</h3>
                        <p className="text-lg text-blue-700 font-semibold">{exp.entreprise} · CDI</p>
                      </div>
                      <div className="text-right text-base text-gray-700">
                        <p className="font-bold text-blue-700">{exp.duree}</p>
                        <p className="text-gray-600 mt-1">{exp.duree}</p>
                      </div>
                    </div>
                    <p className="text-base text-gray-700 mb-3">Paris, France · Sur site</p>
                    {exp.missions.length > 0 && (
                      <ul className="text-base text-gray-800 space-y-3 ml-6 leading-relaxed mt-4">
                        {exp.missions.map((mission, midx) => (
                          <li key={midx} className="leading-relaxed">• {mission}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </section>

            {/* Formation */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold uppercase tracking-wider border-b-4 border-blue-600 pb-3 mb-8 text-blue-600">FORMATION</h2>
              <div className="bg-blue-50 p-8 rounded-lg border-l-8 border-blue-400">
                <h3 className="text-2xl font-bold text-blue-800 mb-2">{cvData.formations?.[0]?.diplome || "Maîtrise de gestion (MSG)"}</h3>
                <p className="text-lg text-blue-700 font-semibold mb-2">{cvData.formations?.[0]?.etablissement || "Université Paris 1 Panthéon-Sorbonne"}</p>
                <p className="text-base text-gray-700">{"Économie et gestion"} · {cvData.formations?.[0]?.annee || "1995"}</p>
                <p className="text-lg font-bold text-blue-800 mt-3">{"Mention Bien"}</p>
              </div>
            </section>

            {/* Compétences */}
            <section>
              <h2 className="text-3xl font-bold uppercase tracking-wider border-b-4 border-blue-600 pb-3 mb-8 text-blue-600">COMPÉTENCES</h2>
              <div className="grid grid-cols-1 gap-8">
                <div>
                  <h3 className="text-xl font-bold uppercase tracking-wide text-blue-800 mb-5 underline decoration-blue-400 decoration-4 underline-offset-8">Compétences interpersonnelles</h3>
                  <div className="flex flex-wrap gap-4">
                    {cvData.competences?.map((comp, idx) => (
                      <span key={idx} className="text-base text-blue-900 font-semibold">{comp}</span>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold uppercase tracking-wide text-blue-800 mb-5 underline decoration-blue-400 decoration-4 underline-offset-8">Compétences techniques</h3>
                  <div className="flex flex-wrap gap-4">
                    {cvData.competences?.map((comp, idx) => (
                      <span key={idx} className="text-base text-blue-900 font-semibold">{comp}</span>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold uppercase tracking-wide text-blue-800 mb-5 underline decoration-blue-400 decoration-4 underline-offset-8">Compétences métier</h3>
                  <div className="flex flex-wrap gap-4">
                    {cvData.competences?.map((comp, idx) => (
                      <span key={idx} className="text-base text-blue-900 font-semibold">{comp}</span>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
