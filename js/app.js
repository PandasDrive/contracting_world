console.log('🚀 Contracting World App.js loaded successfully!');

// === ENHANCED SPLASH SCREEN LOGIC ===
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 DOM loaded, initializing splash screen...');
    
    const splashScreen = document.getElementById('splash-screen');
    const mainContent = document.getElementById('main-content');
    
    console.log('Splash screen element:', splashScreen);
    console.log('Main content element:', mainContent);
    
    // Ensure main content is hidden initially
    if (mainContent) {
        mainContent.style.opacity = '0';
        mainContent.style.display = 'none';
        mainContent.style.visibility = 'hidden';
    }
    
    // Enhanced splash screen sequence
    setTimeout(() => {
        console.log('🎬 Starting splash screen transition...');
        
        if (splashScreen) {
            splashScreen.classList.add('hidden');
            console.log('✅ Splash screen hidden');
        }
        
        // Show main content after splash starts hiding
        setTimeout(() => {
            if (mainContent) {
                mainContent.style.display = 'block';
                mainContent.style.visibility = 'visible';
                mainContent.style.opacity = '1';
                mainContent.classList.add('visible');
                console.log('✅ Main content shown');
            }
        }, 500);
        
        // Remove splash screen from DOM after transition
        setTimeout(() => {
            if (splashScreen && splashScreen.parentNode) {
                splashScreen.parentNode.removeChild(splashScreen);
                console.log('✅ Splash screen removed from DOM');
            }
        }, 2000);
        
    }, 4000); // Show splash for 4 seconds
    
    // Initialize main content after splash
    setTimeout(() => {
        console.log('🔧 Initializing main content...');
        initializeMainContent();
    }, 5000);
});

function initializeMainContent() {
    // Get the carousel containers
    const row1 = document.getElementById('row-1');
    const row2 = document.getElementById('row-2');
    const row3 = document.getElementById('row-3');

    // Check if elements exist and companyData is available
    if (row1 && row2 && row3 && typeof companyData !== 'undefined') {
        buildRow(companyData.ring1.companies, row1);
        buildRow(companyData.ring2.companies, row2);
        buildRow(companyData.ring3.companies, row3);

        duplicateLogos(row1);
        duplicateLogos(row2);
        duplicateLogos(row3);
    } else {
        console.log('Logo carousels not found or companyData missing on this page.');
    }

    // Initialize features
    initCareerQuiz();
    initTooltips();
    initSimulation();
}

// === SIMULATION LOGIC ===
function initSimulation() {
    const simulateButton = document.getElementById('simulate-button');
    const simulationText = document.getElementById('simulation-text');
    const simulationProgress = document.getElementById('simulation-progress');
    
    if (simulateButton && simulationText && simulationProgress) {
        simulateButton.addEventListener('click', runSimulation);
    }
}

let simulationRunning = false;

