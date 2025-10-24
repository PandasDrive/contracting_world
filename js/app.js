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
let simulationRunning = false; // Flag to prevent multiple clicks

// Add event listener to the button
simulateButton.addEventListener('click', runSimulation);

function runSimulation() {
    if (simulationRunning) return; // Don't run if already running
    simulationRunning = true;
    simulationText.style.display = 'none'; // Hide any previous text

    // Get all logo figures within the carousels
    const allFigures = document.querySelectorAll('.logo-carousel figure');

    // Pause all carousel animations and dim logos
    document.querySelectorAll('.logo-carousel').forEach(carousel => {
        carousel.style.animationPlayState = 'paused';
        // Add dimmed class to the figures within THIS carousel
        carousel.querySelectorAll('figure').forEach(fig => fig.classList.add('dimmed'));
    });


    // --- Define the steps of our simulation ---
    const steps = [
        { // Step 1: Zeta wins initially
            text: "<strong>Phase 1:</strong> The NRO awards the 'MIDAS STUDIES' Task Order to <strong>Lockheed Martin (Prime - owner of Zeta)</strong>, who puts <strong>Visionist (Sub)</strong> on their team.",
            highlights: ['NRO', 'Lockheed Martin', 'Visionist'], // Company names (img alt text) to highlight
            duration: 4000 // Show for 4 seconds
        },
        { // Step 2: Re-compete time!
            text: "<strong>5 YEARS LATER:</strong> THE CONTRACT IS UP FOR RE-COMPETE!",
            highlights: [], // No highlights during transition
            duration: 2000
        },
        { // Step 3: Northrop wins
            text: "<strong>Phase 2:</strong> <strong>Northrop Grumman (New Prime)</strong> *wins* the re-compete! The 'MIDAS STUDIES' contract (and all its jobs) now belongs to them. They might bring on <strong>Praxis Engineering (New Sub)</strong>.",
            highlights: ['NRO', 'Northrop Grumman', 'Praxis Engineering'],
            duration: 5000
        },
        { // Step 4: The Job Hop
            text: "<strong>Phase 3:</strong> The <strong>Visionist</strong> employee on 'MIDAS' now has a choice. They will almost certainly get a <a href='contingent_offers.html' class='contingent-link' target='_blank'>[Contingent Offer]</a> from <strong>Northrop Grumman</strong> or <strong>Praxis</strong> to stay on the project. This is the 'job hop'!",
            highlights: ['Visionist', 'Northrop Grumman', 'Praxis Engineering'],
            duration: 7000
        }
    ];

    let currentStep = 0;

    function nextStep() {
        if (currentStep >= steps.length) {
            // Simulation finished, leave it paused and highlighted.
            simulationRunning = false;
            simulateButton.textContent = "Run Simulation Again"; // Change button text
            simulateButton.disabled = false; // Re-enable button
            return;
        }

        simulateButton.disabled = true; // Disable button during simulation
        simulateButton.textContent = "Simulation Running...";

        const step = steps[currentStep];

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


// === DELETE EVERYTHING FROM HERE DOWN ===
// === SIMULATION LOGIC (Keep As Is for now) ===
// ... your existing simulation code ...

// === SIMULATION LOGIC ===

// ... (THE ENTIRE DUPLICATE BLOCK IS REMOVED) ...

//} <<<< Make sure the file ends AFTER the duplicateLogos function's closing brace.