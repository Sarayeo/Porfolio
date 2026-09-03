import type { Language } from "./translations";

export type CareerProfile = "product" | "project";
export type ExperienceId = "suitus" | "bpce" | "lmp";
export type CaseStudyId = "bloop" | "kirbden" | "pokedex" | "leonart";

export const CAREER_PROFILE_STORAGE_KEY = "portfolio-career-profile";

type ExperienceEntry = {
  role: string;
  period: string;
  intro: string;
  missions: readonly string[];
  highlightTitle: string;
  highlightText: string;
  skills: readonly string[];
};

type ProfileCopy = {
  shortLabel: string;
  label: string;
  switchLabel: string;
  switchHint: string;
  role: string;
  tagline: string;
  pillars: readonly [string, string, string];
  homePath: string;
  cvDesktop: string;
  metaTitle: string;
  metaDescription: string;
  about: {
    viewLabel: string;
    greeting: string;
    introBefore: string;
    introHighlight: string;
    introAfter: string;
    hashtags: readonly string[];
    cards: readonly {
      icon: string;
      title: string;
      text: string;
    }[];
  };
  experience: Record<ExperienceId, ExperienceEntry>;
  skills: {
    specialtyTab: string;
    hardTitle: string;
    hardList: readonly string[];
    specialtyTitle: string;
    specialtyList: readonly string[];
    profileBullets: readonly string[];
    profileDescription: string;
  };
  resume: {
    profile: string;
    focusLabel: string;
    focusSkills: string;
    technicalSkills: string;
    cvFr: string;
    cvEn: string;
    experienceEntries: readonly {
      role: string;
      period: string;
      bullets: readonly string[];
    }[];
    education: readonly {
      degree: string;
      school: string;
      period: string;
    }[];
  };
  contactDescription: string;
  caseAngleTitle: string;
  caseAngles: Record<CaseStudyId, readonly string[]>;
};

