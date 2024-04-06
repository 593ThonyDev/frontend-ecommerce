import { Dialog } from "@headlessui/react";
import { useState, useEffect } from "react";

interface ModalProps {
  image?: string;
  title?: string;
  description?: string;
  size?: string;
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
}

const ModalIndex: React.FC<ModalProps> = ({ image, title, description, size, isOpen, onClose, children }) => {
  const [showFadeIn, setShowFadeIn] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShowFadeIn(true);
    }
  }, [isOpen]);

  const handleModalClose = () => {
    setShowFadeIn(false);

    setTimeout(() => {
      onClose();
    }, 100);
  };

  return (
    <>
      <Dialog
        open={isOpen}
        onClose={handleModalClose}
        className="fixed inset-0 z-50 overflow-y-auto p-4 lg:pt-[28vh]"
      >
        <Dialog.Overlay className="fixed inset-0 backdrop-blur-sm" onClick={handleModalClose} />
        <div
          className={`fixed left-0 right-0 mx-auto lg:mx-auto lg:rounded-2xl rounded-t-2xl bg-claro lg:bg-white dark:bg-obscuro-normal ring-1 ring-azul/40 dark:ring-azul/10 lg:dark:ring-azul/10 bottom-0 lg:my-auto lg:bottom-auto lg:top-auto
            ${size === "xl" ? "max-w-xl" : ""}
            ${size === "md" ? "max-w-md" : ""}
            ${size === "sm" ? "max-w-sm" : ""}
            ${size === "lg" ? "max-w-lg" : ""}
            ${showFadeIn ? "animate-fade-in-up lg:animate-none" : "animate-fade-out-down lg:animate-none"}
          `}
        >
          <div className='p-3'>
            {image ? (
              <>
                <div className="absolute right-3">
                  <div
                    onClick={handleModalClose}
                    className="text-gray-400 cursor-pointer rounded-full text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:bg-claro/10 lg:bg-claro bg-white hover:bg-gray-300/50 dark:hover:bg-white/20  focus:outline-none"
                  >
                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                    </svg>
                  </div>
                </div>
                <img src={image} className="w-32 h-32 mx-auto rounded-2xl p-5" alt="" />
                <div className="flex justify-center mt-2">
                  <span className="text-xl font-normal text-gray-600 dark:text-white/90">
                    {title}
                  </span>
                </div>
                <span className=" -space-y-4 mb-3 text-lg text-center font-normal text-gray-500 dark:text-white/50 flex justify-center">
                  {description}
                </span>
              </>
            ) : (
              <>
                <div className="flex justify-center">
                  <span className="text-xl font-normal text-gray-600 dark:text-white/90">
                    {title}
                  </span>
                </div>
                <span className=" mb-5 text-lg text-center font-normal text-gray-500 dark:text-white/50 flex justify-center">
                  {description}
                </span>
              </>
            )}
            {children}
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default ModalIndex;
