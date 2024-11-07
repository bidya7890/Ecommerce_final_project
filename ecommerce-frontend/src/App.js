// import React, { useEffect, useState } from "react";
// import { BrowserRouter as Router, Route, Routes, Link, Navigate } from "react-router-dom";
// import axios from "axios";
// import './App.css';  // Make sure to import your CSS here

// // Components
// import HomePage from "./components/HomePage";
// import ProductPage from "./components/ProductPage";
// import LoginPage from "./components/LoginPage";
// import CartPage from "./components/CartPage";
// import ProfilePage from "./components/ProfilePage";

// function App() {
//   const [token, setToken] = useState(localStorage.getItem('token'));

//   useEffect(() => {
//     if (token) {
//       axios.defaults.headers['Authorization'] = `Token ${token}`;
//     }
//   }, [token]);

//   return (
//     <Router>
//       <div className="App">
//         {/* Navigation Bar */}
//         <nav className="navbar">
//           <div className="logo">
//             <h2>Shopify</h2>
//           </div>
//           <ul className="nav-links">
//             <li><Link to="/">Home</Link></li>
//             <li><Link to="/products">Products</Link></li>
//             <li><Link to="/cart">Cart</Link></li>
//             {token ? (
//               <>
//                 <li><Link to="/profile">Profile</Link></li>
//                 <li><button onClick={() => {
//                   setToken(null);
//                   localStorage.removeItem('token');
//                 }}>Logout</button></li>
//               </>
//             ) : (
//               <li><Link to="/login">Login</Link></li>
//             )}
//           </ul>
//         </nav>

//         {/* Main Routes */}
//         <Routes>
//           <Route path="/" element={<HomePage />} />
//           <Route path="/products" element={<ProductPage />} />
//           <Route path="/login" element={token ? <Navigate to="/" /> : <LoginPage setToken={setToken} />} />
//           <Route path="/cart" element={<CartPage />} />
//           <Route path="/profile" element={token ? <ProfilePage /> : <Navigate to="/login" />} />
//         </Routes>
//       </div>
//     </Router>
//   );
// }

// export default App;

// import React, { useEffect, useState } from "react";
// import { BrowserRouter as Router, Route, Routes, Link, Navigate } from "react-router-dom";
// import axios from "axios";
// import './App.css';  // Make sure to import your CSS here

// Components
// import HomePage from "./components/HomePage";
// import ProductPage from "./components/ProductPage";
// import LoginPage from "./components/LoginPage";
// import RegisterPage from "./components/RegisterPage";
// import CartPage from "./components/CartPage";
// import ProfilePage from "./components/ProfilePage";
// import PrivateRoute from "./components/PrivateRoute";

// function App() {
//   const [token, setToken] = useState(localStorage.getItem('token'));

//   useEffect(() => {
//     if (token) {
//       axios.defaults.headers['Authorization'] = `Token ${token}`;
//     }
//   }, [token]);

//   return (
//     <Router>
//       <div className="App">
//         {/* Navigation Bar */}
//         <nav className="navbar">
//           <div className="logo">
//             <h2>Indian Mart</h2>
//           </div>
//           <ul className="nav-links">
//             <li><Link to="/">Home</Link></li>
//             <li><Link to="/products">Products</Link></li>
//             <li><Link to="/cart">Cart</Link></li>
//             {token ? (
//               <>
//                 <li><Link to="/profile">Profile</Link></li>
//                 <li><button onClick={() => {
//                   setToken(null);
//                   localStorage.removeItem('token');
//                 }}>Logout</button></li>
//               </>
//             ) : (
//               <>
//                 <li><Link to="/login">Login</Link></li>
//                 <li><Link to="/register">Register</Link></li>
//               </>
//             )}
//           </ul>
//         </nav>

//         {/* Main Routes */}
//         <Routes>
//           <Route path="/" element={<HomePage />} />
//           <Route path="/products" element={<PrivateRoute><ProductPage /></PrivateRoute>} />
//           <Route path="/login" element={token ? <Navigate to="/" /> : <LoginPage setToken={setToken} />} />
//           <Route path="/register" element={token ? <Navigate to="/" /> : <RegisterPage />} />
//           <Route path="/cart" element={<PrivateRoute><CartPage /></PrivateRoute>} />
//           <Route path="/profile" element={token ? <ProfilePage /> : <Navigate to="/login" />} />
//         </Routes>
//       </div>
//     </Router>
//   );
// }

// export default App;

import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from "react-router-dom";
import axios from "axios";
import './App.css';  // Import the App.css file

// Components
import HomePage from "./components/HomePage";
import ProductPage from "./components/ProductPage";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import CartPage from "./components/CartPage";
import ProfilePage from "./components/ProfilePage";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    if (token) {
      axios.defaults.headers['Authorization'] = `Token ${token}`;
    }
  }, [token]);

  return (
    <Router>
      <div className="App">
        {/* Navigation Bar */}
        <nav className="navbar">
          <div className="logo">
            <h2>Anime Mart</h2> {/* This is where the gradient text will appear */}
          </div>
          <ul className="nav-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/products">Products</Link></li>
            <li><Link to="/cart">Cart</Link></li>
            {token ? (
              <>
                <li><Link to="/profile">Profile</Link></li>
                <li><button onClick={() => {
                  setToken(null);
                  localStorage.removeItem('token');
                }}>Logout</button></li>
              </>
            ) : (
              <>
                <li><Link to="/login">Login</Link></li>
                <li><Link to="/register">Register</Link></li>
              </>
            )}
          </ul>
        </nav>

        {/* Main Routes */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<PrivateRoute><ProductPage /></PrivateRoute>} />
          <Route path="/login" element={token ? <Navigate to="/" /> : <LoginPage setToken={setToken} />} />
          <Route path="/register" element={token ? <Navigate to="/" /> : <RegisterPage />} />
          <Route path="/cart" element={<PrivateRoute><CartPage /></PrivateRoute>} />
          <Route path="/profile" element={token ? <ProfilePage /> : <Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

