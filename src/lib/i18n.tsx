"use client";

import React, { createContext, useContext, useState } from "react";

type Locale = "en" | "fr";

const translations: Record<Locale, Record<string, string>> = {
  en: {
    works: "Works",
    experience: "Experience",
    contact: "Contact",
    sayHello: "Say Hello",
    directContact: "Direct Contact",
    emailAddress: "Email Address",
    projectDetails: "Project Details",
    submitRequest: "Submit Request",
    messageSent: "Message Sent",
    thankYou: "Thank you. I'll be in touch shortly.",
    placeholderEmail: "name@company.com",
    placeholderMessage: "Describe your design and performance requirements...",
    // Hero
    hero_badge: "Hello I'm",
    hero_descriptor:
      "UI/UX Designer · Web Developer · WordPress Developer · Graphic Designer",
    hero_stat_years: "Years",
    hero_stat_projects: "Projects",
    hero_scroll: "Scroll",
    about: "About",
    // Intro
    intro_overline: "Introduction",
    intro_heading: "About Me",
    intro_statement:
      "I design and build user-centered digital experiences that combine UI/UX design, graphic design, frontend development, and WordPress solutions. My focus is to help brands and entrepreneurs create websites that are both visually strong and performance-driven.",
    // Specializations
    spec01_title: "UI/UX Design",
    spec01_desc:
      "Creating intuitive and user-centered interfaces that improve usability, engagement, and conversion across all devices.",
    spec02_title: "Graphic Design",
    spec02_desc:
      "Designing strong visual identities and marketing assets that communicate brand value clearly and consistently.",
    spec03_title: "Frontend Development",
    spec03_desc:
      "Building responsive, fast, and accessible interfaces using modern web technologies for a smooth user experience.",
    spec04_title: "WordPress Development",
    spec04_desc:
      "Developing flexible and scalable WordPress websites that are easy to manage and optimized for performance.",
    // Projects
    projects_overline: "// Selected Works",
    projects_heading: "Featured Case Studies",
    projects_lead:
      "A curated collection of digital products engineered with precision.",
    // Contact
    contact_overline: "// Get In Touch",
    contact_heading: "LET'S SHAPE\nTHE NEXT\nINTERFACE.",
    contact_lead:
      "Have a project in mind or want to collaborate on a premium digital product? I'd love to hear from you.",
    // Experience
    experience_overline: "// Professional Career",
    experience_heading: "Work Experience",
    // Stats
    stats_overline: "// By The Numbers",
    stats_heading: "Key Metrics",
    stat_projects_realized: "Projects realized",
    stat_years_mastery: "Years of Mastery",
    stat_client_satisfaction: "Client Satisfaction",
    // Projects content
    project_01_title: "Bénin Excursion",
    project_01_description:
      "Complete redesign of a full-featured tourism platform, enabling users to browse and book guided excursions across Bénin while strengthening the agency's brand credibility.",
    project_02_title: "Resofindev — Resource Mobilization Platform",
    project_02_description:
      "Web platform connecting project owners with financial partners, helping businesses mobilize the resources needed to bring their initiatives to life.",
    project_03_title: "Clioclic — Digital Marketing & Lead Generation Agency",
    project_03_description:
      "Design and development of a modern, custom showcase website for an agency specialized in client acquisition and CRM automation.",
    project_04_title:
      "Experience Benin — Tourism Promotion & Excursion Platform",
    project_04_description:
      "Design and development of an immersive website showcasing authentic tourism and cultural heritage in Benin.",
    // Experience content
    exp_01_role: "Graphic Designer & Community Manager",
    exp_01_company: "OmeliGod",
    exp_01_detail_1:
      "Spearheaded visual content creation and brand strategy for Iviision (kitchen appliance & blender line), boosting brand visibility and product engagement.",
    exp_01_detail_2:
      "Designed multi-channel graphic assets and managed social media strategy to drive audience engagement and brand awareness.",
    exp_02_role: "Web Designer, WordPress Developer & Graphic Designer",
    exp_02_company: "Sourou Prod",
    exp_02_detail_1:
      "Designed, developed, and revamped custom WordPress websites, focusing on performance, UX/UI, and tailored responsive layouts.",
    exp_02_detail_2:
      "Produced high-impact visual assets and marketing materials for international organizations and local institutions.",
    exp_02_detail_3:
      "Collaborated closely with production teams to maintain brand consistency across both digital platforms and graphic collateral.",
    exp_03_role: "Co-Founder & Lead Digital Designer",
    exp_03_company: "Brhocom",
    exp_03_detail_1:
      "Co-founded Brhocom, delivering strategic digital design, WordPress development, and branding solutions to private clients and agencies.",
    exp_03_detail_2:
      "Provide end-to-end consulting for custom web projects, brand identity development, and visual communication assets.",
    exp_03_detail_3:
      "Collaborated closely with production teams to maintain brand consistency across both digital platforms and graphic collateral.",
  },
  fr: {
    works: "Travaux",
    experience: "Expérience",
    contact: "Contact",
    sayHello: "Discuter",
    directContact: "Contact direct",
    emailAddress: "Adresse e‑mail",
    projectDetails: "Détails du projet",
    submitRequest: "Envoyer la demande",
    messageSent: "Message envoyé",
    thankYou: "Merci. Je vous contacterai bientôt.",
    placeholderEmail: "nom@entreprise.com",
    placeholderMessage: "Décrivez votre projet et vos besoins...",
    // Hero
    hero_badge: "Bonjour, je suis",
    hero_descriptor:
      "Concepteur UI/UX · Développeur web · Développeur WordPress · Graphiste",
    hero_stat_years: "Années",
    hero_stat_projects: "Projets",
    hero_scroll: "Défiler",
    about: "À propos",
    // Intro
    intro_overline: "Introduction",
    intro_heading: "À propos de moi",
    intro_statement:
      "Je conçois et développe des expériences numériques centrées sur l'utilisateur, combinant design UI/UX, design graphique, développement frontend et solutions WordPress. Mon objectif est d'aider les marques et entrepreneurs à créer des sites visuellement forts et performants.",
    // Specializations
    spec01_title: "UI/UX Design",
    spec01_desc:
      "Création d'interfaces intuitives et centrées sur l'utilisateur pour améliorer l'utilisabilité, l'engagement et la conversion sur tous les appareils.",
    spec02_title: "Design Graphique",
    spec02_desc:
      "Conception d'identités visuelles fortes et d'éléments marketing qui communiquent clairement la valeur de la marque.",
    spec03_title: "Développement Frontend",
    spec03_desc:
      "Construction d'interfaces réactives, rapides et accessibles avec des technologies web modernes pour une expérience fluide.",
    spec04_title: "Développement WordPress",
    spec04_desc:
      "Développement de sites WordPress flexibles et évolutifs, faciles à gérer et optimisés pour la performance.",
    // Projects
    projects_overline: "// Travaux Sélectionnés",
    projects_heading: "Créations en vedette",
    projects_lead:
      "Une collection soignée de produits numériques conçus avec précision.",
    // Contact
    contact_overline: "// Prendre contact",
    contact_heading: "FAÇONNONS\nLA PROCHAINE\nINTERFACE.",
    contact_lead:
      "Vous avez un projet en tête ou souhaitez collaborer sur un produit numérique haut de gamme ? J'aimerais en discuter.",
    // Experience
    experience_overline: "// Parcours Professionnel",
    experience_heading: "Expérience Professionnelle",
    // Stats
    stats_overline: "// Chiffres Clés",
    stats_heading: "Chiffres clés",
    stat_projects_realized: "Projets réalisés",
    stat_years_mastery: "Années d'expertise",
    stat_client_satisfaction: "Satisfaction client",
    // Projects content
    project_01_title: "Bénin Excursion",
    project_01_description:
      "Refonte complète d'une plateforme touristique, permettant aux utilisateurs de découvrir et de réserver des excursions au Bénin tout en renforçant la crédibilité de l'agence.",
    project_02_title: "Resofindev — Plateforme de mobilisation de ressources",
    project_02_description:
      "Plateforme web connectant les porteurs de projets et les partenaires financiers, aidant les entreprises à mobiliser les ressources nécessaires.",
    project_03_title: "Clioclic — Marketing Digital & Génération de Leads",
    project_03_description:
      "Conception et développement d'un site vitrine moderne et sur-mesure pour une agence spécialisée en acquisition client et automatisation CRM.",
    project_04_title:
      "Experience Benin — Promotion du tourisme & plateforme d'excursions",
    project_04_description:
      "Conception d'un site immersif mettant en valeur le patrimoine culturel et touristique du Bénin.",
    // Experience content
    exp_01_role: "Graphiste & Community Manager",
    exp_01_company: "OmeliGod",
    exp_01_detail_1:
      "Pilotage de la création de contenus visuels et de la stratégie de marque pour Iviision, augmentant la visibilité et l'engagement produit.",
    exp_01_detail_2:
      "Conception d'assets graphiques omnicanaux et gestion des réseaux sociaux pour accroître l'engagement.",
    exp_02_role: "Web Designer, Développeur WordPress & Graphiste",
    exp_02_company: "Sourou Prod",
    exp_02_detail_1:
      "Conception et refonte de sites WordPress personnalisés, axés sur la performance et l'expérience utilisateur.",
    exp_02_detail_2:
      "Production d'éléments visuels et supports marketing pour des organisations internationales et institutions locales.",
    exp_02_detail_3:
      "Collaboration étroite avec les équipes de production pour maintenir la cohérence de la marque.",
    exp_03_role: "Co-fondateur & Lead Digital Designer",
    exp_03_company: "Brhocom",
    exp_03_detail_1:
      "Co-fondation de Brhocom, fournissant design digital stratégique, développement WordPress et solutions de branding.",
    exp_03_detail_2:
      "Accompagnement de projets web sur-mesure, développement d'identités de marque et communication visuelle.",
    exp_03_detail_3:
      "Collaboration pour assurer la cohérence de la marque sur tous les supports.",
  },
};

type I18nContext = {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: (key: string) => string;
};

const I18nContext = createContext<I18nContext>({
  locale: "en",
  setLocale: () => {},
  t: (k) => k,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = useState<Locale>("en");
  const t = (key: string) => translations[locale][key] || key;
  return (
    <I18nContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useTranslation() {
  return useContext(I18nContext);
}

export default LanguageProvider;
