Project: The Contracting Ecosystem Explorer
A visual, interactive guide to understanding the complex world of cleared government contracting. This project's goal is to be a fun, informative tool that explains the "three-level" contracting model and why the market is so volatile and defined by "job hopping."

Core Concept: The "Three-Level Model of Volatility"
The central problem this site solves is explaining why contractor jobs seem temporary. The answer is that a contractor's employment is often tied to a specific, funded Task Order (Level 2), not just the company they work for (Level 3).

When this Task Order is "re-competed" (put up for bid again) every 3-5 years, the company that loses the bid loses the funding for those jobs. The company that wins the bid now has the exact same jobs to fill.

This forces the "job hop"—the employee is given a contingent offer by the new winning company to do the same job at the same desk, just with a new logo on their badge. This website will visualize this 3-level ecosystem.

Visual Layout & User Experience (index.html)
The main page will feature the 3D Image Ring visual. It will be composed of three distinct, concentric rings, each representing a "Level" in the ecosystem. The rings will rotate independently at different speeds.

Ring 1: The Government (The Customer)
Layer: The innermost ring.

Content: Logos of the main Intelligence Community (IC) and Department of Defense (DoD) agencies.

Companies/Logos:

National Security Agency (NSA)

National Geospatial-Intelligence Agency (NGA)

National Reconnaissance Office (NRO)

Defense Intelligence Agency (DIA)

Central Intelligence Agency (CIA)

Ring 2: The "Umbrellas" (The Primes)
Layer: The middle ring.

Content: Logos of the massive "Prime Contractors" that win the billion-dollar IDIQ ("Umbrella") contracts.

Companies/Logos:

Lockheed Martin

Northrop Grumman

Leidos

Booz Allen Hamilton

General Dynamics (GDIT)

RTX (Raytheon)

BAE Systems

CACI

SAIC

Ring 3: The "Specialists" (The Subs)
Layer: The outermost ring.

Content: Logos of the mid-tier and specialist companies (like Visionist) that are highly sought after for their specific talent. They often act as subcontractors.

Companies/Logos:

Visionist

Zeta Associates (a Lockheed Martin Co.)

Praxis Engineering (a GDIT Co.)

Enlighten (an HII Co.)

KeyW (a Jacobs Co.)

Parsons

ManTech

Peraton

Two Six Technologies

Key Features & Interactions
Dynamic Tooltip (On Hover):

Action: User hovers over any logo in any ring.

Result: A "tooltip" box appears with a brief, 1-2 sentence description.

Example (hovering Visionist): "A specialist company focused on data science, SIGINT analysis, and engineering for the IC. Often works as a high-value subcontractor."

Example (hovering Leidos): "A major Prime contractor that manages massive, long-term IDIQ contracts for the DoD and IC."

External Link (On Click):

Action: User clicks on any logo.

Result: The company's career page opens in a new tab.

Educational Pop-up: "The Re-Compete Simulation" (Button Click):

The user can click a button on the page labeled "Simulate a Contract Re-Compete."

Action: The rings stop spinning and "lock" onto a specific, real-world scenario.

Example Scenario:

Highlight: The [NRO] logo (Ring 1), [Zeta/Lockheed] logo (Ring 2), and [Visionist] logo (Ring 3) all light up.

Text Box Appears (Phase 1): "The NRO awards the 'MIDAS STUDIES' Task Order to Zeta (Prime), who puts Visionist (Sub) on their team."

...a 3-second pause...

Text Box Appears (Phase 2): "5 YEARS LATER: THE CONTRACT IS UP FOR RE-COMPETE!"

Highlight: The [NRO], [Zeta/Lockheed], and [Visionist] logos fade. The [Northrop Grumman] logo (Ring 2) and [Praxis] logo (Ring 3) light up.

Text Box Appears (Phase 3): "Northrop Grumman wins the re-compete! They beat Zeta. The 'MIDAS STUDIES' contract (and all its jobs) now belongs to them."

Text Box Appears (Phase 4): "A Visionist employee on 'MIDAS' now has a choice. They will almost certainly get a [Contingent Offer] from Northrop Grumman or its new partner (Praxis) to stay on the project. This is the 'job hop'!"

The [Contingent Offer] text will be a hyperlink that leads to the separate HTML page.