// Career path recommendations (predefined combinations) - GLOBAL SCOPE
const careerRecommendations = {
    'military-none-cyber': {
        title: '🪖 Military to Cybersecurity Path',
        path: 'Start with entry-level cybersecurity roles at mid-tier primes like CACI or SAIC. Focus on getting Secret clearance first.',
        companies: ['CACI', 'SAIC', 'ManTech'],
        nextSteps: ['Apply for Secret clearance sponsorship', 'Get CompTIA Security+ certification', 'Target SOC analyst roles']
    },
    'military-secret-intelligence': {
        title: '🕵️ Military Intelligence Specialist',
        path: 'Your Secret clearance opens doors at intelligence-focused companies. Consider NSA or NGA contractors.',
        companies: ['NSA', 'NGA', 'Visionist', 'NASK'],
        nextSteps: ['Apply for Top Secret upgrade', 'Consider intelligence analysis roles', 'Look at SIGINT positions']
    },
    'military-ts-space': {
        title: '🚀 Military Space Systems Expert',
        path: 'Your Top Secret clearance and military experience make you ideal for space and missile defense programs.',
        companies: ['Northrop Grumman', 'Lockheed Martin', 'RTX'],
        nextSteps: ['Target space systems contracts', 'Consider missile defense programs', 'Look at satellite operations roles']
    },
    'military-ts-sci-sigint': {
        title: '📡 Elite SIGINT Specialist',
        path: 'Your TS/SCI clearance and military background make you perfect for the most sensitive intelligence work.',
        companies: ['NSA', 'Zeta Associates', 'Praxis Engineering'],
        nextSteps: ['Apply for NSA contractor positions', 'Consider SIGINT analysis roles', 'Look at geolocation specialist positions']
    },
    'civilian-none-it': {
        title: '💻 Civilian IT Professional',
        path: 'Start with IT support roles at large primes. Your civilian experience is valuable for customer-facing positions.',
        companies: ['Leidos', 'General Dynamics', 'Booz Allen'],
        nextSteps: ['Get Secret clearance sponsorship', 'Consider IT modernization contracts', 'Build government contracting experience']
    },
    'civilian-secret-cloud': {
        title: '☁️ Cloud Computing Specialist',
        path: 'Your Secret clearance and civilian cloud experience are in high demand for government cloud migration projects.',
        companies: ['Amazon Web Services', 'Microsoft Azure', 'Google Cloud'],
        nextSteps: ['Get cloud certifications (AWS, Azure)', 'Target cloud migration contracts', 'Consider hybrid cloud roles']
    },
    'civilian-ts-ai': {
        title: '🤖 AI/ML Data Scientist',
        path: 'Your Top Secret clearance opens doors to cutting-edge AI projects in the intelligence community.',
        companies: ['Booz Allen Hamilton', 'CACI', 'ManTech'],
        nextSteps: ['Get AI/ML certifications', 'Build portfolio with classified projects', 'Consider data science roles at IC agencies']
    },
    'recent-grad-none-data': {
        title: '📊 Recent Graduate Data Scientist',
        path: 'Start with data analysis roles at mid-tier primes. Your fresh skills are valuable for modern data projects.',
        companies: ['CACI', 'SAIC', 'ManTech'],
        nextSteps: ['Get Secret clearance sponsorship', 'Build data science portfolio', 'Consider analytics roles']
    },
    'recent-grad-secret-engineering': {
        title: '⚙️ Entry-Level Engineer',
        path: 'Your Secret clearance and engineering degree make you attractive to defense contractors.',
        companies: ['Lockheed Martin', 'Northrop Grumman', 'RTX'],
        nextSteps: ['Apply for engineering rotational programs', 'Get relevant certifications', 'Consider systems engineering roles']
    },
    'recent-grad-ts-cyber': {
        title: '🛡️ Cybersecurity Engineer',
        path: 'Your Top Secret clearance and cybersecurity focus make you ideal for high-security roles.',
        companies: ['NSA', 'NGA', 'Visionist'],
        nextSteps: ['Get cybersecurity certifications', 'Apply for NSA contractor positions', 'Consider threat analysis roles']
    },
    'career-change-none-it': {
        title: '🔄 Career Changer to IT',
        path: 'Your previous experience brings valuable perspective to government IT projects.',
        companies: ['Leidos', 'General Dynamics', 'Booz Allen'],
        nextSteps: ['Get IT certifications', 'Apply for Secret clearance sponsorship', 'Leverage transferable skills']
    },
    'career-change-secret-management': {
        title: '👔 Program Management Track',
        path: 'Your Secret clearance and management experience make you ideal for program management roles.',
        companies: ['Booz Allen Hamilton', 'CACI', 'SAIC'],
        nextSteps: ['Get PMP certification', 'Consider program management roles', 'Look at contract management positions']
    },
    'career-change-ts-consulting': {
        title: '💼 Senior Consultant',
        path: 'Your Top Secret clearance and extensive experience make you valuable for senior consulting roles.',
        companies: ['Booz Allen Hamilton', 'Deloitte', 'Accenture Federal'],
        nextSteps: ['Target senior consultant positions', 'Consider management consulting', 'Look at strategic advisory roles']
    }
};

