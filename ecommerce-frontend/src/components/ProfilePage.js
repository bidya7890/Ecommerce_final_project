// // ProfilePage.js
// import React from "react";

// function ProfilePage() {
//   return (
//     <div className="profile">
//       <h1>Your Profile</h1>
//       <p>Welcome back, [User Name]</p>
//       <button>Update Profile</button>
//     </div>
//   );
// }

// export default ProfilePage;

// ProfilePage.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/ProfilePage.css"; // Import CSS

function ProfilePage() {
  const [userName, setUserName] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userToken = localStorage.getItem("token");

    if (userToken) {
      axios
        .get("http://localhost:8000/api/profile/", {
          headers: {
            Authorization: `Token ${userToken}`,
          },
        })
        .then((response) => {
          setUserName(response.data.name);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching profile:", error);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile">
      <div className="profile-card">
        <h1>Your Profile</h1>
        <p>Welcome back, Guest</p>
        <button>Update Profile</button>
      </div>
    </div>
  );
}

export default ProfilePage;

