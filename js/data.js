// This is our "database" of all companies for the explorer.
// We can add or remove companies here, and the website will update automatically.

const companyData = {
    ring1: {
        name: "Level 1: The Customers",
        companies: [
            { name: "NSA", logo: "img/nsa.png", link: "https://www.nsa.gov/careers/", desc: "National Security Agency: The U.S. leader in signals intelligence (SIGINT) and cybersecurity." },
            { name: "NGA", logo: "img/nga.png", link: "https://www.nga.mil/careers/", desc: "National Geospatial-Intelligence Agency: Provides geospatial intelligence (GEOINT) from satellite and aerial imagery." },
            { name: "NRO", logo: "img/nro.png", link: "https://www.nro.gov/Careers/", desc: "National Reconnaissance Office: Builds and operates America's spy satellites." },
            { name: "DIA", logo: "img/dia.png", link: "https://www.dia.mil/Careers/", desc: "Defense Intelligence Agency: Provides military intelligence to defense policymakers and warfighters." },
            { name: "CIA", logo: "img/cia.png", link: "https://www.cia.gov/careers/", desc: "Central Intelligence Agency: Provides foreign intelligence to U.S. policymakers." }
        ]
    },
    ring2: {
        name: "Level 2: The Primes",
        companies: [
            { name: "Lockheed Martin", logo: "img/lockheed_martin.png", link: "https://www.lockheedmartinjobs.com/", desc: "A 'Big 5' Prime. Manages massive aerospace, defense, and intelligence contracts." },
            { name: "Northrop Grumman", logo: "img/northrop_grumman.png", link: "https://www.ngc.com/careers/", desc: "A 'Big 5' Prime. Leader in space systems, cyber, and advanced aircraft." },
            { name: "Leidos", logo: "img/leidos.png", link: "https://careers.leidos.com/", desc: "A major Prime contractor managing large-scale IT, health, and intelligence contracts." },
            { name: "General Dynamics (GDIT)", logo: "img/gdit.png", link: "https://www.gdit.com/careers/", desc: "A 'Big 5' Prime. Major focus on IT services, cyber, and military systems." },
            { name: "Booz Allen Hamilton", logo: "img/booz_allen.png", link: "https://careers.boozallen.com/", desc: "A major Prime focused on consulting, cyber, data science, and analytics." },
            { name: "RTX (Raytheon)", logo: "img/rtx.png", link: "https://careers.rtx.com/", desc: "A 'Big 5' Prime. Specializes in advanced sensors, missiles, and cyber." },
            { name: "CACI", logo: "img/caci.png", link: "https://careers.caci.com/", desc: "A major Prime providing expertise in IT, signals intelligence, and electronic warfare." },
            { name: "SAIC", logo: "img/saic.png", link: "https://www.saic.com/careers", desc: "A major Prime focused on IT modernization, logistics, and systems engineering." }
        ]
    },
    ring3: {
        name: "Level 3: The Specialists",
        companies: [
            { name: "Visionist", logo: "img/visionist.png", link: "https://www.visionistinc.com/careers", desc: "Specialist in data science, analytics, and software engineering for the IC." },
            { name: "Zeta Associates", logo: "img/zeta.png", link: "https://www.lockheedmartinjobs.com/", desc: "A Lockheed Martin company. Elite specialist in SIGINT and geolocation." },
            { name: "NASK", logo: "img/nask.png", link: "https://nask.world/company/", desc: "Specialist in SIGINT, geolocation, and RF engineering for NASIC and the IC." },
            { name: "MesaVita", logo: "img/mesavita.png", link: "https://www.mesavita.com/services", desc: "Small business specialist in data science, cyber, and mission operations." },
            { name: "Praxis Engineering", logo: "img/praxis.png", link: "https://www.gdit.com/careers/", desc: "A GDIT company. Legendary for its high-end cyber and SIGINT engineers." },
            { name: "Enlighten", logo: "img/enlighten.png", link: "https://hii.com/careers/", desc: "An HII company. Specialist in data analytics and rapid software development." },
            { name: "BlueHalo", logo: "img/bluehalo.png", link: "https://bluehalo.com/careers/", desc: "Specialist in space, directed energy, AI, and cyber capabilities." },
            { name: "HawkEye 360", logo: "img/hawkeye_360.png", link: "https://www.he360.com/careers/", desc: "Commercial provider of space-based RF signal data and analytics." },
            { name: "Maxar", logo: "img/maxar.png", link: "https://www.maxar.com/careers", desc: "Commercial provider of high-resolution satellite imagery." },
            { name: "Capella Space", logo: "img/capella_space.png", link: "https://www.capellaspace.com/careers/", desc: "Commercial provider of high-resolution SAR (radar) imagery." },
            { name: "Umbra", logo: "img/umbra.png", link: "https://umbra.space/careers", desc: "Commercial provider of high-resolution SAR (radar) imagery." },
            { name: "BlackSky", logo: "img/blacksky.png", link: "https://www.blacksky.com/careers/", desc: "Commercial provider of real-time satellite imagery and AI analytics." }
        ]
    }
};