import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import {
  Assessment,
  Home,
  Profile,
  Result,
  SignIn,
  SignUp,
} from "./Containers";
import { Navbar } from "./Components";
import { userSelector } from "./Redux/Reducers/userReducer";
import { useSelector } from "react-redux";

const App = () => {
  const { user } = useSelector(userSelector) || null;
  const ProtectedRoute = ({ children }) => {
    if (!user) {
      return <Navigate to="/signIn" />;
    }
    return children;
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/signIn" element={<SignIn />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Navbar />
            </ProtectedRoute>
          }
        >
          <Route
            index
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/assessment"
            element={
              <ProtectedRoute>
                <Assessment />
              </ProtectedRoute>
            }
          />
          <Route
            path="/result"
            element={
              <ProtectedRoute>
                <Result />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
