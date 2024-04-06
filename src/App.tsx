import { Toaster } from "react-hot-toast";
import { BrowserRouter, Routes } from "react-router-dom";
import { renderRoutes } from "./routes";
import { routes } from "./routes/routes";
import Loader from "./loaders/Loader";
import { Transition } from "@headlessui/react";
import { useEffect, useState } from "react";
import { toastStyles, useToasterPosition } from "./components/toast/toast";



function App() {

  const [isLoading, setIsLoading] = useState(true);
  const toasterPosition = useToasterPosition();

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 800);
  }, []);

  return (
    <BrowserRouter>
      <Toaster position={toasterPosition}
        toastOptions={{
          loading: {        
            className: toastStyles,
          },
          success: {
            className: toastStyles,
          },
          error: {
            className: toastStyles,
          },
        }}
      />
      {isLoading && (
        <Transition
          show={isLoading}
          enter="transition-opacity duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Loader />
        </Transition>
      )}
      {!isLoading && (
        <Routes>{renderRoutes(routes)}</Routes>
      )}
    </BrowserRouter>
  )
}

export default App;
