import { Suspense, lazy } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { CONSTANTS } from "./lib/constants";
import MainLayout from "./layouts/MainLayout";
import Fallback from "./components/custom/Fallback";

const Main = lazy(() => {
  return new Promise((resolve: any) => {
    setTimeout(() => resolve(import("@/pages/Main.tsx")), 2500);
  });
});
const PageNoutFound = lazy(() => import("@/pages/PageNotFound.tsx"));

function App() {
  return (
    <Suspense fallback={<Fallback />}>
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
    </Suspense>
  );
}

export default App;
