# MLB Standings

A React + TypeScript web app that displays the 2026 MLB standings for all six divisions, using data from MLB's public Stats API.

[Screenshot of the app](image.png)

## Features

- Standings for all six divisions: wins, losses, winning percentage, and games back
- Team logos
- Loading state while data is fetched

## Tech stack

- React
- TypeScript
- Vite
- MLB Stats API (statsapi.mlb.com)

## How it works

- The `Standings` component fetches all divisions once when the page loads (using `useEffect`) and stores them in state.
- Each division is passed as a prop to a `Division` component, which renders it as a table.
- The MLB API doesn't allow direct browser requests (CORS), so Vite's dev server proxies requests from `/mlb` to `statsapi.mlb.com`.

## Run it locally

npm install
npm run dev

Then open the local URL shown in the terminal.

## Data

Data and logos are from MLB Advanced Media and are used here for personal, non-commercial purposes.