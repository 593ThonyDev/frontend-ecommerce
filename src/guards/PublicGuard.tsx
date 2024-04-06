import { getToken, logOutNavigate } from "../functions/AuthApi";
import { PATH_HOME } from "../routes/public/Paths";
import { Navigate, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import React from "react";

interface JwtPayload {
  exp: number;
  role: string;
}

interface AuthGuardProps {
  children: React.ReactNode;
}

const AuthGuard = ({ children }: AuthGuardProps) => {
  const token = getToken();
  const navigate = useNavigate();

  if (token) {
    try {
      const decoded: JwtPayload = jwtDecode(token);

      const now = Math.floor(Date.now() / 1000);

      if (decoded.exp < now) {
        logOutNavigate(navigate);
        return <Navigate to={PATH_HOME} />;
      } else {
        if (decoded.role === 'CUSTOMER') {
          return <>{children}</>;
        } else {
          logOutNavigate(navigate);
          return <Navigate to={PATH_HOME} />;
        }
      }
    } catch (error) {
      return <Navigate to={PATH_HOME} />;
    }
  } else {
    logOutNavigate(navigate);
  }
}

export default AuthGuard;
