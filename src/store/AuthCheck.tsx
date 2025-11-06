import React from "react";
import { useNavigate } from "react-router-dom";
import SkeletonComponent from "../component/Skeleton";
import userAuth from "./userStore";

const AuthCheck = ({ children }: { children: React.ReactNode }) => {
  const { isActive, isCheckingActive } = userAuth();

  const navigate = useNavigate();

  if (isCheckingActive) {
    return <SkeletonComponent />;
  } else if (!isActive && !isCheckingActive) {
    navigate("/");
    return;
  } else {
    return children;
  }
};

export default AuthCheck;
