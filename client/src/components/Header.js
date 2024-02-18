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
  // Convert objects to strings to compare them
  const currentProfileStr = JSON.stringify(profile);
  const localProfileStr = JSON.stringify(localProfile);

  // Only update if the stringified versions differ
  if (currentProfileStr !== localProfileStr) {
    setLocalProfile(profile);
    setProfile(profile); // assuming setProfile comes from a context and is stable
  }
}, [profile])

const renderLoginState = () => {
  console.log(profile)
  if (isLoading) {
    console.log(profile)
    return <p>Loading...</p>;
  }

  if (error) {
    console.log(profile)
    handleLogout();
    return (
      <div>
        <p>Unable to load user data. Please try again later.</p>
      </div>
    );
  }

  if (profile) {
      return (
        <div>
          <span>Welcome, {profile.givenName}</span>
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

      {/* {profile && <>
          <button style={{ marginRight: 10 }} onClick={logout}>
            Logout
          </button>
        </>} */}

      {isLoading && <p>Loading...</p>}
    </header>
  );
}

export default Header;