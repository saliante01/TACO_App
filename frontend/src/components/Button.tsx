import type { ButtonHTMLAttributes, ReactNode } from "react";
import styles from "./Button.module.css";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  isLoading?: boolean;
  variant?: "primary" | "secondary";
}

function Button({
  children,
  isLoading = false,
  variant = "primary",
  disabled,
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`${styles.button} ${styles[variant]} ${className || ""}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? <span className={styles.spinner} /> : children}
    </button>
  );
}

export default Button;
