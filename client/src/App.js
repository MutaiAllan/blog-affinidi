import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./components/Home";
import Header from "./components/Header";
import UserContext from './context/UserContext';
import Article from "./components/Article";
import React, {useState} from 'react';


function App() {
  const [userProfile, setUserProfile] = useState(null);

  return (
    <UserContext.Provider value={{ profile: userProfile, setProfile: setUserProfile }}>
    <Router>
      <div className="App">
        <Header />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/articles/:id">
          <Article isLoggedIn={userProfile} />
        </Route>
        </Switch>
      </div>
    </Router>
    </UserContext.Provider>
  );
}

export default App;
