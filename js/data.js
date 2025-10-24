// This is our "database" of all companies for the explorer.
// We can add or remove companies here, and the website will update automatically.

const companyData = {
    ring1: {
        name: "Level 1: The Customers",
        companies: [
            { 
                name: "NSA", 
                logo: "img/nsa.png", 
                link: "https://www.nsa.gov/careers/", 
                desc: "National Security Agency: The U.S. leader in signals intelligence (SIGINT) and cybersecurity.", 
                size: "government", 
                clearance: "ts-sci",
                clearancejobs: "https://www.clearancejobs.com/jobs/nsa",
                salaryRange: "$80k-$180k",
                locations: ["Fort Meade, MD", "San Antonio, TX", "Denver, CO"],
                specialties: ["SIGINT", "Cybersecurity", "Cryptanalysis", "Data Science"]
            },
            { name: "NGA", logo: "img/nga.png", link: "https://www.nga.mil/careers/", desc: "National Geospatial-Intelligence Agency: Provides geospatial intelligence (GEOINT) from satellite and aerial imagery.", size: "government", clearance: "ts-sci" },
            { name: "NRO", logo: "img/nro.png", link: "https://www.nro.gov/Careers/", desc: "National Reconnaissance Office: Builds and operates America's spy satellites.", size: "government", clearance: "ts-sci" },
            { name: "DIA", logo: "img/dia.png", link: "https://www.dia.mil/Careers/", desc: "Defense Intelligence Agency: Provides military intelligence to defense policymakers and warfighters.", size: "government", clearance: "ts-sci" },
            { name: "CIA", logo: "img/cia.png", link: "https://www.cia.gov/careers/", desc: "Central Intelligence Agency: Provides foreign intelligence to U.S. policymakers.", size: "government", clearance: "ts-sci" }
        ]
    },
    ring2: {
        name: "Level 2: The Primes",
        companies: [
            { 
                name: "Lockheed Martin", 
                logo: "img/lockheed_martin.png", 
                link: "https://www.lockheedmartinjobs.com/", 
                desc: "A 'Big 5' Prime. Manages massive aerospace, defense, and intelligence contracts.", 
                size: "large", 
                clearance: "ts",
                clearancejobs: "https://www.clearancejobs.com/jobs/lockheed-martin",
                salaryRange: "$70k-$200k",
                locations: ["Bethesda, MD", "Fort Worth, TX", "Denver, CO", "Sunnyvale, CA"],
                specialties: ["Aerospace", "Missile Defense", "Space Systems", "Cybersecurity"],
                contracts: ["F-35", "THAAD", "Space Fence", "Cyber Solutions"]
            },
            { name: "Northrop Grumman", logo: "img/northrop_grumman.png", link: "https://www.ngc.com/careers/", desc: "A 'Big 5' Prime. Leader in space systems, cyber, and advanced aircraft.", size: "large", clearance: "ts" },
            { name: "Leidos", logo: "img/leidos.png", link: "https://careers.leidos.com/", desc: "A major Prime contractor managing large-scale IT, health, and intelligence contracts.", size: "large", clearance: "ts" },
            { name: "General Dynamics (GDIT)", logo: "img/gdit.png", link: "https://www.gdit.com/careers/", desc: "A 'Big 5' Prime. Major focus on IT services, cyber, and military systems.", size: "large", clearance: "ts" },
            { name: "Booz Allen Hamilton", logo: "img/booz_allen.png", link: "https://careers.boozallen.com/", desc: "A major Prime focused on consulting, cyber, data science, and analytics.", size: "medium", clearance: "ts" },
            { name: "RTX (Raytheon)", logo: "img/rtx.png", link: "https://careers.rtx.com/", desc: "A 'Big 5' Prime. Specializes in advanced sensors, missiles, and cyber.", size: "large", clearance: "ts" },
            { name: "CACI", logo: "img/caci.png", link: "https://careers.caci.com/", desc: "A major Prime providing expertise in IT, signals intelligence, and electronic warfare.", size: "medium", clearance: "ts" },
            { name: "SAIC", logo: "img/saic.png", link: "https://www.saic.com/careers", desc: "A major Prime focused on IT modernization, logistics, and systems engineering.", size: "medium", clearance: "ts" },
            { name: "BAE Systems", logo: "img/bae_systems.png", link: "https://jobs.baesystems.com/global/en/search-results?q=clearance", desc: "Major international defense Prime with large US presence in electronics, cyber, and intelligence.", size: "medium", clearance: "ts" },
            { name: "Peraton", logo: "img/peraton.png", link: "https://careers.peraton.com/cleared-jobs", desc: "Major Prime formed from merged specialists; strong in space, cyber, and mission IT for IC/DoD.", size: "medium", clearance: "ts" },
            { name: "HII", logo: "img/hii.png", link: "https://hii.com/careers/join-our-team/?job_levels=clearance-required", desc: "Traditionally shipbuilding, now a major player in cleared IT, cyber, and data analytics (acquired Enlighten).", size: "medium", clearance: "ts" },
            { name: "ManTech", logo: "img/mantech.png", link: "https://www.mantech.com/careers/security-clearance-jobs", desc: "Large contractor focused heavily on cleared work in cyber, intel analysis, and systems engineering.", size: "medium", clearance: "ts" }
    // We could add Jacobs, Parsons, Accenture Federal later if desired
        ]
    },
    ring3: {
        name: "Level 3: The Specialists",
        companies: [
            { name: "Visionist", logo: "img/visionist.png", link: "https://www.visionistinc.com/careers", desc: "Specialist in data science, analytics, and software engineering for the IC.", size: "small", clearance: "ts-sci" },
            { name: "Zeta Associates", logo: "img/zeta.png", link: "https://www.lockheedmartinjobs.com/", desc: "A Lockheed Martin company. Elite specialist in SIGINT and geolocation.", size: "small", clearance: "ts-sci" },
            { name: "NASK", logo: "img/nask.png", link: "https://nask.world/company/", desc: "Specialist in SIGINT, geolocation, and RF engineering for NASIC and the IC." },
            { name: "MesaVita", logo: "img/mesavita.png", link: "https://www.mesavita.com/services", desc: "Small business specialist in data science, cyber, and mission operations." },
            { name: "Praxis Engineering", logo: "img/praxis.png", link: "https://www.gdit.com/careers/", desc: "A GDIT company. Legendary for its high-end cyber and SIGINT engineers.", size: "small", clearance: "ts-sci" },
            { name: "Enlighten", logo: "img/enlighten.png", link: "https://hii.com/careers/", desc: "An HII company. Specialist in data analytics and rapid software development." },
            { name: "BlueHalo", logo: "img/bluehalo.png", link: "https://bluehalo.com/careers/", desc: "Specialist in space, directed energy, AI, and cyber capabilities." },
            { name: "HawkEye 360", logo: "img/hawkeye_360.png", link: "https://www.he360.com/careers/", desc: "Commercial provider of space-based RF signal data and analytics." },
            { name: "Maxar", logo: "img/maxar.png", link: "https://www.maxar.com/careers", desc: "Commercial provider of high-resolution satellite imagery." },
            { name: "Capella Space", logo: "img/capella_space.png", link: "https://www.capellaspace.com/careers/", desc: "Commercial provider of high-resolution SAR (radar) imagery." },
            { name: "Umbra", logo: "img/umbra.png", link: "https://umbra.space/careers", desc: "Commercial provider of high-resolution SAR (radar) imagery." },
            { name: "BlackSky", logo: "img/blacksky.png", link: "https://www.blacksky.com/careers/", desc: "Commercial provider of real-time satellite imagery and AI analytics." },
            { name: "ManTech", logo: "img/mantech.png", link: "https://www.mantech.com/careers", desc: "Large contractor often acting as specialist in cyber, intelligence analysis, and systems engineering." },
            { name: "Parsons", logo: "img/parsons.png", link: "https://www.parsons.com/careers/", desc: "Large contractor focused on cyber, AI, and intelligence solutions, often through acquisitions." },
            { name: "Peraton", logo: "img/peraton.png", link: "https://careers.peraton.com/", desc: "Major Prime formed from merged specialist companies; strong in space, cyber, and IT." },
            { name: "Assured Consulting Solutions (ACS)", logo: "img/acs.png", link: "https://www.assured-consulting.com/careers/", desc: "Small business specialist providing IT, cyber, and data analytics to Primes." },
            { name: "ClearAvenue", logo: "img/clearavenue.png", link: "https://clearavenue.com/careers/", desc: "Specialist in systems engineering and IT modernization for DIA, NGA, and others." },
            { name: "Royce Geospatial", logo: "img/roycegeo.png", link: "https://www.roycegeo.com/careers", desc: "Specialist firm focused entirely on providing GEOINT analysis and data science." },
            { name: "Realm One", logo: "img/realm_one.png", link: "https://realmone.com/careers/", desc: "Specialist providing SIGINT, Cyber, Software Engineering, and Data Analysis expertise to the IC." }
        // Add more here as needed
        ]
    }
};