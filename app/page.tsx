'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { cvData } from './data/cv-data';

export default function Home() {
  const [currentCV, setCurrentCV] = useState(1);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  // Raccourcis clavier pour navigation
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
        setCurrentCV(prev => Math.max(1, prev - 1));
      } else if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
        setCurrentCV(prev => Math.min(50, prev + 1));
      } else if (event.key === 'Home') {
        setCurrentCV(1);
      } else if (event.key === 'End') {
        setCurrentCV(50);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  // Navigation tactile (swipe) pour mobile et tablette
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      setCurrentCV(prev => Math.min(50, prev + 1));
    } else if (isRightSwipe) {
      setCurrentCV(prev => Math.max(1, prev - 1));
    }
  };

  const cvTemplates = [
    // CV 1 - Classique élégant avec touches de couleur
    () => (
      <div className="max-w-4xl mx-auto bg-white p-16 shadow-lg print:shadow-none">
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
          </div>
        </div>
        
        <section className="mb-12">
          <h2 className="text-3xl font-bold uppercase tracking-wider border-b-4 border-blue-600 pb-3 mb-8 text-blue-600">EXPÉRIENCE PROFESSIONNELLE</h2>
          {cvData.experiences.map((exp, idx) => (
            <div key={idx} className="mb-10 border-l-8 border-blue-400 pl-8 py-4 bg-blue-50">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-2xl font-bold text-blue-800 mb-2">{exp.titre}</h3>
                  <p className="text-lg text-blue-700 font-semibold">{exp.entreprise} {exp.type && `· ${exp.type}`}</p>
                </div>
                <div className="text-right text-base text-gray-700">
                  <p className="font-bold text-blue-700">{exp.periode}</p>
                  <p className="text-gray-600 mt-1">{exp.duree}</p>
                </div>
              </div>
              {exp.lieu && <p className="text-base text-gray-700 mb-3">{exp.lieu} {exp.mode && `· ${exp.mode}`}</p>}
              {exp.missions.length > 0 && (
                <ul className="text-base text-gray-800 space-y-3 ml-6 leading-relaxed mt-4">
                  {exp.missions.map((mission, midx) => (
                    <li key={midx} className="leading-relaxed">• {mission}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold uppercase tracking-wider border-b-4 border-blue-600 pb-3 mb-8 text-blue-600">FORMATION</h2>
          <div className="border-l-8 border-blue-400 pl-8 py-6 bg-blue-50">
            <h3 className="text-2xl font-bold text-blue-800 mb-2">{cvData.formation.diplome}</h3>
            <p className="text-lg text-blue-700 font-semibold mb-2">{cvData.formation.etablissement}</p>
            <p className="text-base text-gray-700">{cvData.formation.specialite} · {cvData.formation.periode}</p>
            <p className="text-lg font-bold text-blue-800 mt-3">{cvData.formation.mention}</p>
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-bold uppercase tracking-wider border-b-4 border-blue-600 pb-3 mb-8 text-blue-600">COMPÉTENCES</h2>
          <div className="grid grid-cols-1 gap-8">
            <div>
              <h3 className="text-xl font-bold uppercase tracking-wide text-blue-800 mb-5 underline decoration-blue-400 decoration-4 underline-offset-8">Compétences interpersonnelles</h3>
              <div className="flex flex-wrap gap-4">
                {cvData.competences.interpersonnelles.map((comp, idx) => (
                  <span key={idx} className="text-base bg-blue-100 text-blue-900 px-5 py-3 rounded-lg border-2 border-blue-400 font-semibold">{comp}</span>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold uppercase tracking-wide text-blue-800 mb-5 underline decoration-blue-400 decoration-4 underline-offset-8">Compétences techniques</h3>
              <div className="flex flex-wrap gap-4">
                {cvData.competences.techniques.map((comp, idx) => (
                  <span key={idx} className="text-base bg-blue-100 text-blue-900 px-5 py-3 rounded-lg border-2 border-blue-400 font-semibold">{comp}</span>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold uppercase tracking-wide text-blue-800 mb-5 underline decoration-blue-400 decoration-4 underline-offset-8">Compétences métier</h3>
              <div className="flex flex-wrap gap-4">
                {cvData.competences.metier.map((comp, idx) => (
                  <span key={idx} className="text-base bg-blue-100 text-blue-900 px-5 py-3 rounded-lg border-2 border-blue-400 font-semibold">{comp}</span>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    ),

    // CV 2 - Moderne avec sidebar violet
    () => (
      <div className="max-w-4xl mx-auto bg-white shadow-lg print:shadow-none flex">
        <div className="w-1/3 bg-gradient-to-b from-purple-700 to-purple-900 text-white p-10">
          <div className="mb-10 text-center">
            <div className="mb-6 inline-block">
              <Image 
                src="/og-caroline-karpel.jpg" 
                alt="Caroline Karpel" 
                width={160} 
                height={160}
                className="rounded-full border-8 border-purple-300 shadow-2xl"
              />
            </div>
            <h1 className="text-4xl font-bold mb-4">{cvData.nom}</h1>
            <p className="text-base uppercase tracking-wider text-purple-200">{cvData.localisation}</p>
          </div>

          <section className="mb-10">
            <h2 className="text-lg font-bold uppercase tracking-widest border-b-2 border-purple-300 pb-3 mb-6">FORMATION</h2>
            <div className="text-base">
              <p className="font-bold mb-2 text-purple-100 text-lg">{cvData.formation.diplome}</p>
              <p className="text-purple-200 mb-2">{cvData.formation.etablissement}</p>
              <p className="text-purple-300 text-sm mt-2">{cvData.formation.periode}</p>
              <p className="text-purple-100 mt-4 font-bold text-lg">{cvData.formation.mention}</p>
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-lg font-bold uppercase tracking-widest border-b-2 border-purple-300 pb-3 mb-6">COMPÉTENCES</h2>
            <div className="space-y-3 text-sm">
              {cvData.competences.interpersonnelles.map((comp, idx) => (
                <div key={idx} className="text-purple-100 flex items-start"><span className="text-purple-300 mr-3 text-lg font-bold">▸</span><span>{comp}</span></div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-lg font-bold uppercase tracking-widest border-b-2 border-purple-300 pb-3 mb-6">OUTILS</h2>
            <div className="space-y-3 text-sm text-purple-100">
              {cvData.competences.techniques.map((comp, idx) => (
                <div key={idx} className="flex items-start"><span className="text-purple-300 mr-3 text-lg font-bold">▸</span><span>{comp}</span></div>
              ))}
            </div>
          </section>
        </div>

        <div className="w-2/3 p-12">
          <div className="mb-10 border-l-8 border-purple-600 pl-6 bg-purple-50 py-4">
            <h2 className="text-3xl font-bold mb-2 text-purple-800">{cvData.posteActuel.split(' chez ')[0]}</h2>
            <p className="text-lg text-purple-700 uppercase tracking-wide font-semibold">{cvData.posteActuel.split(' chez ')[1]}</p>
          </div>

          <section>
            <h2 className="text-2xl font-bold uppercase tracking-wide border-b-4 border-purple-600 pb-3 mb-8 text-purple-800">EXPÉRIENCE</h2>
            {cvData.experiences.map((exp, idx) => (
              <div key={idx} className="mb-8 bg-purple-50 p-6 rounded-lg border-l-8 border-purple-600">
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-purple-900 mb-2">{exp.titre}</h3>
                  <p className="text-base text-purple-700 font-semibold">{exp.entreprise} · {exp.duree}</p>
                  <p className="text-base text-purple-600 mt-1">{exp.periode}</p>
                </div>
                {exp.missions.length > 0 && (
                  <ul className="text-base text-gray-800 space-y-3 leading-relaxed mt-4">
                    {exp.missions.map((mission, midx) => (
                      <li key={midx} className="leading-relaxed">• {mission}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </section>
        </div>
      </div>
    ),

    // CV 3 - Minimaliste avec accents teal
    () => (
      <div className="max-w-3xl mx-auto bg-white p-16 shadow-lg print:shadow-none">
        <div className="text-center mb-12">
          <div className="mb-6 inline-block">
            <Image 
              src="/og-caroline-karpel.jpg" 
              alt="Caroline Karpel" 
              width={140} 
              height={140}
              className="rounded-full border-4 border-teal-600 shadow-lg mx-auto"
            />
          </div>
          <h1 className="text-6xl font-thin mb-4 text-teal-900">{cvData.nom}</h1>
          <div className="w-32 h-1 bg-gradient-to-r from-transparent via-teal-600 to-transparent mx-auto mb-4"></div>
          <p className="text-sm uppercase tracking-[0.3em] text-gray-700 font-medium">{cvData.posteActuel}</p>
          <p className="text-xs text-gray-600 mt-2">{cvData.localisation}</p>
        </div>

        <section className="mb-12">
          <h2 className="text-xs uppercase tracking-[0.4em] text-center mb-8 text-teal-800">PARCOURS PROFESSIONNEL</h2>
          {cvData.experiences.map((exp, idx) => (
            <div key={idx} className="mb-8 pb-8 border-b border-teal-200 last:border-0">
              <div className="text-center mb-3">
                <h3 className="text-lg font-light text-teal-900">{exp.titre}</h3>
                <p className="text-sm text-gray-700 font-medium">{exp.entreprise}</p>
                <p className="text-xs text-teal-600 mt-1">{exp.periode} · {exp.duree}</p>
              </div>
              {exp.missions.length > 0 && (
                <ul className="text-xs text-gray-700 space-y-1 max-w-2xl mx-auto">
                  {exp.missions.map((mission, midx) => (
                    <li key={midx} className="leading-relaxed text-center">• {mission}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </section>

        <section className="mb-12">
          <h2 className="text-xs uppercase tracking-[0.4em] text-center mb-6 text-teal-800">FORMATION</h2>
          <div className="text-center">
            <p className="text-base font-light text-teal-900">{cvData.formation.diplome}</p>
            <p className="text-sm text-gray-700">{cvData.formation.etablissement}</p>
            <p className="text-xs text-teal-700 font-semibold mt-1">{cvData.formation.mention}</p>
          </div>
        </section>

        <section>
          <h2 className="text-xs uppercase tracking-[0.4em] text-center mb-6 text-teal-800">EXPERTISE</h2>
          <div className="flex flex-wrap justify-center gap-2 text-xs">
            {[...cvData.competences.interpersonnelles, ...cvData.competences.techniques].map((comp, idx) => (
              <span key={idx} className="border-2 border-teal-600 text-teal-900 px-4 py-1.5 rounded hover:bg-teal-600 hover:text-white transition-colors">{comp}</span>
            ))}
          </div>
        </section>
      </div>
    ),

    // CV 4 - Timeline verticale
    () => (
      <div className="max-w-4xl mx-auto bg-white p-12 shadow-lg print:shadow-none">
        <header className="mb-12 flex items-center gap-8">
          <Image 
            src="/og-caroline-karpel.jpg" 
            alt="Caroline Karpel" 
            width={140} 
            height={140}
            className="rounded-lg border-2 border-gray-300 shadow-md"
          />
          <div>
            <h1 className="text-4xl font-bold mb-2 text-gray-900">{cvData.nom}</h1>
            <p className="text-lg text-gray-700 mb-1">{cvData.posteActuel}</p>
            <p className="text-sm text-gray-500">{cvData.localisation}</p>
          </div>
        </header>

        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 flex items-center">
            <span className="w-2 h-8 bg-black mr-3"></span>
            EXPÉRIENCE PROFESSIONNELLE
          </h2>
          <div className="relative border-l-2 border-gray-300 ml-4 pl-8">
            {cvData.experiences.map((exp, idx) => (
              <div key={idx} className="mb-8 relative">
                <div className="absolute -left-[33px] w-4 h-4 bg-black rounded-full"></div>
                <div className="bg-gray-50 p-4 rounded">
                  <h3 className="text-base font-bold text-gray-900">{exp.titre}</h3>
                  <p className="text-sm font-semibold text-gray-700">{exp.entreprise}</p>
                  <p className="text-xs text-gray-600 mb-2">{exp.periode} · {exp.duree}</p>
                  {exp.missions.length > 0 && (
                    <ul className="text-xs text-gray-700 space-y-1 mt-2">
                      {exp.missions.slice(0, 3).map((mission, midx) => (
                        <li key={midx} className="leading-relaxed">▸ {mission}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="grid grid-cols-2 gap-8">
          <section>
            <h2 className="text-xl font-bold mb-4 text-gray-900 flex items-center">
              <span className="w-2 h-6 bg-black mr-3"></span>
              FORMATION
            </h2>
            <div className="bg-gray-50 p-4 rounded">
              <p className="font-bold text-sm">{cvData.formation.diplome}</p>
              <p className="text-sm text-gray-700">{cvData.formation.etablissement}</p>
              <p className="text-xs text-gray-600 mt-1">{cvData.formation.periode}</p>
              <p className="text-xs font-semibold text-gray-700 mt-2">{cvData.formation.mention}</p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-4 text-gray-900 flex items-center">
              <span className="w-2 h-6 bg-black mr-3"></span>
              COMPÉTENCES CLÉS
            </h2>
            <div className="bg-gray-50 p-4 rounded">
              <ul className="text-xs space-y-1">
                {cvData.competences.interpersonnelles.slice(0, 8).map((comp, idx) => (
                  <li key={idx} className="text-gray-700">▸ {comp}</li>
                ))}
              </ul>
            </div>
          </section>
        </div>
      </div>
    ),

    // CV 5 - Design épuré avec accents
    () => (
      <div className="max-w-4xl mx-auto bg-white shadow-lg print:shadow-none">
        <div className="bg-gradient-to-r from-gray-800 to-gray-900 text-white p-10 flex items-center gap-8">
          <Image 
            src="/og-caroline-karpel.jpg" 
            alt="Caroline Karpel" 
            width={150} 
            height={150}
            className="rounded-full border-4 border-gray-600"
          />
          <div>
            <h1 className="text-5xl font-extralight mb-3 tracking-wide">{cvData.nom}</h1>
            <p className="text-xl font-light opacity-90">{cvData.posteActuel.split(' chez ')[0]}</p>
            <p className="text-sm opacity-70 mt-2">{cvData.localisation}</p>
          </div>
        </div>

        <div className="p-12">
          <section className="mb-10">
            <h2 className="text-xl font-semibold uppercase tracking-widest mb-6 pb-3 border-b-2 border-gray-800">Expérience</h2>
            {cvData.experiences.map((exp, idx) => (
              <div key={idx} className="mb-6 pl-4 border-l-4 border-gray-200">
                <h3 className="text-base font-semibold text-gray-900">{exp.titre}</h3>
                <p className="text-sm text-gray-700 font-medium">{exp.entreprise} · {exp.type}</p>
                <p className="text-xs text-gray-600 mb-2">{exp.periode} ({exp.duree})</p>
                {exp.missions.length > 0 && (
                  <ul className="text-xs text-gray-700 space-y-1">
                    {exp.missions.slice(0, 3).map((mission, midx) => (
                      <li key={midx} className="leading-relaxed">• {mission}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </section>

          <div className="grid grid-cols-3 gap-8 mb-10">
            <section className="col-span-1">
              <h2 className="text-lg font-semibold uppercase tracking-widest mb-4 pb-2 border-b-2 border-gray-800">Formation</h2>
              <div className="text-xs">
                <p className="font-semibold">{cvData.formation.diplome}</p>
                <p className="text-gray-700">{cvData.formation.etablissement}</p>
                <p className="text-gray-600 mt-1">{cvData.formation.mention}</p>
              </div>
            </section>

            <section className="col-span-2">
              <h2 className="text-lg font-semibold uppercase tracking-widest mb-4 pb-2 border-b-2 border-gray-800">Compétences</h2>
              <div className="flex flex-wrap gap-2">
                {[...cvData.competences.interpersonnelles.slice(0, 8), ...cvData.competences.techniques].map((comp, idx) => (
                  <span key={idx} className="text-[10px] bg-gray-800 text-white px-3 py-1 uppercase tracking-wide">{comp}</span>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    ),

    // CV 6 - Colonnes équilibrées
    () => (
      <div className="max-w-4xl mx-auto bg-white p-10 shadow-lg print:shadow-none">
        <header className="text-center mb-10 pb-8 border-b-4 border-double border-gray-400">
          <div className="mb-6">
            <Image 
              src="/og-caroline-karpel.jpg" 
              alt="Caroline Karpel" 
              width={130} 
              height={130}
              className="rounded-full mx-auto border-4 border-gray-300"
            />
          </div>
          <h1 className="text-5xl font-serif mb-3">{cvData.nom}</h1>
          <p className="text-base uppercase tracking-widest text-gray-700">{cvData.posteActuel}</p>
          <p className="text-sm text-gray-500 mt-2">{cvData.localisation}</p>
        </header>

        <div className="grid grid-cols-2 gap-10">
          <section>
            <h2 className="text-lg font-serif mb-4 pb-2 border-b border-gray-400 uppercase">Expérience Professionnelle</h2>
            {cvData.experiences.map((exp, idx) => (
              <div key={idx} className="mb-5">
                <p className="text-xs font-bold uppercase tracking-wide text-gray-800">{exp.periode}</p>
                <h3 className="text-sm font-semibold mt-1">{exp.titre}</h3>
                <p className="text-xs text-gray-700 italic">{exp.entreprise}</p>
                {exp.missions.length > 0 && (
                  <ul className="text-[10px] text-gray-600 mt-1 space-y-0.5">
                    {exp.missions.slice(0, 2).map((mission, midx) => (
                      <li key={midx}>• {mission}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </section>

          <section>
            <div className="mb-8">
              <h2 className="text-lg font-serif mb-4 pb-2 border-b border-gray-400 uppercase">Formation</h2>
              <div>
                <h3 className="text-sm font-semibold">{cvData.formation.diplome}</h3>
                <p className="text-xs text-gray-700">{cvData.formation.etablissement}</p>
                <p className="text-[10px] text-gray-600 mt-1">{cvData.formation.periode}</p>
                <p className="text-xs font-semibold text-gray-700 mt-2">{cvData.formation.mention}</p>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-lg font-serif mb-4 pb-2 border-b border-gray-400 uppercase">Compétences Interpersonnelles</h2>
              <div className="grid grid-cols-2 gap-2">
                {cvData.competences.interpersonnelles.slice(0, 10).map((comp, idx) => (
                  <div key={idx} className="text-[10px] text-gray-700">• {comp}</div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-lg font-serif mb-4 pb-2 border-b border-gray-400 uppercase">Outils & Techniques</h2>
              <div className="space-y-1">
                {cvData.competences.techniques.map((comp, idx) => (
                  <div key={idx} className="text-[10px] text-gray-700">• {comp}</div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
    ),

    // CV 7 - Corporate moderne
    () => (
      <div className="max-w-4xl mx-auto bg-white shadow-lg print:shadow-none">
        <div className="bg-black text-white p-8 flex items-center gap-8">
          <Image 
            src="/og-caroline-karpel.jpg" 
            alt="Caroline Karpel" 
            width={120} 
            height={120}
            className="rounded border-4 border-gray-700"
          />
          <div className="flex-1">
            <div className="flex justify-between items-end">
              <div>
                <h1 className="text-4xl font-bold uppercase tracking-wider">{cvData.nom}</h1>
                <p className="text-sm mt-2 opacity-80 uppercase tracking-widest">{cvData.posteActuel.split(' chez ')[0]}</p>
              </div>
              <div className="text-right text-xs opacity-70">
                <p>{cvData.localisation}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="p-10">
          <section className="mb-8">
            <div className="flex items-center mb-5">
              <div className="w-1 h-6 bg-black mr-3"></div>
              <h2 className="text-xl font-bold uppercase tracking-wider">PARCOURS PROFESSIONNEL</h2>
            </div>
            {cvData.experiences.map((exp, idx) => (
              <div key={idx} className="mb-6 bg-gray-50 p-5 rounded-sm">
                <div className="flex justify-between mb-2">
                  <div>
                    <h3 className="text-base font-bold">{exp.titre}</h3>
                    <p className="text-sm text-gray-700">{exp.entreprise}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-semibold">{exp.duree}</p>
                    <p className="text-xs text-gray-600">{exp.periode}</p>
                  </div>
                </div>
                {exp.missions.length > 0 && (
                  <ul className="text-xs text-gray-700 space-y-1 mt-2">
                    {exp.missions.slice(0, 3).map((mission, midx) => (
                      <li key={midx} className="flex items-start">
                        <span className="mr-2">→</span>
                        <span>{mission}</span>
          </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </section>

          <div className="grid grid-cols-2 gap-8">
            <section>
              <div className="flex items-center mb-4">
                <div className="w-1 h-5 bg-black mr-3"></div>
                <h2 className="text-lg font-bold uppercase tracking-wider">FORMATION</h2>
              </div>
              <div className="bg-gray-50 p-4 rounded-sm">
                <p className="font-bold text-sm">{cvData.formation.diplome}</p>
                <p className="text-xs text-gray-700">{cvData.formation.etablissement}</p>
                <p className="text-xs text-gray-600 mt-1">{cvData.formation.periode}</p>
                <p className="text-xs font-semibold mt-2">{cvData.formation.mention}</p>
              </div>
            </section>

            <section>
              <div className="flex items-center mb-4">
                <div className="w-1 h-5 bg-black mr-3"></div>
                <h2 className="text-lg font-bold uppercase tracking-wider">COMPÉTENCES</h2>
              </div>
              <div className="bg-gray-50 p-4 rounded-sm">
                <div className="grid grid-cols-2 gap-x-3 gap-y-1 text-xs">
                  {cvData.competences.interpersonnelles.slice(0, 10).map((comp, idx) => (
                    <div key={idx} className="text-gray-700">▪ {comp}</div>
                  ))}
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    ),

    // CV 8 - Design épuré gauche/droite
    () => (
      <div className="max-w-4xl mx-auto bg-white p-12 shadow-lg print:shadow-none">
        <div className="flex gap-12">
          <div className="w-1/3">
            <div className="mb-10">
              <h1 className="text-3xl font-bold mb-1 leading-tight">{cvData.nom}</h1>
              <div className="w-12 h-1 bg-gray-900 my-3"></div>
              <p className="text-xs uppercase tracking-wider text-gray-600">{cvData.posteActuel.split(' chez ')[0]}</p>
              <p className="text-[10px] text-gray-500 mt-2">{cvData.localisation}</p>
            </div>

            <section className="mb-8">
              <h2 className="text-sm font-bold uppercase tracking-wide mb-4">FORMATION</h2>
              <div className="text-xs">
                <p className="font-bold">{cvData.formation.diplome}</p>
                <p className="text-gray-700 mt-1">{cvData.formation.etablissement}</p>
                <p className="text-[10px] text-gray-500 mt-1">{cvData.formation.periode}</p>
                <p className="font-semibold mt-2">{cvData.formation.mention}</p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-sm font-bold uppercase tracking-wide mb-4">COMPÉTENCES</h2>
              <div className="space-y-2">
                {cvData.competences.interpersonnelles.slice(0, 8).map((comp, idx) => (
                  <div key={idx} className="text-[10px] text-gray-700 border-l-2 border-gray-900 pl-2">{comp}</div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-sm font-bold uppercase tracking-wide mb-4">OUTILS</h2>
              <div className="space-y-1">
                {cvData.competences.techniques.map((comp, idx) => (
                  <div key={idx} className="text-[10px] text-gray-700">{comp}</div>
                ))}
              </div>
            </section>
          </div>

          <div className="w-2/3">
            <h2 className="text-lg font-bold uppercase tracking-wider mb-6">EXPÉRIENCE PROFESSIONNELLE</h2>
            {cvData.experiences.map((exp, idx) => (
              <div key={idx} className="mb-6">
                <div className="mb-2">
                  <h3 className="text-base font-bold">{exp.titre}</h3>
                  <div className="flex justify-between items-start">
                    <p className="text-sm text-gray-700">{exp.entreprise}</p>
                    <p className="text-xs text-gray-600">{exp.periode}</p>
                  </div>
                  <p className="text-xs text-gray-500">{exp.duree}</p>
                </div>
                {exp.missions.length > 0 && (
                  <ul className="text-xs text-gray-700 space-y-1">
                    {exp.missions.slice(0, 3).map((mission, midx) => (
                      <li key={midx} className="leading-relaxed">— {mission}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    ),

    // CV 9 - Style magazine
    () => (
      <div className="max-w-4xl mx-auto bg-white p-10 shadow-lg print:shadow-none">
        <header className="mb-10">
          <div className="text-center mb-6">
            <Image 
              src="/og-caroline-karpel.jpg" 
              alt="Caroline Karpel" 
              width={120} 
              height={120}
              className="rounded-full mx-auto border-2 border-gray-300"
            />
          </div>
          <div className="border-t-4 border-b-4 border-double border-black py-6">
            <h1 className="text-6xl font-serif text-center">{cvData.nom}</h1>
          </div>
          <p className="text-center text-sm uppercase tracking-[0.4em] mt-4 text-gray-700">{cvData.posteActuel}</p>
          <p className="text-center text-xs text-gray-500 mt-1">{cvData.localisation}</p>
        </header>

        <div className="columns-2 gap-10">
          <section className="break-inside-avoid mb-8">
            <h2 className="text-lg font-serif italic mb-4 border-b border-gray-400 pb-1">Parcours Professionnel</h2>
            {cvData.experiences.map((exp, idx) => (
              <div key={idx} className="mb-5 break-inside-avoid">
                <p className="text-xs font-bold uppercase">{exp.titre}</p>
                <p className="text-xs italic text-gray-700">{exp.entreprise}</p>
                <p className="text-[10px] text-gray-500">{exp.periode}</p>
                {exp.missions.length > 0 && (
                  <ul className="text-[10px] text-gray-700 mt-1 space-y-0.5">
                    {exp.missions.slice(0, 2).map((mission, midx) => (
                      <li key={midx}>• {mission}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </section>

          <section className="break-inside-avoid mb-8">
            <h2 className="text-lg font-serif italic mb-4 border-b border-gray-400 pb-1">Formation Académique</h2>
            <div>
              <p className="text-sm font-bold">{cvData.formation.diplome}</p>
              <p className="text-xs text-gray-700">{cvData.formation.etablissement}</p>
              <p className="text-[10px] text-gray-600 mt-1">{cvData.formation.periode}</p>
              <p className="text-xs font-semibold mt-2">{cvData.formation.mention}</p>
            </div>
          </section>

          <section className="break-inside-avoid mb-8">
            <h2 className="text-lg font-serif italic mb-4 border-b border-gray-400 pb-1">Domaines d'Excellence</h2>
            <div className="space-y-1">
              {cvData.competences.interpersonnelles.slice(0, 10).map((comp, idx) => (
                <p key={idx} className="text-[10px] text-gray-700">◆ {comp}</p>
              ))}
            </div>
          </section>

          <section className="break-inside-avoid">
            <h2 className="text-lg font-serif italic mb-4 border-b border-gray-400 pb-1">Maîtrise Technique</h2>
            <div className="space-y-1">
              {cvData.competences.techniques.map((comp, idx) => (
                <p key={idx} className="text-[10px] text-gray-700">◆ {comp}</p>
              ))}
            </div>
          </section>
        </div>
      </div>
    ),

    // CV 10 - Design géométrique
    () => (
      <div className="max-w-4xl mx-auto bg-white shadow-lg print:shadow-none overflow-hidden">
        <div className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white p-12 clip-path-polygon">
          <h1 className="text-5xl font-black uppercase mb-2">{cvData.nom}</h1>
          <p className="text-lg uppercase tracking-widest opacity-90">{cvData.posteActuel.split(' chez ')[0]}</p>
          <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-5 rotate-45"></div>
        </div>

        <div className="p-10">
          <div className="grid grid-cols-3 gap-8 mb-10">
            <section className="col-span-2">
              <div className="bg-gray-100 px-4 py-2 mb-4">
                <h2 className="text-base font-black uppercase tracking-widest">EXPÉRIENCE</h2>
              </div>
              {cvData.experiences.map((exp, idx) => (
                <div key={idx} className="mb-6">
                  <div className="bg-gradient-to-r from-gray-900 to-gray-700 text-white px-3 py-2 mb-2">
                    <h3 className="text-sm font-bold uppercase">{exp.titre}</h3>
                    <p className="text-xs opacity-90">{exp.entreprise} · {exp.duree}</p>
                  </div>
                  {exp.missions.length > 0 && (
                    <ul className="text-xs text-gray-700 space-y-1 ml-3">
                      {exp.missions.slice(0, 2).map((mission, midx) => (
                        <li key={midx}>▪ {mission}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </section>

            <section>
              <div className="bg-gray-100 px-3 py-2 mb-4">
                <h2 className="text-sm font-black uppercase tracking-wider">FORMATION</h2>
              </div>
              <div className="mb-6 text-xs">
                <p className="font-bold">{cvData.formation.diplome}</p>
                <p className="text-gray-700">{cvData.formation.etablissement}</p>
                <p className="text-gray-600 mt-1">{cvData.formation.mention}</p>
              </div>

              <div className="bg-gray-100 px-3 py-2 mb-4">
                <h2 className="text-sm font-black uppercase tracking-wider">EXPERTISE</h2>
              </div>
              <div className="space-y-2">
                {cvData.competences.interpersonnelles.slice(0, 8).map((comp, idx) => (
                  <div key={idx} className="text-[10px] bg-white border-l-4 border-gray-900 pl-2 py-1">{comp}</div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    ),

    // CV 11 - Clean & Professional
    () => (
      <div className="max-w-3xl mx-auto bg-white p-14 shadow-lg print:shadow-none">
        <div className="mb-10">
          <h1 className="text-4xl font-light tracking-tight mb-2">{cvData.nom}</h1>
          <p className="text-base text-gray-700 mb-1">{cvData.posteActuel}</p>
          <p className="text-sm text-gray-500">{cvData.localisation}</p>
        </div>

        <section className="mb-10">
          <h2 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-6">EXPÉRIENCE PROFESSIONNELLE</h2>
          {cvData.experiences.map((exp, idx) => (
            <div key={idx} className="mb-7">
              <div className="flex justify-between items-baseline mb-1">
                <h3 className="text-base font-semibold text-gray-900">{exp.titre}</h3>
                <span className="text-xs text-gray-500">{exp.periode}</span>
              </div>
              <p className="text-sm text-gray-700 mb-2">{exp.entreprise} · {exp.duree}</p>
              {exp.missions.length > 0 && (
                <ul className="text-sm text-gray-600 space-y-1.5 ml-4">
                  {exp.missions.slice(0, 3).map((mission, midx) => (
                    <li key={midx} className="leading-relaxed">• {mission}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </section>

        <div className="grid grid-cols-2 gap-10">
          <section>
            <h2 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-4">FORMATION</h2>
            <div>
              <p className="font-semibold text-sm text-gray-900">{cvData.formation.diplome}</p>
              <p className="text-sm text-gray-700">{cvData.formation.etablissement}</p>
              <p className="text-xs text-gray-600 mt-1">{cvData.formation.periode}</p>
              <p className="text-sm text-gray-700 mt-2">{cvData.formation.mention}</p>
            </div>
          </section>

          <section>
            <h2 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-4">COMPÉTENCES</h2>
            <div className="space-y-1.5">
              {cvData.competences.interpersonnelles.slice(0, 8).map((comp, idx) => (
                <p key={idx} className="text-sm text-gray-700">• {comp}</p>
              ))}
            </div>
          </section>
        </div>
      </div>
    ),

    // CV 12 - Bold & Colorful (monochrome élégant)
    () => (
      <div className="max-w-4xl mx-auto bg-gray-50 shadow-lg print:shadow-none">
        <div className="bg-gradient-to-r from-gray-700 to-gray-900 text-white p-10">
          <h1 className="text-5xl font-extrabold mb-3">{cvData.nom}</h1>
          <p className="text-xl">{cvData.posteActuel}</p>
          <p className="text-sm opacity-80 mt-2">{cvData.localisation}</p>
        </div>

        <div className="p-10">
          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 border-l-8 border-gray-900 pl-4">EXPÉRIENCE PROFESSIONNELLE</h2>
            {cvData.experiences.map((exp, idx) => (
              <div key={idx} className="mb-6 bg-white p-5 rounded-lg shadow-sm">
                <div className="flex justify-between mb-2">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">{exp.titre}</h3>
                    <p className="text-sm text-gray-700 font-medium">{exp.entreprise}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-semibold text-gray-600">{exp.duree}</p>
                    <p className="text-xs text-gray-500">{exp.periode}</p>
                  </div>
                </div>
                {exp.missions.length > 0 && (
                  <ul className="text-sm text-gray-600 space-y-1 mt-3">
                    {exp.missions.slice(0, 3).map((mission, midx) => (
                      <li key={midx} className="leading-relaxed">▸ {mission}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </section>

          <div className="grid grid-cols-2 gap-6">
            <section className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-xl font-bold mb-4 text-gray-800 border-l-8 border-gray-900 pl-4">FORMATION</h2>
              <p className="font-bold text-sm text-gray-900">{cvData.formation.diplome}</p>
              <p className="text-sm text-gray-700">{cvData.formation.etablissement}</p>
              <p className="text-xs text-gray-600 mt-1">{cvData.formation.periode}</p>
              <p className="text-sm font-semibold text-gray-700 mt-3">{cvData.formation.mention}</p>
            </section>

            <section className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-xl font-bold mb-4 text-gray-800 border-l-8 border-gray-900 pl-4">COMPÉTENCES</h2>
              <div className="grid grid-cols-1 gap-2">
                {cvData.competences.interpersonnelles.slice(0, 7).map((comp, idx) => (
                  <div key={idx} className="text-xs bg-gray-100 px-3 py-2 rounded text-gray-700">• {comp}</div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    ),

    // CV 13 - Compact & Efficient
    () => (
      <div className="max-w-4xl mx-auto bg-white p-8 shadow-lg print:shadow-none">
        <header className="mb-6 pb-4 border-b-2 border-gray-900">
          <h1 className="text-3xl font-bold uppercase">{cvData.nom}</h1>
          <div className="flex justify-between items-center mt-2">
            <p className="text-sm text-gray-700">{cvData.posteActuel}</p>
            <p className="text-xs text-gray-600">{cvData.localisation}</p>
          </div>
        </header>

        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-2">
            <section className="mb-6">
              <h2 className="text-base font-bold uppercase mb-3 bg-gray-900 text-white px-3 py-1">EXPÉRIENCE</h2>
              {cvData.experiences.map((exp, idx) => (
                <div key={idx} className="mb-4">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="text-sm font-bold">{exp.titre}</h3>
                      <p className="text-xs text-gray-700">{exp.entreprise}</p>
                    </div>
                    <p className="text-[10px] text-gray-600 text-right">{exp.periode}<br/>{exp.duree}</p>
                  </div>
                  {exp.missions.length > 0 && (
                    <ul className="text-[10px] text-gray-600 mt-1 space-y-0.5">
                      {exp.missions.slice(0, 2).map((mission, midx) => (
                        <li key={midx}>• {mission}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </section>
          </div>

          <div>
            <section className="mb-6">
              <h2 className="text-sm font-bold uppercase mb-3 bg-gray-900 text-white px-2 py-1">FORMATION</h2>
              <div className="text-[10px]">
                <p className="font-bold">{cvData.formation.diplome}</p>
                <p className="text-gray-700">{cvData.formation.etablissement}</p>
                <p className="text-gray-600 mt-1">{cvData.formation.periode}</p>
                <p className="font-semibold mt-2">{cvData.formation.mention}</p>
              </div>
            </section>

            <section className="mb-6">
              <h2 className="text-sm font-bold uppercase mb-3 bg-gray-900 text-white px-2 py-1">COMPÉTENCES</h2>
              <div className="space-y-1">
                {cvData.competences.interpersonnelles.slice(0, 10).map((comp, idx) => (
                  <p key={idx} className="text-[9px] text-gray-700">• {comp}</p>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-sm font-bold uppercase mb-3 bg-gray-900 text-white px-2 py-1">OUTILS</h2>
              <div className="space-y-1">
                {cvData.competences.techniques.map((comp, idx) => (
                  <p key={idx} className="text-[9px] text-gray-700">• {comp}</p>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    ),

    // CV 14 - Executive Style
    () => (
      <div className="max-w-4xl mx-auto bg-white p-12 shadow-lg print:shadow-none">
        <header className="text-center mb-12">
          <div className="mb-6">
            <Image 
              src="/og-caroline-karpel.jpg" 
              alt="Caroline Karpel" 
              width={130} 
              height={130}
              className="rounded-full mx-auto border-2 border-gray-200"
            />
          </div>
          <h1 className="text-5xl font-serif mb-4 text-gray-900">{cvData.nom}</h1>
          <div className="flex items-center justify-center gap-4">
            <div className="h-px w-16 bg-gray-400"></div>
            <p className="text-sm uppercase tracking-[0.3em] text-gray-600">{cvData.posteActuel}</p>
            <div className="h-px w-16 bg-gray-400"></div>
          </div>
          <p className="text-xs text-gray-500 mt-3">{cvData.localisation}</p>
        </header>

        <section className="mb-12">
          <h2 className="text-center text-sm uppercase tracking-[0.4em] text-gray-500 mb-8">Expérience Professionnelle</h2>
          {cvData.experiences.map((exp, idx) => (
            <div key={idx} className="mb-8">
              <div className="text-center mb-3">
                <h3 className="text-lg font-semibold text-gray-900">{exp.titre}</h3>
                <p className="text-sm text-gray-700 font-medium">{exp.entreprise}</p>
                <p className="text-xs text-gray-500 mt-1">{exp.periode} · {exp.duree}</p>
              </div>
              {exp.missions.length > 0 && (
                <div className="max-w-2xl mx-auto">
                  <ul className="text-sm text-gray-600 space-y-2">
                    {exp.missions.slice(0, 3).map((mission, midx) => (
                      <li key={midx} className="leading-relaxed text-center">• {mission}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </section>

        <div className="grid grid-cols-2 gap-12">
          <section>
            <h2 className="text-center text-sm uppercase tracking-[0.4em] text-gray-500 mb-6">Formation</h2>
            <div className="text-center">
              <p className="font-semibold text-sm text-gray-900">{cvData.formation.diplome}</p>
              <p className="text-sm text-gray-700 mt-1">{cvData.formation.etablissement}</p>
              <p className="text-xs text-gray-600 mt-2">{cvData.formation.periode}</p>
              <p className="text-sm font-semibold text-gray-700 mt-3">{cvData.formation.mention}</p>
            </div>
          </section>

          <section>
            <h2 className="text-center text-sm uppercase tracking-[0.4em] text-gray-500 mb-6">Compétences Clés</h2>
            <div className="space-y-2">
              {cvData.competences.interpersonnelles.slice(0, 8).map((comp, idx) => (
                <p key={idx} className="text-sm text-gray-700 text-center">• {comp}</p>
              ))}
            </div>
          </section>
        </div>
      </div>
    ),

    // CV 15 - Modern Grid
    () => (
      <div className="max-w-4xl mx-auto bg-white shadow-lg print:shadow-none">
        <div className="grid grid-cols-5">
          <div className="col-span-2 bg-gray-100 p-8">
            <div className="mb-8">
              <div className="w-12 h-1 bg-gray-900 mb-4"></div>
              <h1 className="text-2xl font-bold mb-2 leading-tight">{cvData.nom}</h1>
              <p className="text-xs uppercase tracking-wider text-gray-600">{cvData.localisation}</p>
            </div>

            <section className="mb-8">
              <h2 className="text-xs font-bold uppercase tracking-widest mb-4 text-gray-700">PROFIL</h2>
              <p className="text-xs text-gray-600 leading-relaxed">{cvData.posteActuel}</p>
            </section>

            <section className="mb-8">
              <h2 className="text-xs font-bold uppercase tracking-widest mb-4 text-gray-700">FORMATION</h2>
              <div className="text-xs">
                <p className="font-bold text-gray-900">{cvData.formation.diplome}</p>
                <p className="text-gray-700 mt-1">{cvData.formation.etablissement}</p>
                <p className="text-[10px] text-gray-600 mt-1">{cvData.formation.periode}</p>
                <p className="font-semibold text-gray-700 mt-2">{cvData.formation.mention}</p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-xs font-bold uppercase tracking-widest mb-4 text-gray-700">COMPÉTENCES</h2>
              <div className="space-y-2">
                {cvData.competences.interpersonnelles.slice(0, 10).map((comp, idx) => (
                  <div key={idx}>
                    <p className="text-[10px] text-gray-600 mb-1">{comp}</p>
                    <div className="w-full h-1 bg-gray-300">
                      <div className="h-1 bg-gray-900" style={{width: '85%'}}></div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-xs font-bold uppercase tracking-widest mb-4 text-gray-700">OUTILS</h2>
              <div className="flex flex-wrap gap-1.5">
                {cvData.competences.techniques.map((comp, idx) => (
                  <span key={idx} className="text-[9px] bg-gray-900 text-white px-2 py-1">{comp}</span>
                ))}
              </div>
            </section>
          </div>

          <div className="col-span-3 p-8">
            <section>
              <h2 className="text-xl font-bold uppercase tracking-wider mb-6 pb-2 border-b-2 border-gray-900">EXPÉRIENCE PROFESSIONNELLE</h2>
              {cvData.experiences.map((exp, idx) => (
                <div key={idx} className="mb-6">
                  <div className="mb-2">
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="text-base font-bold text-gray-900">{exp.titre}</h3>
                      <span className="text-xs text-gray-600">{exp.periode}</span>
                    </div>
                    <p className="text-sm text-gray-700 font-medium">{exp.entreprise}</p>
                    <p className="text-xs text-gray-600">{exp.duree}</p>
                  </div>
                  {exp.missions.length > 0 && (
                    <ul className="text-xs text-gray-600 space-y-1">
                      {exp.missions.slice(0, 3).map((mission, midx) => (
                        <li key={midx} className="leading-relaxed">→ {mission}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </section>
          </div>
        </div>
      </div>
    ),

    // CV 16 - Infographic Style
    () => (
      <div className="max-w-4xl mx-auto bg-gradient-to-br from-gray-50 to-white p-10 shadow-lg print:shadow-none">
        <header className="relative mb-10 flex items-center gap-8">
          <div className="absolute -left-2 top-0 w-1 h-full bg-gradient-to-b from-gray-900 to-gray-600"></div>
          <div className="pl-6 flex-shrink-0">
            <Image 
              src="/og-caroline-karpel.jpg" 
              alt="Caroline Karpel" 
              width={130} 
              height={130}
              className="rounded border-2 border-gray-300"
            />
          </div>
          <div className="flex-1">
            <h1 className="text-4xl font-black uppercase tracking-tight text-gray-900">{cvData.nom}</h1>
            <p className="text-lg text-gray-700 mt-1">{cvData.posteActuel}</p>
            <p className="text-xs text-gray-500 mt-1 uppercase tracking-wider">{cvData.localisation}</p>
          </div>
        </header>

        <div className="grid grid-cols-4 gap-6">
          <section className="col-span-3">
            <div className="bg-gray-900 text-white px-4 py-2 mb-4">
              <h2 className="text-sm font-bold uppercase tracking-widest">PARCOURS PROFESSIONNEL</h2>
            </div>
            {cvData.experiences.map((exp, idx) => (
              <div key={idx} className="mb-5 relative pl-6">
                <div className="absolute left-0 top-2 w-2 h-2 bg-gray-900 rounded-full"></div>
                <div className="bg-white border-l-4 border-gray-300 pl-4 py-2">
                  <h3 className="text-sm font-bold text-gray-900">{exp.titre}</h3>
                  <p className="text-xs text-gray-700 font-medium">{exp.entreprise}</p>
                  <p className="text-[10px] text-gray-500">{exp.periode} · {exp.duree}</p>
                  {exp.missions.length > 0 && (
                    <ul className="text-[10px] text-gray-600 mt-2 space-y-0.5">
                      {exp.missions.slice(0, 2).map((mission, midx) => (
                        <li key={midx}>▸ {mission}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            ))}
          </section>

          <section>
            <div className="bg-gray-900 text-white px-3 py-2 mb-4">
              <h2 className="text-xs font-bold uppercase tracking-widest">FORMATION</h2>
            </div>
            <div className="bg-white p-3 mb-4 text-[10px]">
              <p className="font-bold text-gray-900">{cvData.formation.diplome}</p>
              <p className="text-gray-700 mt-1">{cvData.formation.etablissement}</p>
              <p className="text-gray-600 mt-1">{cvData.formation.periode}</p>
              <p className="font-semibold mt-2">{cvData.formation.mention}</p>
            </div>

            <div className="bg-gray-900 text-white px-3 py-2 mb-4">
              <h2 className="text-xs font-bold uppercase tracking-widest">EXPERTISE</h2>
            </div>
            <div className="space-y-2">
              {cvData.competences.interpersonnelles.slice(0, 8).map((comp, idx) => (
                <div key={idx} className="bg-white p-2">
                  <p className="text-[9px] text-gray-700 font-medium">{comp}</p>
                  <div className="w-full h-0.5 bg-gray-200 mt-1">
                    <div className="h-0.5 bg-gray-900" style={{width: `${90 - idx * 5}%`}}></div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    ),

    // CV 17 - Artistic & Creative
    () => (
      <div className="max-w-4xl mx-auto bg-white p-12 shadow-lg print:shadow-none">
        <header className="mb-10 relative">
          <div className="text-center mb-6">
            <Image 
              src="/og-caroline-karpel.jpg" 
              alt="Caroline Karpel" 
              width={120} 
              height={120}
              className="rounded-full mx-auto border-4 border-gray-400"
            />
          </div>
          <div className="border-4 border-double border-gray-300 p-6 relative">
            <div className="absolute -top-2 -left-2 w-8 h-8 bg-white border-2 border-gray-900"></div>
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-white border-2 border-gray-900"></div>
            <div className="absolute -bottom-2 -left-2 w-8 h-8 bg-white border-2 border-gray-900"></div>
            <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-white border-2 border-gray-900"></div>
            <h1 className="text-center text-4xl font-serif mb-3">{cvData.nom}</h1>
            <p className="text-center text-sm uppercase tracking-[0.5em] text-gray-600">{cvData.posteActuel.split(' chez ')[0]}</p>
            <p className="text-center text-xs text-gray-500 mt-2">{cvData.localisation}</p>
          </div>
        </header>

        <section className="mb-10">
          <div className="flex items-center mb-6">
            <div className="flex-1 h-px bg-gray-300"></div>
            <h2 className="px-4 text-sm uppercase tracking-[0.3em] text-gray-700 font-serif">Expérience</h2>
            <div className="flex-1 h-px bg-gray-300"></div>
          </div>
          {cvData.experiences.map((exp, idx) => (
            <div key={idx} className="mb-6 border-l-2 border-gray-200 pl-6 relative">
              <div className="absolute -left-2 top-0 w-4 h-4 bg-white border-2 border-gray-400 rounded-full"></div>
              <h3 className="text-base font-serif font-semibold italic">{exp.titre}</h3>
              <p className="text-sm text-gray-700">{exp.entreprise}</p>
              <p className="text-xs text-gray-500 mb-2">{exp.periode} · {exp.duree}</p>
              {exp.missions.length > 0 && (
                <ul className="text-xs text-gray-600 space-y-1">
                  {exp.missions.slice(0, 3).map((mission, midx) => (
                    <li key={midx} className="leading-relaxed">◇ {mission}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </section>

        <div className="grid grid-cols-2 gap-10">
          <section>
            <div className="flex items-center mb-4">
              <div className="flex-1 h-px bg-gray-300"></div>
              <h2 className="px-4 text-sm uppercase tracking-[0.3em] text-gray-700 font-serif">Formation</h2>
              <div className="flex-1 h-px bg-gray-300"></div>
            </div>
            <div className="text-center">
              <p className="font-serif font-semibold text-sm">{cvData.formation.diplome}</p>
              <p className="text-sm text-gray-700 mt-1">{cvData.formation.etablissement}</p>
              <p className="text-xs text-gray-600 mt-1">{cvData.formation.periode}</p>
              <p className="text-sm font-semibold mt-2">{cvData.formation.mention}</p>
            </div>
          </section>

          <section>
            <div className="flex items-center mb-4">
              <div className="flex-1 h-px bg-gray-300"></div>
              <h2 className="px-4 text-sm uppercase tracking-[0.3em] text-gray-700 font-serif">Compétences</h2>
              <div className="flex-1 h-px bg-gray-300"></div>
            </div>
            <div className="space-y-1.5">
              {cvData.competences.interpersonnelles.slice(0, 8).map((comp, idx) => (
                <p key={idx} className="text-xs text-gray-700 text-center">◇ {comp}</p>
              ))}
            </div>
          </section>
        </div>
      </div>
    ),

    // CV 18 - Tech Moderne
    () => (
      <div className="max-w-4xl mx-auto bg-black text-white shadow-lg print:shadow-none">
        <div className="p-10 bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center gap-8">
          <Image 
            src="/og-caroline-karpel.jpg" 
            alt="Caroline Karpel" 
            width={140} 
            height={140}
            className="rounded border-4 border-gray-700"
          />
          <div>
            <h1 className="text-5xl font-black mb-3 tracking-tight">{cvData.nom}</h1>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-white"></div>
              <p className="text-base uppercase tracking-[0.3em] text-gray-300">{cvData.posteActuel.split(' chez ')[0]}</p>
            </div>
            <p className="text-xs text-gray-500 mt-2 ml-5">{cvData.localisation}</p>
          </div>
        </div>

        <div className="p-10 bg-white text-black">
          <section className="mb-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1 h-6 bg-black"></div>
              <h2 className="text-xl font-black uppercase tracking-widest">EXPÉRIENCE</h2>
            </div>
            {cvData.experiences.map((exp, idx) => (
              <div key={idx} className="mb-6 border border-gray-200 p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-base font-bold uppercase tracking-wide">{exp.titre}</h3>
                    <p className="text-sm text-gray-700">{exp.entreprise}</p>
                  </div>
                  <div className="text-right text-xs text-gray-600">
                    <p>{exp.periode}</p>
                    <p>{exp.duree}</p>
                  </div>
                </div>
                {exp.missions.length > 0 && (
                  <ul className="text-xs text-gray-700 space-y-1 mt-2">
                    {exp.missions.slice(0, 2).map((mission, midx) => (
                      <li key={midx} className="flex items-start gap-2">
                        <span className="mt-1">▪</span>
                        <span>{mission}</span>
          </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </section>

          <div className="grid grid-cols-2 gap-6">
            <section className="border border-gray-200 p-4">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-1 h-5 bg-black"></div>
                <h2 className="text-base font-black uppercase tracking-widest">FORMATION</h2>
        </div>
              <p className="font-bold text-sm">{cvData.formation.diplome}</p>
              <p className="text-sm text-gray-700">{cvData.formation.etablissement}</p>
              <p className="text-xs text-gray-600 mt-1">{cvData.formation.periode}</p>
              <p className="text-sm font-bold mt-2">{cvData.formation.mention}</p>
            </section>

            <section className="border border-gray-200 p-4">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-1 h-5 bg-black"></div>
                <h2 className="text-base font-black uppercase tracking-widest">EXPERTISE</h2>
              </div>
              <div className="grid grid-cols-2 gap-1 text-[10px]">
                {cvData.competences.interpersonnelles.slice(0, 10).map((comp, idx) => (
                  <div key={idx} className="bg-black text-white px-2 py-1 text-center">{comp}</div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    ),

    // CV 19 - Professional Contrast
    () => (
      <div className="max-w-4xl mx-auto bg-white shadow-lg print:shadow-none">
        <div className="flex">
          <div className="w-1/4 bg-black text-white p-6">
            <div className="mb-8 text-center">
              <Image 
                src="/og-caroline-karpel.jpg" 
                alt="Caroline Karpel" 
                width={120} 
                height={120}
                className="rounded-full mx-auto border-4 border-gray-700 mb-6"
              />
            </div>
            <div className="mb-8">
              <div className="w-8 h-1 bg-white mb-4"></div>
              <h2 className="text-xs uppercase tracking-widest mb-3">FORMATION</h2>
              <div className="text-[10px]">
                <p className="font-bold mb-1">{cvData.formation.diplome}</p>
                <p className="opacity-90">{cvData.formation.etablissement}</p>
                <p className="opacity-70 mt-2">{cvData.formation.periode}</p>
                <p className="font-semibold mt-2">{cvData.formation.mention}</p>
              </div>
            </div>

            <div className="mb-8">
              <div className="w-8 h-1 bg-white mb-4"></div>
              <h2 className="text-xs uppercase tracking-widest mb-3">COMPÉTENCES</h2>
              <div className="space-y-2 text-[9px]">
                {cvData.competences.interpersonnelles.slice(0, 12).map((comp, idx) => (
                  <p key={idx} className="opacity-90">{comp}</p>
                ))}
              </div>
            </div>

            <div>
              <div className="w-8 h-1 bg-white mb-4"></div>
              <h2 className="text-xs uppercase tracking-widest mb-3">OUTILS</h2>
              <div className="space-y-1 text-[9px]">
                {cvData.competences.techniques.map((comp, idx) => (
                  <p key={idx} className="opacity-90">{comp}</p>
                ))}
              </div>
            </div>
          </div>

          <div className="w-3/4 p-10">
            <header className="mb-8">
              <h1 className="text-4xl font-bold mb-2">{cvData.nom}</h1>
              <p className="text-base text-gray-700">{cvData.posteActuel}</p>
              <p className="text-sm text-gray-500 mt-1">{cvData.localisation}</p>
            </header>

            <section>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-px bg-black"></div>
                <h2 className="text-lg font-bold uppercase tracking-wider">EXPÉRIENCE PROFESSIONNELLE</h2>
              </div>
              {cvData.experiences.map((exp, idx) => (
                <div key={idx} className="mb-6">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-base font-bold">{exp.titre}</h3>
                      <p className="text-sm text-gray-700">{exp.entreprise}</p>
                    </div>
                    <div className="text-right text-xs text-gray-600">
                      <p>{exp.periode}</p>
                      <p>{exp.duree}</p>
                    </div>
                  </div>
                  {exp.missions.length > 0 && (
                    <ul className="text-xs text-gray-700 space-y-1">
                      {exp.missions.slice(0, 3).map((mission, midx) => (
                        <li key={midx} className="leading-relaxed">• {mission}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </section>
          </div>
        </div>
      </div>
    ),

    // CV 20 - Ultra Clean
    () => (
      <div className="max-w-3xl mx-auto bg-white p-16 shadow-lg print:shadow-none">
        <header className="mb-12 flex items-center gap-10">
          <Image 
            src="/og-caroline-karpel.jpg" 
            alt="Caroline Karpel" 
            width={130} 
            height={130}
            className="rounded-full border border-gray-200"
          />
          <div>
            <h1 className="text-5xl font-thin mb-4 tracking-tight">{cvData.nom}</h1>
            <p className="text-base text-gray-700 mb-2">{cvData.posteActuel}</p>
            <p className="text-sm text-gray-500">{cvData.localisation}</p>
          </div>
        </header>

        <section className="mb-12">
          <h2 className="text-xs uppercase tracking-[0.5em] text-gray-400 mb-8">Expérience Professionnelle</h2>
          {cvData.experiences.map((exp, idx) => (
            <div key={idx} className="mb-8">
              <div className="flex justify-between items-baseline mb-2">
                <h3 className="text-base font-medium">{exp.titre}</h3>
                <span className="text-xs text-gray-500">{exp.periode}</span>
              </div>
              <p className="text-sm text-gray-700 mb-1">{exp.entreprise}</p>
              <p className="text-xs text-gray-500 mb-3">{exp.duree}</p>
              {exp.missions.length > 0 && (
                <ul className="text-sm text-gray-600 space-y-2">
                  {exp.missions.map((mission, midx) => (
                    <li key={midx} className="leading-relaxed pl-4 border-l border-gray-200">{mission}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </section>

        <section className="mb-12">
          <h2 className="text-xs uppercase tracking-[0.5em] text-gray-400 mb-6">Formation</h2>
          <div>
            <p className="text-base font-medium">{cvData.formation.diplome}</p>
            <p className="text-sm text-gray-700 mt-1">{cvData.formation.etablissement}</p>
            <p className="text-xs text-gray-500 mt-1">{cvData.formation.periode}</p>
            <p className="text-sm text-gray-700 mt-2">{cvData.formation.mention}</p>
          </div>
        </section>

        <section>
          <h2 className="text-xs uppercase tracking-[0.5em] text-gray-400 mb-6">Compétences</h2>
          <div className="flex flex-wrap gap-3">
            {[...cvData.competences.interpersonnelles, ...cvData.competences.techniques].map((comp, idx) => (
              <span key={idx} className="text-xs text-gray-700 border-b border-gray-300 pb-1">{comp}</span>
            ))}
          </div>
        </section>
      </div>
    ),

    // CV 21 - Vert Émeraude Moderne
    () => (
      <div className="max-w-4xl mx-auto bg-white shadow-lg print:shadow-none">
        <div className="bg-gradient-to-r from-emerald-700 to-emerald-500 text-white p-16 flex items-center gap-10">
          <div className="flex-shrink-0">
            <Image 
              src="/og-caroline-karpel.jpg" 
              alt="Caroline Karpel" 
              width={200} 
              height={200}
              className="rounded-full border-8 border-emerald-200 shadow-2xl"
            />
          </div>
          <div className="flex-1">
            <h1 className="text-6xl font-bold mb-5">{cvData.nom}</h1>
            <p className="text-3xl font-semibold">{cvData.posteActuel}</p>
            <p className="text-xl opacity-95 mt-4">{cvData.localisation}</p>
          </div>
        </div>
        <div className="p-14">
          <section className="mb-12">
            <h2 className="text-4xl font-bold mb-10 text-emerald-700 border-b-8 border-emerald-500 pb-4 inline-block">EXPÉRIENCE</h2>
            {cvData.experiences.map((exp, idx) => (
              <div key={idx} className="mb-10 bg-emerald-50 p-8 rounded-xl border-l-8 border-emerald-600 shadow-md">
                <h3 className="text-2xl font-bold text-emerald-900 mb-2">{exp.titre}</h3>
                <p className="text-lg text-emerald-700 font-bold mb-2">{exp.entreprise} · {exp.duree}</p>
                <p className="text-base text-emerald-600 mb-4">{exp.periode}</p>
                {exp.missions.length > 0 && (
                  <ul className="text-base text-gray-800 space-y-3 mt-4 leading-relaxed">
                    {exp.missions.map((mission, midx) => (
                      <li key={midx} className="leading-relaxed flex items-start">
                        <span className="text-emerald-600 font-bold mr-3 text-xl">✓</span>
                        <span>{mission}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </section>
          <div className="grid grid-cols-2 gap-10">
            <section>
              <h2 className="text-3xl font-bold mb-6 text-emerald-700 border-b-8 border-emerald-500 pb-4 inline-block">FORMATION</h2>
              <div className="bg-emerald-50 p-6 rounded-xl shadow-md">
                <p className="font-bold text-xl text-emerald-900 mb-2">{cvData.formation.diplome}</p>
                <p className="text-lg text-emerald-700 mb-2">{cvData.formation.etablissement}</p>
                <p className="text-base text-gray-700 mt-3">{cvData.formation.periode}</p>
                <p className="text-xl font-bold text-emerald-700 mt-4">{cvData.formation.mention}</p>
              </div>
            </section>
            <section>
              <h2 className="text-3xl font-bold mb-6 text-emerald-700 border-b-8 border-emerald-500 pb-4 inline-block">COMPÉTENCES</h2>
              <div className="flex flex-wrap gap-3">
                {cvData.competences.interpersonnelles.slice(0, 10).map((comp, idx) => (
                  <span key={idx} className="text-sm bg-emerald-600 text-white px-5 py-3 rounded-full font-semibold shadow-md">{comp}</span>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    ),

    // CV 22 - Orange Dynamique
    () => (
      <div className="max-w-4xl mx-auto bg-white p-16 shadow-lg print:shadow-none">
        <div className="mb-14 border-l-[16px] border-orange-500 pl-10 bg-orange-50 py-10 rounded-r-xl flex items-center gap-8">
          <div className="flex-shrink-0">
            <Image 
              src="/og-caroline-karpel.jpg" 
              alt="Caroline Karpel" 
              width={180} 
              height={180}
              className="rounded-2xl border-8 border-orange-400 shadow-2xl"
            />
          </div>
          <div className="flex-1">
            <h1 className="text-6xl font-black text-orange-900 mb-4">{cvData.nom}</h1>
            <p className="text-2xl text-orange-700 font-bold">{cvData.posteActuel}</p>
            <p className="text-lg text-gray-700 mt-3">{cvData.localisation}</p>
          </div>
        </div>
        <section className="mb-12">
          <h2 className="text-4xl font-black uppercase tracking-wider mb-10 text-orange-900 underline decoration-orange-500 decoration-8 underline-offset-[16px]">PARCOURS PROFESSIONNEL</h2>
          {cvData.experiences.map((exp, idx) => (
            <div key={idx} className="mb-10 relative pl-12 before:content-[''] before:absolute before:left-0 before:top-3 before:w-8 before:h-8 before:bg-orange-500 before:rounded-full before:shadow-lg">
              <h3 className="text-2xl font-bold text-orange-900 mb-2">{exp.titre}</h3>
              <p className="text-lg text-orange-700 font-bold mb-1">{exp.entreprise}</p>
              <p className="text-base text-gray-700 mb-4">{exp.periode} · {exp.duree}</p>
              {exp.missions.length > 0 && (
                <ul className="text-base text-gray-800 space-y-3 mt-4 leading-relaxed">
                  {exp.missions.map((mission, midx) => (
                    <li key={midx} className="leading-relaxed flex items-start">
                      <span className="text-orange-500 font-bold mr-3 text-xl">→</span>
                      <span>{mission}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </section>
        <div className="grid grid-cols-3 gap-10">
          <section className="bg-orange-50 p-8 rounded-xl shadow-md border-t-8 border-orange-500">
            <h2 className="text-2xl font-black uppercase text-orange-900 mb-6">FORMATION</h2>
            <p className="text-xl font-bold mb-2">{cvData.formation.diplome}</p>
            <p className="text-base mb-2">{cvData.formation.etablissement}</p>
            <p className="text-lg text-orange-700 font-bold mt-4">{cvData.formation.mention}</p>
          </section>
          <section className="col-span-2 bg-orange-50 p-8 rounded-xl shadow-md border-t-8 border-orange-500">
            <h2 className="text-2xl font-black uppercase text-orange-900 mb-6">EXPERTISE</h2>
            <div className="flex flex-wrap gap-3">
              {cvData.competences.interpersonnelles.map((comp, idx) => (
                <span key={idx} className="text-sm bg-white border-3 border-orange-500 text-orange-900 px-4 py-2 rounded-lg font-bold shadow-sm">{comp}</span>
              ))}
            </div>
          </section>
        </div>
      </div>
    ),

    // CV 23 - Rose Sophistiqué
    () => (
      <div className="max-w-4xl mx-auto bg-gradient-to-br from-pink-50 to-white p-12 shadow-lg print:shadow-none">
        <header className="text-center mb-10 pb-6 border-b-2 border-pink-400">
          <div className="mb-6 inline-block">
            <Image 
              src="/og-caroline-karpel.jpg" 
              alt="Caroline Karpel" 
              width={160} 
              height={160}
              className="rounded-full border-8 border-pink-300 shadow-xl mx-auto"
            />
          </div>
          <h1 className="text-5xl font-serif mb-3 text-pink-900">{cvData.nom}</h1>
          <div className="w-24 h-1 bg-gradient-to-r from-pink-400 to-rose-600 mx-auto mb-3"></div>
          <p className="text-base text-gray-700 font-medium">{cvData.posteActuel}</p>
          <p className="text-sm text-gray-600 mt-1">{cvData.localisation}</p>
        </header>
        <section className="mb-8">
          <h2 className="text-xl font-serif italic mb-6 text-pink-900 border-l-4 border-pink-400 pl-4">Expérience Professionnelle</h2>
          {cvData.experiences.map((exp, idx) => (
            <div key={idx} className="mb-6 bg-white p-5 rounded-lg shadow-sm border-t-4 border-pink-400">
              <h3 className="text-base font-semibold text-pink-900">{exp.titre}</h3>
              <p className="text-sm text-pink-700 font-medium">{exp.entreprise} · {exp.duree}</p>
              <p className="text-xs text-gray-600 mb-2">{exp.periode}</p>
              {exp.missions.length > 0 && (
                <ul className="text-xs text-gray-700 space-y-1">
                  {exp.missions.map((mission, midx) => (
                    <li key={midx} className="leading-relaxed">◇ {mission}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </section>
        <div className="grid grid-cols-2 gap-8">
          <section>
            <h2 className="text-xl font-serif italic mb-4 text-pink-900 border-l-4 border-pink-400 pl-4">Formation</h2>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <p className="font-semibold text-sm text-pink-900">{cvData.formation.diplome}</p>
              <p className="text-sm">{cvData.formation.etablissement}</p>
              <p className="text-xs text-gray-600 mt-1">{cvData.formation.periode}</p>
              <p className="text-sm font-semibold text-pink-700 mt-2">{cvData.formation.mention}</p>
            </div>
          </section>
          <section>
            <h2 className="text-xl font-serif italic mb-4 text-pink-900 border-l-4 border-pink-400 pl-4">Compétences</h2>
            <div className="flex flex-wrap gap-2">
              {cvData.competences.interpersonnelles.slice(0, 12).map((comp, idx) => (
                <span key={idx} className="text-[10px] bg-gradient-to-r from-pink-100 to-rose-100 text-pink-900 px-3 py-1 rounded-full border border-pink-300">{comp}</span>
              ))}
            </div>
          </section>
        </div>
      </div>
    ),

    // CV 24 - Indigo Corporate
    () => (
      <div className="max-w-4xl mx-auto bg-white shadow-lg print:shadow-none">
        <div className="flex">
          <div className="w-1 bg-gradient-to-b from-indigo-600 via-indigo-800 to-indigo-600"></div>
          <div className="flex-1">
            <div className="bg-indigo-900 text-white p-10 flex items-center gap-8">
              <Image 
                src="/og-caroline-karpel.jpg" 
                alt="Caroline Karpel" 
                width={140} 
                height={140}
                className="rounded-lg border-4 border-indigo-600"
              />
              <div>
                <h1 className="text-4xl font-bold mb-2">{cvData.nom}</h1>
                <p className="text-lg opacity-90">{cvData.posteActuel.split(' chez ')[0]}</p>
                <p className="text-sm opacity-75 mt-1">{cvData.localisation}</p>
              </div>
            </div>
            <div className="p-10">
              <section className="mb-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-1 bg-indigo-600"></div>
                  <h2 className="text-2xl font-bold text-indigo-900">EXPÉRIENCE</h2>
                </div>
                {cvData.experiences.map((exp, idx) => (
                  <div key={idx} className="mb-6 border-l-4 border-indigo-300 pl-6 bg-indigo-50 py-4">
                    <h3 className="text-base font-bold text-indigo-900">{exp.titre}</h3>
                    <p className="text-sm text-indigo-700 font-semibold">{exp.entreprise} · {exp.duree}</p>
                    <p className="text-xs text-gray-600 mb-2">{exp.periode}</p>
                    {exp.missions.length > 0 && (
                      <ul className="text-xs text-gray-700 space-y-1">
                        {exp.missions.map((mission, midx) => (
                          <li key={midx} className="leading-relaxed">▪ {mission}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </section>
              <div className="grid grid-cols-2 gap-6">
                <section>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-1 bg-indigo-600"></div>
                    <h2 className="text-lg font-bold text-indigo-900">FORMATION</h2>
                  </div>
                  <div className="bg-indigo-50 p-4 rounded">
                    <p className="font-bold text-sm text-indigo-900">{cvData.formation.diplome}</p>
                    <p className="text-xs">{cvData.formation.etablissement}</p>
                    <p className="text-xs text-indigo-700 font-semibold mt-2">{cvData.formation.mention}</p>
                  </div>
                </section>
                <section>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-1 bg-indigo-600"></div>
                    <h2 className="text-lg font-bold text-indigo-900">COMPÉTENCES</h2>
                  </div>
                  <div className="space-y-2">
                    {cvData.competences.interpersonnelles.slice(0, 10).map((comp, idx) => (
                      <div key={idx} className="text-xs bg-indigo-900 text-white px-3 py-1.5 rounded">{comp}</div>
                    ))}
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),

    // CV 25 - Cyan Créatif
    () => (
      <div className="max-w-4xl mx-auto bg-white p-10 shadow-lg print:shadow-none">
        <div className="relative mb-10 flex items-center gap-8">
          <div className="absolute -left-4 top-0 w-2 h-full bg-gradient-to-b from-cyan-400 to-cyan-600"></div>
          <Image 
            src="/og-caroline-karpel.jpg" 
            alt="Caroline Karpel" 
            width={150} 
            height={150}
            className="rounded-xl border-4 border-cyan-500 shadow-xl"
          />
          <div>
            <h1 className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-cyan-800 mb-3">{cvData.nom}</h1>
            <p className="text-lg text-cyan-700 font-bold">{cvData.posteActuel}</p>
            <p className="text-sm text-gray-600">{cvData.localisation}</p>
          </div>
        </div>
        <section className="mb-8">
          <h2 className="text-2xl font-black uppercase tracking-widest mb-6 text-cyan-900 relative inline-block after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-1 after:bg-gradient-to-r after:from-cyan-400 after:to-cyan-600">PARCOURS</h2>
          {cvData.experiences.map((exp, idx) => (
            <div key={idx} className="mb-6 relative">
              <div className="absolute -left-6 top-2 w-4 h-4 bg-cyan-500 rounded-full border-4 border-cyan-200"></div>
              <div className="bg-gradient-to-r from-cyan-50 to-white p-5 rounded-r-lg border-l-4 border-cyan-500">
                <h3 className="text-base font-bold text-cyan-900">{exp.titre}</h3>
                <p className="text-sm text-cyan-700 font-semibold">{exp.entreprise}</p>
                <p className="text-xs text-gray-600">{exp.periode} · {exp.duree}</p>
                {exp.missions.length > 0 && (
                  <ul className="text-xs text-gray-700 space-y-1 mt-2">
                    {exp.missions.map((mission, midx) => (
                      <li key={midx} className="leading-relaxed">▸ {mission}</li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          ))}
        </section>
        <div className="grid grid-cols-3 gap-6">
          <section className="col-span-1 bg-gradient-to-br from-cyan-500 to-cyan-600 text-white p-6 rounded-lg">
            <h2 className="text-base font-black uppercase mb-4">FORMATION</h2>
            <p className="text-sm font-bold">{cvData.formation.diplome}</p>
            <p className="text-xs opacity-90 mt-1">{cvData.formation.etablissement}</p>
            <p className="text-sm font-bold mt-3">{cvData.formation.mention}</p>
          </section>
          <section className="col-span-2">
            <h2 className="text-base font-black uppercase tracking-widest mb-4 text-cyan-900">COMPÉTENCES</h2>
            <div className="grid grid-cols-2 gap-2">
              {cvData.competences.interpersonnelles.map((comp, idx) => (
                <div key={idx} className="text-[10px] bg-gradient-to-r from-cyan-100 to-cyan-50 text-cyan-900 px-3 py-2 rounded font-semibold border-l-4 border-cyan-500">{comp}</div>
              ))}
            </div>
          </section>
        </div>
      </div>
    ),

    // CV 26 - Amber Chaleureux
    () => (
      <div className="max-w-4xl mx-auto bg-gradient-to-br from-amber-50 via-white to-amber-50 p-12 shadow-lg print:shadow-none">
        <div className="text-center mb-10 bg-white p-8 rounded-lg shadow-md border-t-4 border-amber-500">
          <div className="mb-6">
            <Image 
              src="/og-caroline-karpel.jpg" 
              alt="Caroline Karpel" 
              width={140} 
              height={140}
              className="rounded-full mx-auto border-6 border-amber-400 shadow-lg"
            />
          </div>
          <h1 className="text-5xl font-bold text-amber-900 mb-3">{cvData.nom}</h1>
          <div className="flex items-center justify-center gap-3 mb-2">
            <div className="w-12 h-px bg-amber-500"></div>
            <p className="text-base text-amber-700 font-semibold">{cvData.posteActuel}</p>
            <div className="w-12 h-px bg-amber-500"></div>
          </div>
          <p className="text-sm text-gray-600">{cvData.localisation}</p>
        </div>
        <section className="mb-8">
          <h2 className="text-xl font-bold mb-6 text-amber-900 bg-amber-100 px-4 py-2 rounded inline-block">EXPÉRIENCE PROFESSIONNELLE</h2>
          {cvData.experiences.map((exp, idx) => (
            <div key={idx} className="mb-6 bg-white p-5 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="border-l-4 border-amber-500 pl-4">
                <h3 className="text-base font-bold text-amber-900">{exp.titre}</h3>
                <p className="text-sm text-amber-700 font-semibold">{exp.entreprise} · {exp.duree}</p>
                <p className="text-xs text-gray-600 mb-2">{exp.periode}</p>
                {exp.missions.length > 0 && (
                  <ul className="text-xs text-gray-700 space-y-1">
                    {exp.missions.map((mission, midx) => (
                      <li key={midx} className="leading-relaxed flex items-start gap-2">
                        <span className="text-amber-500 font-bold">•</span>
                        <span>{mission}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          ))}
        </section>
        <div className="grid grid-cols-2 gap-8">
          <section>
            <h2 className="text-xl font-bold mb-4 text-amber-900 bg-amber-100 px-4 py-2 rounded inline-block">FORMATION</h2>
            <div className="bg-white p-5 rounded-lg shadow-sm">
              <p className="font-bold text-sm text-amber-900">{cvData.formation.diplome}</p>
              <p className="text-sm text-gray-700">{cvData.formation.etablissement}</p>
              <p className="text-xs text-gray-600 mt-1">{cvData.formation.periode}</p>
              <p className="text-sm font-bold text-amber-700 mt-2">{cvData.formation.mention}</p>
            </div>
          </section>
          <section>
            <h2 className="text-xl font-bold mb-4 text-amber-900 bg-amber-100 px-4 py-2 rounded inline-block">COMPÉTENCES</h2>
            <div className="flex flex-wrap gap-2">
              {cvData.competences.interpersonnelles.slice(0, 12).map((comp, idx) => (
                <span key={idx} className="text-[10px] bg-white text-amber-900 px-3 py-1.5 rounded-full shadow-sm border border-amber-300 font-medium">{comp}</span>
              ))}
            </div>
          </section>
        </div>
      </div>
    ),

    // CV 27 - Lime Énergique
    () => (
      <div className="max-w-4xl mx-auto bg-white shadow-lg print:shadow-none">
        <div className="bg-gradient-to-r from-lime-600 to-lime-500 p-10 relative overflow-hidden flex items-center gap-8">
          <div className="absolute top-0 right-0 w-64 h-64 bg-lime-400 rounded-full -mr-32 -mt-32 opacity-20"></div>
          <Image 
            src="/og-caroline-karpel.jpg" 
            alt="Caroline Karpel" 
            width={150} 
            height={150}
            className="rounded-xl border-6 border-lime-200 shadow-2xl relative z-10"
          />
          <div className="relative z-10">
            <h1 className="text-5xl font-black text-white mb-2">{cvData.nom}</h1>
            <p className="text-xl text-lime-100">{cvData.posteActuel}</p>
            <p className="text-sm text-lime-200 mt-1">{cvData.localisation}</p>
          </div>
        </div>
        <div className="p-10">
          <section className="mb-8">
            <h2 className="text-2xl font-black mb-6 text-lime-900 flex items-center gap-3">
              <span className="w-2 h-8 bg-lime-600"></span>
              EXPÉRIENCE PROFESSIONNELLE
            </h2>
            {cvData.experiences.map((exp, idx) => (
              <div key={idx} className="mb-6 border-2 border-lime-200 rounded-lg p-5 hover:border-lime-500 transition-colors">
                <h3 className="text-base font-bold text-lime-900">{exp.titre}</h3>
                <p className="text-sm text-lime-700 font-semibold">{exp.entreprise} · {exp.duree}</p>
                <p className="text-xs text-gray-600 mb-2">{exp.periode}</p>
                {exp.missions.length > 0 && (
                  <ul className="text-xs text-gray-700 space-y-1">
                    {exp.missions.map((mission, midx) => (
                      <li key={midx} className="leading-relaxed pl-4 border-l-2 border-lime-400">• {mission}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </section>
          <div className="grid grid-cols-2 gap-6">
            <section className="border-2 border-lime-200 rounded-lg p-6">
              <h2 className="text-lg font-black mb-4 text-lime-900 flex items-center gap-2">
                <span className="w-1.5 h-6 bg-lime-600"></span>
                FORMATION
              </h2>
              <p className="font-bold text-sm text-lime-900">{cvData.formation.diplome}</p>
              <p className="text-sm">{cvData.formation.etablissement}</p>
              <p className="text-xs text-gray-600 mt-1">{cvData.formation.periode}</p>
              <p className="text-sm font-bold text-lime-700 mt-2">{cvData.formation.mention}</p>
            </section>
            <section className="border-2 border-lime-200 rounded-lg p-6">
              <h2 className="text-lg font-black mb-4 text-lime-900 flex items-center gap-2">
                <span className="w-1.5 h-6 bg-lime-600"></span>
                COMPÉTENCES
              </h2>
              <div className="flex flex-wrap gap-2">
                {cvData.competences.interpersonnelles.slice(0, 10).map((comp, idx) => (
                  <span key={idx} className="text-[10px] bg-lime-600 text-white px-3 py-1 rounded font-bold">{comp}</span>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    ),

    // CV 28 - Fuchsia Audacieux
    () => (
      <div className="max-w-4xl mx-auto bg-black text-white shadow-lg print:shadow-none">
        <div className="p-10 bg-gradient-to-br from-fuchsia-900 via-fuchsia-800 to-black flex items-center gap-8">
          <Image 
            src="/og-caroline-karpel.jpg" 
            alt="Caroline Karpel" 
            width={150} 
            height={150}
            className="rounded-full border-6 border-fuchsia-500 shadow-2xl"
          />
          <div>
            <h1 className="text-6xl font-black mb-3 text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-pink-400">{cvData.nom}</h1>
            <p className="text-xl text-fuchsia-300">{cvData.posteActuel}</p>
            <p className="text-sm text-fuchsia-400 mt-2">{cvData.localisation}</p>
          </div>
        </div>
        <div className="p-10 bg-gradient-to-br from-gray-900 to-black">
          <section className="mb-8">
            <h2 className="text-2xl font-black uppercase tracking-widest mb-6 text-fuchsia-400 border-b-2 border-fuchsia-600 pb-2">EXPÉRIENCE</h2>
            {cvData.experiences.map((exp, idx) => (
              <div key={idx} className="mb-6 bg-gradient-to-r from-fuchsia-950 to-gray-900 p-5 rounded border-l-4 border-fuchsia-600">
                <h3 className="text-base font-bold text-fuchsia-300">{exp.titre}</h3>
                <p className="text-sm text-fuchsia-400 font-semibold">{exp.entreprise} · {exp.duree}</p>
                <p className="text-xs text-gray-400 mb-2">{exp.periode}</p>
                {exp.missions.length > 0 && (
                  <ul className="text-xs text-gray-300 space-y-1">
                    {exp.missions.map((mission, midx) => (
                      <li key={midx} className="leading-relaxed">▸ {mission}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </section>
          <div className="grid grid-cols-2 gap-6">
            <section className="bg-gradient-to-br from-fuchsia-950 to-gray-900 p-6 rounded border-t-4 border-fuchsia-600">
              <h2 className="text-lg font-black uppercase mb-4 text-fuchsia-400">FORMATION</h2>
              <p className="font-bold text-sm text-fuchsia-300">{cvData.formation.diplome}</p>
              <p className="text-sm text-gray-300">{cvData.formation.etablissement}</p>
              <p className="text-xs text-gray-400 mt-1">{cvData.formation.periode}</p>
              <p className="text-sm font-bold text-fuchsia-400 mt-2">{cvData.formation.mention}</p>
            </section>
            <section className="bg-gradient-to-br from-fuchsia-950 to-gray-900 p-6 rounded border-t-4 border-fuchsia-600">
              <h2 className="text-lg font-black uppercase mb-4 text-fuchsia-400">COMPÉTENCES</h2>
              <div className="flex flex-wrap gap-2">
                {cvData.competences.interpersonnelles.slice(0, 10).map((comp, idx) => (
                  <span key={idx} className="text-[10px] border border-fuchsia-600 text-fuchsia-300 px-2 py-1 rounded">{comp}</span>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    ),

    // CV 29 - Sky Aérien
    () => (
      <div className="max-w-4xl mx-auto bg-gradient-to-b from-sky-50 to-white p-12 shadow-lg print:shadow-none">
        <div className="text-center mb-10">
          <div className="mb-6">
            <Image 
              src="/og-caroline-karpel.jpg" 
              alt="Caroline Karpel" 
              width={130} 
              height={130}
              className="rounded-full mx-auto border-6 border-sky-300 shadow-lg"
            />
          </div>
          <div className="inline-block bg-sky-900 text-white px-8 py-6 rounded-t-3xl">
            <h1 className="text-4xl font-bold mb-2">{cvData.nom}</h1>
            <p className="text-base text-sky-200">{cvData.posteActuel}</p>
          </div>
          <div className="w-full h-1 bg-gradient-to-r from-transparent via-sky-500 to-transparent"></div>
          <p className="text-sm text-gray-600 mt-3">{cvData.localisation}</p>
        </div>
        <section className="mb-8">
          <h2 className="text-xl font-bold mb-6 text-center text-sky-900 relative">
            <span className="bg-white px-4 relative z-10">EXPÉRIENCE PROFESSIONNELLE</span>
            <div className="absolute top-1/2 left-0 right-0 h-px bg-sky-300 -z-0"></div>
          </h2>
          {cvData.experiences.map((exp, idx) => (
            <div key={idx} className="mb-6 bg-white rounded-xl shadow-md p-6 border-t-4 border-sky-500">
              <h3 className="text-base font-bold text-sky-900">{exp.titre}</h3>
              <p className="text-sm text-sky-700 font-semibold">{exp.entreprise} · {exp.duree}</p>
              <p className="text-xs text-gray-600 mb-2">{exp.periode}</p>
              {exp.missions.length > 0 && (
                <ul className="text-xs text-gray-700 space-y-1">
                  {exp.missions.map((mission, midx) => (
                    <li key={midx} className="leading-relaxed flex items-start gap-2">
                      <span className="text-sky-500 mt-0.5">✓</span>
                      <span>{mission}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </section>
        <div className="grid grid-cols-2 gap-8">
          <section>
            <h2 className="text-lg font-bold mb-4 text-center text-sky-900 bg-sky-100 py-2 rounded-t-lg">FORMATION</h2>
            <div className="bg-white rounded-b-xl shadow-md p-5">
              <p className="font-bold text-sm text-sky-900 text-center">{cvData.formation.diplome}</p>
              <p className="text-sm text-center">{cvData.formation.etablissement}</p>
              <p className="text-xs text-gray-600 mt-1 text-center">{cvData.formation.periode}</p>
              <p className="text-sm font-bold text-sky-700 mt-2 text-center">{cvData.formation.mention}</p>
            </div>
          </section>
          <section>
            <h2 className="text-lg font-bold mb-4 text-center text-sky-900 bg-sky-100 py-2 rounded-t-lg">COMPÉTENCES</h2>
            <div className="bg-white rounded-b-xl shadow-md p-5">
              <div className="flex flex-wrap gap-2 justify-center">
                {cvData.competences.interpersonnelles.slice(0, 12).map((comp, idx) => (
                  <span key={idx} className="text-[10px] bg-sky-100 text-sky-900 px-3 py-1.5 rounded-full border border-sky-300">{comp}</span>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
    ),

    // CV 30 - Slate Professionnel
    () => (
      <div className="max-w-4xl mx-auto bg-white shadow-2xl print:shadow-none">
        <div className="grid grid-cols-3">
          <div className="col-span-1 bg-gradient-to-b from-slate-800 to-slate-900 text-white p-8">
            <div className="mb-8 text-center">
              <Image 
                src="/og-caroline-karpel.jpg" 
                alt="Caroline Karpel" 
                width={140} 
                height={140}
                className="rounded-full border-6 border-slate-600 shadow-2xl mx-auto mb-6"
              />
            </div>
            <h1 className="text-3xl font-bold mb-6 pb-4 border-b-2 border-slate-600">{cvData.nom}</h1>
            <div className="mb-8">
              <h2 className="text-xs uppercase tracking-widest mb-3 text-slate-400">CONTACT</h2>
              <p className="text-xs text-slate-300">{cvData.localisation}</p>
            </div>
            <div className="mb-8">
              <h2 className="text-xs uppercase tracking-widest mb-4 text-slate-400 border-b border-slate-700 pb-2">FORMATION</h2>
              <p className="text-xs font-bold text-slate-100 mb-1">{cvData.formation.diplome}</p>
              <p className="text-xs text-slate-300">{cvData.formation.etablissement}</p>
              <p className="text-xs text-slate-400 mt-1">{cvData.formation.periode}</p>
              <p className="text-xs font-bold text-slate-200 mt-2">{cvData.formation.mention}</p>
            </div>
            <div>
              <h2 className="text-xs uppercase tracking-widest mb-4 text-slate-400 border-b border-slate-700 pb-2">COMPÉTENCES</h2>
              <div className="space-y-2">
                {cvData.competences.interpersonnelles.map((comp, idx) => (
                  <div key={idx} className="text-[10px] text-slate-300 flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-slate-500 rounded-full"></div>
                    <span>{comp}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="col-span-2 p-10">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-2">{cvData.posteActuel.split(' chez ')[0]}</h2>
              <p className="text-sm text-slate-600 uppercase tracking-wide">{cvData.posteActuel.split(' chez ')[1]}</p>
            </div>
            <section>
              <h2 className="text-xl font-bold mb-6 text-slate-900 border-l-4 border-slate-800 pl-4">EXPÉRIENCE PROFESSIONNELLE</h2>
              {cvData.experiences.map((exp, idx) => (
                <div key={idx} className="mb-6 pb-6 border-b border-slate-200 last:border-0">
                  <h3 className="text-base font-bold text-slate-900">{exp.titre}</h3>
                  <p className="text-sm text-slate-700 font-semibold">{exp.entreprise}</p>
                  <p className="text-xs text-slate-600">{exp.periode} · {exp.duree}</p>
                  {exp.missions.length > 0 && (
                    <ul className="text-xs text-slate-700 space-y-1 mt-2">
                      {exp.missions.map((mission, midx) => (
                        <li key={midx} className="leading-relaxed pl-3 border-l-2 border-slate-300">• {mission}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </section>
          </div>
        </div>
      </div>
    ),

    // CV 31 - Pure Blanc Épuré
    () => (
      <div className="max-w-3xl mx-auto bg-white p-20 print:shadow-none">
        <div className="mb-16 text-center">
          <div className="mb-8">
            <Image 
              src="/og-caroline-karpel.jpg" 
              alt="Caroline Karpel" 
              width={120} 
              height={120}
              className="rounded-full mx-auto border border-gray-200 shadow-sm"
            />
          </div>
          <h1 className="text-5xl font-light mb-6 tracking-tight text-gray-900">{cvData.nom}</h1>
          <div className="w-16 h-px bg-gray-300 mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 mb-2">{cvData.posteActuel}</p>
          <p className="text-base text-gray-500">{cvData.localisation}</p>
        </div>

        <section className="mb-16">
          <h2 className="text-sm uppercase tracking-[0.3em] text-gray-400 mb-10 text-center">Expérience</h2>
          {cvData.experiences.map((exp, idx) => (
            <div key={idx} className="mb-12">
              <div className="mb-4">
                <h3 className="text-xl font-light text-gray-900 mb-2">{exp.titre}</h3>
                <p className="text-base text-gray-700">{exp.entreprise}</p>
                <p className="text-sm text-gray-500 mt-1">{exp.periode}</p>
              </div>
              {exp.missions.length > 0 && (
                <ul className="text-base text-gray-600 space-y-3 leading-relaxed">
                  {exp.missions.map((mission, midx) => (
                    <li key={midx} className="pl-6 border-l border-gray-200">{mission}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </section>

        <div className="grid grid-cols-2 gap-12">
          <section>
            <h2 className="text-sm uppercase tracking-[0.3em] text-gray-400 mb-6">Formation</h2>
            <p className="text-base font-light text-gray-900 mb-2">{cvData.formation.diplome}</p>
            <p className="text-base text-gray-600">{cvData.formation.etablissement}</p>
            <p className="text-sm text-gray-500 mt-2">{cvData.formation.mention}</p>
          </section>
          <section>
            <h2 className="text-sm uppercase tracking-[0.3em] text-gray-400 mb-6">Compétences</h2>
            <div className="space-y-2">
              {cvData.competences.interpersonnelles.slice(0, 8).map((comp, idx) => (
                <p key={idx} className="text-sm text-gray-600">{comp}</p>
              ))}
            </div>
          </section>
        </div>
      </div>
    ),

    // CV 32 - Ligne Fine Minimaliste
    () => (
      <div className="max-w-4xl mx-auto bg-white p-20 print:shadow-none">
        <div className="flex items-start gap-12 mb-16 pb-10 border-b border-gray-200">
          <div className="flex-shrink-0">
            <Image 
              src="/og-caroline-karpel.jpg" 
              alt="Caroline Karpel" 
              width={140} 
              height={140}
              className="rounded-sm border border-gray-200"
            />
          </div>
          <div className="flex-1 pt-4">
            <h1 className="text-5xl font-thin mb-4 text-gray-900">{cvData.nom}</h1>
            <p className="text-xl text-gray-600 mb-2">{cvData.posteActuel}</p>
            <p className="text-base text-gray-500">{cvData.localisation}</p>
          </div>
        </div>

        <section className="mb-16">
          <h2 className="text-base uppercase tracking-wider text-gray-400 mb-8 pb-3 border-b border-gray-200">Parcours Professionnel</h2>
          {cvData.experiences.map((exp, idx) => (
            <div key={idx} className="mb-10">
              <div className="flex justify-between items-baseline mb-3">
                <h3 className="text-lg font-light text-gray-900">{exp.titre}</h3>
                <span className="text-sm text-gray-500">{exp.periode}</span>
              </div>
              <p className="text-base text-gray-700 mb-1">{exp.entreprise}</p>
              {exp.missions.length > 0 && (
                <ul className="text-base text-gray-600 space-y-2 mt-4">
                  {exp.missions.map((mission, midx) => (
                    <li key={midx} className="leading-relaxed">— {mission}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </section>

        <div className="grid grid-cols-2 gap-16">
          <section>
            <h2 className="text-base uppercase tracking-wider text-gray-400 mb-6 pb-3 border-b border-gray-200">Formation</h2>
            <p className="text-base font-light text-gray-900 mb-2">{cvData.formation.diplome}</p>
            <p className="text-base text-gray-600 mb-1">{cvData.formation.etablissement}</p>
            <p className="text-sm text-gray-500 mt-3">{cvData.formation.mention}</p>
          </section>
          <section>
            <h2 className="text-base uppercase tracking-wider text-gray-400 mb-6 pb-3 border-b border-gray-200">Compétences</h2>
            <div className="space-y-2">
              {cvData.competences.interpersonnelles.slice(0, 10).map((comp, idx) => (
                <p key={idx} className="text-sm text-gray-600">{comp}</p>
              ))}
            </div>
          </section>
        </div>
      </div>
    ),

    // CV 33 - Espace Blanc Maximum
    () => (
      <div className="max-w-3xl mx-auto bg-white p-24 print:shadow-none">
        <div className="mb-20 text-center">
          <Image 
            src="/og-caroline-karpel.jpg" 
            alt="Caroline Karpel" 
            width={100} 
            height={100}
            className="rounded-full mx-auto mb-10 opacity-90"
          />
          <h1 className="text-6xl font-extralight mb-8 text-gray-900">{cvData.nom}</h1>
          <p className="text-lg text-gray-600">{cvData.posteActuel}</p>
        </div>

        <section className="mb-20">
          <h2 className="text-xs uppercase tracking-[0.5em] text-gray-400 mb-12 text-center">Expérience</h2>
          {cvData.experiences.map((exp, idx) => (
            <div key={idx} className="mb-16 text-center">
              <h3 className="text-xl font-light text-gray-900 mb-3">{exp.titre}</h3>
              <p className="text-base text-gray-600 mb-2">{exp.entreprise}</p>
              <p className="text-sm text-gray-400 mb-6">{exp.periode}</p>
              {exp.missions.length > 0 && (
                <div className="max-w-2xl mx-auto">
                  {exp.missions.slice(0, 3).map((mission, midx) => (
                    <p key={midx} className="text-base text-gray-600 leading-relaxed mb-3">{mission}</p>
                  ))}
                </div>
              )}
            </div>
          ))}
        </section>

        <div className="text-center space-y-12">
          <section>
            <h2 className="text-xs uppercase tracking-[0.5em] text-gray-400 mb-6">Formation</h2>
            <p className="text-base font-light text-gray-900">{cvData.formation.diplome}</p>
            <p className="text-base text-gray-600 mt-2">{cvData.formation.etablissement}</p>
          </section>
          <section>
            <h2 className="text-xs uppercase tracking-[0.5em] text-gray-400 mb-6">Compétences</h2>
            <div className="flex flex-wrap justify-center gap-4">
              {cvData.competences.interpersonnelles.slice(0, 8).map((comp, idx) => (
                <span key={idx} className="text-sm text-gray-600">{comp}</span>
              ))}
            </div>
          </section>
        </div>
      </div>
    ),

    // CV 34 - Typographie Raffinée
    () => (
      <div className="max-w-3xl mx-auto bg-white p-20 print:shadow-none">
        <header className="mb-16 pb-12 border-b border-gray-200">
          <div className="flex items-center gap-10 mb-8">
            <Image 
              src="/og-caroline-karpel.jpg" 
              alt="Caroline Karpel" 
              width={130} 
              height={130}
              className="rounded border border-gray-200"
            />
            <div>
              <h1 className="text-5xl font-serif font-light mb-3 text-gray-900">{cvData.nom}</h1>
              <p className="text-lg text-gray-600">{cvData.posteActuel}</p>
            </div>
          </div>
          <p className="text-base text-gray-500">{cvData.localisation}</p>
        </header>

        <section className="mb-16">
          <h2 className="text-sm font-serif uppercase tracking-widest text-gray-400 mb-10">Expérience Professionnelle</h2>
          {cvData.experiences.map((exp, idx) => (
            <div key={idx} className="mb-12">
              <h3 className="text-xl font-serif font-light text-gray-900 mb-2">{exp.titre}</h3>
              <p className="text-base text-gray-700 mb-1">{exp.entreprise}</p>
              <p className="text-sm text-gray-500 mb-4">{exp.periode} · {exp.duree}</p>
              {exp.missions.length > 0 && (
                <ul className="text-base text-gray-600 space-y-3 leading-relaxed">
                  {exp.missions.map((mission, midx) => (
                    <li key={midx}>{mission}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </section>

        <div className="grid grid-cols-2 gap-12">
          <section>
            <h2 className="text-sm font-serif uppercase tracking-widest text-gray-400 mb-6">Formation</h2>
            <p className="text-base font-serif text-gray-900 mb-2">{cvData.formation.diplome}</p>
            <p className="text-base text-gray-600">{cvData.formation.etablissement}</p>
            <p className="text-sm text-gray-500 mt-3">{cvData.formation.mention}</p>
          </section>
          <section>
            <h2 className="text-sm font-serif uppercase tracking-widest text-gray-400 mb-6">Compétences</h2>
            <div className="space-y-2">
              {cvData.competences.interpersonnelles.slice(0, 10).map((comp, idx) => (
                <p key={idx} className="text-sm text-gray-600">{comp}</p>
              ))}
            </div>
          </section>
        </div>
      </div>
    ),

    // CV 35 - Grille Minimaliste
    () => (
      <div className="max-w-4xl mx-auto bg-white p-16 print:shadow-none">
        <div className="grid grid-cols-4 gap-10">
          <div className="col-span-1 pt-4">
            <Image 
              src="/og-caroline-karpel.jpg" 
              alt="Caroline Karpel" 
              width={150} 
              height={150}
              className="w-full rounded-sm border border-gray-200 mb-8"
            />
            <section className="mb-12">
              <h2 className="text-xs uppercase tracking-widest text-gray-400 mb-6">Formation</h2>
              <p className="text-sm font-light text-gray-900 mb-2">{cvData.formation.diplome}</p>
              <p className="text-sm text-gray-600 mb-1">{cvData.formation.etablissement}</p>
              <p className="text-xs text-gray-500 mt-3">{cvData.formation.mention}</p>
            </section>
            <section>
              <h2 className="text-xs uppercase tracking-widest text-gray-400 mb-6">Compétences</h2>
              <div className="space-y-2">
                {cvData.competences.interpersonnelles.slice(0, 12).map((comp, idx) => (
                  <p key={idx} className="text-xs text-gray-600 leading-relaxed">{comp}</p>
                ))}
              </div>
            </section>
          </div>

          <div className="col-span-3">
            <div className="mb-12">
              <h1 className="text-4xl font-light mb-3 text-gray-900">{cvData.nom}</h1>
              <p className="text-lg text-gray-600 mb-1">{cvData.posteActuel}</p>
              <p className="text-sm text-gray-500">{cvData.localisation}</p>
            </div>

            <section>
              <h2 className="text-xs uppercase tracking-widest text-gray-400 mb-8 pb-3 border-b border-gray-200">Expérience Professionnelle</h2>
              {cvData.experiences.map((exp, idx) => (
                <div key={idx} className="mb-10">
                  <div className="flex justify-between items-baseline mb-2">
                    <h3 className="text-base font-light text-gray-900">{exp.titre}</h3>
                    <span className="text-xs text-gray-500">{exp.periode}</span>
                  </div>
                  <p className="text-sm text-gray-700 mb-1">{exp.entreprise}</p>
                  {exp.missions.length > 0 && (
                    <ul className="text-sm text-gray-600 space-y-2 mt-3 leading-relaxed">
                      {exp.missions.map((mission, midx) => (
                        <li key={midx}>{mission}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </section>
          </div>
        </div>
      </div>
    ),

    // CV 36 - Léger et Aéré
    () => (
      <div className="max-w-3xl mx-auto bg-white p-20 print:shadow-none">
        <div className="text-center mb-16">
          <div className="inline-block mb-8">
            <Image 
              src="/og-caroline-karpel.jpg" 
              alt="Caroline Karpel" 
              width={110} 
              height={110}
              className="rounded-full border-2 border-gray-100"
            />
          </div>
          <h1 className="text-5xl font-thin mb-6 text-gray-900 tracking-tight">{cvData.nom}</h1>
          <p className="text-base text-gray-600 mb-2">{cvData.posteActuel}</p>
          <p className="text-sm text-gray-400">{cvData.localisation}</p>
        </div>

        <section className="mb-16">
          {cvData.experiences.map((exp, idx) => (
            <div key={idx} className="mb-14">
              <div className="mb-4">
                <div className="flex justify-between items-baseline mb-2">
                  <h3 className="text-xl font-light text-gray-900">{exp.titre}</h3>
                  <span className="text-sm text-gray-400">{exp.periode}</span>
                </div>
                <p className="text-base text-gray-600">{exp.entreprise}</p>
              </div>
              {exp.missions.length > 0 && (
                <div className="space-y-3">
                  {exp.missions.map((mission, midx) => (
                    <p key={midx} className="text-base text-gray-600 leading-relaxed">{mission}</p>
                  ))}
                </div>
              )}
            </div>
          ))}
        </section>

        <div className="pt-12 border-t border-gray-200 grid grid-cols-2 gap-12">
          <section>
            <h2 className="text-xs uppercase tracking-widest text-gray-400 mb-6">Formation</h2>
            <p className="text-base font-light text-gray-900 mb-2">{cvData.formation.diplome}</p>
            <p className="text-base text-gray-600">{cvData.formation.etablissement}</p>
            <p className="text-sm text-gray-500 mt-3">{cvData.formation.mention}</p>
          </section>
          <section>
            <h2 className="text-xs uppercase tracking-widest text-gray-400 mb-6">Expertise</h2>
            <div className="flex flex-wrap gap-3">
              {cvData.competences.interpersonnelles.slice(0, 8).map((comp, idx) => (
                <span key={idx} className="text-sm text-gray-600">{comp}</span>
              ))}
            </div>
          </section>
        </div>
      </div>
    ),

    // CV 37 - Points et Lignes
    () => (
      <div className="max-w-4xl mx-auto bg-white p-20 print:shadow-none">
        <div className="flex items-center gap-12 mb-16">
          <Image 
            src="/og-caroline-karpel.jpg" 
            alt="Caroline Karpel" 
            width={140} 
            height={140}
            className="rounded-full border border-gray-100"
          />
          <div className="flex-1">
            <h1 className="text-5xl font-thin mb-4 text-gray-900">{cvData.nom}</h1>
            <div className="flex items-center gap-4 text-gray-600">
              <span className="w-2 h-2 bg-gray-300 rounded-full"></span>
              <p className="text-lg">{cvData.posteActuel}</p>
            </div>
          </div>
        </div>

        <section className="mb-16">
          {cvData.experiences.map((exp, idx) => (
            <div key={idx} className="mb-12 flex gap-8">
              <div className="flex-shrink-0 pt-1">
                <div className="w-3 h-3 border-2 border-gray-300 rounded-full"></div>
              </div>
              <div className="flex-1">
                <div className="mb-3">
                  <h3 className="text-lg font-light text-gray-900 mb-1">{exp.titre}</h3>
                  <p className="text-base text-gray-700">{exp.entreprise}</p>
                  <p className="text-sm text-gray-500 mt-1">{exp.periode}</p>
                </div>
                {exp.missions.length > 0 && (
                  <ul className="text-base text-gray-600 space-y-3 leading-relaxed">
                    {exp.missions.map((mission, midx) => (
                      <li key={midx}>{mission}</li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          ))}
        </section>

        <div className="grid grid-cols-3 gap-10 pt-10 border-t border-gray-200">
          <section>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
              <h2 className="text-sm uppercase tracking-wider text-gray-400">Formation</h2>
            </div>
            <p className="text-base font-light text-gray-900 mb-1">{cvData.formation.diplome}</p>
            <p className="text-sm text-gray-600">{cvData.formation.etablissement}</p>
            <p className="text-sm text-gray-500 mt-2">{cvData.formation.mention}</p>
          </section>
          <section className="col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
              <h2 className="text-sm uppercase tracking-wider text-gray-400">Compétences</h2>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {cvData.competences.interpersonnelles.slice(0, 12).map((comp, idx) => (
                <p key={idx} className="text-sm text-gray-600">{comp}</p>
              ))}
            </div>
          </section>
        </div>
      </div>
    ),

    // CV 38 - Bordures Fines
    () => (
      <div className="max-w-4xl mx-auto bg-white p-16 print:shadow-none">
        <div className="border border-gray-200 p-12">
          <div className="flex justify-between items-start mb-12 pb-10 border-b border-gray-200">
            <div className="flex-1">
              <h1 className="text-5xl font-extralight mb-4 text-gray-900">{cvData.nom}</h1>
              <p className="text-lg text-gray-600 mb-2">{cvData.posteActuel}</p>
              <p className="text-base text-gray-500">{cvData.localisation}</p>
            </div>
            <div className="flex-shrink-0 ml-10">
              <Image 
                src="/og-caroline-karpel.jpg" 
                alt="Caroline Karpel" 
                width={130} 
                height={130}
                className="border border-gray-200"
              />
            </div>
          </div>

          <section className="mb-12">
            <h2 className="text-xs uppercase tracking-[0.3em] text-gray-400 mb-8">Parcours</h2>
            {cvData.experiences.map((exp, idx) => (
              <div key={idx} className="mb-10 pb-8 border-b border-gray-100 last:border-0">
                <h3 className="text-lg font-light text-gray-900 mb-2">{exp.titre}</h3>
                <p className="text-base text-gray-700 mb-1">{exp.entreprise}</p>
                <p className="text-sm text-gray-500 mb-4">{exp.periode}</p>
                {exp.missions.length > 0 && (
                  <ul className="text-base text-gray-600 space-y-2 leading-relaxed">
                    {exp.missions.map((mission, midx) => (
                      <li key={midx}>{mission}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </section>

          <div className="grid grid-cols-2 gap-12 pt-8 border-t border-gray-200">
            <section>
              <h2 className="text-xs uppercase tracking-[0.3em] text-gray-400 mb-6">Formation</h2>
              <p className="text-base font-light text-gray-900 mb-2">{cvData.formation.diplome}</p>
              <p className="text-base text-gray-600">{cvData.formation.etablissement}</p>
              <p className="text-sm text-gray-500 mt-2">{cvData.formation.mention}</p>
            </section>
            <section>
              <h2 className="text-xs uppercase tracking-[0.3em] text-gray-400 mb-6">Compétences</h2>
              <div className="space-y-2">
                {cvData.competences.interpersonnelles.slice(0, 10).map((comp, idx) => (
                  <p key={idx} className="text-sm text-gray-600">{comp}</p>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    ),

    // CV 39 - Simple et Direct
    () => (
      <div className="max-w-3xl mx-auto bg-white p-20 print:shadow-none">
        <div className="mb-16">
          <div className="flex items-center gap-10 mb-10">
            <Image 
              src="/og-caroline-karpel.jpg" 
              alt="Caroline Karpel" 
              width={120} 
              height={120}
              className="rounded"
            />
            <div>
              <h1 className="text-4xl font-light mb-3 text-gray-900">{cvData.nom}</h1>
              <p className="text-lg text-gray-600">{cvData.posteActuel}</p>
            </div>
          </div>
        </div>

        <section className="mb-16">
          <h2 className="text-base uppercase tracking-wide text-gray-400 mb-8">Expérience</h2>
          {cvData.experiences.map((exp, idx) => (
            <div key={idx} className="mb-10">
              <h3 className="text-lg font-light text-gray-900 mb-1">{exp.titre}</h3>
              <p className="text-base text-gray-700 mb-1">{exp.entreprise}</p>
              <p className="text-sm text-gray-500 mb-4">{exp.periode}</p>
              {exp.missions.length > 0 && (
                <ul className="text-base text-gray-600 space-y-2 leading-relaxed list-disc list-inside">
                  {exp.missions.map((mission, midx) => (
                    <li key={midx}>{mission}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </section>

        <div className="grid grid-cols-2 gap-12">
          <section>
            <h2 className="text-base uppercase tracking-wide text-gray-400 mb-6">Formation</h2>
            <p className="text-base font-light text-gray-900 mb-1">{cvData.formation.diplome}</p>
            <p className="text-base text-gray-600">{cvData.formation.etablissement}</p>
            <p className="text-sm text-gray-500 mt-2">{cvData.formation.mention}</p>
          </section>
          <section>
            <h2 className="text-base uppercase tracking-wide text-gray-400 mb-6">Compétences</h2>
            <div className="space-y-2">
              {cvData.competences.interpersonnelles.slice(0, 10).map((comp, idx) => (
                <p key={idx} className="text-sm text-gray-600">{comp}</p>
              ))}
            </div>
          </section>
        </div>
      </div>
    ),

    // CV 40 - Ultra Épuré
    () => (
      <div className="max-w-3xl mx-auto bg-white p-24 print:shadow-none">
        <div className="text-center mb-20">
          <Image 
            src="/og-caroline-karpel.jpg" 
            alt="Caroline Karpel" 
            width={100} 
            height={100}
            className="rounded-full mx-auto mb-12 border border-gray-100"
          />
          <h1 className="text-6xl font-hairline mb-6 text-gray-900">{cvData.nom}</h1>
          <p className="text-base text-gray-500">{cvData.posteActuel}</p>
        </div>

        <section className="mb-20">
          {cvData.experiences.map((exp, idx) => (
            <div key={idx} className="mb-16">
              <h3 className="text-xl font-light text-gray-900 mb-2 text-center">{exp.titre}</h3>
              <p className="text-base text-gray-600 text-center mb-1">{exp.entreprise}</p>
              <p className="text-sm text-gray-400 text-center mb-6">{exp.periode}</p>
              {exp.missions.length > 0 && (
                <div className="max-w-2xl mx-auto space-y-4">
                  {exp.missions.slice(0, 3).map((mission, midx) => (
                    <p key={midx} className="text-base text-gray-600 text-center leading-relaxed">{mission}</p>
                  ))}
                </div>
              )}
            </div>
          ))}
        </section>

        <div className="text-center space-y-16">
          <section>
            <h2 className="text-xs uppercase tracking-[0.5em] text-gray-400 mb-6">Formation</h2>
            <p className="text-base font-light text-gray-900">{cvData.formation.diplome}</p>
            <p className="text-base text-gray-600 mt-1">{cvData.formation.etablissement}</p>
            <p className="text-sm text-gray-500 mt-2">{cvData.formation.mention}</p>
          </section>
          <section>
            <h2 className="text-xs uppercase tracking-[0.5em] text-gray-400 mb-6">Compétences</h2>
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
              {cvData.competences.interpersonnelles.slice(0, 8).map((comp, idx) => (
                <span key={idx} className="text-sm text-gray-500">{comp}</span>
              ))}
            </div>
          </section>
        </div>
      </div>
    ),

    // CV 41 - Sidebar Bleu Marine avec Accent Doré (inspiré ANKITA TIWARI)
    () => (
      <div className="max-w-4xl mx-auto bg-white shadow-lg print:shadow-none">
        <div className="flex">
          {/* Sidebar Bleu Marine */}
          <div className="w-80 bg-slate-800 text-white p-12">
            <div className="text-center mb-8">
              <Image
                src="/og-caroline-karpel.jpg"
                alt="Caroline Karpel"
                width={140}
                height={140}
                className="rounded-full mx-auto border-4 border-yellow-400 shadow-xl"
              />
            </div>
            <h1 className="text-3xl font-bold mb-2 text-yellow-400">{cvData.nom}</h1>
            <p className="text-lg mb-8 text-gray-200">{cvData.posteActuel}</p>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-yellow-400 font-bold text-lg mb-4 uppercase tracking-wide">Contact</h3>
                <div className="space-y-3 text-sm">
                  <p>📧 {cvData.email}</p>
                  <p>📱 {cvData.telephone}</p>
                  <p>📍 {cvData.localisation}</p>
                </div>
              </div>
              
              <div>
                <h3 className="text-yellow-400 font-bold text-lg mb-4 uppercase tracking-wide">Compétences</h3>
                <div className="space-y-3">
                  {cvData.competences.slice(0, 6).map((comp, i) => (
                    <div key={i} className="bg-slate-700 px-3 py-2 rounded text-sm">
                      {comp}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Contenu Principal */}
          <div className="flex-1 p-12">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-slate-800 mb-4 border-b-2 border-yellow-400 pb-2">Profil Professionnel</h2>
              <p className="text-gray-700 leading-relaxed">{cvData.profil}</p>
            </div>
            
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-slate-800 mb-4 border-b-2 border-yellow-400 pb-2">Expérience Professionnelle</h2>
              <div className="space-y-6">
                {cvData.experiences.map((exp, i) => (
                  <div key={i} className="border-l-4 border-yellow-400 pl-4">
                    <h3 className="font-bold text-lg text-slate-800">{exp.poste}</h3>
                    <p className="text-slate-600 font-semibold">{exp.entreprise} • {exp.duree}</p>
                    <p className="text-gray-700 mt-2">{exp.description}</p>
                    <ul className="mt-2 space-y-1">
                      {exp.missions.map((mission, j) => (
                        <li key={j} className="text-gray-700 text-sm">• {mission}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h2 className="text-2xl font-bold text-slate-800 mb-4 border-b-2 border-yellow-400 pb-2">Formation</h2>
              <div className="space-y-4">
                {cvData.formations.map((formation, i) => (
                  <div key={i} className="border-l-4 border-yellow-400 pl-4">
                    <h3 className="font-bold text-lg text-slate-800">{formation.diplome}</h3>
                    <p className="text-slate-600 font-semibold">{formation.etablissement} • {formation.annee}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    ),

    // CV 42 - Sidebar Orange avec Layout Moderne (inspiré KELLY WHITE)
    () => (
      <div className="max-w-4xl mx-auto bg-white shadow-lg print:shadow-none">
        <div className="flex">
          {/* Contenu Principal */}
          <div className="flex-1 p-12">
            <div className="mb-8">
              <div className="flex items-center gap-6 mb-6">
                <Image
                  src="/og-caroline-karpel.jpg"
                  alt="Caroline Karpel"
                  width={120}
                  height={120}
                  className="rounded-full border-4 border-orange-400 shadow-lg"
                />
                <div>
                  <h1 className="text-4xl font-bold text-gray-900 mb-2">{cvData.nom}</h1>
                  <p className="text-xl text-orange-600 font-semibold">{cvData.posteActuel}</p>
                  <p className="text-gray-600">{cvData.localisation}</p>
                </div>
              </div>
            </div>
            
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <span className="w-8 h-8 bg-orange-500 rounded-full mr-3"></span>
                Profil Professionnel
              </h2>
              <p className="text-gray-700 leading-relaxed">{cvData.profil}</p>
            </div>
            
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <span className="w-8 h-8 bg-orange-500 rounded-full mr-3"></span>
                Expérience Professionnelle
              </h2>
              <div className="space-y-6">
                {cvData.experiences.map((exp, i) => (
                  <div key={i} className="bg-gray-50 p-6 rounded-lg border-l-4 border-orange-500">
                    <h3 className="font-bold text-lg text-gray-900">{exp.poste}</h3>
                    <p className="text-orange-600 font-semibold">{exp.entreprise} • {exp.duree}</p>
                    <p className="text-gray-700 mt-2">{exp.description}</p>
                    <ul className="mt-3 space-y-1">
                      {exp.missions.map((mission, j) => (
                        <li key={j} className="text-gray-700 text-sm flex items-start">
                          <span className="text-orange-500 mr-2">▶</span>
                          {mission}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Sidebar Orange */}
          <div className="w-80 bg-gradient-to-b from-orange-500 to-orange-600 text-white p-12">
            <div className="mb-8">
              <h3 className="text-xl font-bold mb-4 text-orange-100">Contact</h3>
              <div className="space-y-3 text-sm">
                <p className="flex items-center">
                  <span className="w-6 h-6 bg-orange-400 rounded-full mr-3 flex items-center justify-center text-xs">📧</span>
                  {cvData.email}
                </p>
                <p className="flex items-center">
                  <span className="w-6 h-6 bg-orange-400 rounded-full mr-3 flex items-center justify-center text-xs">📱</span>
                  {cvData.telephone}
                </p>
                <p className="flex items-center">
                  <span className="w-6 h-6 bg-orange-400 rounded-full mr-3 flex items-center justify-center text-xs">📍</span>
                  {cvData.localisation}
                </p>
              </div>
            </div>
            
            <div className="mb-8">
              <h3 className="text-xl font-bold mb-4 text-orange-100">Compétences</h3>
              <div className="space-y-3">
                {cvData.competences.slice(0, 8).map((comp, i) => (
                  <div key={i} className="bg-orange-400 px-3 py-2 rounded text-sm font-medium">
                    {comp}
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-4 text-orange-100">Formation</h3>
              <div className="space-y-4">
                {cvData.formations.map((formation, i) => (
                  <div key={i} className="bg-orange-400 p-3 rounded">
                    <h4 className="font-bold text-sm">{formation.diplome}</h4>
                    <p className="text-xs text-orange-100">{formation.etablissement}</p>
                    <p className="text-xs text-orange-200">{formation.annee}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    ),

    // CV 43 - Layout Timeline avec Accents Verts (inspiré Ehris Smith)
    () => (
      <div className="max-w-4xl mx-auto bg-white p-12 shadow-lg print:shadow-none">
        <div className="text-center mb-12">
          <Image
            src="/og-caroline-karpel.jpg"
            alt="Caroline Karpel"
            width={150}
            height={150}
            className="rounded-full mx-auto border-6 border-green-500 shadow-xl mb-6"
          />
          <h1 className="text-5xl font-bold text-gray-900 mb-4">{cvData.nom}</h1>
          <p className="text-2xl text-green-600 font-semibold mb-2">{cvData.posteActuel}</p>
          <p className="text-lg text-gray-600">{cvData.localisation}</p>
          <div className="flex justify-center space-x-6 mt-4 text-sm text-gray-600">
            <span>📧 {cvData.email}</span>
            <span>📱 {cvData.telephone}</span>
          </div>
        </div>
        
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
            <span className="w-10 h-10 bg-green-500 rounded-full mr-4 flex items-center justify-center text-white font-bold">P</span>
            Profil Professionnel
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed">{cvData.profil}</p>
        </div>
        
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
            <span className="w-10 h-10 bg-green-500 rounded-full mr-4 flex items-center justify-center text-white font-bold">E</span>
            Expérience Professionnelle
          </h2>
          <div className="relative">
            <div className="absolute left-6 top-0 bottom-0 w-1 bg-green-200"></div>
            {cvData.experiences.map((exp, i) => (
              <div key={i} className="relative flex mb-8">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-lg z-10">
                  {i + 1}
                </div>
                <div className="ml-8 flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{exp.poste}</h3>
                  <p className="text-green-600 font-semibold text-lg mb-2">{exp.entreprise} • {exp.duree}</p>
                  <p className="text-gray-700 mb-3">{exp.description}</p>
                  <ul className="space-y-2">
                    {exp.missions.map((mission, j) => (
                      <li key={j} className="text-gray-700 flex items-start">
                        <span className="text-green-500 mr-2 mt-1">●</span>
                        {mission}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <span className="w-8 h-8 bg-green-500 rounded-full mr-3 flex items-center justify-center text-white font-bold text-sm">F</span>
              Formation
            </h2>
            <div className="space-y-4">
              {cvData.formations.map((formation, i) => (
                <div key={i} className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
                  <h3 className="font-bold text-lg text-gray-900">{formation.diplome}</h3>
                  <p className="text-green-600 font-semibold">{formation.etablissement}</p>
                  <p className="text-gray-600">{formation.annee}</p>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <span className="w-8 h-8 bg-green-500 rounded-full mr-3 flex items-center justify-center text-white font-bold text-sm">C</span>
              Compétences
            </h2>
            <div className="grid grid-cols-2 gap-3">
              {cvData.competences.map((comp, i) => (
                <div key={i} className="bg-green-100 px-4 py-3 rounded-lg text-center font-medium text-gray-800">
                  {comp}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    ),

    // CV 44 - Layout Corporate avec Sidebar Teal (inspiré MARK WILLIAMS)
    () => (
      <div className="max-w-4xl mx-auto bg-white shadow-lg print:shadow-none">
        <div className="flex">
          {/* Sidebar Teal */}
          <div className="w-80 bg-teal-800 text-white p-12">
            <div className="text-center mb-8">
              <Image
                src="/og-caroline-karpel.jpg"
                alt="Caroline Karpel"
                width={130}
                height={130}
                className="rounded-full mx-auto border-4 border-yellow-400 shadow-xl"
              />
            </div>
            <h1 className="text-2xl font-bold mb-2 text-yellow-400 text-center">{cvData.nom}</h1>
            <p className="text-center text-teal-200 mb-8">{cvData.posteActuel}</p>
            
            <div className="space-y-8">
              <div>
                <h3 className="text-yellow-400 font-bold text-lg mb-4 uppercase tracking-wide border-b border-yellow-400 pb-2">Contact</h3>
                <div className="space-y-3 text-sm">
                  <p className="flex items-center">
                    <span className="w-5 h-5 bg-yellow-400 rounded mr-3"></span>
                    {cvData.email}
                  </p>
                  <p className="flex items-center">
                    <span className="w-5 h-5 bg-yellow-400 rounded mr-3"></span>
                    {cvData.telephone}
                  </p>
                  <p className="flex items-center">
                    <span className="w-5 h-5 bg-yellow-400 rounded mr-3"></span>
                    {cvData.localisation}
                  </p>
                </div>
              </div>
              
              <div>
                <h3 className="text-yellow-400 font-bold text-lg mb-4 uppercase tracking-wide border-b border-yellow-400 pb-2">Compétences Clés</h3>
                <div className="space-y-2">
                  {cvData.competences.slice(0, 8).map((comp, i) => (
                    <div key={i} className="bg-teal-700 px-3 py-2 rounded text-sm border-l-2 border-yellow-400">
                      {comp}
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-yellow-400 font-bold text-lg mb-4 uppercase tracking-wide border-b border-yellow-400 pb-2">Formation</h3>
                <div className="space-y-3">
                  {cvData.formations.map((formation, i) => (
                    <div key={i} className="bg-teal-700 p-3 rounded">
                      <h4 className="font-bold text-sm text-yellow-400">{formation.diplome}</h4>
                      <p className="text-xs text-teal-200">{formation.etablissement}</p>
                      <p className="text-xs text-yellow-300">{formation.annee}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Contenu Principal */}
          <div className="flex-1 p-12">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-teal-800 mb-4 border-b-4 border-yellow-400 pb-2">Profil Professionnel</h2>
              <p className="text-lg text-gray-700 leading-relaxed">{cvData.profil}</p>
            </div>
            
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-teal-800 mb-6 border-b-4 border-yellow-400 pb-2">Expérience Professionnelle</h2>
              <div className="space-y-8">
                {cvData.experiences.map((exp, i) => (
                  <div key={i} className="border-l-4 border-teal-500 pl-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{exp.poste}</h3>
                    <p className="text-teal-600 font-semibold text-lg mb-2">{exp.entreprise} • {exp.duree}</p>
                    <p className="text-gray-700 mb-3">{exp.description}</p>
                    <ul className="space-y-2">
                      {exp.missions.map((mission, j) => (
                        <li key={j} className="text-gray-700 flex items-start">
                          <span className="text-teal-500 mr-2 mt-1">▶</span>
                          {mission}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    ),

    // CV 45 - Layout Créatif avec Accents Rouges (inspiré LEO O'REILLY)
    () => (
      <div className="max-w-4xl mx-auto bg-white p-12 shadow-lg print:shadow-none">
        <div className="mb-12">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-6">
              <Image
                src="/og-caroline-karpel.jpg"
                alt="Caroline Karpel"
                width={140}
                height={140}
                className="rounded-full border-6 border-red-500 shadow-xl"
              />
              <div>
                <h1 className="text-4xl font-bold text-gray-900 mb-2">{cvData.nom}</h1>
                <p className="text-2xl text-red-600 font-semibold">{cvData.posteActuel}</p>
                <p className="text-lg text-gray-600">{cvData.localisation}</p>
              </div>
            </div>
            <div className="text-right">
              <div className="bg-red-50 p-4 rounded-lg border-2 border-red-200">
                <h3 className="text-red-600 font-bold mb-2">Contact</h3>
                <p className="text-sm text-gray-700">📧 {cvData.email}</p>
                <p className="text-sm text-gray-700">📱 {cvData.telephone}</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-red-600 mb-6 flex items-center">
            <span className="w-10 h-10 bg-red-500 rounded-full mr-4 flex items-center justify-center text-white font-bold">P</span>
            Profil Professionnel
          </h2>
          <div className="bg-red-50 p-6 rounded-lg border-l-4 border-red-500">
            <p className="text-lg text-gray-700 leading-relaxed">{cvData.profil}</p>
          </div>
        </div>
        
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-red-600 mb-6 flex items-center">
            <span className="w-10 h-10 bg-red-500 rounded-full mr-4 flex items-center justify-center text-white font-bold">E</span>
            Expérience Professionnelle
          </h2>
          <div className="space-y-8">
            {cvData.experiences.map((exp, i) => (
              <div key={i} className="bg-gray-50 p-6 rounded-lg border-2 border-red-200">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{exp.poste}</h3>
                    <p className="text-red-600 font-semibold text-lg">{exp.entreprise}</p>
                    <p className="text-gray-600">{exp.duree}</p>
                  </div>
                  <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center text-white font-bold">
                    {i + 1}
                  </div>
                </div>
                <p className="text-gray-700 mb-4">{exp.description}</p>
                <ul className="space-y-2">
                  {exp.missions.map((mission, j) => (
                    <li key={j} className="text-gray-700 flex items-start">
                      <span className="text-red-500 mr-2 mt-1 font-bold">▶</span>
                      {mission}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-bold text-red-600 mb-6 flex items-center">
              <span className="w-8 h-8 bg-red-500 rounded-full mr-3 flex items-center justify-center text-white font-bold text-sm">F</span>
              Formation
            </h2>
            <div className="space-y-4">
              {cvData.formations.map((formation, i) => (
                <div key={i} className="bg-red-50 p-4 rounded-lg border-l-4 border-red-500">
                  <h3 className="font-bold text-lg text-gray-900">{formation.diplome}</h3>
                  <p className="text-red-600 font-semibold">{formation.etablissement}</p>
                  <p className="text-gray-600">{formation.annee}</p>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h2 className="text-2xl font-bold text-red-600 mb-6 flex items-center">
              <span className="w-8 h-8 bg-red-500 rounded-full mr-3 flex items-center justify-center text-white font-bold text-sm">C</span>
              Compétences
            </h2>
            <div className="grid grid-cols-2 gap-3">
              {cvData.competences.map((comp, i) => (
                <div key={i} className="bg-red-100 px-4 py-3 rounded-lg text-center font-medium text-gray-800 border border-red-200">
                  {comp}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    ),

    // CV 46 - Layout Minimaliste avec Accents Violets
    () => (
      <div className="max-w-4xl mx-auto bg-white p-16 shadow-lg print:shadow-none">
        <div className="text-center mb-16">
          <Image
            src="/og-caroline-karpel.jpg"
            alt="Caroline Karpel"
            width={160}
            height={160}
            className="rounded-full mx-auto border-4 border-purple-400 shadow-xl mb-8"
          />
          <h1 className="text-5xl font-light text-gray-900 mb-4 tracking-wide">{cvData.nom}</h1>
          <div className="w-24 h-1 bg-purple-400 mx-auto mb-6"></div>
          <p className="text-2xl text-purple-600 font-medium mb-4">{cvData.posteActuel}</p>
          <p className="text-lg text-gray-600 mb-6">{cvData.localisation}</p>
          <div className="flex justify-center space-x-8 text-gray-600">
            <span>📧 {cvData.email}</span>
            <span>📱 {cvData.telephone}</span>
          </div>
        </div>
        
        <div className="mb-16">
          <h2 className="text-3xl font-light text-gray-900 mb-6 text-center">Profil Professionnel</h2>
          <div className="w-16 h-1 bg-purple-400 mx-auto mb-8"></div>
          <p className="text-lg text-gray-700 leading-relaxed text-center max-w-3xl mx-auto">{cvData.profil}</p>
        </div>
        
        <div className="mb-16">
          <h2 className="text-3xl font-light text-gray-900 mb-8 text-center">Expérience Professionnelle</h2>
          <div className="w-16 h-1 bg-purple-400 mx-auto mb-12"></div>
          <div className="space-y-12">
            {cvData.experiences.map((exp, i) => (
              <div key={i} className="text-center">
                <h3 className="text-2xl font-medium text-gray-900 mb-2">{exp.poste}</h3>
                <p className="text-purple-600 font-medium text-lg mb-2">{exp.entreprise}</p>
                <p className="text-gray-600 mb-4">{exp.duree}</p>
                <p className="text-gray-700 mb-4 max-w-2xl mx-auto">{exp.description}</p>
                <ul className="space-y-2 max-w-2xl mx-auto">
                  {exp.missions.map((mission, j) => (
                    <li key={j} className="text-gray-700">• {mission}</li>
                  ))}
                </ul>
                {i < cvData.experiences.length - 1 && <div className="w-8 h-8 border-2 border-purple-400 rounded-full mx-auto mt-8"></div>}
              </div>
            ))}
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-16">
          <div className="text-center">
            <h2 className="text-2xl font-light text-gray-900 mb-6">Formation</h2>
            <div className="w-12 h-1 bg-purple-400 mx-auto mb-6"></div>
            <div className="space-y-6">
              {cvData.formations.map((formation, i) => (
                <div key={i}>
                  <h3 className="font-medium text-lg text-gray-900">{formation.diplome}</h3>
                  <p className="text-purple-600">{formation.etablissement}</p>
                  <p className="text-gray-600">{formation.annee}</p>
                </div>
              ))}
            </div>
          </div>
          
          <div className="text-center">
            <h2 className="text-2xl font-light text-gray-900 mb-6">Compétences</h2>
            <div className="w-12 h-1 bg-purple-400 mx-auto mb-6"></div>
            <div className="grid grid-cols-2 gap-4">
              {cvData.competences.map((comp, i) => (
                <div key={i} className="bg-purple-50 px-4 py-3 rounded-lg text-gray-800">
                  {comp}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    ),

    // CV 47 - Layout Asymétrique avec Sidebar Rose
    () => (
      <div className="max-w-4xl mx-auto bg-white shadow-lg print:shadow-none">
        <div className="flex">
          {/* Contenu Principal */}
          <div className="flex-1 p-12">
            <div className="mb-12">
              <div className="flex items-center gap-8 mb-8">
                <Image
                  src="/og-caroline-karpel.jpg"
                  alt="Caroline Karpel"
                  width={140}
                  height={140}
                  className="rounded-full border-6 border-pink-400 shadow-xl"
                />
                <div>
                  <h1 className="text-4xl font-bold text-gray-900 mb-2">{cvData.nom}</h1>
                  <p className="text-2xl text-pink-600 font-semibold">{cvData.posteActuel}</p>
                  <p className="text-lg text-gray-600">{cvData.localisation}</p>
                </div>
              </div>
            </div>
            
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 border-b-4 border-pink-500 pb-2">Profil Professionnel</h2>
              <p className="text-lg text-gray-700 leading-relaxed">{cvData.profil}</p>
            </div>
            
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 border-b-4 border-pink-500 pb-2">Expérience Professionnelle</h2>
              <div className="space-y-8">
                {cvData.experiences.map((exp, i) => (
                  <div key={i} className="relative">
                    <div className="absolute -left-4 top-0 w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center text-white font-bold">
                      {i + 1}
                    </div>
                    <div className="ml-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{exp.poste}</h3>
                      <p className="text-pink-600 font-semibold text-lg mb-2">{exp.entreprise} • {exp.duree}</p>
                      <p className="text-gray-700 mb-3">{exp.description}</p>
                      <ul className="space-y-2">
                        {exp.missions.map((mission, j) => (
                          <li key={j} className="text-gray-700 flex items-start">
                            <span className="text-pink-500 mr-2 mt-1">●</span>
                            {mission}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Sidebar Rose */}
          <div className="w-80 bg-gradient-to-b from-pink-500 to-pink-600 text-white p-12">
            <div className="mb-8">
              <h3 className="text-2xl font-bold mb-6 text-pink-100">Contact</h3>
              <div className="space-y-4 text-sm">
                <p className="flex items-center">
                  <span className="w-6 h-6 bg-pink-400 rounded-full mr-3 flex items-center justify-center text-xs">📧</span>
                  {cvData.email}
                </p>
                <p className="flex items-center">
                  <span className="w-6 h-6 bg-pink-400 rounded-full mr-3 flex items-center justify-center text-xs">📱</span>
                  {cvData.telephone}
                </p>
                <p className="flex items-center">
                  <span className="w-6 h-6 bg-pink-400 rounded-full mr-3 flex items-center justify-center text-xs">📍</span>
                  {cvData.localisation}
                </p>
              </div>
            </div>
            
            <div className="mb-8">
              <h3 className="text-2xl font-bold mb-6 text-pink-100">Compétences</h3>
              <div className="space-y-3">
                {cvData.competences.slice(0, 10).map((comp, i) => (
                  <div key={i} className="bg-pink-400 px-4 py-2 rounded text-sm font-medium">
                    {comp}
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-2xl font-bold mb-6 text-pink-100">Formation</h3>
              <div className="space-y-4">
                {cvData.formations.map((formation, i) => (
                  <div key={i} className="bg-pink-400 p-4 rounded">
                    <h4 className="font-bold text-sm text-pink-900">{formation.diplome}</h4>
                    <p className="text-xs text-pink-100">{formation.etablissement}</p>
                    <p className="text-xs text-pink-200">{formation.annee}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    ),

    // CV 48 - Layout Grid avec Accents Cyan
    () => (
      <div className="max-w-4xl mx-auto bg-white p-12 shadow-lg print:shadow-none">
        <div className="grid grid-cols-3 gap-8 mb-12">
          <div className="col-span-2">
            <h1 className="text-5xl font-bold text-gray-900 mb-4">{cvData.nom}</h1>
            <p className="text-2xl text-cyan-600 font-semibold mb-2">{cvData.posteActuel}</p>
            <p className="text-lg text-gray-600">{cvData.localisation}</p>
          </div>
          <div className="text-center">
            <Image
              src="/og-caroline-karpel.jpg"
              alt="Caroline Karpel"
              width={140}
              height={140}
              className="rounded-full mx-auto border-6 border-cyan-400 shadow-xl"
            />
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-8 mb-12">
          <div className="col-span-2">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-cyan-500 pb-2">Profil Professionnel</h2>
            <p className="text-gray-700 leading-relaxed">{cvData.profil}</p>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-cyan-500 pb-2">Contact</h2>
            <div className="space-y-3 text-sm">
              <p>📧 {cvData.email}</p>
              <p>📱 {cvData.telephone}</p>
              <p>📍 {cvData.localisation}</p>
            </div>
          </div>
        </div>
        
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 border-b-4 border-cyan-500 pb-2">Expérience Professionnelle</h2>
          <div className="grid grid-cols-2 gap-8">
            {cvData.experiences.map((exp, i) => (
              <div key={i} className="bg-cyan-50 p-6 rounded-lg border-l-4 border-cyan-500">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{exp.poste}</h3>
                <p className="text-cyan-600 font-semibold text-lg mb-2">{exp.entreprise}</p>
                <p className="text-gray-600 mb-3">{exp.duree}</p>
                <p className="text-gray-700 mb-3">{exp.description}</p>
                <ul className="space-y-1">
                  {exp.missions.slice(0, 3).map((mission, j) => (
                    <li key={j} className="text-gray-700 text-sm flex items-start">
                      <span className="text-cyan-500 mr-2">▶</span>
                      {mission}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b-2 border-cyan-500 pb-2">Formation</h2>
            <div className="space-y-4">
              {cvData.formations.map((formation, i) => (
                <div key={i} className="bg-cyan-50 p-4 rounded-lg">
                  <h3 className="font-bold text-lg text-gray-900">{formation.diplome}</h3>
                  <p className="text-cyan-600 font-semibold">{formation.etablissement}</p>
                  <p className="text-gray-600">{formation.annee}</p>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b-2 border-cyan-500 pb-2">Compétences</h2>
            <div className="grid grid-cols-2 gap-3">
              {cvData.competences.map((comp, i) => (
                <div key={i} className="bg-cyan-100 px-4 py-3 rounded-lg text-center font-medium text-gray-800">
                  {comp}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    ),

    // CV 49 - Layout Centré avec Accents Indigo
    () => (
      <div className="max-w-4xl mx-auto bg-white p-16 shadow-lg print:shadow-none">
        <div className="text-center mb-16">
          <Image
            src="/og-caroline-karpel.jpg"
            alt="Caroline Karpel"
            width={180}
            height={180}
            className="rounded-full mx-auto border-8 border-indigo-400 shadow-2xl mb-8"
          />
          <h1 className="text-6xl font-bold text-gray-900 mb-4">{cvData.nom}</h1>
          <div className="w-32 h-2 bg-indigo-500 mx-auto mb-6"></div>
          <p className="text-3xl text-indigo-600 font-semibold mb-4">{cvData.posteActuel}</p>
          <p className="text-xl text-gray-600 mb-8">{cvData.localisation}</p>
          <div className="flex justify-center space-x-12 text-lg text-gray-600">
            <span>📧 {cvData.email}</span>
            <span>📱 {cvData.telephone}</span>
          </div>
        </div>
        
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-8 text-center">Profil Professionnel</h2>
          <div className="w-24 h-2 bg-indigo-500 mx-auto mb-8"></div>
          <p className="text-xl text-gray-700 leading-relaxed text-center max-w-4xl mx-auto">{cvData.profil}</p>
        </div>
        
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">Expérience Professionnelle</h2>
          <div className="w-24 h-2 bg-indigo-500 mx-auto mb-12"></div>
          <div className="space-y-16">
            {cvData.experiences.map((exp, i) => (
              <div key={i} className="text-center">
                <div className="w-16 h-16 bg-indigo-500 rounded-full mx-auto mb-6 flex items-center justify-center text-white text-2xl font-bold">
                  {i + 1}
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-4">{exp.poste}</h3>
                <p className="text-indigo-600 font-semibold text-2xl mb-4">{exp.entreprise}</p>
                <p className="text-gray-600 text-lg mb-6">{exp.duree}</p>
                <p className="text-gray-700 text-lg mb-6 max-w-3xl mx-auto">{exp.description}</p>
                <ul className="space-y-3 max-w-3xl mx-auto">
                  {exp.missions.map((mission, j) => (
                    <li key={j} className="text-gray-700 text-lg">• {mission}</li>
                  ))}
                </ul>
                {i < cvData.experiences.length - 1 && (
                  <div className="w-12 h-12 border-4 border-indigo-300 rounded-full mx-auto mt-12"></div>
                )}
              </div>
            ))}
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-16">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Formation</h2>
            <div className="w-20 h-2 bg-indigo-500 mx-auto mb-8"></div>
            <div className="space-y-8">
              {cvData.formations.map((formation, i) => (
                <div key={i} className="bg-indigo-50 p-6 rounded-lg">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{formation.diplome}</h3>
                  <p className="text-indigo-600 font-semibold text-lg">{formation.etablissement}</p>
                  <p className="text-gray-600">{formation.annee}</p>
                </div>
              ))}
            </div>
          </div>
          
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Compétences</h2>
            <div className="w-20 h-2 bg-indigo-500 mx-auto mb-8"></div>
            <div className="grid grid-cols-2 gap-4">
              {cvData.competences.map((comp, i) => (
                <div key={i} className="bg-indigo-100 px-6 py-4 rounded-lg text-center font-medium text-gray-800 text-lg">
                  {comp}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    ),

    // CV 50 - Layout Ultra Moderne avec Accents Émeraude
    () => (
      <div className="max-w-4xl mx-auto bg-white shadow-2xl print:shadow-none">
        <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white p-12">
          <div className="flex items-center gap-8">
            <Image
              src="/og-caroline-karpel.jpg"
              alt="Caroline Karpel"
              width={160}
              height={160}
              className="rounded-full border-8 border-white shadow-2xl"
            />
            <div>
              <h1 className="text-5xl font-bold mb-4">{cvData.nom}</h1>
              <p className="text-3xl font-semibold mb-2 text-emerald-100">{cvData.posteActuel}</p>
              <p className="text-xl text-emerald-100">{cvData.localisation}</p>
              <div className="flex space-x-8 mt-4 text-emerald-100">
                <span>📧 {cvData.email}</span>
                <span>📱 {cvData.telephone}</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="p-12">
          <div className="mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-6 flex items-center">
              <span className="w-12 h-12 bg-emerald-500 rounded-full mr-4 flex items-center justify-center text-white font-bold text-xl">P</span>
              Profil Professionnel
            </h2>
            <div className="bg-emerald-50 p-8 rounded-lg border-l-8 border-emerald-500">
              <p className="text-xl text-gray-700 leading-relaxed">{cvData.profil}</p>
            </div>
          </div>
          
          <div className="mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-8 flex items-center">
              <span className="w-12 h-12 bg-emerald-500 rounded-full mr-4 flex items-center justify-center text-white font-bold text-xl">E</span>
              Expérience Professionnelle
            </h2>
            <div className="space-y-8">
              {cvData.experiences.map((exp, i) => (
                <div key={i} className="bg-gradient-to-r from-emerald-50 to-emerald-100 p-8 rounded-lg border-l-8 border-emerald-500">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">{exp.poste}</h3>
                      <p className="text-emerald-600 font-semibold text-xl">{exp.entreprise}</p>
                      <p className="text-gray-600 text-lg">{exp.duree}</p>
                    </div>
                    <div className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center text-white font-bold text-2xl">
                      {i + 1}
                    </div>
                  </div>
                  <p className="text-gray-700 text-lg mb-4">{exp.description}</p>
                  <ul className="space-y-2">
                    {exp.missions.map((mission, j) => (
                      <li key={j} className="text-gray-700 text-lg flex items-start">
                        <span className="text-emerald-500 mr-3 mt-1 font-bold text-xl">▶</span>
                        {mission}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
                <span className="w-10 h-10 bg-emerald-500 rounded-full mr-3 flex items-center justify-center text-white font-bold">F</span>
                Formation
              </h2>
              <div className="space-y-6">
                {cvData.formations.map((formation, i) => (
                  <div key={i} className="bg-emerald-50 p-6 rounded-lg border-l-4 border-emerald-500">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{formation.diplome}</h3>
                    <p className="text-emerald-600 font-semibold text-lg">{formation.etablissement}</p>
                    <p className="text-gray-600">{formation.annee}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
                <span className="w-10 h-10 bg-emerald-500 rounded-full mr-3 flex items-center justify-center text-white font-bold">C</span>
                Compétences
              </h2>
              <div className="grid grid-cols-2 gap-4">
                {cvData.competences.map((comp, i) => (
                  <div key={i} className="bg-emerald-100 px-6 py-4 rounded-lg text-center font-medium text-gray-800 text-lg border-2 border-emerald-200">
                    {comp}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
  ];

  return (
    <div className="min-h-screen bg-gray-100 print:bg-white">
      <div className="print:hidden bg-white shadow-sm sticky top-0 z-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">CV DE CAROLINE KARPEL 50 VERSIONS ✨</h1>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">VERSION {currentCV} / 50</span>
              <div className="text-xs text-gray-500 hidden md:block">
                💡 Utilisez ← → ou ↑ ↓ pour naviguer
              </div>
              <div className="text-xs text-gray-500 md:hidden">
                👆 Glissez avec le doigt pour naviguer
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setCurrentCV(Math.max(1, currentCV - 1))}
                  disabled={currentCV === 1}
                  className="px-4 py-2 bg-gray-900 text-white text-sm uppercase tracking-wider disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-800 transition-colors"
                >
                  PRÉCÉDENT
                </button>
                <button
                  onClick={() => setCurrentCV(Math.min(50, currentCV + 1))}
                  disabled={currentCV === 50}
                  className="px-4 py-2 bg-gray-900 text-white text-sm uppercase tracking-wider disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-800 transition-colors"
                >
                  SUIVANT
                </button>
                <button
                  onClick={() => window.print()}
                  className="px-4 py-2 border-2 border-gray-900 text-gray-900 text-sm uppercase tracking-wider hover:bg-gray-900 hover:text-white transition-colors"
                >
                  IMPRIMER
                </button>
              </div>
            </div>
          </div>
          <div className="mt-4 flex items-center gap-4">
            <button
              onClick={() => setCurrentCV(Math.max(1, currentCV - 1))}
              disabled={currentCV === 1}
              className="px-3 py-2 bg-gray-200 text-gray-700 text-sm font-semibold rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300 transition-colors"
            >
              ←
            </button>
            <div className="flex gap-2 overflow-x-auto pb-2 flex-1 scrollbar-hide smooth-scroll">
              {Array.from({ length: 50 }, (_, i) => i + 1).map((num) => (
                <button
                  key={num}
                  onClick={() => setCurrentCV(num)}
                  className={`px-3 py-1 text-xs font-semibold transition-colors whitespace-nowrap ${
                    currentCV === num
                      ? 'bg-gray-900 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {num}
                </button>
              ))}
            </div>
            <button
              onClick={() => setCurrentCV(Math.min(50, currentCV + 1))}
              disabled={currentCV === 50}
              className="px-3 py-2 bg-gray-200 text-gray-700 text-sm font-semibold rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300 transition-colors"
            >
              →
            </button>
          </div>
        </div>
      </div>

      <div 
        className="py-8 print:py-0 touch-container"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="print:w-[210mm] print:min-h-[297mm] print:max-h-[594mm] print:m-0 print:p-0">
          {cvTemplates[currentCV - 1]()}
        </div>
      </div>

      <style jsx global>{`
        @media print {
          @page {
            size: A4;
            margin: 0;
          }
          body {
            print-color-adjust: exact;
            -webkit-print-color-adjust: exact;
          }
          .print\\:shadow-none {
            box-shadow: none !important;
          }
        }
      `}</style>
    </div>
  );
}