function runSimulation() {
    if (simulationRunning) return; // Don't run if already running
    simulationRunning = true;
    simulationText.style.display = 'none'; // Hide any previous text
    
    // Initialize progress bar
    simulationProgress.innerHTML = '<div class="simulation-progress-bar"></div>';
    simulationProgress.classList.add('active');

    // Get all logo figures within the carousels
    const allFigures = document.querySelectorAll('.logo-carousel figure');

    // Pause all carousel animations and dim logos
    document.querySelectorAll('.logo-carousel').forEach(carousel => {
        carousel.style.animationPlayState = 'paused';
        // Add dimmed class to the figures within THIS carousel
        carousel.querySelectorAll('figure').forEach(fig => fig.classList.add('dimmed'));
    });


    // --- Define the steps of our enhanced simulation ---
    const steps = [
        { // Step 1: Initial Contract Award
            text: "<strong>Phase 1 - Contract Award (Year 0):</strong> The NRO releases an RFP for 'MIDAS STUDIES' intelligence analysis. <strong>Lockheed Martin</strong> wins the contract and brings <strong>Visionist</strong> as their subcontractor.",
            highlights: ['NRO', 'Lockheed Martin', 'Visionist'],
            duration: 4000
        },
        { // Step 2: Contract Execution
            text: "<strong>Phase 2 - Contract Execution (Years 1-4):</strong> The team works successfully on MIDAS. <strong>Visionist</strong> employees build expertise and relationships with the NRO customer. Everything runs smoothly.",
            highlights: ['NRO', 'Lockheed Martin', 'Visionist'],
            duration: 3000
        },
        { // Step 3: Re-compete Announcement
            text: "<strong>Phase 3 - Re-compete Announcement (Year 5):</strong> The NRO announces MIDAS is up for re-compete! <strong>Lockheed Martin</strong> must compete to keep the work. Other primes like <strong>Northrop Grumman</strong> start building their teams.",
            highlights: ['NRO', 'Lockheed Martin', 'Northrop Grumman'],
            duration: 4000
        },
        { // Step 4: Proposal Phase
            text: "<strong>Phase 4 - Proposal Phase:</strong> Companies spend months writing proposals. <strong>Northrop Grumman</strong> recruits <strong>Praxis Engineering</strong> to their team. They promise better technology and lower costs.",
            highlights: ['Northrop Grumman', 'Praxis Engineering'],
            duration: 3000
        },
        { // Step 5: Contract Award Decision
            text: "<strong>Phase 5 - Contract Award (6 months later):</strong> <strong>Northrop Grumman</strong> wins the re-compete! The MIDAS contract (and all its jobs) now belongs to them. <strong>Lockheed Martin</strong> loses the work.",
            highlights: ['NRO', 'Northrop Grumman', 'Lockheed Martin'],
            duration: 4000
        },
        { // Step 6: Contingent Offers
            text: "<strong>Phase 6 - Contingent Offers:</strong> <strong>Northrop Grumman</strong> needs 50 people to do the same work. They give <strong>contingent offers</strong> to all current <strong>Visionist</strong> employees: 'You have the job IF you come work for us.'",
            highlights: ['Northrop Grumman', 'Visionist'],
            duration: 4000
        },
        { // Step 7: The Job Hop
            text: "<strong>Phase 7 - The Job Hop:</strong> <strong>Visionist</strong> employees face a choice: stay with <strong>Lockheed Martin</strong> (and lose their MIDAS job) or accept <strong>Northrop's</strong> offer and keep working on the same project. Most choose to hop!",
            highlights: ['Visionist', 'Northrop Grumman', 'Lockheed Martin'],
            duration: 5000
        },
        { // Step 8: New Team Formation
            text: "<strong>Phase 8 - New Team Formation:</strong> The <strong>Northrop Grumman</strong> team (with former <strong>Visionist</strong> employees) takes over MIDAS. They work at the same desks, for the same customer, but now work for a different company. The cycle continues...",
            highlights: ['Northrop Grumman', 'Visionist', 'NRO'],
            duration: 5000
        }
    ];

    let currentStep = 0;

    function nextStep() {
        if (currentStep >= steps.length) {
            // Simulation finished, leave it paused and highlighted.
            simulationRunning = false;
            simulateButton.textContent = "Run Simulation Again"; // Change button text
            simulateButton.disabled = false; // Re-enable button
            simulationProgress.classList.remove('active'); // Hide progress bar
            return;
        }

        simulateButton.disabled = true; // Disable button during simulation
        simulateButton.textContent = `Simulation Running... Phase ${currentStep + 1}/${steps.length}`;

        const step = steps[currentStep];

        // Update progress bar
        const progressBar = simulationProgress.querySelector('.simulation-progress-bar');
        const progressPercent = ((currentStep + 1) / steps.length) * 100;
        progressBar.style.width = progressPercent + '%';

        // Update text
        simulationText.innerHTML = step.text;
        simulationText.style.display = 'block';

        // Update highlights - Target specifically within carousels
        allFigures.forEach(fig => {
            const imgAlt = fig.querySelector('img').alt;
            // Check if this figure's alt text is in the current step's highlight list
            if (step.highlights.includes(imgAlt)) {
                fig.classList.add('highlighted');
                fig.classList.remove('dimmed');
            } else {
                fig.classList.remove('highlighted');
                fig.classList.add('dimmed'); // Ensure others stay dimmed or become dimmed
            }
        });

        currentStep++;
        // Use setTimeout to wait before proceeding to the next step
        setTimeout(nextStep, step.duration);
    }

    // Reset highlights/dimming before starting a new simulation run
    allFigures.forEach(fig => {
        fig.classList.remove('highlighted');
        fig.classList.remove('dimmed'); // Start fresh
    });

    // Reset progress
    currentStep = 0;
    const progressBar = simulationProgress.querySelector('.simulation-progress-bar');
    if (progressBar) {
        progressBar.style.width = '0%';
    }

    // Start the simulation sequence
    nextStep();
} // <<<< END OF FIRST runSimulation function


