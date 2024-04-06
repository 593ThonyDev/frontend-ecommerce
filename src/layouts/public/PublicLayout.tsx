import { useNavigate } from "react-router-dom"
import Footer from "../../components/footer/Footer"
import Navbar from "../../components/navbar/public/Navbar"
import { LayoutProps } from "../LayoutProps"
import { processToken } from "../../functions/AuthApi"
import { useEffect, useState } from "react"
import React from "react"


const PublicLayout = ({ children }: LayoutProps) => {

  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    processToken(setIsLoading, navigate);
  }, [navigate]);

  return (
    <>
      {isLoading ? (
        null
      ) : (
        <React.Fragment>
          <Navbar />
          {children}
          <Footer />
        </React.Fragment>
      )}
    </>
  )
}

export default PublicLayout