const frProduct: ProfileCopy = {
  shortLabel: "PO / PM",
  label: "Product Owner / Product Manager",
  switchLabel: "Profil Produit",
  switchHint: "Discovery, roadmap, backlog et valeur utilisateur",
  role: "Product Owner / Product Manager",
  tagline:
    "Je transforme les besoins utilisateurs en produits utiles, mesurables et livrables.",
  pillars: ["Discovery", "Priorisation", "Impact"],
  homePath: "C:/PORTFOLIO/product",
  cvDesktop: "CV Produit.pdf",
  metaTitle: "Sara Fiéla Yeo — Product Owner / Product Manager",
  metaDescription:
    "Portfolio Produit de Sara Fiéla Yeo : discovery, roadmap, backlog, delivery, résultats et études de cas.",
  about: {
    viewLabel: "PRODUIT",
    greeting: "Bonjour, je suis Sara",
    introBefore:
      "Product Owner / Product Manager avec une approche orientée",
    introHighlight: "utilisateurs, données et impact",
    introAfter:
      ", je transforme les besoins métier en solutions claires. Je relie discovery, vision produit et delivery pour aider les équipes à livrer la bonne valeur au bon moment.",
    hashtags: ["#UserCentric", "#DataDriven", "#Agile"],
    cards: [
      {
        icon: "🔎",
        title: "Discovery",
        text: "Analyse des besoins, benchmark, entretiens et cadrage de la proposition de valeur.",
      },
      {
        icon: "🧭",
        title: "Méthode",
        text: "Roadmap, backlog, user stories, critères d’acceptation et priorisation RICE / impact-effort.",
      },
      {
        icon: "📈",
        title: "Impact",
        text: "Pilotage par les KPI, adoption, qualité et amélioration continue après la mise en production.",
      },
    ],
  },
  experience: {
    suitus: {
      role: "Développeuse Frontend — Stage",
      period: "Mai 2023 – Juillet 2023",
      intro:
        "Chez Suit Us, j’ai traduit des besoins business en interfaces web, de la conception des wireframes à leur intégration en React.",
      missions: [
        "Clarification des besoins et conception de wireframes",
        "Intégration des interfaces validées dans l’application React",
        "Amélioration de la qualité et de la fiabilité du produit livré",
      ],
      highlightTitle: "Sécuriser l’expérience avant une forte exposition",
      highlightText:
        "À la suite d’une tentative de phishing, j’ai repris le site WordPress, identifié les failles exploitées et publié une version plus robuste avant le passage du fondateur à la télévision, contribuant à réduire fortement les incidents de sécurité.",
      skills: ["React", "Wireframing", "WordPress", "UX/UI", "Sécurité web"],
    },
    bpce: {
      role: "Développeuse No-Code / Low-Code — Alternance",
      period: "Septembre 2023 – Août 2024",
      intro:
        "Au sein de l’équipe innovation de BPCE, j’ai conçu des solutions Power Platform à partir des irritants opérationnels des équipes internes.",
      missions: [
        "Recueil des besoins et traduction en fonctionnalités",
        "Conception et livraison de deux applications Power Platform",
        "Création d’une application RH pour fluidifier l’onboarding et l’offboarding",
        "Accompagnement d’entités du groupe dans l’adoption des outils",
      ],
      highlightTitle: "Passer d’un besoin interne à une solution adoptable",
      highlightText:
        "J’ai rapidement appris l’écosystème Power Platform, prototypé les parcours dans Figma et coordonné les retours utilisateurs jusqu’à la livraison.",
      skills: ["Power Apps", "Power Automate", "Figma", "Recueil de besoins", "Adoption"],
    },
    lmp: {
      role: "Junior Product Manager — Alternance",
      period: "Septembre 2024 – Août 2026",
      intro:
        "À la Mutuelle LMP, je contribue au cycle produit de bout en bout : compréhension du besoin, cadrage d’offres, priorisation, recette et suivi de la performance.",
      missions: [
        "Conception de nouvelles offres et cadrage de leur mise sur le marché",
        "Analyse des demandes clients et animation d’ateliers métiers",
        "Gestion du cahier de recette, critères d’acceptation et UAT",
        "Suivi des KPI de vente, d’usage mobile et de qualité",
        "Coordination avec les partenaires et veille réglementaire mutualiste",
      ],
      highlightTitle: "Des décisions produit reliées aux résultats",
      highlightText:
        "Benchmarks, analyses qualitatives et quantitatives et suivi des KPI ont contribué à réduire les coûts d’environ 3 % et à améliorer l’usage mobile d’environ 4 %.",
      skills: ["Discovery", "Roadmap", "Backlog", "UAT", "KPI", "Conformité"],
    },
  },
  skills: {
    specialtyTab: "Produit",
    hardTitle: "Compétences techniques & analytiques",
    hardList: [
      "Analyse produit, KPI et interprétation de données",
      "UX/UI, prototypage et parcours utilisateurs",
      "Recette fonctionnelle, critères d’acceptation et UAT",
      "APIs, SQL et compréhension des contraintes techniques",
    ],
    specialtyTitle: "Approche produit",
    specialtyList: [
      "Discovery, entretiens et analyse des besoins",
      "Roadmap, backlog et priorisation RICE / impact-effort",
      "User stories, MVP et coordination du delivery",
      "Mesure de l’adoption et amélioration continue",
    ],
    profileBullets: [
      "Vision centrée utilisateur",
      "Lien métier, UX et technique",
      "Décisions orientées valeur",
    ],
    profileDescription:
      "Je fais le lien entre les besoins utilisateurs, les objectifs business et les équipes de réalisation pour livrer un produit utile et viable.",
  },
  resume: {
    profile:
      "Product Owner / Product Manager junior spécialisée en produits digitaux. J’interviens de la discovery au delivery : analyse des besoins, roadmap, backlog, recette, KPI et adoption, dans des environnements agiles et réglementés.",
    focusLabel: "Produit",
    focusSkills:
      "Discovery, roadmap, backlog, priorisation, user stories, UAT, KPI",
    technicalSkills:
      "Jira, ClickUp, Notion, Figma, SQL, APIs, Power Platform, React",
    cvFr: "/Sara_Yeo_CV_Product_Manager_Product_Owner_FR.pdf",
    cvEn: "/Sara_Yeo_CV_Product_Manager_Product_Owner_EN.pdf",
    experienceEntries: [
      {
        role: "Junior Product Manager — LMP Mutuelle",
        period: "2024 – 2026",
        bullets: [
          "Cadrage d’offres, roadmap, recette et pilotage des KPI",
          "Réduction des coûts d’environ 3 % et usage mobile en hausse d’environ 4 %",
        ],
      },
      {
        role: "Développeuse No-Code / Low-Code — Groupe BPCE",
        period: "2023 – 2024",
        bullets: [
          "Deux applications Power Platform livrées",
          "Recueil des besoins, prototypage et accompagnement des utilisateurs",
        ],
      },
      {
        role: "Développeuse Frontend React — Suit Us",
        period: "2023",
        bullets: [
          "Conception et intégration d’interfaces React",
          "Sécurisation du site et baisse estimée des incidents d’environ 85 %",
        ],
      },
    ],
    education: [
      {
        degree: "Mastère Management de la Transformation Digitale",
        school: "ESILV & IIM",
        period: "2024 – 2026",
      },
      {
        degree: "Bachelor Coding & Digital Innovation — Project Management",
        school: "IIM Digital School",
        period: "2021 – 2024",
      },
    ],
  },
  contactDescription:
    "En recherche active d’un poste de Product Owner ou Product Manager junior. Disponible pour échanger sur vos enjeux produit, votre équipe et vos utilisateurs.",
  caseAngleTitle: "Mon angle Produit",
  caseAngles: {
    bloop: ["Discovery et entretiens", "Priorisation RICE", "MVP livré en 5 sprints"],
    kirbden: ["Cohérence de l’expérience", "Design system", "Passage du prototype au produit"],
    pokedex: ["Découpage fonctionnel", "Filtres centrés usage", "Itération avec l’équipe"],
    leonart: ["Compréhension des publics", "Proposition de valeur", "Parcours de découverte"],
  },
};

