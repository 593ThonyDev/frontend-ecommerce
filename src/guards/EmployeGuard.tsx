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

const EmployeGuard = ({ children }: AuthGuardProps) => {
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
        if (decoded.role === 'EMPLOYE') {
          return <>{children}</>;
        } else {
          logOutNavigate(navigate);
        }
      }
    } catch (error) {
      return <Navigate to={PATH_HOME} />;
    }
  } else {
    return <Navigate to={PATH_HOME} />;
  }
}

export default EmployeGuard;
