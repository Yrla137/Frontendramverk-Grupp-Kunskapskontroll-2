import styles from "./App.module.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from "./pages/homepage/HomePage";
import Profile from "./pages/profile/Profile";

function App() {
  return (
    <BrowserRouter>
      <div className={styles.appContainer}>

        <header className={styles.navbar}>
          <h1>Space-Quiz</h1>
        </header>

        <main className={styles.mainContent}>

          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/profile/:id" element={<Profile />} />
          </Routes>

        </main>

        <footer className={styles.footer}>
          <p>Byggd med React och NASA API</p>
        </footer>

      </div>
    </BrowserRouter>
  );
}

export default App;


// import styles from './App.module.css';
// import Profile from './pages/profile/Profile';


// function App() {
//   return (
//     <div className={styles.appContainer}>
      
//       <header className={styles.navbar}>
//         <h1>Space-Quiz</h1>
//         {}
//       </header>

//       <main className={styles.mainContent}>
        
//         {/* React Router */}
//         <div className="card">
//         <Profile />
//           <h2>Välkommen till rymden</h2>
//           <p>Här kan du utforska NASA:s data och samla badges.</p>
//         </div>
//       </main>

//       <footer className={styles.footer}>
//         <p>Byggd med React och NASA API</p>
//       </footer>

//     </div>
//   );
// }

// export default App;