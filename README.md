CallDesk — Call Centre Staff Dashboard
A modern, responsive frontend for a call-centre support team. CallDesk gives support agents a single workspace to review performance, monitor their queue, and manage customer cases through a clean dashboard interface.
> **Project type:** Frontend assignment  
> **Stack:** React, Vite, CSS  
> **Data:** Sample/mock data — no backend required
Overview
Support agents need to quickly understand their workload, identify cases that need attention, and keep track of customer issues. CallDesk presents key support metrics and case information in one interface designed for everyday support workflows.
Highlights
At-a-glance dashboard for calls handled, average handle time, resolution rate, and customer satisfaction.
Performance overview with a weekly activity chart comparing current and previous activity.
Queue summary for open cases, follow-ups, and cases resolved today.
Case management interface for viewing and working with customer support cases.
Search and filtering to help locate relevant cases.
Create-case flow for adding a new support case.
Light/dark theme toggle for a more comfortable viewing experience.
Responsive layout designed to adapt to desktop and smaller screens.
Feature note: keep this list aligned with the controls and interactions in the final submitted build. Remove or update any item that is not working before submission.
Tech Stack
React — component-based user interface
Vite — local development server and build tooling
CSS — layout, styling, responsive behavior, and theme presentation
Lucide React — interface icons, if included in the final dependencies
Getting Started
Prerequisites
Node.js (an active LTS version is recommended)
npm
Install and run locally
Clone the repository:
```bash
   git clone <YOUR_GITHUB_REPOSITORY_URL>
   cd <YOUR_PROJECT_FOLDER>
   ```
Install dependencies:
```bash
   npm install
   ```
Start the development server:
```bash
   npm run dev
   ```
Open the local URL printed in the terminal by Vite (usually `http://localhost:5173`).
Production build
To create a production build:
```bash
npm run build
```
To preview the production build locally:
```bash
npm run preview
```
Project Structure
The exact structure may vary depending on the final repository, but a typical setup is:
```text
.
├── public/
├── src/
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── index.html
├── package.json
└── README.md
```
Using the Dashboard
Open the dashboard to review the headline support metrics.
Review the performance chart and queue summary to understand the current workload.
Use the case list to find a customer issue.
Open a case to review its details.
Use the create-case action to add a sample case.
Switch between light and dark themes using the theme control.
The exact actions available depend on the final submitted implementation. The application currently uses sample data and does not require a backend service.
Design Principles
Clarity first: prioritize important metrics and cases that need attention.
Consistent visual language: use consistent spacing, typography, color, and status indicators.
Fast scanning: group information into cards, charts, and a searchable case list.
Responsive experience: keep the interface usable at different viewport widths.
Maintainable frontend: organize the UI into reusable components where appropriate.
Data and Limitations
The dashboard uses sample/mock data for demonstration.
No backend or production database is required for this assignment.
Metrics and case records are illustrative, not live business data.
Authentication, persistent server-side storage, and live telephony integrations are outside the scope of this frontend assignment unless added separately.
AI Tools Disclosure
AI tools were used as development assistance for brainstorming, code suggestions, debugging, and documentation. The implementation was reviewed and adapted for this project.
Update this section to reflect the tools actually used during development. For example, list ChatGPT if used, and mention any other AI coding assistants you personally used. Do not list tools that were not used.
Future Improvements
Connect the UI to a backend and persistent database.
Add authentication and role-based access.
Add case assignment and escalation workflows.
Add real-time queue updates and notifications.
Add automated tests for important user flows.
Improve accessibility with keyboard and screen-reader testing.
Submission Checklist
[ ] Confirm all listed features work in the submitted build.
[ ] Run `npm run build` and fix any errors.
[ ] Check the dashboard at desktop and mobile widths.
[ ] Test search, filters, case creation, case details, and theme switching.
[ ] Replace the repository placeholders in the setup instructions.
[ ] Verify the AI tools disclosure is accurate.
[ ] Add screenshots or a live demo link if available.
Author
Your Full Name
GitHub: `<YOUR_GITHUB_PROFILE_URL>`
---
Built as a frontend demonstration of a call-centre staff workspace.