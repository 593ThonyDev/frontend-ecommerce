import { useState, useEffect } from "react";
import { ToastPosition } from "react-hot-toast";

export function useToasterPosition(): ToastPosition {
    const [toasterPosition, setToasterPosition] = useState<ToastPosition>('bottom-left');

    useEffect(() => {
        function handleResize() {
            if (window.innerWidth < 768) {
                setToasterPosition('bottom-center');
            } else {
                setToasterPosition('bottom-left');
            }
        }
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return toasterPosition;
}

export const toastStyles = "bg-white/70 border border-primary-200/50 backdrop-blur-xl text-black-500 rounded-full lg:rounded-xl"