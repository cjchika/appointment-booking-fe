# Appointment Booking System

An Appointment Booking System (Frontend) -A  Case Study for Alpha Global

### Backend Source Code
[Github Link for Backend](https://github.com/cjchika/appointment-booking-be)

## Tech Stack
- Frontend: React (Typescript)
- Styling: Tailwind, MUI
- Backend: Nodejs (ExpressJS)
- Database: MySQL
- ORM: Sequelize

## Deployment
- Frontend: Surge
- Backend: AWS EC2
- Database: AWS RDS

### Requirements
- Node.js 16+ and pnpm

Clone the repo:
### Getting started

Run the following command on your local environment:

```shell
git clone https://github.com/cjchika/appointment-booking-fe
cd appointment-booking-fe
pnpm install
```

Then, you can run locally in development mode with live reload:

```shell
pnpm run dev
```

Open http://localhost:5173 with your favorite browser to see your project.


## Customization

- `src/index.css`: your CSS file using Tailwind CSS
- `src/main.tsx`: default theme

## Reasons why I chose this approach
- It gives other developer the options to run the app either manually or with Docker, for developers who already have experience with containerization, they can easily run one command, fire up many services, and start working without wasting time on configuration.

- Tech Stacks - Every project has its own requirements - except it's a hobby project and you just want to learn new technologies, developer can choose what to work with.

- Deployment - None of the suggested platforms worked for me, I used what I'm familiar with - AWS Cloud.

## How the conflict-handling logic works
The appointment booking doesn't allow multiple booking for a particular time-frame in a given date, only a user with the role of an admin can access/manage appointment bookings, proper UI feedback is displayed to respective users to allow for a better UX experience. This logic was implemented with the help of the Sequelize ORM.


## Features

- ⚡ [React.js](https://react.dev/)
- ⚡ [Material-UI](https://mui.com/)
- 🔥 Type checking [TypeScript](https://www.typescriptlang.org)
- 💎 Integrate with [Tailwind CSS](https://tailwindcss.com)
- ✅ Strict Mode for TypeScript and React 18
- 📏 Linter with [ESLint](https://eslint.org) (default NextJS, NextJS Core Web Vitals, Tailwind CSS and Airbnb configuration)
- 💖 Code Formatter with [Prettier](https://prettier.io)
- 🦊 Husky for Git Hooks
- 🚫 Lint-staged for running linters on Git staged files
- 🗂 VSCode configuration: Debug, Settings, Tasks and extension for PostCSS, ESLint, Prettier, TypeScript, Jest


## Project Structure

```shell
.
├── README.md                       # README file
├── .github                         # GitHub folder
├── .husky                          # Husky configuration
├── public                          # Public assets folder
├── src
│   ├── apis                        # Common apis folder
│   ├── components                  # Component folder
│   ├── data                        # Data constants JS Pages
│   └── features                    # Features folder
│   ├── hooks                       # Hooks customs folder
│   ├── layout                      # Layout Pages
│   └── pages                       # React JS Pages
│   ├── provider                    # Provider folder
│   └── routes                      # Routes folder
│   ├── ts                          # Type and Enum folder
│   ├── utils                       # Utility functions
├── tailwind.config.js              # Tailwind CSS configuration
└── tsconfig.json                   # TypeScript configuration
```

### Some Screenshots
[Screenhot 1](https://github.com/cjchika/appointment-booking-fe/blob/main/src/assets/screenshots/SC1.png)

[Screenhot 2](https://github.com/cjchika/appointment-booking-fe/blob/main/src/assets/screenshots/SC2.png)

[Screenhot 3](https://github.com/cjchika/appointment-booking-fe/blob/main/src/assets/screenshots/SC3.png)





