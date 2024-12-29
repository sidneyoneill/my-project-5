# Bug Fixes and Feature Implementation Plan

---

## Issue 1: Log Out Immediately When Clicking "Return Home" on Profile Page

### Steps to Fix:

1. Open the file responsible for the **Profile Page** (e.g., `ProfilePage.tsx`).
2. Locate the "Return Home" button component.
3. Add functionality to log the user out when the button is clicked:
   - Use the authentication library or backend service (e.g., Supabase) to sign the user out.
   - Add a navigation action to redirect the user to the home page after logging out.
4. Assign the logout functionality to the "Return Home" button's `onClick` event.
5. Test the "Return Home" button to ensure it logs the user out and redirects to the home page.

---

## Issue 2: Gold Student Button in Hero Section Should Redirect to Student Landing Page

### Steps to Fix:

1. Open the file responsible for the **Landing Page** (e.g., `Index.tsx`).
2. Locate the "Gold Student" button in the hero section (uses Hero.tsx).
3. Update the button's navigation functionality:
   - Use your routing library (e.g., React Router) to navigate to the student landing page route (e.g., `/StudentLandingPage`).

---

## Issue 3: `password_hash` Not Being Stored on Student Signup

### Steps to Fix:

1. Open the backend or API handler for the **Student Signup** form.
2. Implement password hashing before storing the password:
   - Use a secure hashing library (e.g., `bcrypt`) to hash the user's password.
   - Ensure the hashed password is stored in the `password_hash` field of the user table.
4. Test the signup process:
   - Create a new account and verify that the `password_hash` field is populated correctly in the database.

---

## Issue 4: Fields During Student Onboarding Are Not Updating the Student Table

### Steps to Fix:

1. Identify the form fields used during student onboarding.
2. Check the backend or API handler responsible for processing the onboarding form submissions.
3. Ensure that each form field is mapped to the corresponding database field in the `student` table.
4. Update the logic to:
   - Extract the data entered in each field.
   - Update the `student` table with the provided data.
5. Test the onboarding process:
   - Complete the onboarding form with sample data.
   - Verify that the data is saved correctly in the database.

---

## Testing and Verification

1. **Log Out Functionality**:
   - Click the "Return Home" button on the profile page and ensure the user is logged out and redirected to the home page.
2. **Gold Student Button Navigation**:
   - Click the "Gold Student" button in the hero section of the landing page and ensure it redirects to the student landing page.
3. **Password Hashing**:
   - Create a new student account and check the `password_hash` field in the user table to verify the hashed password is stored.
4. **Student Onboarding**:
   - Fill out the onboarding form and confirm that all fields update the `student` table correctly.

---

## Notes

- Make sure to back up the database before making changes to avoid data loss.
- Ensure that all API calls and database updates are secure and handle errors gracefully.
- Test each fix thoroughly in a development environment before deploying to production.
