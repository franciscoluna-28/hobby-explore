import React from "react";
import { ToastContainer, toast, ToastOptions } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Toaster } from "sonner";

/**
 * Props for components wrapped with toast notification support.
 */

interface WithToastProps {
  showToast: (message: string, options?: ToastOptions) => void;
}

/**
 * Higher-order component that provides toast notification functionality to a wrapped component.
 * @template P - Props for the wrapped component.
 * @param {React.ComponentType<P & WithToastProps>} WrappedComponent - The component to wrap.
 * @returns {React.FC<P>} A new component with toast notification support.
 */
function withToastNotifications<P>(
  WrappedComponent: React.ComponentType<P & WithToastProps>
): React.FC<P> {
  /**
   * Function to show a toast notification.
   * @param {string} message - The message to display in the toast.
   * @param {ToastOptions} [options] - Optional toast options.
   * @returns {void}
   */
  const showToast = (message: string, options?: ToastOptions): void => {
    toast(message, options);
  };

  /**
   * The wrapped component with added toast notification functionality.
   * @param {P} props - Props for the wrapped component.
   * @returns {JSX.Element} The JSX for the wrapped component.
   */
  const WithToast: React.FC<P> = (props: P): JSX.Element => {
    return (
      <>
        <WrappedComponent {...props} showToast={showToast} />
        <Toaster richColors />
      </>
    );
  };

  return WithToast;
}

export default withToastNotifications;