const frProject: ProfileCopy = {
  shortLabel: "PMO",
  label: "Cheffe de projets digitaux / PMO",
  switchLabel: "Profil Projets / PMO",
  switchHint: "Cadrage, coordination, reporting et conduite du changement",
  role: "Cheffe de projets digitaux / PMO",
  tagline:
    "Je transforme une vision en plan d’action clair, aligné et livré.",
  pillars: ["Cadrage", "Coordination", "Pilotage"],
  homePath: "C:/PORTFOLIO/pmo",
  cvDesktop: "CV PMO.pdf",
  metaTitle: "Sara Fiéla Yeo — Cheffe de projets digitaux / PMO",
  metaDescription:
    "Portfolio PMO de Sara Fiéla Yeo : cadrage, planification, coordination, reporting, recette et conduite du changement.",
  about: {
    viewLabel: "PROJETS / PMO",
    greeting: "Bonjour, je suis Sara",
    introBefore:
      "Cheffe de projets digitaux / PMO avec une approche orientée",
    introHighlight: "clarté, coordination et résultats",
    introAfter:
      ", je structure les objectifs, les jalons et les responsabilités pour sécuriser l’avancement. Je crée un langage commun entre métiers, équipes techniques et partenaires jusqu’au déploiement.",
    hashtags: ["#Delivery", "#Stakeholders", "#Change"],
    cards: [
      {
        icon: "🗺️",
        title: "Cadrage",
        text: "Objectifs, périmètre, parties prenantes, risques, jalons et critères de réussite partagés.",
      },
      {
        icon: "🤝",
        title: "Coordination",
        text: "Animation des rituels, suivi des actions et circulation d’une information utile à la décision.",
      },
      {
        icon: "📊",
        title: "Pilotage",
        text: "Roadmap, tableaux de bord, alertes, recette, déploiement et accompagnement du changement.",
      },
    ],
  },
  experience: {
    suitus: {
      role: "Développeuse Frontend — Stage",
      period: "Mai 2023 – Juillet 2023",
      intro:
        "Chez Suit Us, j’ai mené un projet web de la clarification du besoin à la mise en ligne, dans un contexte de forte contrainte de délai et de sécurité.",
      missions: [
        "Cadrage des besoins business et planification des livrables",
        "Coordination des validations des wireframes et de l’intégration React",
        "Suivi de la qualité, des risques techniques et de la mise en production",
      ],
      highlightTitle: "Piloter une réponse d’urgence avant une échéance média",
      highlightText:
        "Après une tentative de phishing, j’ai priorisé les actions, repris le site WordPress et coordonné la publication d’une version sécurisée avant le passage télévisé du fondateur.",
      skills: ["Cadrage", "Planning", "Gestion des risques", "React", "WordPress"],
    },
    bpce: {
      role: "Développeuse No-Code / Low-Code — Alternance",
      period: "Septembre 2023 – Août 2024",
      intro:
        "Dans l’équipe innovation de BPCE, j’ai contribué à des projets transverses impliquant plusieurs entités, utilisateurs et développeurs du groupe.",
      missions: [
        "Cadrage et suivi de deux applications Power Platform",
        "Coordination des besoins, développements, retours et validations",
        "Pilotage d’une application RH d’onboarding et d’offboarding",
        "Reprise du chantier de nettoyage de l’environnement de production",
      ],
      highlightTitle: "Assurer la continuité d’un projet transverse",
      highlightText:
        "En fin de mission, j’ai repris le projet de mon mentor, organisé le suivi avec plusieurs développeurs via Teams et maintenu l’avancement jusqu’à mon départ.",
      skills: ["Coordination transverse", "Power Platform", "Suivi d’actions", "Teams", "Figma"],
    },
    lmp: {
      role: "Junior Product Manager — Pilotage de projets",
      period: "Septembre 2024 – Août 2026",
      intro:
        "À la Mutuelle LMP, je pilote des sujets digitaux et produits en environnement réglementé, avec des partenaires externes et plusieurs interlocuteurs métiers.",
      missions: [
        "Cadrage des demandes, construction des plans d’action et suivi des jalons",
        "Coordination des équipes métiers, partenaires et prestataires",
        "Préparation et suivi de la recette fonctionnelle et des anomalies",
        "Production de KPI, reporting et éléments de prévision budgétaire",
        "Accompagnement des déploiements et suivi de la conformité",
      ],
      highlightTitle: "Rendre le pilotage visible et actionnable",
      highlightText:
        "J’ai combiné suivi opérationnel, reporting, recette et coordination des partenaires pour fiabiliser les décisions et contribuer à une baisse des coûts d’environ 3 %.",
      skills: ["PMO", "Roadmap", "Reporting", "UAT", "Budget", "Conformité"],
    },
  },
  skills: {
    specialtyTab: "Projets / PMO",
    hardTitle: "Compétences de pilotage",
    hardList: [
      "Cadrage, périmètre, jalons et plans d’action",
      "Roadmap, suivi d’avancement, KPI et reporting",
      "Recette fonctionnelle, risques, anomalies et déploiement",
      "Prévisions budgétaires et documentation projet",
    ],
    specialtyTitle: "Approche projets / PMO",
    specialtyList: [
      "Gouvernance et animation des parties prenantes",
      "Planification, dépendances et suivi des alertes",
      "Coordination métiers, IT, partenaires et prestataires",
      "Accompagnement au changement et mesure de l’adoption",
    ],
    profileBullets: [
      "Pilotage structuré et lisible",
      "Coordination transverse",
      "Anticipation des risques",
    ],
    profileDescription:
      "Je donne aux équipes un cadre commun, une vision claire de l’avancement et les bonnes informations pour décider et livrer sereinement.",
  },
  resume: {
    profile:
      "Cheffe de projets digitaux / PMO junior, avec près de trois ans d’expérience en alternance et stage. Je cadre et pilote des projets web, mobiles et no-code : planning, coordination, reporting, recette, déploiement et conduite du changement.",
    focusLabel: "Pilotage",
    focusSkills:
      "Cadrage, planning, roadmap, KPI, reporting, risques, UAT, changement",
    technicalSkills:
      "Jira, ClickUp, Notion, Trello, Microsoft 365, Power Platform, Figma, SQL",
    cvFr: "/Sara_Yeo_CV_Cheffe_Projets_Digitaux_PMO_FR.pdf",
    cvEn: "/Sara_Yeo_CV_Digital_Project_Manager_PMO_EN.pdf",
    experienceEntries: [
      {
        role: "Junior Product Manager — Pilotage de projets, LMP Mutuelle",
        period: "2024 – 2026",
        bullets: [
          "Cadrage, coordination partenaires, reporting et recette fonctionnelle",
          "Contribution à une réduction des coûts d’environ 3 %",
        ],
      },
      {
        role: "Développeuse No-Code / Low-Code — Groupe BPCE",
        period: "2023 – 2024",
        bullets: [
          "Pilotage et livraison de deux applications Power Platform",
          "Reprise d’un chantier transverse sur l’environnement de production",
        ],
      },
      {
        role: "Développeuse Frontend React — Suit Us",
        period: "2023",
        bullets: [
          "Projet web mené du besoin à la mise en ligne",
          "Gestion d’une urgence sécurité avant une échéance média",
        ],
      },
    ],
    education: [
      {
        degree: "Mastère Management de la Transformation Digitale",
        school: "ESILV & IIM",
        period: "2024 – 2026",
      },
      {
        degree: "Bachelor Coding & Digital Innovation — Project Management",
        school: "IIM Digital School",
        period: "2021 – 2024",
      },
    ],
  },
  contactDescription:
    "En recherche active d’un poste de Cheffe de projets digitaux ou PMO junior. Disponible pour échanger sur vos enjeux de pilotage, de coordination et de transformation.",
  caseAngleTitle: "Mon angle Projets / PMO",
  caseAngles: {
    bloop: ["Cadrage des objectifs", "Planification de 5 sprints", "Suivi des risques et dépendances"],
    kirbden: ["Périmètre et jalons", "Coordination design / intégration", "Contrôle de cohérence"],
    pokedex: ["Répartition des responsabilités", "Suivi d’avancement", "Intégration continue"],
    leonart: ["Cadrage avec l’association", "Coordination des livrables", "Mise en ligne et transmission"],
  },
};

