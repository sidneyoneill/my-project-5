# NexGen Project Structure Overview

## Directory Structure

```
src/
├── components/         # Reusable UI components
│   ├── ui/            # Shadcn UI components
│   ├── auth/          # Authentication-related components
│   ├── onboarding/    # Onboarding flow components
│   ├── profile/       # User profile components
│   └── student/       # Student-specific components
├── contexts/          # React context providers
├── hooks/             # Custom React hooks
├── integrations/      # Third-party integrations (e.g., Supabase)
├── lib/              # Utility functions and helpers
├── pages/            # Page components (routes)
└── styles/           # Global styles and Tailwind config
```

## Key Components and Features

### Authentication
- Handled through Supabase authentication
- Components in `components/auth/`
- Protected routes using `ProtectedRoute` component

### User Onboarding
- Multi-step onboarding flow
- Components in `components/onboarding/`
- State management through `OnboardingContext`

### Profile Management
- User profile editing and viewing
- Components in `components/profile/`
- Data persistence through Supabase

### Student Features
- Student-specific functionality
- Components in `components/student/`

## Best Practices

1. **Naming Conventions**
   - Components: PascalCase (e.g., `StudentProfile.tsx`)
   - Hooks: camelCase with 'use' prefix (e.g., `useStudentProfile.ts`)
   - Utilities: camelCase (e.g., `formatDate.ts`)
   - Files/Folders: kebab-case (e.g., `auth-utils/`)

2. **Component Structure**
   - Keep components focused and single-responsibility
   - Extract reusable logic into custom hooks
   - Use TypeScript interfaces for props

3. **State Management**
   - Use React Query for server state
   - Context for global app state
   - Local state for component-specific data

4. **Styling**
   - Use Tailwind CSS utility classes
   - Extract common patterns into components
   - Maintain consistent spacing and layout

5. **Testing**
   - Tests located alongside components
   - Follow React Testing Library best practices
   - Focus on user interactions and behavior

## Development Guidelines

1. **Adding New Features**
   - Create components in appropriate directories
   - Update types if needed
   - Add tests for new functionality
   - Document changes in component files

2. **Code Style**
   - Use TypeScript for type safety
   - Follow ESLint and Prettier configurations
   - Write clear, self-documenting code
   - Add comments for complex logic

3. **Performance**
   - Lazy load routes when possible
   - Optimize images and assets
   - Monitor bundle size
   - Use React.memo when beneficial

4. **Security**
   - Validate all user inputs
   - Use proper authentication checks
   - Follow Supabase security best practices
   - Keep dependencies updated