import { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import { PublicElement } from "components/Element";

const HomePage = lazy(() => import("pages/HomePage"));
const CreateSession = lazy(() => import("pages/CreateSession"));
const StartPage = lazy(() => import("pages/StartPage"));
const FourOhFour = lazy(() => import("pages/Error/FourOhFour"));

const Router = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<PublicElement component={HomePage} />} />
      <Route path="/create/:sessionId?" element={<PublicElement component={CreateSession} />} />
      <Route path="/start/:sessionId?" element={<PublicElement component={StartPage} />} />
      {/* 404 page if none of the routes match */}
      <Route path="*" element={<FourOhFour />} />
    </Routes>
  );
};

export default Router;
