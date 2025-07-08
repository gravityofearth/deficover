import { /*Bounce, */ ToastOptions, toast, Flip, ToastContent } from "react-toastify";
const config: ToastOptions = {
  position: "top-center",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  pauseOnFocusLoss: false,
  draggable: true,
  progress: undefined,
  theme: "dark",
  transition: Flip,
  style: { padding: "1.5vw" }
}
export function isValidEmail(email: string) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}
export const showToast = (msg: ToastContent<unknown>, type: "info" | "error" | "success" | "warn", options?: ToastOptions) => {
  if (type === "info") {
    return toast.info(msg, { ...config, ...options })
  } else if (type === "success") {
    return toast.success(msg, { ...config, ...options })
  } else if (type === "warn") {
    return toast.warn(msg, { ...config, ...options })
  } else {
    // if (type === "error") {
    return toast.error(msg, { ...config, ...options });
  }
}