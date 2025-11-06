import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Loan from "./pages/Loan";
import userAuth from "./store/userStore";
import AuthCheck from "./store/AuthCheck";
import { useEffect } from "react";
import Expired from "./pages/Expired";
import EachUser from "./pages/EachUser";

function App() {
  const { isActive, isCheckingActive, CheckActive } = userAuth();
  useEffect(() => {
    CheckActive();
  }, [CheckActive]);
  return (
    <Routes>
      <Route
        path="/"
        element={
          !isCheckingActive && isActive ? <Navigate to={"/loan"} /> : <Login />
        }
      />
      <Route
        path="/loan"
        element={
          <AuthCheck>
            <Loan />
          </AuthCheck>
        }
      />
      <Route
        path="/loan/expired"
        element={
          <AuthCheck>
            <Expired />
          </AuthCheck>
        }
      />
      <Route
        path="/loan/:email"
        element={
          <AuthCheck>
            <EachUser />
          </AuthCheck>
        }
      />
    </Routes>
  );
}

export default App;
