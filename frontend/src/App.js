
import React, { useState, useEffect } from "react";
import { Route, Switch } from 'react-router-dom';
import { useDispatch } from "react-redux";

import Navigation from "./components/Navigation";
import AllSpots from "./components/Spots/AllSpots/AllSpots";

import * as sessionActions from "./store/session";
import SpotDetails from "./components/Spots/SpotDetails/SpotDetails";
import UserSpots from "./components/Spots/UserSpots/UserSpots";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => { //Restore the session user
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return isLoaded && (
    <>
      <Navigation isLoaded={isLoaded} />
      <Switch>
        <Route exact path='/'>
          <AllSpots />
        </Route>
        <Route exact path='/spots/current'>
          <UserSpots />
        </Route>
        <Route exact path='/spots/:spotId'>
          <SpotDetails />
        </Route>
      </Switch>
    </>
  );
}

export default App;
