import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export function getEmailInitial(email: string) {
  if (!email || typeof email !== "string") return "";
  return email.charAt(0).toUpperCase();
}
export function getNameInitials(fullName: string) {
  if (!fullName || typeof fullName !== "string") return "";

  const words = fullName.trim().split(" ");
  const initials = words.map((word) => word.charAt(0).toUpperCase());

  return initials.join("");
}
