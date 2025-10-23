Project: The Contracting Ecosystem Explorer
Status: Planning / Pre-development

1. Core Concept: The "Three-Level Model of Volatility"
This project is a visual, interactive guide to understanding the complex world of cleared government contracting. Its goal is to be a fun, informative tool that explains the "three-level" contracting model (Customer, Prime, Sub) and why the market is so volatile and defined by "job hopping."

The central theme is that a contractor's employment is tied to a specific Task Order (Level 2), not just the company they work for (Level 3). When that Task Order is "re-competed," the winning and losing companies cause a wave of Contingent Offers, forcing employees to "hop" to a new company to keep the same job.

2. Project Structure (File Layout)
This is the file and folder structure we will build.

contracting-explorer/
│
├── README.md               (You are here!)
├── index.html              (Main page with the 3D rings)
├── contingent_offers.html  (The "explainer" page)
│
├── css/
│   └── style.css           (All styles for the rings, tooltips, etc.)
│
├── js/
│   ├── data.js             (Our list of companies, logos, and links)
│   └── app.js              (The code to build the rings and run the simulation)
│
└── img/                    (Folder for all the company logos)
    ├── nsa.png
    ├── leidos.png
    ├── visionist.png
    ├── lockheed_martin.png
    ├── hawkeye_360.png
    └── (etc...)
3. Development Roadmap
We'll build this in three phases to make it manageable.

Phase 1: The Minimum Viable Product (MVP) - The Visual
Goal: Get the 3D rings spinning with static, hard-coded content.

HTML: Create the index.html file with the basic structure (<header>, <body>, <div> for each of the three rings).

HTML: Create the contingent_offers.html page with its text content and a "Back" button.

CSS: Focus entirely on the style.css file. Using the tutorial you found, get one ring spinning with 5-6 manually added images from the img/ folder.

CSS: Once one ring works, copy and adapt the CSS for Ring 2 and Ring 3.

CSS: Add the "on-hover" tooltip CSS effect for the images.

LINK: Connect the index.html and contingent_offers.html pages with a simple link.

At the end of Phase 1, we will have a beautiful, spinning 3D site, but it won't be "smart."

Phase 2: Dynamic Data
Goal: Load all our companies from our data.js file instead of hard-coding them in the HTML.

DATA: Create js/data.js. Copy and paste our complete company list (from our conversation) into this file as a JavaScript variable (e.g., const companyData = [...]).

JS: Create js/app.js.

JS: Write a "main" function in app.js that runs when the page loads. This function will:

Read the companyData from data.js.

Loop through each ring's data.

For each company, dynamically create the HTML elements (<div>, <img>, <p>).

Append these new elements into the correct ring <div> in index.html.

At the end of Phase 2, the website will be complete. All 20+ companies will be spinning in their correct rings, all with their proper links and descriptions.

Phase 3: The "Re-Compete" Simulation
Goal: Make the site interactive by adding the simulation.

HTML: Add the "Simulate a Contract Re-Compete" button to index.html.

JS: In app.js, write a new function that runs when the "Simulate" button is clicked.

JS/CSS: This function will:

Stop the CSS spinning animation (element.style.animationPlayState = 'paused').

Add a "highlight" class to the simulated logos (e.g., [NRO], [Zeta], [Visionist]).

Show a pop-up text box with the "Phase 1: Zeta wins!" text.

After a 3-second pause, change the highlights and text to "Phase 2: Northrop Grumman wins!"

Show the final text: "The Visionist employee will now get a [Contingent Offer]..."
