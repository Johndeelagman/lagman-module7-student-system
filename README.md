# Student Record System

## Developer Metadata
* **Developer Name:** John Dee P. Lagman
* **Section:** BSCS-3A
* **Course Subject:** Software Engineering 1
* **Module:** Module 7 - Design Implementation

---

## 1. System Description & Selected Module 6 Entity
The **Student Record System** is a responsive, web-based dashboard designed to manage academic student profiles efficiently. 
* **Selected Module 6 Entity:** `Student` entity.
* **Attributes Managed:** `studentId`, `fullName`, `program`, `yearLevel`, and `status`.

---

## 2. Implemented Features
* **Full CRUD Functionality:** Create, Read, Update, and Delete student records in real time.
* **Live Search & Dynamic Filtering:** Filter directory records instantly by ID, full name, or program.
* **Form Validation:** Client-side validation preventing duplicate entries and empty submissions.
* **Responsive Dark Mode:** Toggleable high-contrast dark theme with adaptive UI controls.
* **Browser State Persistence:** Retains student data locally across browser refreshes.
* **Automated CI/CD Pipeline:** GitHub Actions integration running automated build validation.

---

## 3. Technologies Used
* **Framework:** Vue 3 (Composition API with `<script setup>`)
* **Build Tool:** Vite
* **Styling Framework:** Tailwind CSS v4
* **Language:** JavaScript (ES6+), HTML5, CSS3
* **Version Control:** Git & GitHub Actions

---

## 4. Installation and Run Instructions
1. **Clone the repository:**
   ```bash
   git clone [https://github.com/Johndeelagman/lagman-module7-student-system](https://github.com/Johndeelagman/lagman-module7-student-system)
http://localhost:5173/
## 🐛 Defect Report

| Field | Details |
| :--- | :--- |
| **Bug ID** | `BUG-01` |
| **Title** | Student ID validation accepts special characters |
| **Severity** | Medium |
| **Steps to Reproduce** | 1. Open "Add Student" modal.<br>2. Enter `@#$%^&` into Student ID field.<br>3. Click "Submit". |
| **Expected Result** | Form displays error: "Student ID must contain alphanumeric characters only." |
| **Actual Result** | Form submits successfully and saves invalid characters to the database. |
| **Status** | Resolved |
### 🛠️ Explanation of Correction Made

* **Root Cause:** The `studentId` field in `AddStudentModal.vue` lacked input validation rules, allowing raw form submission regardless of character types or patterns.
* **Fix Implemented:** Added regex pattern matching (`/^[a-zA-Z0-9-]+$/`) to validate input before emitting the `add-student` event. If the input contains invalid special characters, submission is blocked and an inline validation error is displayed.
* **Code Snippet (Before vs. After):**

```javascript
// BEFORE: Allowed all string inputs
const handleSubmit = () => {
  emit('add-student', formData);
};

// AFTER: Added regex validation check
const handleSubmit = () => {
  const idPattern = /^[a-zA-Z0-9-]+$/;
  if (!idPattern.test(formData.studentId)) {
    errorMessage.value = "Student ID must contain alphanumeric characters only.";
    return;
  }
  emit('add-student', formData);
};
---

**Where to Put It in Your Repository Hierarchy:**

```text
README.md
 ├── 🧪 Manual Test Cases (TC-01 to TC-10)
 ├── 🐛 Defect Report (BUG-01)
 ├── 🛠️ Explanation of Correction Made  <-- [ Put it here ]
 ├── 🔄 Retesting & Regression Results
 └── 📸 Screenshots & Explanations
