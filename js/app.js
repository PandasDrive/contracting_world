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
    // For each row, clone all its logos and append them again
    // This makes the scroll animation appear infinite
    duplicateLogos(row1);
    duplicateLogos(row2);
    duplicateLogos(row3);
    // --- End of duplication ---

});

/**
 * Builds a single row of companies.
 * @param {Array} companies - The array of company objects from data.js
 * @param {HTMLElement} rowElement - The .logo-carousel <div> element
 */
function buildRow(companies, rowElement) { // Renamed from buildRing, removed radius
    companies.forEach((company) => { // Removed index, angleStep
        // 1. Create all the HTML elements (same as before)
        const figure = document.createElement('figure');
        const link = document.createElement('a');
        const img = document.createElement('img');
        const figcaption = document.createElement('figcaption');

        // 2. Set their attributes and content (same as before)
        link.href = company.link;
        link.target = "_blank"; 

        img.src = company.logo;
        img.alt = company.name;

        figcaption.textContent = company.desc; 

        // 3. REMOVED 3D transform calculation

        // 4. Assemble the elements and add to the row (same as before)
        link.appendChild(img);
        figure.appendChild(link);
        figure.appendChild(figcaption);
        rowElement.appendChild(figure);
    });
}

// --- ADD THIS NEW FUNCTION for duplicating logos ---
/**
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

// === SIMULATION LOGIC (Keep As Is for now) === 
// ... your existing simulation code ...
// NOTE: The highlight/dimming will target '.logo-carousel figure' now
//       We might need to adjust the selectors inside runSimulation later if needed.

// === SIMULATION LOGIC ===

// Get the button and text popup elements
const simulateButton = document.getElementById('simulate-button');
const simulationText = document.getElementById('simulation-text');
let simulationRunning = false; // Flag to prevent multiple clicks

// Add event listener to the button
simulateButton.addEventListener('click', runSimulation);

function runSimulation() {
    if (simulationRunning) return; // Don't run if already running
    simulationRunning = true;
    simulationText.style.display = 'none'; // Hide any previous text

    // Get all logo figures
    const allFigures = document.querySelectorAll('.ring figure');
    allFigures.forEach(fig => fig.classList.add('dimmed')); // Dim all logos initially

    // --- Define the steps of our simulation ---
    const steps = [
        { // Step 1: Zeta wins initially
            text: "<strong>Phase 1:</strong> The NRO awards the 'MIDAS STUDIES' Task Order to <strong>Zeta/Lockheed (Prime)</strong>, who puts <strong>Visionist (Sub)</strong> on their team.",
            highlights: ['NRO', 'Lockheed Martin', 'Visionist'], // Company names to highlight
            duration: 4000 // Show for 4 seconds
        },
        { // Step 2: Re-compete time!
            text: "<strong>5 YEARS LATER:</strong> THE CONTRACT IS UP FOR RE-COMPETE!",
            highlights: [], // No highlights during transition
            duration: 2000 
        },
        { // Step 3: Northrop wins
            text: "<strong>Phase 2:</strong> <strong>Northrop Grumman (New Prime)</strong> *wins* the re-compete! The 'MIDAS STUDIES' contract (and all its jobs) now belongs to them. They might bring on <strong>Praxis (New Sub)</strong>.",
            highlights: ['NRO', 'Northrop Grumman', 'Praxis Engineering'],
            duration: 5000
        },
        { // Step 4: The Job Hop
            text: "<strong>Phase 3:</strong> The <strong>Visionist</strong> employee on 'MIDAS' now has a choice. They will almost certainly get a <a href='contingent_offers.html' class='contingent-link'>[Contingent Offer]</a> from <strong>Northrop Grumman</strong> or <strong>Praxis</strong> to stay on the project. This is the 'job hop'!",
            highlights: ['Visionist', 'Northrop Grumman', 'Praxis Engineering'],
            duration: 7000 
        }
    ];

    let currentStep = 0;

    function nextStep() {
        if (currentStep >= steps.length) {
            // Simulation finished, reset everything
            allFigures.forEach(fig => {
                fig.classList.remove('highlighted');
                fig.classList.remove('dimmed');
            });
            simulationText.style.display = 'none';
             // Stop the spinning
            document.querySelectorAll('.ring').forEach(ring => ring.style.animationPlayState = 'paused');
            simulationRunning = false;
            return;
        }

        const step = steps[currentStep];

        // Update text
        simulationText.innerHTML = step.text;
        simulationText.style.display = 'block';

        // Stop the spinning
        document.querySelectorAll('.ring').forEach(ring => ring.style.animationPlayState = 'paused');


        // Update highlights
        allFigures.forEach(fig => {
            const imgAlt = fig.querySelector('img').alt;
            if (step.highlights.includes(imgAlt)) {
                fig.classList.add('highlighted');
                fig.classList.remove('dimmed');
            } else {
                fig.classList.remove('highlighted');
                fig.classList.add('dimmed'); // Ensure others are dimmed
            }
        });

        currentStep++;
        setTimeout(nextStep, step.duration); // Wait before showing the next step
    }

    // Start the simulation
    nextStep();
}
