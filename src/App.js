import './App.css';
import Signup from './pages/signup';
import Login from './pages/login';
import Home from './pages/home';
import Landing from './pages/landing';

function App() {
  return (
    <div>
      <Home />
    </div>
  );
}

export default App;

// import React from 'react';
// import { Routes, Route, Router } from 'react-router-dom';
// import Login from './components/login';
// import Signup from './components/signup';
// import Home from './components/home';

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/signup" element={<Signup />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;

// // src/App.js
// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// import Home from "./components/home";
// import Login from "./components/login";
// import Signup from "./components/signup";
// import Landing from "./components/landing";

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/signup" element={<Signup />} />
//         <Route path="/landing" element={<Landing />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;
