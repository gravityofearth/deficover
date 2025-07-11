import { /*Bounce, */ ToastOptions, toast, Flip, ToastContent } from "react-toastify";
import { RiskLevelType } from "./data";
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
export const formatValueInLatin = (value: number) => {
  if (value >= 1000000000) {
    return ((value / 1000000000).toFixed(1) + "B").replace(".0B", "B");
  } else if (value >= 1000000) {
    return ((value / 1000000).toFixed(1) + "M").replace(".0M", "M");
  } else if (value >= 1000) {
    return ((value / 1000).toFixed(1) + "K").replace(".0K", "K");
  } else {
    return value.toString();
  }
}

export const riskStyle: { [key in RiskLevelType]: string } = {
  "Low": "bg-green-500/20 text-green-500",
  "Medium": "bg-yellow-500/20 text-yellow-500",
  "High": "bg-red-500/20 text-red-500"
}