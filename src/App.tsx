import { lazy } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { CONSTANTS } from "./lib/constants";
import MainLayout from "./layouts/MainLayout";

const Main = lazy(() => import("@/pages/Main.tsx"));
const PageNoutFound = lazy(() => import("@/pages/PageNotFound.tsx"));

function App() {
  return (
    <MainLayout>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/pagenotfound" element={<PageNoutFound />} />
          <Route
            path="/*"
            element={<Navigate to={CONSTANTS.ROUTES.PAGENOTFOUND} />}
          />
        </Routes>
      </BrowserRouter>
    </MainLayout>
  );
}

export default App;
