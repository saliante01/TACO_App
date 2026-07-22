import type { InputHTMLAttributes } from "react";
import styles from "./InputField.module.css";

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

function InputField({ label, error, id, className, ...props }: InputFieldProps) {
  const inputId = id || label.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className={`${styles.wrapper} ${className || ""}`}>
      <label htmlFor={inputId} className={styles.label}>
        {label}
      </label>
      <input
        id={inputId}
        className={`${styles.input} ${error ? styles.hasError : ""}`}
        {...props}
      />
      {error && <span className={styles.error}>{error}</span>}
    </div>
  );
}

export default InputField;