/** // <<<< KEEP buildRow function
 * Builds a single row of companies.
 * @param {Array} companies - The array of company objects from data.js
 * @param {HTMLElement} rowElement - The .logo-carousel <div> element
 */
function buildRow(companies, rowElement) {
    companies.forEach((company) => {
        const figure = document.createElement('figure');
        const link = document.createElement('a');
        const img = document.createElement('img');
        const figcaption = document.createElement('figcaption');

        link.href = company.link;
        link.target = "_blank";
        img.src = company.logo;
        img.alt = company.name;
        // Enhanced description with additional info
        let enhancedDesc = company.desc;
        if (company.salaryRange) {
            enhancedDesc += ` Salary: ${company.salaryRange}`;
        }
        if (company.clearancejobs) {
            enhancedDesc += ` | <a href="${company.clearancejobs}" target="_blank" style="color: #4ddbff;">View Jobs on ClearanceJobs</a>`;
        }
        figcaption.innerHTML = enhancedDesc;

        // Add company indicators if metadata exists
        if (company.size || company.clearance) {
            const indicator = document.createElement('div');
            indicator.className = 'company-indicator';
            
            let indicatorText = '';
            let tooltipText = '';
            
            if (company.size) {
                const sizeLabels = {
                    'government': '🏛️ GOV',
                    'large': '🏢 BIG5',
                    'medium': '🏬 MID',
                    'small': '🏪 SMB'
                };
                const sizeTooltips = {
                    'government': 'Government Agency',
                    'large': 'Big 5 Prime Contractor',
                    'medium': 'Mid-Tier Prime Contractor',
                    'small': 'Small Business Specialist'
                };
                indicatorText += sizeLabels[company.size] || '';
                tooltipText += sizeTooltips[company.size] || '';
            }
            
            if (company.clearance) {
                const clearanceLabels = {
                    'secret': '🟢 S',
                    'ts': '🟡 TS',
                    'ts-sci': '🔴 TS/SCI'
                };
                const clearanceTooltips = {
                    'secret': 'Secret Clearance Required',
                    'ts': 'Top Secret Clearance Required',
                    'ts-sci': 'TS/SCI Clearance Required'
                };
                if (indicatorText) indicatorText += ' ';
                indicatorText += clearanceLabels[company.clearance] || '';
                if (tooltipText) tooltipText += ' • ';
                tooltipText += clearanceTooltips[company.clearance] || '';
            }
            
            indicator.textContent = indicatorText;
            indicator.title = tooltipText; // Add tooltip
            figure.appendChild(indicator);
        }

        link.appendChild(img);
        figure.appendChild(link);
        figure.appendChild(figcaption);
        rowElement.appendChild(figure);
    });
}


/** // <<<< KEEP duplicateLogos function
 * Duplicates all figure elements within a carousel for seamless scrolling.
 * @param {HTMLElement} carouselElement - The .logo-carousel element.
 */
