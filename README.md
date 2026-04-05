# Typris - Typing Speed Game

A Tetris-inspired typing speed game built with React + Vite + TailwindCSS.

## How to Play

- Words fall from the top of the screen
- Type each word to clear it before it stacks up
- Words stack like Tetris blocks at the bottom
- Game over when the stack reaches the **ceiling**
- Chain words for combo score multipliers

## Controls

- **Type** - Match falling/stacked words
- **ESC** - Pause/Resume
- **Enter** - Start game / Restart

## Features

- Real-time WPM and accuracy tracking
- Combo streak system with score multipliers
- Progressive difficulty (speed + word complexity)
- Sound effects (Web Audio API, no external files)
- Pause/Resume support
- Performance badges on game over

## Development

```bash
npm install
npm run dev
```

## Deploy to Vercel

```bash
npm run build
npx vercel
```

Or connect your GitHub repo to Vercel for automatic deployments.

## Tech Stack

- React 19
- Vite 8
- TailwindCSS 4
- Web Audio API (sound effects)