const enProduct: ProfileCopy = {
  ...frProduct,
  shortLabel: "PO / PM",
  label: "Product Owner / Product Manager",
  switchLabel: "Product profile",
  switchHint: "Discovery, roadmap, backlog and user value",
  role: "Product Owner / Product Manager",
  tagline: "I turn user needs into useful, measurable and shippable products.",
  pillars: ["Discovery", "Prioritization", "Impact"],
  homePath: "C:/PORTFOLIO/product",
  cvDesktop: "Product CV.pdf",
  metaTitle: "Sara Fiéla Yeo — Product Owner / Product Manager",
  metaDescription:
    "Sara Fiéla Yeo’s product portfolio: discovery, roadmap, backlog, delivery, outcomes and case studies.",
  about: {
    viewLabel: "PRODUCT",
    greeting: "Hi, I’m Sara",
    introBefore: "A Product Owner / Product Manager focused on",
    introHighlight: "users, data and impact",
    introAfter:
      ", I turn business needs into clear solutions. I connect discovery, product vision and delivery so teams can ship the right value at the right time.",
    hashtags: ["#UserCentric", "#DataDriven", "#Agile"],
    cards: [
      { icon: "🔎", title: "Discovery", text: "Needs analysis, benchmarking, interviews and value proposition scoping." },
      { icon: "🧭", title: "Method", text: "Roadmaps, backlogs, user stories, acceptance criteria and RICE / impact-effort prioritization." },
      { icon: "📈", title: "Impact", text: "KPIs, adoption, quality and continuous improvement after release." },
    ],
  },
  experience: {
    suitus: {
      role: "Frontend Developer — Internship",
      period: "May 2023 – July 2023",
      intro: "At Suit Us, I translated business needs into web interfaces, from wireframes through React integration.",
      missions: ["Clarified needs and designed wireframes", "Integrated approved interfaces into the React application", "Improved the quality and reliability of the delivered product"],
      highlightTitle: "Securing the experience ahead of major exposure",
      highlightText: "Following a phishing attempt, I took over the WordPress site, identified the exploited vulnerabilities and released a more robust version before the founder’s TV appearance, helping reduce security incidents significantly.",
      skills: ["React", "Wireframing", "WordPress", "UX/UI", "Web security"],
    },
    bpce: {
      role: "No-Code / Low-Code Developer — Work-study",
      period: "September 2023 – August 2024",
      intro: "Within BPCE’s innovation team, I designed Power Platform solutions based on internal teams’ operational pain points.",
      missions: ["Gathered needs and translated them into features", "Designed and delivered two Power Platform applications", "Built an HR onboarding and offboarding application", "Supported group entities with tool adoption"],
      highlightTitle: "Turning an internal need into an adoptable solution",
      highlightText: "I quickly learned Power Platform, prototyped journeys in Figma and coordinated user feedback through delivery.",
      skills: ["Power Apps", "Power Automate", "Figma", "Needs analysis", "Adoption"],
    },
    lmp: {
      role: "Junior Product Manager — Work-study",
      period: "September 2024 – August 2026",
      intro: "At LMP Mutuelle, I contribute across the product lifecycle: needs analysis, offer scoping, prioritization, testing and performance tracking.",
      missions: ["Scoped new offers and their go-to-market", "Analyzed customer requests and facilitated business workshops", "Managed test plans, acceptance criteria and UAT", "Tracked sales, mobile usage and quality KPIs", "Coordinated partners and monitored insurance compliance"],
      highlightTitle: "Connecting product decisions to outcomes",
      highlightText: "Benchmarks, qualitative and quantitative analysis and KPI tracking contributed to roughly 3% lower costs and around 4% higher mobile usage.",
      skills: ["Discovery", "Roadmap", "Backlog", "UAT", "KPIs", "Compliance"],
    },
  },
  skills: {
    specialtyTab: "Product",
    hardTitle: "Technical & analytical skills",
    hardList: ["Product analysis, KPIs and data interpretation", "UX/UI, prototyping and user journeys", "Functional testing, acceptance criteria and UAT", "APIs, SQL and understanding technical constraints"],
    specialtyTitle: "Product approach",
    specialtyList: ["Discovery, interviews and needs analysis", "Roadmaps, backlogs and RICE / impact-effort prioritization", "User stories, MVPs and delivery coordination", "Adoption measurement and continuous improvement"],
    profileBullets: ["User-centered vision", "Business, UX and tech bridge", "Value-driven decisions"],
    profileDescription: "I connect user needs, business objectives and delivery teams to ship a useful and viable product.",
  },
  resume: {
    ...frProduct.resume,
    profile: "Junior Product Owner / Product Manager specialized in digital products. I work from discovery to delivery: needs analysis, roadmaps, backlogs, testing, KPIs and adoption in agile and regulated environments.",
    focusLabel: "Product",
    focusSkills: "Discovery, roadmaps, backlogs, prioritization, user stories, UAT, KPIs",
    technicalSkills: "Jira, ClickUp, Notion, Figma, SQL, APIs, Power Platform, React",
    experienceEntries: [
      { role: "Junior Product Manager — LMP Mutuelle", period: "2024 – 2026", bullets: ["Offer scoping, roadmaps, testing and KPI ownership", "Approximately 3% lower costs and around 4% higher mobile usage"] },
      { role: "No-Code / Low-Code Developer — Groupe BPCE", period: "2023 – 2024", bullets: ["Two Power Platform applications delivered", "Needs analysis, prototyping and user enablement"] },
      { role: "React Frontend Developer — Suit Us", period: "2023", bullets: ["React interface design and integration", "Site security improvements and roughly 85% fewer incidents"] },
    ],
    education: [
      { degree: "Master’s in Digital Transformation Management", school: "ESILV & IIM", period: "2024 – 2026" },
      { degree: "Bachelor in Coding & Digital Innovation — Project Management", school: "IIM Digital School", period: "2021 – 2024" },
    ],
  },
  contactDescription: "Actively looking for a junior Product Owner or Product Manager role. I would be glad to discuss your product challenges, team and users.",
  caseAngleTitle: "My Product angle",
  caseAngles: {
    bloop: ["Discovery and interviews", "RICE prioritization", "MVP delivered in 5 sprints"],
    kirbden: ["Experience consistency", "Design system", "Prototype-to-product execution"],
    pokedex: ["Feature breakdown", "Usage-focused filters", "Team iteration"],
    leonart: ["Audience understanding", "Value proposition", "Discovery journey"],
  },
};

