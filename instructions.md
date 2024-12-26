# Instructions for Creating the Student Onboarding Flow

This document outlines step-by-step instructions to build a modular and sleek **Student Onboarding Flow** for StudentHive. Follow each step carefully to ensure consistency and alignment with the existing modern, AI-inspired design style.

---

## 1. General Setup


1. **Design a Profile Progress Bar Component**:
   - Place the progress bar at the **top center** of each page.
   - Set its horizontal length to match the width of the input fields below it.
   - Add dynamic functionality to update the progress as the user completes each page:
     - Use smooth animations to transition the progress bar.
     - Include indicators such as percentage completion or step text (e.g., "Step 2 of 6").
   - Ensure the progress bar component is reusable across all onboarding pages.

---

## 2. Create Individual Pages

Each page should follow the template described below:
- **Header**:
  - Include the profile progress bar at the top.
- **Body**:
  - Center-align all elements for simplicity.
  - Place the input fields in a vertical stack with ample spacing.
- **Footer**:
  - Include **"Back"** and **"Next"** buttons at the bottom of the page, styled consistently with the existing design.
  - Add hover effects for interactivity.

### Page 1: Phone Number
- **Field**: 
  - Single text box labeled "Phone Number."
  - Placeholder text: "Enter your phone number."
  - Include input validation for phone number formats.

### Page 2: University
- **Fields**:
  - Text box 1: "University Name" with placeholder "Enter your university."
  - Text box 2: "Campus Location" with placeholder "Enter campus location."

### Page 3: Degree Information
- **Fields**:
  - Text box 1: "Degree Name" with placeholder "Enter the name of your degree."
  - Text box 2: "Degree Title" with placeholder "Enter your degree title."
  - Text box 3: "Length of Degree" with placeholder "Enter length in years."
  - Text box 4: "Current Year of Study" with placeholder "Enter your current year."

### Page 4: Industry Preferences
- **Field**:
  - Single text box labeled "What industries are you interested in?"
  - Placeholder text: "E.g., Technology, Healthcare, Finance."

### Page 5: Role Preferences
- **Field**:
  - Single text box labeled "What sort of jobs are you interested in?"
  - Placeholder text: "E.g., Software Development, Data Analysis, Marketing."

### Page 6: Company Preferences
- **Field**:
  - Single text box labeled "What type of companies are you interested in?"
  - Placeholder text: "E.g., Startups, Large Corporations, Non-profits."

---

## 3. Add Page Transitions
1. Implement smooth transitions between pages.
   - Example: Fade or slide animations when moving to the next page.
2. Ensure data entered on each page is validated before allowing users to proceed.

---

## 4. Testing and Final Touches
1. Test the flow to ensure:
   - The progress bar updates correctly with each completed page.
   - All buttons and inputs function as intended.
   - The design is responsive on all devices.
2. Add subtle AI-inspired animations to buttons and progress updates to maintain a modern aesthetic.

---

## Notes
- Keep placeholders in input fields clear and concise to guide user input.
- Maintain consistency in styling, including fonts, colors, and button designs.
- Ensure accessibility features such as keyboard navigation and ARIA labels for screen readers.
