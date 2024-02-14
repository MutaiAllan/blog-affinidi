import { Link } from "react-router-dom";
import React from "react"
import { AffinidiLoginButton, useAffinidiProfile } from '@affinidi/affinidi-react-auth'

function Header() {

  const { isLoading, error, profile, handleLogout } = useAffinidiProfile({
    authCompleteUrl: '/api/affinidi-auth/complete'
 })

 async function logout() {
  handleLogout();
  window.location.href = "/";
}

  return (
    <header>
      <h1>
        <Link to="/">Lorem Blogum</Link>
      </h1>
      
      {!profile && <>
        <AffinidiLoginButton />
      </>}

      {profile && <>
          <button style={{ marginRight: 10 }} onClick={logout}>
            Logout
          </button>
        </>}

      {isLoading && <p>Loading...</p>}
    </header>
  );
}

export default Header;