function duplicateLogos(carouselElement) {
    const figures = carouselElement.querySelectorAll('figure');
    figures.forEach(figure => {
        const clone = figure.cloneNode(true); // Deep clone
        carouselElement.appendChild(clone);
    });
}
// --- End of new function ---

// === CAREER PATH QUIZ FUNCTIONALITY ===

let quizData = {
    background: null,
    clearance: null,
    interest: null
};

// Dynamic recommendation generator
function generateDynamicRecommendation(background, clearance, interest) {
    console.log('Generating recommendation for:', { background, clearance, interest });
    
    // Check if careerRecommendations is available
    if (typeof careerRecommendations === 'undefined') {
        console.log('careerRecommendations not available, using dynamic generation only');
        return {
            title: generateTitle(background, clearance, interest),
            path: generatePath(background, clearance, interest),
            companies: generateCompanies(background, clearance, interest),
            nextSteps: generateNextSteps(background, clearance, interest)
        };
    }
    
    // Check if we have a predefined recommendation first
    const key = `${background}-${clearance}-${interest}`;
    const baseRecommendation = careerRecommendations[key];
    
    if (baseRecommendation) {
        console.log('Using predefined recommendation:', key);
        return baseRecommendation;
    }
    
    console.log('Generating dynamic recommendation for:', key);
    
    // Generate dynamic recommendation based on combinations
    const recommendations = {
        title: generateTitle(background, clearance, interest),
        path: generatePath(background, clearance, interest),
        companies: generateCompanies(background, clearance, interest),
        nextSteps: generateNextSteps(background, clearance, interest)
    };
    
    console.log('Generated recommendation:', recommendations);
    return recommendations;
}

function generateTitle(background, clearance, interest) {
    const titles = {
        'military': {
            'none': '🪖 Military Veteran Entry Path',
            'secret': '🕵️ Cleared Military Professional',
            'ts': '🚀 Senior Military Specialist',
            'ts-sci': '📡 Elite Military Intelligence'
        },
        'civilian': {
            'none': '💼 Civilian Professional Track',
            'secret': '🔒 Cleared Civilian Expert',
            'ts': '🎯 Senior Civilian Specialist',
            'ts-sci': '🔐 Elite Civilian Intelligence'
        },
        'recent-grad': {
            'none': '🎓 Recent Graduate Program',
            'secret': '🆕 Cleared Graduate Track',
            'ts': '⭐ Advanced Graduate Path',
            'ts-sci': '🌟 Elite Graduate Program'
        },
        'career-change': {
            'none': '🔄 Career Transition Track',
            'secret': '🔑 Cleared Career Changer',
            'ts': '🎯 Senior Career Transition',
            'ts-sci': '🔐 Elite Career Transition'
        }
    };
    
    return titles[background]?.[clearance] || '🎯 Custom Career Path';
}

function generatePath(background, clearance, interest) {
    const paths = {
        'military': 'Your military experience provides excellent foundation for government contracting. ',
        'civilian': 'Your civilian experience brings valuable perspective to government projects. ',
        'recent-grad': 'Your fresh skills and education make you attractive to contractors. ',
        'career-change': 'Your diverse experience provides unique value to government contractors. '
    };
    
    const clearancePaths = {
        'none': 'Start by getting Secret clearance sponsorship from a contractor. ',
        'secret': 'Your Secret clearance opens many opportunities. ',
        'ts': 'Your Top Secret clearance provides access to high-value contracts. ',
        'ts-sci': 'Your TS/SCI clearance gives you access to the most sensitive work. '
    };
    
    const interestPaths = {
        'cyber': 'Focus on cybersecurity roles with growing demand.',
        'intelligence': 'Target intelligence analysis and SIGINT positions.',
        'engineering': 'Consider systems engineering and technical roles.',
        'it': 'Look at IT modernization and cloud migration projects.',
        'space': 'Target space systems and satellite operations.',
        'data': 'Focus on data science and analytics positions.'
    };
    
    return (paths[background] || '') + (clearancePaths[clearance] || '') + (interestPaths[interest] || '');
}

