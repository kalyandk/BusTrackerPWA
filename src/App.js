import React, { useState } from "react";
import "./App.css";

import RouteHelper from "./components/RouteHelper";

function App() {
  const [authenticated, setAuthenticated] = useState(false);
  return <RouteHelper />;
}

export default App;
