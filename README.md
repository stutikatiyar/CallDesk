# ☎️ CallDesk — Call Centre Staff Dashboard

A modern, responsive customer support dashboard built with **React and Vite**. CallDesk provides a centralized workspace for support agents to monitor performance, track queues, and manage customer cases through a clean, intuitive interface.

<p align="center">
  <img src="https://img.shields.io/badge/React-Frontend-61DAFB?logo=react&logoColor=black" alt="React" />
  <img src="https://img.shields.io/badge/Vite-Build%20Tool-646CFF?logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/CSS-Styling-1572B6?logo=css3&logoColor=white" alt="CSS" />
  <img src="https://img.shields.io/badge/Status-Frontend%20Demo-8B7CF6" alt="Project Status" />
</p>

---

## 📌 Overview

Call-centre agents often need to switch between performance metrics, customer issues, and pending follow-ups. CallDesk brings these workflows together in a single dashboard designed to make support information easier to understand and act on.

The project focuses on **clear information hierarchy, practical case-management workflows, responsive design, and a consistent visual experience**.

## ✨ Features

- **Performance Dashboard** — View key support metrics, including calls handled, average handle time, resolution rate, and customer satisfaction.
- **Activity Analytics** — Review weekly performance trends through a visual activity chart.
- **Queue Overview** — See summaries of open cases, follow-ups, and resolved cases.
- **Customer Case Management** — Browse customer support cases and inspect individual case details.
- **Search and Filtering** — Find relevant cases more easily.
- **Create Case** — Add new customer support cases through the interface.
- **Light and Dark Themes** — Switch between themes for a more comfortable viewing experience.
- **Responsive Interface** — Adapt the dashboard to different screen sizes.

*Features should be verified against the final implementation before submission.*

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| React | Component-based user interface |
| Vite | Development server and build tooling |
| CSS | Styling, layouts, responsive design, and themes |
| Lucide React | Interface icons, if included in the project dependencies |
| JavaScript | UI logic and interactions |

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/)
- npm, which is included with Node.js
- [Git](https://git-scm.com/) to clone the repository

### Installation

**1. Clone the repository**

```bash
git clone https://github.com/stutikatiyar/CallDesk.git
```

**2. Navigate to the project directory**

```bash
cd CallDesk
```

**3. Install dependencies**

```bash
npm install
```

**4. Start the development server**

```bash
npm run dev
```

**5. Open the application**

Open the local URL displayed in your terminal. Vite commonly uses:

```text
http://localhost:5173
```

### Production Build

Build the application for production:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

## 📂 Project Structure

```text
CallDesk/
├── public/              # Static assets
├── src/
│   ├── App.jsx          # Main dashboard and UI logic
│   ├── index.css        # Global styles and theme styling
│   └── main.jsx         # React application entry point
├── index.html           # HTML entry point
├── package.json         # Project metadata and dependencies
├── package-lock.json    # Locked dependency versions
├── .gitignore           # Files excluded from Git
└── README.md            # Project documentation
```

*The structure above represents the expected layout; update it if your repository differs.*

## 🖥️ Dashboard Workflow

1. Open the dashboard to review support metrics.
2. Check the performance chart and queue overview.
3. Search or filter the case list to locate a customer issue.
4. Open a case to inspect its details.
5. Use the create-case flow to add a sample case.
6. Switch between light and dark themes using the theme control.

The application uses sample data and is intended as a frontend demonstration. Live data and server-side persistence are not included unless implemented separately.

## 🎨 Design Approach

CallDesk follows a usability-focused design approach:

- **Clarity:** Important metrics and case information are easy to scan.
- **Consistency:** Typography, spacing, colors, and status indicators follow a shared visual language.
- **Efficiency:** Dashboard cards, analytics, and case tables keep related information together.
- **Adaptability:** Responsive layouts support different viewport sizes.
- **Maintainability:** React components and centralized styling make the interface easier to extend.

## 🧪 Testing Checklist

Before submitting or deploying the project, verify the following:

- [ ] The application starts with `npm run dev`.
- [ ] The production build succeeds with `npm run build`.
- [ ] The dashboard renders without console errors.
- [ ] Search and filters behave correctly.
- [ ] Case details and case creation work as expected.
- [ ] Light and dark themes both render correctly.
- [ ] The interface remains usable on desktop and mobile screens.
- [ ] The README accurately describes the implemented features.

## 📊 Data and Scope

- Uses illustrative sample/mock data.
- Does not require a backend to run the frontend demonstration.
- Displays are not connected to live call-centre metrics.
- Authentication, database persistence, telephony integrations, and real-time synchronization are outside the current scope unless added separately.

## 🤖 AI Tools Disclosure

**AI assistance:** ChatGPT was used to assist with development brainstorming, code suggestions, debugging, and documentation.

The generated suggestions were reviewed and adapted during implementation. This disclosure should be updated to accurately reflect the tools used and the work completed by the author.

## 🔮 Future Improvements

Potential enhancements include:

- Backend integration and persistent database storage.
- Agent authentication and role-based permissions.
- Case assignment, escalation, and priority workflows.
- Real-time queue updates and notifications.
- Automated tests for critical user interactions.
- Accessibility improvements and keyboard navigation.
- Deployment with a publicly accessible live demo.

## 👩‍💻 Author

**Stuti Katiyar**

- GitHub: [@stutikatiyar](https://github.com/stutikatiyar)
- Project Repository: [CallDesk](https://github.com/stutikatiyar/CallDesk)

---

<p align="center">
  Built with React, thoughtful UI design, and a focus on practical customer-support workflows.
</p>
