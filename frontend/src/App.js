
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import Navigation from "./components/Navigation";
import AllSpots from "./components/Spots/AllSpots/AllSpots";

import * as sessionActions from "./store/session";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => { //Restore the session user
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return isLoaded && (
    <>
      <Navigation isLoaded={isLoaded} />
      <AllSpots />
    </>
  );
}

export default App;
