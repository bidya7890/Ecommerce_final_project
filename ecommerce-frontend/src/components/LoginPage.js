// // import React, { useState } from 'react';
// // import { useNavigate } from 'react-router-dom';
// // import axios from 'axios';

// // const LoginPage = () => {
// //   const [username, setUsername] = useState('');
// //   const [password, setPassword] = useState('');
// //   const navigate = useNavigate(); // Replacing useHistory with useNavigate

// //   const handleSubmit = (e) => {
// //     e.preventDefault();
// //     // Make API call for login here, for example using axios
// //     axios.post('http://localhost:8000/api/login/', { username, password })
// //       .then(response => {
// //         // Save the token or handle login success
// //         localStorage.setItem('token', response.data.token);
// //         // Navigate to the products page after successful login
// //         navigate('/products');
// //       })
// //       .catch(error => {
// //         console.error('Login failed', error);
// //       });
// //   };

// //   return (
// //     <form onSubmit={handleSubmit}>
// //       <input 
// //         type="text" 
// //         value={username} 
// //         onChange={(e) => setUsername(e.target.value)} 
// //         placeholder="Username"
// //       />
// //       <input 
// //         type="password" 
// //         value={password} 
// //         onChange={(e) => setPassword(e.target.value)} 
// //         placeholder="Password"
// //       />
// //       <button type="submit">Login</button>
// //     </form>
// //   );
// // };

// // export default LoginPage;

// // src/components/LoginPage.js
// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const LoginPage = () => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post('http://localhost:8000/api/login/', {
//         username,
//         password,
//       });

//       if (response.data.token) {
//         localStorage.setItem('token', response.data.token); // Store token
//         navigate('/products');
//       }
//     } catch (err) {
//       setError('Invalid credentials. Please try again.');
//     }
//   };

//   return (
//     <div className="login-container">
//       <h2>Login</h2>
//       {error && <p>{error}</p>}
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           placeholder="Username"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//           required
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//         />
//         <button type="submit">Login</button>
//       </form>
//     </div>
//   );
// };

// export default LoginPage;
// import '../styles/LoginPage.css';  // Navigate one level up from components to styles
// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const LoginPage = ({ setToken }) => {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await axios.post("http://localhost:8000/api/login/", {
//         username,
//         password,
//       });

//       if (response.status === 200) {
//         const { token } = response.data;
//         // Save the token in localStorage and update state
//         localStorage.setItem("token", token);
//         setToken(token);

//         alert("Login successful!"); // Alert for successful login
//         navigate("/"); // Redirect to home page or any other page
//       }
//     } catch (error) {
//       console.error("Error during login:", error);
//       alert("Invalid credentials. Please try again.");
//     }
//   };

//   return (
//     <div>
//       <h2>Login</h2>
//       <form onSubmit={handleLogin}>
//         <input
//           type="text"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//           placeholder="Username"
//           required
//         />
//         <input
//           type="password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           placeholder="Password"
//           required
//         />
//         <button type="submit">Login</button>
//       </form>
//     </div>
//   );
// };

// export default LoginPage;

import '../styles/LoginPage.css'; // Adjust this path if necessary
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginPage = ({ setToken }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8000/api/login/", {
        username,
        password,
      });

      if (response.status === 200) {
        const { token } = response.data;
        // Save the token in localStorage and update state
        localStorage.setItem("token", token);
        setToken(token);

        alert("Login successful!"); // Alert for successful login
        navigate("/"); // Redirect to home page or any other page
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;


