import React, { Suspense } from "react";
// import { ReactQueryDevtools } from "react-query/devtools";

import { SuspenseLoader } from "components/Molecules/SuspenseLoader";
import Router from "router";
import "assets/App.css";


function App() {
  return (
    <>
      <Suspense fallback={<SuspenseLoader />}>
        <Router />
      </Suspense>
    </>
  );
}

export default App;
