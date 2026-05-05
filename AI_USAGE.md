# AI Usage Document

## AI Tool Used
- **Antigravity (Google Gemini 3 Flash)**: Used as a pair-programmer and deployment assistant.

## Areas of Contribution
1. **Architecture Planning**: Assisted in designing the REST API structure and the frontend component hierarchy.
2. **Code Implementation**: Generated boilerplate for Spring Security configurations, JWT handling, and Angular Material layouts.
3. **Bug Fixing & Troubleshooting**: 
   - Fixed Angular Build Budget errors by adjusting `angular.json`.
   - Resolved SPA routing issues on Vercel using `vercel.json`.
   - Configured CORS settings for cross-origin communication between Render and Vercel.
4. **Deployment Assistance**: 
   - Provided Docker configuration for Spring Boot.
   - Guided through Vercel's output directory configuration for Angular 17.

## Key Prompt Examples
- *"Guide me how to deploy"*
- *"I cant see java option here"*
- *"Access to hotel-booking was denied (CORS issues)"*

## Corrections and Refinements
- The AI initially suggested a native Java runtime on Render, but corrected to a Docker-based approach once it was identified that Render requires Docker for Java.
- Refined the Angular build configuration to include `fileReplacements` when it was detected that the production environment wasn't being correctly swapped during the Vercel build.
