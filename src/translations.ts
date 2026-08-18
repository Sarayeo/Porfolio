export type Language = "fr" | "en";

export const translations = {
  fr: {
    desktop: {
      folders: "Dossiers",
      search: "Rechercher un dossier...",
      booking: "Réserver un appel",
      bookingTitle: "Réserver un appel avec Sara",
      bookingQuestion: "On planifie un échange ?",
      bookingDescription:
        "Choisis un créneau qui t'arrange, l'appel se fera automatiquement sur Google Meet. Nous recevrons tous les deux la confirmation.",
      bookingButton: "Ouvrir le calendrier →",
      newTab: "ouverture nouvel onglet",
      menu: "Menu Principal",
      openFolder: "Ouvrir le dossier",
      loadingText: "Chargement de mon univers PM / PO",
      enter: "Entrer",
      loadingAssets: "Loading_Assets...",
      ready: "Ready !",
      nowPlaying: "Now Playing",
      lofiRadio: "Lofi Radio",
      chillBeats: "Chill Beats",
      play: "Play",
      pause: "Pause",
      homePath: "C:/PORTFOLIO/home",
      cvDesktop: "CV Sara.pdf",
    },

    home: {
      role: "Product Owner / Product Manager",
      tagline: "J'exploite les données pour atteindre des résultats tangibles",
      creativity: "Créativité",
      timeToValue: "Time-To-Value",
      efficiency: "Efficacité",
    },

    folders: {
      about: "À propos",
      experience: "Expérience",
      cases: "Études de cas",
      skills: "Compétences",
      resume: "CV",
      contact: "Contact",
    },

    windowTitles: {
      about: "à propos",
      experience: "expérience",
      cases: "étude de cas",
      skills: "compétences",
      resume: "CV",
      contact: "contact",
    },

    about: {
      views: {
        product: "PRODUCT",
        creative: "CRÉATIF",
      },
      product: {
        greeting: "Bonjour tout le monde",
        introBefore:
          "En tant que Product Manager / Product Owner avec une approche résolument orientée",
        introHighlight: "impact, discovery et delivery",
        introAfter:
          ", j'adore transformer le flou des besoins utilisateurs en fonctionnalités claires et mesurables. Je crée des ponts solides entre la vision, les données et les équipes de dev pour maximiser la valeur à chaque sprint.",
        focusTitle: "Focus",
        focusText:
          "Discovery continue, priorisation stratégique, gestion de roadmap.",
        methodsTitle: "Méthodes",
        methodsText:
          "Framework Scrum, priorisation RICE / ICE, Design Sprint, A/B Testing, Product Analytics.",
        objectiveTitle: "Objectif",
        objectiveText:
          "Concevoir et délivrer des expériences produits à la fois utiles et viables.",
      },
      creative: {
        title: "Côté créatif",
        introBefore:
          "En dehors du produit, je dessine. c'est une passion que j'entretiens depuis longtemps, à retrouver sur",
        introAfter:
          ". Ce goût pour l'art nourrit ma façon de penser au quotidien : mon sens du détail et ma sensibilité visuelle sont des éléments que j'essaie de ramener jusque dans mon travail.",
        galleryTitle: "Quelques illustrations",
        previous: "Illustration précédente",
        next: "Illustration suivante",
        goTo: "Aller à l'illustration",
        moreDrawings: "Envie de voir plus de dessins ? C'est par ici 👇",
      },
    },

    contact: {
      title: "Contact",
      description:
        "Disponible pour un poste, un échange réseau ou une discussion autour d’un projet.",
      emailLabel: "Email",
      linkedinLabel: "LinkedIn",
      locationLabel: "Localisation",
      location: "France",
      quickActions: "Actions rapides",
      sendEmail: "Envoyer un email",
      viewLinkedin: "Voir LinkedIn",
    },

    experience: {
      tabs: {
        suitus: "SUITUS",
        bpce: "GROUPE BPCE",
        lmp: "MUTUELLE LMP",
      },
      missionsTitle: "Missions",
      skillsTitle: "Compétences mobilisées",
      entries: {
        suitus: {
          role: "Développeuse Frontend — Stage",
          period: "Mai 2023 – Juillet 2023",
          intro:
            "Arrivée chez SuitUS en tant que développeuse frontend, j'ai pris en charge la conception et l'intégration d'interfaces, tout en gardant un œil attentif sur la qualité et la fiabilité du travail livré.",
          missions: [
            "Conception de wireframes en lien direct avec les besoins business",
            "Intégration des wireframes validés dans l'application en React",
            "Veille sur la qualité et la cohérence du code livré",
          ],
          highlightTitle: "Gérer une crise de sécurité en urgence",
          highlightText:
            "L'entreprise a été victime d'une tentative de phishing peu avant le passage du fondateur dans une émission télévisée. Avec cette échéance imminente, j'ai pris en main WordPress, identifié les failles de sécurité exploitées et publié un nouveau site plus robuste, permettant à l'entreprise de se présenter en toute confiance dans les médias.",
          skills: ["React", "Wireframing", "WordPress", "Sécurité web"],
        },
        bpce: {
          role: "Développeuse Power Platform — Alternance",
          period: "Septembre 2023 – Août 2024",
          intro:
            "Intégrée à l'équipe innovation du groupe bancaire BPCE, j'ai découvert l'écosystème Power Platform, jusque-là inconnu pour moi, et m'y suis adaptée rapidement pour contribuer à des projets transverses au sein du groupe.",
          missions: [
            "Participation à des programmes d'intégration internes au groupe",
            "Accompagnement d'autres entités du groupe, aux côtés de mon mentor, dans la création d'applications sur Power Platform",
            "Développement d'une application RH destinée à accélérer et fluidifier les processus d'onboarding et d'offboarding",
          ],
          highlightTitle: "Reprendre le projet de mon mentor",
          highlightText:
            "En fin de mission, j'ai été chargée de reprendre le projet initialement porté par mon mentor : le nettoyage de l'environnement de production du groupe. Un travail mené en coordination avec d'autres développeurs via Microsoft Teams, qui a constitué ma dernière mission au sein de l'équipe.",
          skills: [
            "Power Platform",
            "Power Apps",
            "Power Automate",
            "Travail en équipe distribuée",
            "Design Figma",
          ],
        },
        lmp: {
          role: "Junior Product Manager — Alternance",
          period: "Septembre 2024 – Août 2026",
          intro:
            "À la Mutuelle Les Ménages Prévoyants, j'ai occupé un poste de junior Product Manager aux missions variées, entre création de nouveaux produits, suivi de la performance commerciale et garantie de la conformité réglementaire.",
          missions: [
            "Conception de nouveaux produits destinés à la commercialisation",
            "Suivi des KPI de vente des produits déjà en place",
            "Rédaction et gestion du cahier de recettes de l'application",
            "Collaboration avec les partenaires pour garantir le bon fonctionnement des applications",
            "Veille au respect des règles réglementaires propres au secteur mutualiste sur les points digitaux, de produits, et de services",
          ],
          highlightTitle: "Une approche produit complète",
          highlightText:
            "Tout au long de ces missions, j'ai mené des benchmarks, animé des ateliers, assuré le suivi de produits, analysé des demandes clients, réalisé des études concurrentielles qualitatives et quantitatives, et travaillé sur des éléments de prévision budgétaire. J'ai donc eu à avoir une vision transverse du métier de Product Manager.",
          skills: [
            "Product Management",
            "Benchmark",
            "Analyse concurrentielle",
            "Prévision budgétaire",
            "Conformité mutualiste",
          ],
        },
      },
    },

    resume: {
      downloadf: "Télécharger le CV",
      downloade: "Télécharger le CV Anglais",
      profileTitle: "Profil",
      profile:
        "Cheffe de Produit Junior spécialisée en produits digitaux, avec une forte appétence pour la transformation digitale. Expérience en cadrage d'offres, analyse des besoins métiers et pilotage de projets web & mobiles en environnement agile.",
      experienceTitle: "Expériences",
      skillsTitle: "Compétences",
      educationTitle: "Formation",
      product: "Produit",
      technical: "Technique",
      experienceEntries: [
        {
          role: "Cheffe de Produit Junior – LMP Mutuelle",
          period: "2024 – présent",
          bullets: [
            "Pilotage des offres produits et roadmap",
            "Réduction des coûts globaux (~3%)",
            "Amélioration usage mobile (+4%)",
          ],
        },
        {
          role: "Développeuse No-Code – Groupe BPCE",
          period: "2023 – 2024",
          bullets: [
            "Développement Power Platform",
            "Optimisation environnement interne",
          ],
        },
        {
          role: "Développeuse Frontend React – Suit Us",
          period: "2023",
          bullets: [
            "Intégration React Native",
            "Réduction incidents sécurité (~85%)",
          ],
        },
      ],
      productSkills: "Agile, Roadmap, Discovery, Analyse besoins",
      technicalSkills: "React, SQL, APIs, Design",
      education:
        "Mastère Management Transformation Digitale – ESILV & IIM (2024–2026)",
      footerLocation: "France",
    },

    skills: {
      tabs: {
        hard: "Compétences techniques",
        product: "Produit",
        soft: "Soft skills",
      },
      hardTitle: "Compétences techniques",
      hardList: [
        "Analyse produit & interprétation de données",
        "UX/UI design & prototypage",
        "Expérimentation (A/B testing)",
        "Outils agiles & delivery produit",
      ],
      toolsTitle: "Outils utilisés",
      productTitle: "Approche produit",
      productList: [
        "Recherche utilisateur & entretiens",
        "Priorisation (RICE, impact vs effort)",
        "Roadmap & définition de MVP",
        "Prise de décision orientée données",
      ],
      softTitle: "Soft skills",
      softList: [
        "Communication claire et structurée",
        "Alignement des parties prenantes",
        "Esprit analytique & résolution de problèmes",
        "Autonomie & adaptabilité",
      ],
      certifications: "Certifications",
      profileTitle: "Profil",
      profileBullets: [
        "Vision produit orientée utilisateur",
        "Fort mix UX + data",
        "Exécution rapide et structurée",
      ],
      profileDescription:
        "Je conçois des produits en reliant besoins utilisateurs, enjeux business et données avec les fonctionnalités.",
      toolDescriptions: {
        Jira: "Gestion de backlog, reports, suivi produit, tickets",
        Figma: "Design d'interfaces, prototypage, design systems",
        ClickUp: "Gestion de backlog, sprints, suivi produit",
        Mysql: "Gestion de base de données relationnelle, requêtes SQL",
        Wordpress: "Création de sites web, gestion de contenu, plugins",
        React: "Développement d'applications web, composants, gestion d'état",
        "Office 365": "Productivité, collaboration, gestion de contenu",
        Notion: "Documentation, PRD, collaboration produit",
        Trello: "Gestion de backlog, sprints, suivi produit",
      },
      certIssuers: {
        scrum: "Certification Scrum",
        opquast: "Certification Opquast",
        designThinking: "Attestation Design Thinking",
      },
    },

    cases: {
      contextTitle: "Contexte",
      processTitle: "Processus",
      missionTitle: "Mission de l'association",
      keyPointsTitle: "Points clés",
      groupProject: "Projet de groupe",
      associationProject: "Projet associatif",
      videoLabel: "Cliquer sur la vidéo pour accéder au projet",
      actions: {
        bloop: "Accéder à Bloop",
        kirbden: "Voir les maquettes Figma",
        leonart: "Accéder à l'association",
      },
      entries: {
        bloop: {
          context:
            "Création d'une application MAO (musique assistée par ordinateur).\nObjectif : 10 000 utilisateurs à N+3 du lancement.\nContraintes : géants du marché très présents, terrain inconnu autour des licences musicales, du droit d'auteur et de la gestion du stockage.",
          process: [
            "Discovery : interviews, funnel analytics (Amplitude)",
            "Priorisation : RICE (top 3 opportunités)",
            "Expérimentation : Smoke tests, A/B testing",
            "Delivery : 5 sprints, release pilote",
          ],
        },
        kirbden: {
          context:
            "Projet graphique : conception d'un système de design (design system) et de l'identité visuelle pour KirbDen.\nTravail de A à Z, de la maquette Figma à l'intégration finale.",
        },
        pokedex: {
          context:
            "Projet de groupe : réalisation d'un Pokédex interactif, consommant une API publique.\nRépartition des tâches en équipe (fetch/API, UI, filtres de recherche, responsive), intégration continue et revue de code entre membres.",
          role: "Rôle : intégration front-end & logique de filtrage",
          features: [
            "Recherche et filtres par type / génération",
            "Fiches détails par Pokémons (stats, évolutions)",
            "Interface responsive mobile / desktop",
          ],
        },
        leonart: {
          context:
            "Projet associatif : création d'un site pour exposer le travail d'artistes.\nLe site présente les œuvres exposées, les profils des artistes, ainsi que les informations relatives à l'association (mission, contact, événements).",
          mission:
            "L'association LEON'ART accompagne des artistes émergents en leur offrant une vitrine numérique pour exposer et diffuser leur travail.",
          features: [
            "Galerie d'œuvres par artiste",
            "Page dédiée à l'association et à sa mission",
            "Mise en avant des expositions / événements",
          ],
        },
      },
    },
  },

  en: {
    desktop: {
      folders: "Folders",
      search: "Search a folder...",
      booking: "Book a call",
      bookingTitle: "Book a call with Sara",
      bookingQuestion: "Let's have a chat?",
      bookingDescription:
        "Choose a time that works for you and the call will automatically take place on Google Meet. We will both receive the confirmation.",
      bookingButton: "Open calendar →",
      newTab: "opens in a new tab",
      menu: "Main Menu",
      openFolder: "Open folder",
      loadingText: "Loading my PM / PO universe",
      enter: "Enter",
      loadingAssets: "Loading_Assets...",
      ready: "Ready!",
      nowPlaying: "Now Playing",
      lofiRadio: "Lofi Radio",
      chillBeats: "Chill Beats",
      play: "Play",
      pause: "Pause",
      homePath: "C:/PORTFOLIO/home",
      cvDesktop: "Sara Resume.pdf",
    },

    home: {
      role: "Product Owner / Product Manager",
      tagline: "I leverage data to drive tangible results",
      creativity: "Creativity",
      timeToValue: "Time-To-Value",
      efficiency: "Efficiency",
    },

    folders: {
      about: "About",
      experience: "Experience",
      cases: "Case Studies",
      skills: "Skills",
      resume: "Resume",
      contact: "Contact",
    },

    windowTitles: {
      about: "about",
      experience: "experience",
      cases: "case study",
      skills: "skills",
      resume: "resume",
      contact: "contact",
    },

    about: {
      views: {
        product: "PRODUCT",
        creative: "CREATIVE",
      },
      product: {
        greeting: "Hello everyone",
        introBefore:
          "As a Product Manager / Product Owner with a strong focus on",
        introHighlight: "impact, discovery and delivery",
        introAfter:
          ", I love turning fuzzy user needs into clear, measurable features. I build strong bridges between vision, data and development teams to maximize value every sprint.",
        focusTitle: "Focus",
        focusText:
          "Continuous discovery, strategic prioritization, roadmap management.",
        methodsTitle: "Methods",
        methodsText:
          "Scrum framework, RICE / ICE prioritization, Design Sprint, A/B Testing, Product Analytics.",
        objectiveTitle: "Goal",
        objectiveText:
          "Design and deliver product experiences that are both useful and viable.",
      },
      creative: {
        title: "The creative side",
        introBefore:
          "Outside of product, I draw. It is a passion I have nurtured for a long time, which you can find on",
        introAfter:
          ". This love for art shapes the way I think every day: attention to detail and visual sensitivity are qualities I try to bring into my work.",
        galleryTitle: "A few illustrations",
        previous: "Previous illustration",
        next: "Next illustration",
        goTo: "Go to illustration",
        moreDrawings: "Want to see more drawings? Right this way 👇",
      },
    },

    contact: {
      title: "Contact",
      description:
        "Available for a role, a networking conversation, or a discussion around a project.",
      emailLabel: "Email",
      linkedinLabel: "LinkedIn",
      locationLabel: "Location",
      location: "France",
      quickActions: "Quick actions",
      sendEmail: "Send an email",
      viewLinkedin: "View LinkedIn",
    },

    experience: {
      tabs: {
        suitus: "SUITUS",
        bpce: "GROUPE BPCE",
        lmp: "LMP MUTUELLE",
      },
      missionsTitle: "Responsibilities",
      skillsTitle: "Skills used",
      entries: {
        suitus: {
          role: "Frontend Developer — Internship",
          period: "May 2023 – July 2023",
          intro:
            "I joined SuitUS as a frontend developer, taking ownership of interface design and integration while keeping a close eye on the quality and reliability of delivered work.",
          missions: [
            "Designed wireframes directly aligned with business needs",
            "Integrated approved wireframes into the application with React",
            "Monitored the quality and consistency of delivered code",
          ],
          highlightTitle: "Handling an urgent security crisis",
          highlightText:
            "The company faced a phishing attempt shortly before the founder appeared on a TV show. With the deadline approaching, I took ownership of WordPress, identified the exploited security gaps and published a more robust website, allowing the company to present itself confidently in the media.",
          skills: ["React", "Wireframing", "WordPress", "Web security"],
        },
        bpce: {
          role: "Power Platform Developer — Work-study",
          period: "September 2023 – August 2024",
          intro:
            "I joined the innovation team at BPCE, discovered the Power Platform ecosystem from scratch, and adapted quickly to contribute to cross-functional projects across the group.",
          missions: [
            "Contributed to internal integration programs across the group",
            "Supported other group entities, alongside my mentor, in building Power Platform applications",
            "Developed an HR application designed to speed up and streamline onboarding and offboarding processes",
          ],
          highlightTitle: "Taking over my mentor's project",
          highlightText:
            "At the end of the assignment, I took over a project initially led by my mentor: cleaning up the group's production environment. The work was carried out in coordination with other developers through Microsoft Teams and became my final assignment within the team.",
          skills: [
            "Power Platform",
            "Power Apps",
            "Power Automate",
            "Distributed teamwork",
            "Figma Design",
          ],
        },
        lmp: {
          role: "Junior Product Manager — Work-study",
          period: "September 2024 – August 2026",
          intro:
            "At Mutuelle Les Ménages Prévoyants, I worked as a junior Product Manager across a broad range of responsibilities, from creating new products to monitoring commercial performance and ensuring regulatory compliance.",
          missions: [
            "Designed new products for market launch",
            "Tracked sales KPIs for existing products",
            "Wrote and managed the application's test plan",
            "Worked with partners to ensure the applications operated properly",
            "Monitored compliance with mutual insurance regulations across digital, product and service topics",
          ],
          highlightTitle: "A complete product approach",
          highlightText:
            "Across these missions, I ran benchmarks, facilitated workshops, monitored products, analyzed customer requests, conducted qualitative and quantitative competitive studies, and worked on budget forecasting. This gave me a cross-functional view of the Product Manager role.",
          skills: [
            "Product Management",
            "Benchmarking",
            "Competitive analysis",
            "Budget forecasting",
            "Mutual insurance compliance",
          ],
        },
      },
    },

    resume: {
      downloadf: "Download CV",
      downloade: "Download CV english",
      profileTitle: "Profile",
      profile:
        "Junior Product Manager specialized in digital products, with a strong interest in digital transformation. Experience in offer scoping, business needs analysis and leading web & mobile projects in agile environments.",
      experienceTitle: "Experience",
      skillsTitle: "Skills",
      educationTitle: "Education",
      product: "Product",
      technical: "Technical",
      experienceEntries: [
        {
          role: "Junior Product Manager – LMP Mutuelle",
          period: "2024 – present",
          bullets: [
            "Product offer and roadmap management",
            "Overall cost reduction (~3%)",
            "Improved mobile usage (+4%)",
          ],
        },
        {
          role: "No-Code Developer – Groupe BPCE",
          period: "2023 – 2024",
          bullets: [
            "Power Platform development",
            "Internal environment optimization",
          ],
        },
        {
          role: "Frontend React Developer – Suit Us",
          period: "2023",
          bullets: [
            "React Native integration",
            "Security incident reduction (~85%)",
          ],
        },
      ],
      productSkills: "Agile, Roadmap, Discovery, Needs analysis",
      technicalSkills: "React, SQL, APIs, Design",
      education:
        "Master's in Digital Transformation Management – ESILV & IIM (2024–2026)",
      footerLocation: "France",
    },

    skills: {
      tabs: {
        hard: "Technical skills",
        product: "Product",
        soft: "Soft skills",
      },
      hardTitle: "Technical skills",
      hardList: [
        "Product analysis & data interpretation",
        "UX/UI design & prototyping",
        "Experimentation (A/B testing)",
        "Agile tools & product delivery",
      ],
      toolsTitle: "Tools used",
      productTitle: "Product approach",
      productList: [
        "User research & interviews",
        "Prioritization (RICE, impact vs effort)",
        "Roadmap & MVP definition",
        "Data-informed decision making",
      ],
      softTitle: "Soft skills",
      softList: [
        "Clear and structured communication",
        "Stakeholder alignment",
        "Analytical mindset & problem solving",
        "Autonomy & adaptability",
      ],
      certifications: "Certifications",
      profileTitle: "Profile",
      profileBullets: [
        "User-centered product vision",
        "Strong UX + data mix",
        "Fast and structured execution",
      ],
      profileDescription:
        "I design products by connecting user needs, business challenges and data with features.",
      toolDescriptions: {
        Jira: "Backlog management, reports, product tracking, tickets",
        Figma: "Interface design, prototyping, design systems",
        ClickUp: "Backlog management, sprints, product tracking",
        Mysql: "Relational database management, SQL queries",
        Wordpress: "Website creation, content management, plugins",
        React: "Web application development, components, state management",
        "Office 365": "Productivity, collaboration, content management",
        Notion: "Documentation, PRDs, product collaboration",
        Trello: "Backlog management, sprints, product tracking",
      },
      certIssuers: {
        scrum: "Scrum Certification",
        opquast: "Opquast Certification",
        designThinking: "Design Thinking Certificate",
      },
    },

    cases: {
      contextTitle: "Context",
      processTitle: "Process",
      missionTitle: "Association mission",
      keyPointsTitle: "Key points",
      groupProject: "Group project",
      associationProject: "Community project",
      videoLabel: "Click the video to access the project",
      actions: {
        bloop: "Visit Bloop",
        kirbden: "View Figma mockups",
        leonart: "Visit the association",
      },
      entries: {
        bloop: {
          context:
            "Creation of a DAW (digital audio workstation) application.\nGoal: 10,000 users by N+3 after launch.\nConstraints: major market players, an unfamiliar landscape around music licensing and copyright, and storage management.",
          process: [
            "Discovery: interviews, funnel analytics (Amplitude)",
            "Prioritization: RICE (top 3 opportunities)",
            "Experimentation: smoke tests, A/B testing",
            "Delivery: 5 sprints, pilot release",
          ],
        },
        kirbden: {
          context:
            "Graphic project: creation of a design system and visual identity for KirbDen.\nEnd-to-end work, from the Figma mockups to the final integration.",
        },
        pokedex: {
          context:
            "Group project: building an interactive Pokédex consuming a public API.\nTasks were split across the team (fetch/API, UI, search filters, responsive design), with continuous integration and peer code reviews.",
          role: "Role: front-end integration & filtering logic",
          features: [
            "Search and filters by type / generation",
            "Detailed Pokémon sheets (stats, evolutions)",
            "Responsive mobile / desktop interface",
          ],
        },
        leonart: {
          context:
            "Community project: creating a website to showcase artists' work.\nThe site presents exhibited works, artist profiles, and information about the association (mission, contact, events).",
          mission:
            "LEON'ART supports emerging artists by providing a digital showcase to exhibit and share their work.",
          features: [
            "Artwork gallery by artist",
            "Dedicated page for the association and its mission",
            "Highlighting exhibitions / events",
          ],
        },
      },
    },
  },
} as const;