function generateCompanies(background, clearance, interest) {
    const companyPools = {
        'military': {
            'none': ['CACI', 'SAIC', 'ManTech', 'Parsons'],
            'secret': ['CACI', 'SAIC', 'ManTech', 'Peraton'],
            'ts': ['Lockheed Martin', 'Northrop Grumman', 'RTX', 'Leidos'],
            'ts-sci': ['NSA', 'NGA', 'Visionist', 'Zeta Associates']
        },
        'civilian': {
            'none': ['Leidos', 'General Dynamics', 'Booz Allen'],
            'secret': ['Booz Allen Hamilton', 'CACI', 'SAIC'],
            'ts': ['Lockheed Martin', 'Northrop Grumman', 'RTX'],
            'ts-sci': ['NSA', 'NGA', 'Praxis Engineering']
        },
        'recent-grad': {
            'none': ['CACI', 'SAIC', 'ManTech'],
            'secret': ['Lockheed Martin', 'Northrop Grumman', 'RTX'],
            'ts': ['NSA', 'NGA', 'Visionist'],
            'ts-sci': ['NSA', 'Zeta Associates', 'Praxis Engineering']
        },
        'career-change': {
            'none': ['Leidos', 'General Dynamics', 'Booz Allen'],
            'secret': ['Booz Allen Hamilton', 'CACI', 'SAIC'],
            'ts': ['Lockheed Martin', 'Northrop Grumman', 'RTX'],
            'ts-sci': ['NSA', 'NGA', 'Praxis Engineering']
        }
    };
    
    const companies = companyPools[background]?.[clearance] || ['CACI', 'SAIC', 'ManTech'];
    return companies.slice(0, 3); // Return top 3
}

function generateNextSteps(background, clearance, interest) {
    const steps = [];
    
    // Clearance-based steps
    if (clearance === 'none') {
        steps.push('Apply for Secret clearance sponsorship');
    } else if (clearance === 'secret') {
        steps.push('Consider upgrading to Top Secret clearance');
    } else if (clearance === 'ts') {
        steps.push('Consider TS/SCI upgrade for intelligence work');
    }
    
    // Interest-based steps
    const interestSteps = {
        'cyber': ['Get cybersecurity certifications (Security+, CISSP)', 'Build cybersecurity portfolio', 'Target SOC analyst roles'],
        'intelligence': ['Apply for intelligence analysis roles', 'Consider SIGINT positions', 'Look at threat analysis'],
        'engineering': ['Get relevant engineering certifications', 'Consider systems engineering roles', 'Target technical positions'],
        'it': ['Get IT certifications (CompTIA, Microsoft)', 'Consider cloud migration projects', 'Target IT modernization'],
        'space': ['Target space systems contracts', 'Consider satellite operations', 'Look at missile defense programs'],
        'data': ['Get data science certifications', 'Build analytics portfolio', 'Consider data engineering roles']
    };
    
    steps.push(...(interestSteps[interest] || ['Build relevant skills', 'Get industry certifications', 'Target entry-level positions']));
    
    return steps.slice(0, 3); // Return top 3 steps
}

let currentStep = 1;

// Initialize career quiz
function initCareerQuiz() {
    console.log('🎯 Initializing career quiz...');
    const quizOptions = document.querySelectorAll('.quiz-option');
    const restartBtn = document.getElementById('restart-quiz');
    
    console.log('Found quiz options:', quizOptions.length);
    console.log('Found restart button:', restartBtn);
    
    quizOptions.forEach(option => {
        option.addEventListener('click', handleQuizSelection);
    });
    
    if (restartBtn) {
        restartBtn.addEventListener('click', restartQuiz);
    }
}

function handleQuizSelection(event) {
    const option = event.target;
    const step = option.closest('.quiz-step');
    const stepId = step.id;
    
    // Remove previous selections in this step
    step.querySelectorAll('.quiz-option').forEach(opt => opt.classList.remove('selected'));
    option.classList.add('selected');
    
    // Store the selection
    if (stepId === 'step-1') {
        quizData.background = option.dataset.background;
    } else if (stepId === 'step-2') {
        quizData.clearance = option.dataset.clearance;
    } else if (stepId === 'step-3') {
        quizData.interest = option.dataset.interest;
    }
    
    // Move to next step
    setTimeout(() => {
        nextQuizStep();
    }, 500);
}

function nextQuizStep() {
    const currentStepElement = document.querySelector('.quiz-step.active');
    currentStepElement.classList.remove('active');
    
    if (currentStep < 3) {
        currentStep++;
        const nextStepElement = document.getElementById(`step-${currentStep}`);
        nextStepElement.classList.add('active');
    } else {
        showResults();
    }
}

