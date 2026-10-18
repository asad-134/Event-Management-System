# Event Management System

A React application for discovering events through the Ticketmaster Discovery API. Visitors can search events and view details. Demo users can create an account, register for events, and manage their own registrations.

This project was built for a web programming assignment. Authentication and event registration are simulated in the browser; the app does not create Ticketmaster orders or reserve tickets.

## Features

- Browse events from the Ticketmaster Discovery API and view event details.
- Search by keyword and filter by category. Filters stay in the URL, so links can be refreshed or shared.
- Create a demo account, log in, and log out.
- Register once per event, per user, and see registrations on the protected **My Events** page.
- View upcoming and completed registrations, and cancel upcoming registrations. Events without a date appear in a separate group and can also be cancelled.
- Keep demo accounts, the current session, and registrations after a page refresh using browser `localStorage`.
- Use the app on desktop and mobile, with loading, error, and empty result messages.

## Tech stack

React, Vite, Redux Toolkit, React Redux, React Router, and the Ticketmaster Discovery API.

## Run locally

You need Node.js and npm, a Ticketmaster Discovery API key, and an internet connection for event data.

1. Clone the repository and enter the project folder:

   ```bash
   git clone https://github.com/asad-134/Event-Management-System.git
   cd Event-Management-System
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the project root and add your own API key:

   ```dotenv
   VITE_TICKETMASTER_API_KEY=your_ticketmaster_api_key
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

Open the local URL printed by Vite. If you change `.env` while the server is running, restart the server.

### Other commands

| Command | Purpose |
| --- | --- |
| `npm run build` | Create a production build in `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run Oxlint |

## Routes

| Route | Page |
| --- | --- |
| `/` | Redirects to `/events` |
| `/events` | Event list, keyword search, and category filter |
| `/events/:id` | Event details and registration button |
| `/register` | Create a demo account |
| `/login` | Sign in to a demo account |
| `/my-events` | Your registrations; redirects to `/login` if signed out |
| Any other path | Not found page |

## How state is organized

Redux Toolkit keeps the app's state in three slices:

- `auth`: demo users, the signed-in user, and authentication errors.
- `events`: API results, selected event details, and request status.
- `registrations`: registrations associated with a user and event; prevents duplicate registrations.

The store saves `auth` and `registrations` under the `eventDemoData` key in browser `localStorage`. Event results are fetched from Ticketmaster and are not saved there. Clearing this site's browser storage removes the demo accounts and registrations on that device.

## Important limitations

This is a frontend-only demo. Account passwords are stored in browser `localStorage`, so **use only made-up demo passwords**. Registration is local to your browser; it does not book a real ticket. The `.env` file is ignored by Git, but Vite exposes variables beginning with `VITE_` to the browser, so the API key is not a server-side secret.
