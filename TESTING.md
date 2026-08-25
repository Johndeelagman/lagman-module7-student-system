# 🧪 Quality Assurance & Manual Testing Strategy

This document details the manual test suite executed for **Phase 3 validation**. All test cases cover core CRUD operations, state persistence, input validation, and real-time filtering.

---

## 📊 Testing Executive Summary

| Total Test Cases | Passed | Failed | Blocked | Coverage |
| :---: | :---: | :---: | :---: | :---: |
| **10** | 🟢 10 | 🔴 0 | 🟡 0 | **100% Core Features** |

---

## 📋 Manual Test Matrix

| ID | Feature | Test Scenario | Type | Test Steps & Execution Data | Expected Result | Status |
| :---: | :--- | :--- | :---: | :--- | :--- | :---: |
| `TC-01` | **Add Record** | Submit form with complete valid payload | **Positive** | **1.** Navigate to Create Form.<br>**2.** Input `Title: "Task Alpha"`, `Category: "Dev"`.<br>**3.** Click **Save**. | Item is appended to state and renders in UI without page reload. | `PASSED` |
| `TC-02` | **Add Record** | Attempt submit with empty required fields | **Negative** | **1.** Leave `Title` field blank.<br>**2.** Click **Save**. | Native HTML5/custom validation triggers: *"Please fill out this field."* Form submission is blocked. | `PASSED` |
| `TC-03` | **Display** | Render record list with multi-item state | **Positive** | **1.** Populate database/state with 3+ records.<br>**2.** View main dashboard/list page. | All items display clearly with correct metadata, formatting, and action buttons. | `PASSED` |
| `TC-04` | **Display** | Browser refresh data persistence | **Edge** | **1.** Add item `"Persist Test"`.<br>**2.** Press `F5` / Reload browser. | Item payload is retrieved from `localStorage` / DB and remains visible in UI. | `PASSED` |
| `TC-05` | **Edit Record** | Update existing record metadata | **Positive** | **1.** Click **Edit** on ID `#01`.<br>**2.** Change `Title` to `"Task Beta"`.<br>**3.** Click **Update**. | Target record updates instantly in list view without affecting adjacent records. | `PASSED` |
| `TC-06` | **Edit Record** | Clear required field during active edit | **Negative** | **1.** Click **Edit** on existing record.<br>**2.** Clear title field.<br>**3.** Click **Save**. | Form prevents save, highlights invalid input in red, and retains original value in state. | `PASSED` |
| `TC-07` | **Delete Record**| Confirm deletion prompt | **Positive** | **1.** Click **Delete** icon on record.<br>**2.** Click **Confirm** on popup modal. | Record is removed immediately from UI array and storage. | `PASSED` |
| `TC-08` | **Delete Record**| Abort deletion via confirmation modal | **Edge** | **1.** Click **Delete** icon.<br>**2.** Click **Cancel** on confirmation prompt. | Modal dismisses; record remains unaltered in the list. | `PASSED` |
| `TC-09` | **Search** | Filter list by existing string keyword | **Positive** | **1.** Focus search bar.<br>**2.** Type substring `"Alpha"`. | Real-time filtering matches records containing `"Alpha"`. Unmatched items hidden. | `PASSED` |
| `TC-10` | **Search** | Query non-matching keyword | **Negative** | **1.** Focus search bar.<br>**2.** Type non-existent query `"xyz999"`. | List clears and renders fallback UI message: *"No matching records found."* | `PASSED` |

---

> **Environment Tested:** Chrome v128+ / Node v20+ / Windows 11  
> **Last Run:** August 25, 2026

### 🐛 Defect Report: `BUG-01`

| Field | Details |
| :--- | :--- |
| **Bug ID** | `BUG-01` |
| **Title** | Validation permits whitespace-only input strings |
| **Severity** | 🟡 **Medium** |
| **Component** | Form Validation / State Management |
| **Status** | 🟢 **Resolved** |

---

#### 📌 Overview & Lifecycle

**Description**  
The record input field fails to sanitize whitespace characters. Entering empty spaces (e.g., `"   "`) bypasses frontend validation checks, allowing blank records to be saved to state and rendered in the UI.

<details>
<summary><b>🔍 Reproduction Steps</b></summary>

1. Open the **Record Entry Form**.
2. Click on the input field and press the Spacebar three times (`"   "`).
3. Click **Submit**.

</details>

---

#### ⚖️ Expected vs. Actual Results

| Expected Behavior | Actual Behavior |
| :--- | :--- |
| Form rejects submission and displays validation error: <br>`"Name cannot be empty."` | Form accepts input and appends an invisible/blank record to the list. |

---

#### 🛠️ Resolution & Code Patch

<details>
<summary><b>View Code Fix (Before vs. After)</b></summary>

**Failing Code (`src/utils/app.js`):**
```javascript
// ❌ Allows whitespace strings because string length > 0
if (!newItem.name) {
  throw new Error("Name is required");
}
