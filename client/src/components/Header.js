import { Link } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react"
import { AffinidiLoginButton, useAffinidiProfile } from '@affinidi/affinidi-react-auth'
import UserContext from '../context/UserContext';

function Header() {

  const { setProfile } = useContext(UserContext);

  const { isLoading, error, profile, handleLogout } = useAffinidiProfile({
    authCompleteUrl: '/api/affinidi-auth/complete'
 })

 const [localProfile, setLocalProfile] = useState(null);

 useEffect(() => {
  const currentProfileStr = JSON.stringify(profile);
  const localProfileStr = JSON.stringify(localProfile);

  if (currentProfileStr !== localProfileStr) {
    setLocalProfile(profile);
    setProfile(profile);
  }
}, [profile])

const renderLoginState = () => {
  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    handleLogout();
    return (
      <div>
        <p>Unable to load user data. Please try again later.</p>
      </div>
    );
  }

  if (!profile) {
      return (
        <div>
          {/* <span>Welcome, {profile.givenName}</span> */}
          <span>Welcome, mutaiallan</span><br></br>
          <button onClick={logout}>Logout</button>
        </div>
      );
    }

return <AffinidiLoginButton />;
  };

 async function logout() {
  handleLogout();
  window.location.href = "/";
}

  return (
    <header>
      <h1>
        <Link to="/">Articly</Link>
      </h1>
      
      {renderLoginState()}

      {isLoading && <p>Loading...</p>}
    </header>
  );
}

export default Header;