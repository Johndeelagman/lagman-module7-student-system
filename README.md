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
### 🔄 Retesting and Regression Testing Results

#### 1. Retesting Results (BUG-01)
* **Action:** Re-executed test case `TC-01` and `TC-02` with invalid inputs (`@#$%^&`).
* **Result:** **PASSED**. The form now successfully rejects invalid Student IDs, blocks submission, and displays the correct validation error message.

#### 2. Regression Testing Results
* **Scope:** Re-ran all remaining manual test cases (`TC-01` through `TC-10`) and automated unit test suite (`5/5 passed`).
* **Result:** **PASSED**. The code fix for Student ID validation did not break or alter existing functionalities (Edit, Delete, Search, and Theme Toggle).

| Test Type | Executed | Passed | Failed | Status |
| :--- | :---: | :---: | :---: | :---: |
| **Defect Retest (BUG-01)** | 1 | 1 | 0 | `PASSED` |
| **Manual Suite Regression** | 10 | 10 | 0 | `PASSED` |
| **Automated Unit Tests** | 5 | 5 | 0 | `PASSED` |

Plaintext
README.md
 ├── 🧪 Manual Test Cases (TC-01 to TC-10)
 ├── 🐛 Defect Report (BUG-01)
 ├── 🛠️ Explanation of Correction Made
 ├── 🔄 Retesting & Regression Results  <-- [ Put it here ]
 └── 📸 Screenshots & Explanations
## 📸 Application Screenshots & Execution Proof

### 1. Main Dashboard View
![Main Dashboard](./assets/01-dashboard.png)
*Initial UI state displaying student list and navigation.*

### 2. Add Student Modal
![Add Student Modal](./assets/02-add-student.png)
*Registration modal with form input fields.*

### 3. Edit Student Record
![Edit Student Record](./assets/03-edit-student.png)
*Modal pre-populated with existing record data for updating.*

### 4. Delete Confirmation Modal
![Delete Modal](./assets/04-delete-modal.png)
*Confirmation prompt triggered prior to record deletion.*

### 5. Live Search Filtering
![Search Functionality](./assets/05-search-filter.png)
*Table updating in real-time based on search input.*

### 6. Dark Theme Toggle
![Dark Theme](./assets/06-dark-mode.png)
*Interface switched to dark mode state.*

### 7. Automated Unit Test Passing Run
![Unit Test Results](./assets/07-test-results.png)
*Terminal console output showing all 5 automated unit tests passing.*

### 8. Bug Fix Verification
![Bug Fix Verification](./assets/08-defect-fix.png)
*Validation error rendered when invalid input is entered into the Student ID field.*
