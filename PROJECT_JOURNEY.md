# Project Journey & Functionality Guide: NDT Connect

This document outlines the key development milestones and provides a clear guide to the application's architecture and data flow. It serves as a functional diagram to understand how different parts of the app work together.

## I. Core Architecture Overview

The application is built on a modern, server-rendered architecture using Next.js and Firebase.

1.  **Frontend Framework:** **Next.js with React** (`src/app`)
    *   Handles all user interface rendering, routing, and client-side interactions.
    *   Uses the App Router for page management.

2.  **Backend & Database:** **Firebase** (`src/lib/firebase.ts`)
    *   **Authentication:** Firebase Auth handles secure user registration and login.
    *   **Database:** Firestore is the NoSQL database for storing all application data (users, requests, etc.).

3.  **Global State Management:** **React Context API** (`src/contexts/AuthContext.tsx`)
    *   Manages the global state of the currently logged-in user, making it accessible throughout the application.

4.  **UI Components:** **ShadCN UI & Tailwind CSS** (`src/components/ui` & `globals.css`)
    *   Provides a professional, consistent, and responsive design system.

---

## II. Key Folder & File Functions

Here's a breakdown of the most important directories and what they do:

*   **`src/app`**: **Routing & Pages**
    *   This is the heart of the Next.js App Router. Each folder inside represents a URL path (e.g., `/app/login` corresponds to the login page).
    *   `page.tsx` inside a folder defines the UI for that route.
    *   `layout.tsx` defines the main structure (like the header and footer) that wraps all pages.

*   **`src/components`**: **Reusable UI Building Blocks**
    *   `/auth`: Contains the `LoginForm.tsx` and `RegisterForm.tsx`.
    *   `/client`: Components specifically for the client-side experience, like `ProviderCard.tsx`.
    *   `/layout`: Main site structure components like `Header.tsx` and `Footer.tsx`.
    *   `/shared`: Components used across different roles, like the `ChatWindow.tsx`.
    *   `/ui`: Core, unstyled components from ShadCN (buttons, cards, etc.).

*   **`src/contexts`**: **Global State**
    *   `AuthContext.tsx`: This is the **central nervous system** for user management. It handles all registration, login, logout, and session persistence logic by communicating directly with Firebase.

*   **`src/hooks`**: **Custom Logic Hooks**
    *   `useAuth.ts`: A simple hook to easily access the `AuthContext` from any component.
    *   `useToast.ts`: Manages system-wide notifications (e.g., "Login Successful").

*   **`src/lib`**: **Core Logic & Utilities**
    *   `firebase.ts`: **The single point of connection to your Firebase backend.** It initializes Firebase and Firestore and includes comments detailing the database schema.
    *   `types.ts`: Defines the data structures (like `User`, `ServiceRequest`) used throughout the app with TypeScript. This is crucial for data consistency.
    *   `mockData.ts`: Contains the sample data used for "Demo Mode".

---

## III. User & Data Flow Diagrams (Textual)

### A. New User Registration

1.  **UI (`/register/page.tsx` & `RegisterForm.tsx`):**
    *   User fills out the registration form, selecting a role (Client, Provider, or Inspector).
    *   The form uses Zod (`formSchema`) for client-side validation to ensure data is correct *before* submission.

2.  **State Management (`AuthContext.tsx`):**
    *   The form calls the `register` function in the `AuthContext`.

3.  **Backend Interaction (`AuthContext.tsx` -> `firebase.ts`):**
    *   The `register` function first calls Firebase Authentication (`createUserWithEmailAndPassword`) to securely create the user account.
    *   Upon success, it sends a verification email (`sendEmailVerification`).
    *   It then creates a corresponding user profile document in the Firestore `users` collection, storing all the role-specific information.

4.  **Result:**
    *   A new user is created in Firebase Auth (pending email verification).
    *   A new document is created in the `users` collection in Firestore.
    *   The user is redirected to the login page with a success message.

### B. User Login

1.  **UI (`/login/page.tsx` & `LoginForm.tsx`):**
    *   User enters their email and password.
    *   For a quick preview, they can click "Login as Demo..." which loads mock data from `lib/mockData.ts`.

2.  **State Management (`AuthContext.tsx`):**
    *   The form calls the `loginWithEmail` function.

3.  **Backend Interaction (`AuthContext.tsx` -> `firebase.ts`):**
    *   The `loginWithEmail` function calls Firebase Authentication (`signInWithEmailAndPassword`) to verify credentials.
    *   The `onAuthStateChanged` listener in `AuthContext` detects the successful login. It then fetches the user's profile from the Firestore `users` collection.

4.  **Result:**
    *   The user's data is fetched from Firestore and stored in the global `AuthContext`.
    *   The user is automatically redirected to the appropriate dashboard (`/dashboard`, `/provider-dashboard`, or `/admin/dashboard`) based on their role.

### C. Client Requests a Service

1.  **UI (`/find-providers/page.tsx`):**
    *   Client views a list of providers fetched from the Firestore `users` collection (where `role` is 'provider').
    *   Client clicks "Request Service" on a `ProviderCard.tsx`.

2.  **Navigation & Data Passing:**
    *   The app navigates to `/request-service`, passing the provider's ID and name in the URL query parameters.

3.  **UI (`/request-service/page.tsx`):**
    *   The form pre-populates the selected provider's details.
    *   Client fills out the service request details (description, date, etc.).

4.  **Backend Interaction (`request-service/page.tsx` -> `firebase.ts`):**
    *   On submission, a new document is created directly in the `serviceRequests` collection in Firestore. This document includes the client's ID and the selected provider's ID.

5.  **Result:**
    *   The client is redirected to `/track-request/[id]` to see the status of their newly created request.
    *   The provider can now see this new request on their `/provider-requests` page.

This detailed breakdown should provide a clear understanding of the application's structure and how its key features operate.
