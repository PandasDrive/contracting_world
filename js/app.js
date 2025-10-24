document.addEventListener('DOMContentLoaded', () => {
    // Get the NEW carousel containers from the HTML
    const row1 = document.getElementById('row-1');
    const row2 = document.getElementById('row-2');
    const row3 = document.getElementById('row-3');

    // Call our function to build the rows - REMOVED radius parameter
    buildRow(companyData.ring1.companies, row1);
    buildRow(companyData.ring2.companies, row2);
    buildRow(companyData.ring3.companies, row3);

    // --- IMPORTANT: Duplicate logos for seamless scroll ---
    duplicateLogos(row1);
    duplicateLogos(row2);
    duplicateLogos(row3);
    // --- End of duplication ---

});

// === SIMULATION LOGIC === // <<<< KEEP THIS FIRST BLOCK

// Get the button and text popup elements
const simulateButton = document.getElementById('simulate-button');
const simulationText = document.getElementById('simulation-text');
const simulationProgress = document.getElementById('simulation-progress');
let simulationRunning = false; // Flag to prevent multiple clicks

// Add event listener to the button
simulateButton.addEventListener('click', runSimulation);

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
        figcaption.textContent = company.desc;

        // Add company indicators if metadata exists
        if (company.size || company.clearance) {
            const indicator = document.createElement('div');
            indicator.className = 'company-indicator';
            
            let indicatorText = '';
            if (company.size) {
                const sizeLabels = {
                    'government': '🏛️',
                    'large': '🏢',
                    'medium': '🏬',
                    'small': '🏪'
                };
                indicatorText += sizeLabels[company.size] || '';
            }
            if (company.clearance) {
                const clearanceLabels = {
                    'secret': '🟢',
                    'ts': '🟡',
                    'ts-sci': '🔴'
                };
                indicatorText += clearanceLabels[company.clearance] || '';
            }
            
            indicator.textContent = indicatorText;
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

let currentStep = 1;

// Career path recommendations
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
    'civilian-none-it': {
        title: '💻 Civilian IT Professional',
        path: 'Start with IT support roles at large primes. Your civilian experience is valuable for customer-facing positions.',
        companies: ['Leidos', 'General Dynamics', 'Booz Allen'],
        nextSteps: ['Get Secret clearance sponsorship', 'Consider IT modernization contracts', 'Build government contracting experience']
    },
    'recent-grad-none-data': {
        title: '📊 Recent Graduate Data Scientist',
        path: 'Your fresh skills are perfect for data analytics roles. Start with companies that value new talent.',
        companies: ['Enlighten', 'MesaVita', 'Praxis Engineering'],
        nextSteps: ['Get Secret clearance sponsorship', 'Focus on data science certifications', 'Apply to small business specialists']
    },
    'career-change-none-space': {
        title: '🛰️ Career Changer to Space',
        path: 'Space contracting is growing rapidly. Your diverse background is an asset for interdisciplinary roles.',
        companies: ['Maxar', 'Capella Space', 'Umbra', 'BlackSky'],
        nextSteps: ['Get Secret clearance sponsorship', 'Learn space systems basics', 'Consider commercial space companies']
    }
};

// Initialize career quiz
function initCareerQuiz() {
    const quizOptions = document.querySelectorAll('.quiz-option');
    const restartBtn = document.getElementById('restart-quiz');
    
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
    
    // Generate recommendation key
    const key = `${quizData.background}-${quizData.clearance}-${quizData.interest}`;
    const recommendation = careerRecommendations[key] || getDefaultRecommendation();
    
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