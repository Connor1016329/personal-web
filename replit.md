# Connor Neistadt - Personal Resume Website

## Overview
A professional personal resume website tailored for a Head of Business Operations role at a high-growth remote startup. Single-page static site with smooth scroll animations.

## Architecture
- **Frontend**: React + Vite with Tailwind CSS and shadcn/ui components
- **Backend**: Express server (minimal, serves the static frontend)
- **Routing**: wouter (single page at `/`)
- **Animations**: framer-motion for scroll-triggered fade-up animations

## Key Files
- `client/src/pages/home.tsx` - Main resume page with all sections
- `client/src/App.tsx` - App shell with routing
- `client/src/index.css` - Design tokens (navy/slate/gold theme)
- `client/index.html` - HTML with SEO meta tags

## Design
- Navy/slate primary palette with warm gold accents
- Inter font for body, Source Serif 4 for serif elements, JetBrains Mono for monospace
- Dark mode support via CSS variables in `.dark` class
- Hero section with background image and dark wash overlay

## Sections
1. Hero with profile photo, headline, CTA buttons
2. Professional Summary
3. Core Strengths (6 cards)
4. Experience timeline
5. Operations & Systems Leadership
6. Technical & Process Skills
7. Education
8. Values/Motivation quote
9. Footer with contact links
