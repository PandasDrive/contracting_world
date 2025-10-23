// Wait for the entire webpage (DOM) to finish loading
document.addEventListener('DOMContentLoaded', () => {

    // Get the ring containers from the HTML
    const ring1 = document.getElementById('ring-1');
    const ring2 = document.getElementById('ring-2');
    const ring3 = document.getElementById('ring-3');

    // Call our function to build the rings
    buildRing(companyData.ring1.companies, ring1, 150); // Ring 1, 150px radius
    buildRing(companyData.ring2.companies, ring2, 250); // Ring 2, 250px radius
    buildRing(companyData.ring3.companies, ring3, 350); // Ring 3, 350px radius

});

/**
 * Builds a single ring of companies.
 * @param {Array} companies - The array of company objects from data.js
 * @param {HTMLElement} ringElement - The ring <div> element
 * @param {number} radius - The Z-axis radius of the ring in pixels
 */
function buildRing(companies, ringElement, radius) {
    const numCompanies = companies.length;
    // Calculate the angle between each company in the circle
    const angleStep = 360 / numCompanies;

    companies.forEach((company, index) => {
        // 1. Create all the HTML elements
        const figure = document.createElement('figure');
        const link = document.createElement('a');
        const img = document.createElement('img');
        const figcaption = document.createElement('figcaption');

        // 2. Set their attributes and content
        link.href = company.link;
        link.target = "_blank"; // Open link in new tab

        img.src = company.logo;
        img.alt = company.name;

        figcaption.textContent = company.desc; // Use the full description for the tooltip
        
        // 3. This is the magic! Calculate the 3D position
        // This replaces the "style='--i: 1'" from our old HTML
        const rotationY = angleStep * index;
        figure.style.transform = `rotateY(${rotationY}deg) translateZ(${radius}px)`;

        // 4. Assemble the elements and add to the ring
        link.appendChild(img);
        figure.appendChild(link);
        figure.appendChild(figcaption);
        ringElement.appendChild(figure);
    });
}