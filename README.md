## Getting Started

First, run the development server:

```bash
npm run dev
npm run json-server
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Potential improvements

### FE

    - add translations
    - add page usage data service for FE, for example mixPanel
    - add notification service, for displaying notifications (errors, warnings, info)
    - add responsive design (mobile)

### BE

    - add logger for BE
    - verify that User still exists for all requests (when user is deleted, but token is still valid, the user can still create todos)

### Mixed

    - add CI/CD
    - add change status 
    - add husky
    - add E2E-tests(preferably playwright)
