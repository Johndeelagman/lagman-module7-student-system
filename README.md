# Module 7: Student Management System

- **Developer:** John Dee P. Lagman 
- **Section:** BSCS-3A  
- **Subject:** Software Engineering 1
- **Module:** Module 7 - Design Implementation

---

## Overview
This project implements a Vue 3 frontend styled with Tailwind CSS v4 for managing student records. It transitions the theoretical data architecture established in **Module 6** into an interactive web application.

## Architectural Connection: Module 6 to Module 7
- **Data Entity Integration:** The `Student` entity schema developed in Module 6 (`studentId`, `fullName`, `program`, `yearLevel`, and `status`) serves as the core data structure driving Vue's reactive state.
- **Modular Component Design:** The system breaks down Module 6's interface requirements into four modular components (`AppHeader`, `StudentForm`, `StudentTable`, `AppFooter`).
- **CRUD & Validation Logic:** Data flow between parent (`App.vue`) and child components uses reactive props and event emissions (`$emit`), ensuring real-time state synchronization and client-side validation.

## Features
- Dynamic header with active status and live record counting.
- Input validation with real-time error messaging.
- Table filtering with live search and status badge styling.
- GitHub Actions CI pipeline running automated build checks.

- Installation and Run
- Instructions
  1. Clone the repository: git clone
     https://github.com/Johndeelagman/lagman-module7-student-system
  2. Go to the project folder cd lagman module7-vue-system
  3. Install dependencies: npm install
  4. Run the app: npm run dev
  5. Open the local address shown in the terminal example:  http://localhost:5183/  