const enProject: ProfileCopy = {
  ...frProject,
  shortLabel: "PMO",
  label: "Digital Project Manager / PMO",
  switchLabel: "Projects / PMO profile",
  switchHint: "Scoping, coordination, reporting and change enablement",
  role: "Digital Project Manager / PMO",
  tagline: "I turn a vision into a clear, aligned and delivered action plan.",
  pillars: ["Scoping", "Coordination", "Delivery"],
  homePath: "C:/PORTFOLIO/pmo",
  cvDesktop: "PMO CV.pdf",
  metaTitle: "Sara Fiéla Yeo — Digital Project Manager / PMO",
  metaDescription: "Sara Fiéla Yeo’s PMO portfolio: scoping, planning, coordination, reporting, testing and change enablement.",
  about: {
    viewLabel: "PROJECTS / PMO",
    greeting: "Hi, I’m Sara",
    introBefore: "A Digital Project Manager / PMO focused on",
    introHighlight: "clarity, coordination and outcomes",
    introAfter: ", I structure goals, milestones and responsibilities to secure delivery. I create a shared language across business, technical teams and partners through deployment.",
    hashtags: ["#Delivery", "#Stakeholders", "#Change"],
    cards: [
      { icon: "🗺️", title: "Scoping", text: "Shared objectives, scope, stakeholders, risks, milestones and success criteria." },
      { icon: "🤝", title: "Coordination", text: "Facilitating routines, tracking actions and circulating decision-ready information." },
      { icon: "📊", title: "Delivery", text: "Roadmaps, dashboards, alerts, testing, deployment and change enablement." },
    ],
  },
  experience: {
    suitus: {
      role: "Frontend Developer — Internship",
      period: "May 2023 – July 2023",
      intro: "At Suit Us, I led a web project from needs clarification to release under tight timeline and security constraints.",
      missions: ["Scoped business needs and planned deliverables", "Coordinated wireframe validation and React integration", "Tracked quality, technical risks and deployment"],
      highlightTitle: "Leading an urgent response ahead of a media deadline",
      highlightText: "After a phishing attempt, I prioritized actions, took over the WordPress site and coordinated the release of a secured version before the founder’s TV appearance.",
      skills: ["Scoping", "Planning", "Risk management", "React", "WordPress"],
    },
    bpce: {
      role: "No-Code / Low-Code Developer — Work-study",
      period: "September 2023 – August 2024",
      intro: "Within BPCE’s innovation team, I contributed to cross-functional projects involving several group entities, users and developers.",
      missions: ["Scoped and tracked two Power Platform applications", "Coordinated needs, development, feedback and validation", "Led delivery of an HR onboarding and offboarding application", "Took over the production environment clean-up workstream"],
      highlightTitle: "Ensuring continuity on a cross-functional project",
      highlightText: "At the end of the assignment, I took over my mentor’s project, organized tracking with several developers through Teams and maintained progress through handover.",
      skills: ["Cross-functional coordination", "Power Platform", "Action tracking", "Teams", "Figma"],
    },
    lmp: {
      role: "Junior Product Manager — Project Delivery",
      period: "September 2024 – August 2026",
      intro: "At LMP Mutuelle, I lead digital and product workstreams in a regulated environment with external partners and multiple business stakeholders.",
      missions: ["Scoped requests, built action plans and tracked milestones", "Coordinated business teams, partners and suppliers", "Prepared and monitored UAT and defect resolution", "Produced KPIs, reporting and budget forecast inputs", "Supported deployments and monitored compliance"],
      highlightTitle: "Making delivery visible and actionable",
      highlightText: "I combined operational tracking, reporting, testing and partner coordination to improve decision-making and contribute to roughly 3% lower costs.",
      skills: ["PMO", "Roadmaps", "Reporting", "UAT", "Budget", "Compliance"],
    },
  },
  skills: {
    specialtyTab: "Projects / PMO",
    hardTitle: "Project delivery skills",
    hardList: ["Scoping, scope management, milestones and action plans", "Roadmaps, progress tracking, KPIs and reporting", "UAT, risks, defects and deployment", "Budget forecasting and project documentation"],
    specialtyTitle: "Projects / PMO approach",
    specialtyList: ["Governance and stakeholder facilitation", "Planning, dependencies and alert tracking", "Business, IT, partner and supplier coordination", "Change enablement and adoption measurement"],
    profileBullets: ["Clear and structured delivery", "Cross-functional coordination", "Proactive risk management"],
    profileDescription: "I give teams a shared framework, a clear view of progress and the right information to make decisions and deliver confidently.",
  },
  resume: {
    ...frProject.resume,
    profile: "Junior Digital Project Manager / PMO with nearly three years of work-study and internship experience. I scope and lead web, mobile and no-code projects through planning, coordination, reporting, UAT, deployment and change enablement.",
    focusLabel: "Delivery",
    focusSkills: "Scoping, planning, roadmaps, KPIs, reporting, risks, UAT, change",
    technicalSkills: "Jira, ClickUp, Notion, Trello, Microsoft 365, Power Platform, Figma, SQL",
    experienceEntries: [
      { role: "Junior Product Manager — Project Delivery, LMP Mutuelle", period: "2024 – 2026", bullets: ["Scoping, partner coordination, reporting and UAT", "Contribution to approximately 3% lower costs"] },
      { role: "No-Code / Low-Code Developer — Groupe BPCE", period: "2023 – 2024", bullets: ["Delivery of two Power Platform applications", "Ownership of a cross-functional production environment workstream"] },
      { role: "React Frontend Developer — Suit Us", period: "2023", bullets: ["Web project led from need to release", "Urgent security response ahead of a media deadline"] },
    ],
    education: [
      { degree: "Master’s in Digital Transformation Management", school: "ESILV & IIM", period: "2024 – 2026" },
      { degree: "Bachelor in Coding & Digital Innovation — Project Management", school: "IIM Digital School", period: "2021 – 2024" },
    ],
  },
  contactDescription: "Actively looking for a junior Digital Project Manager or PMO role. I would be glad to discuss your delivery, coordination and transformation challenges.",
  caseAngleTitle: "My Projects / PMO angle",
  caseAngles: {
    bloop: ["Objective scoping", "Five-sprint planning", "Risk and dependency tracking"],
    kirbden: ["Scope and milestones", "Design / development coordination", "Consistency control"],
    pokedex: ["Responsibility mapping", "Progress tracking", "Continuous integration"],
    leonart: ["Scoping with the association", "Deliverable coordination", "Release and handover"],
  },
};

export const careerProfiles: Record<Language, Record<CareerProfile, ProfileCopy>> = {
  fr: { product: frProduct, project: frProject },
  en: { product: enProduct, project: enProject },
};

export function resolveCareerProfile(): CareerProfile {
  const aliases: Record<string, CareerProfile> = {
    product: "product",
    po: "product",
    pw: "product",
    project: "project",
    pmo: "project",
    pm: "project",
  };

  const subdomain = window.location.hostname.toLowerCase().split(".")[0];
  if (aliases[subdomain]) return aliases[subdomain];

  const queryProfile = new URLSearchParams(window.location.search)
    .get("profile")
    ?.toLowerCase();
  if (queryProfile && aliases[queryProfile]) return aliases[queryProfile];

  const saved = window.localStorage.getItem(CAREER_PROFILE_STORAGE_KEY);
  return saved === "project" || saved === "product" ? saved : "product";
}

export function hasProfileSubdomain(hostname = window.location.hostname) {
  return ["po", "pw", "product", "pmo", "pm", "project"].includes(
    hostname.toLowerCase().split(".")[0]
  );
}
