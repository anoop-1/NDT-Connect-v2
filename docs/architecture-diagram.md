# NDT Connect V2 - Architectural Diagram

```
+---------------------+
|    User Browser     |
+---------------------+
           |
           v
+---------------------+
|   Next.js Pages     |   (app/)
|---------------------|
| - /register         |
| - /login            |
| - /dashboard        |
| - ...               |
+---------------------+
           |
           v
+---------------------+
|   Context Providers |   (src/contexts/)
|---------------------|
| - AuthContext       |
+---------------------+
           |
           v
+---------------------+
|     Components      |   (src/components/)
|---------------------|
| - auth/             |
| - client/           |
| - layout/           |
| - shared/           |
| - ui/               |
+---------------------+
           |
           v
+---------------------+
|      Hooks          |   (src/hooks/)
|---------------------|
| - useAuth           |
| - use-toast         |
| - ...               |
+---------------------+
           |
           v
+---------------------+
|   Service Layer     |   (lib/)
|---------------------|
| - auth-service.ts   |
| - mongodb.ts        |
| - mockData.ts       |
| - types.ts          |
+---------------------+
           |
           v
+---------------------+
|   Mongoose Models   |   (lib/models/)
|---------------------|
| - User.ts           |
+---------------------+
           |
           v
+---------------------+
|      MongoDB        |
+---------------------+
```

**Legend:**
- Vertical flow: Data and control flow from user interaction down to the database and back.
- Each box: A major architectural layer or folder in your project.
- Arrows: Show how each layer depends on the one below it.

**How it works:**
- Users interact with Next.js pages.
- Pages use Context Providers (like AuthContext) for global state.
- Context and pages use Components for UI.
- Components and context use Hooks for logic.
- All business logic and data access is in the Service Layer (lib/).
- The service layer uses Mongoose Models to interact with MongoDB.
