# Astro Wave

En rymdtematisk webbapplikation där användare kan utforska planeter, göra quiz, samla poäng och tävla mot varandra på en leaderboard.

## Installation

1. Klona repot:
   ```bash
   git clone https://github.com/Yrla137/Frontendramverk-Grupp-Kunskapskontroll-2.git
   cd Frontendramverk-Grupp-Kunskapskontroll-2
   ```

2. Installera dependencies:
   ```bash
   npm install
   ```

3. Starta backend-servern:
   ```bash
   node backend/server.js
   ```

4. Starta frontend (i en separat terminal):
   ```bash
   npm run dev
   ```

## Tech Stack

| Kategori | Teknologier |
|----------|-------------|
| **Frontend** | React, React Router DOM, Styled Components, React Hook Form, Zod |
| **Backend** | Express, SQLite, JWT, bcrypt |
| **Auth** | Google OAuth + användarnamn/lösenord |
| **Verktyg** | Vite, ESLint, Prettier |

## Gruppmedlemmar

| Medlem | Bidrag |
|--------|--------|
| **Joel** | Exploration (planetvisning, filtrering, quiz, poängsystem, leaderboard), ExplorationContext med useReducer, routing, responsiv design, formulärvalidering med React Hook Form + Zod, diagram |
| **Daniel** | Profilsida med full CRUD, inloggning (Google OAuth + lösenord), skyddade routes, poängsynkning till profil, useRef/validering, ESLint/Prettier, projektstruktur |
| **Shakur** | Daily Quests (CRUD, useQuests hook, auto scroll, formulärvalidering), PointsContext, NASA APOD integration, quest poängsystem |
| **Julia** | Söksystem (custom hook, debounce, sökhistorik, backend koppling), NavBar, HeroSection, ExtraSection, laddningsindikator, CSS/styling |

---

GRUPP 6

Joel
Danne
Shakur
Julia




# Vite + React Router DOM

> **DEPENDENCIES SKA VARA HELT FÄRDIGINSTALLERADE!**

## För att slippa merge conflicts
För att slippa merge conflicts så kan vi bestämma oss om regler i hur vi indenterar. `.prettierrc` kan användas för att sätta gemensamma regler för projektet. 

Till exempel: "ska vi bara köra med dubbelcitat" (`"`) så kan vi sätta såna regler för hela projektet så kommer vi få error (eller auto-formatering) om vi gör något annat.

**Detta kan spara oss från massa merge conflicts.**

---

## Mina förslag är detta:

* **`"singleQuote": false`**
  Prettier kommer konsekvent att byta ut alla enkla citattecken mot dubbla (`"`) i vår vanliga JavaScript-kod.

* **`"jsxSingleQuote": false`**
  Gör samma sak fast inne i våra React-komponenter (HTML/JSX-delen), t.ex. `<div className="container">`. (Dubbla citattecken är ju ändå standard i React-komponenter).

* **`"semi": true`**
  Tvingar fram ett semikolon (`;`) i slutet av varje rad.

* **`"tabWidth": 2`**
  Sätter indraget (indenteringen) till exakt 2 mellanslag för varje "nivå".

* **`"trailingComma": "es5"`**
  Lägger till ett sista kommatecken i listor och objekt. Det gör att Git-historiken blir mycket snyggare när vi lägger till nya rader i ett objekt.

* **`"printWidth": 100`**
  100 tecken innan prettier tvingar fram radbrytning.

* **`"bracketSpacing": true`**
  Luft (mellanslag) inuti måsvingar, så det blir `import { useState } from "react"` istället för den ihoptryckta fula `import {useState} from "react"`.

---

### Så här ser själva filen ut ifall vi vill köra på detta:
```json
{
  "singleQuote": false,
  "jsxSingleQuote": false,
  "semi": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 100,
  "bracketSpacing": true
}
```