function showResults() {
    const resultsElement = document.getElementById('results');
    const recommendationElement = document.getElementById('career-recommendation');
    
    console.log('Quiz data:', quizData);
    
    // Use dynamic recommendation generator
    const recommendation = generateDynamicRecommendation(quizData.background, quizData.clearance, quizData.interest);
    
    console.log('Final recommendation:', recommendation);
    
    // Display results
    recommendationElement.innerHTML = `
        <h4 style="color: #4ddbff; margin-bottom: 15px;">${recommendation.title}</h4>
        <p style="margin-bottom: 15px; line-height: 1.6;">${recommendation.path}</p>
        <div style="margin-bottom: 15px;">
            <strong style="color: #4ddbff;">Recommended Companies:</strong>
            <p style="margin-top: 5px;">${recommendation.companies.join(', ')}</p>
        </div>
        <div>
            <strong style="color: #4ddbff;">Next Steps:</strong>
            <ul style="margin-top: 5px; padding-left: 20px;">
                ${recommendation.nextSteps.map(step => `<li>${step}</li>`).join('')}
            </ul>
        </div>
    `;
    
    resultsElement.classList.add('active');
}

function getDefaultRecommendation() {
    return {
        title: '🎯 General Contracting Path',
        path: 'Based on your background, focus on getting security clearance first, then target companies that match your interests.',
        companies: ['Leidos', 'CACI', 'SAIC'],
        nextSteps: ['Get security clearance sponsorship', 'Research specific companies', 'Build relevant skills']
    };
}

function restartQuiz() {
    currentStep = 1;
    quizData = { background: null, clearance: null, interest: null };
    
    // Reset all steps
    document.querySelectorAll('.quiz-step').forEach(step => {
        step.classList.remove('active');
        step.querySelectorAll('.quiz-option').forEach(opt => opt.classList.remove('selected'));
    });
    
    document.getElementById('results').classList.remove('active');
    document.getElementById('step-1').classList.add('active');
}

// === TOOLTIP FUNCTIONALITY ===

function initTooltips() {
    const tooltipTriggers = document.querySelectorAll('.tooltip-trigger');
    
    tooltipTriggers.forEach(trigger => {
        const tooltipText = trigger.dataset.tooltip;
        if (tooltipText) {
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip';
            tooltip.textContent = tooltipText;
            trigger.appendChild(tooltip);
            
            // Add hover event listeners for better positioning
            trigger.addEventListener('mouseenter', function() {
                const rect = trigger.getBoundingClientRect();
                const tooltipRect = tooltip.getBoundingClientRect();
                
                // Check if tooltip would go off the top of the screen
                if (rect.top - tooltipRect.height < 0) {
                    tooltip.style.bottom = 'auto';
                    tooltip.style.top = '100%';
                    tooltip.style.marginBottom = '0';
                    tooltip.style.marginTop = '8px';
                } else {
                    tooltip.style.bottom = '100%';
                    tooltip.style.top = 'auto';
                    tooltip.style.marginBottom = '8px';
                    tooltip.style.marginTop = '0';
                }
                
                // Check if tooltip would go off the left side
                if (rect.left + (tooltipRect.width / 2) < 0) {
                    tooltip.style.left = '0';
                    tooltip.style.transform = 'none';
                } else if (rect.right - (tooltipRect.width / 2) > window.innerWidth) {
                    tooltip.style.left = 'auto';
                    tooltip.style.right = '0';
                    tooltip.style.transform = 'none';
                } else {
                    tooltip.style.left = '50%';
                    tooltip.style.right = 'auto';
                    tooltip.style.transform = 'translateX(-50%)';
                }
            });
        }
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Existing initialization code
    const row1 = document.getElementById('row-1');
    const row2 = document.getElementById('row-2');
    const row3 = document.getElementById('row-3');

    buildRow(companyData.ring1.companies, row1);
    buildRow(companyData.ring2.companies, row2);
    buildRow(companyData.ring3.companies, row3);

    duplicateLogos(row1);
    duplicateLogos(row2);
    duplicateLogos(row3);
    
    // Initialize new features
    initCareerQuiz();
    initTooltips();
});