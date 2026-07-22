import { useState, type FormEvent } from "react";
import { useAuth } from "../context/AuthContext";
import InputField from "../components/InputField";
import Button from "../components/Button";
import styles from "./LoginPage.module.css";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function LoginPage() {
  const { login, isLoading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [apiError, setApiError] = useState("");

  function validate(): boolean {
    const newErrors: { email?: string; password?: string } = {};

    if (!email.trim()) {
      newErrors.email = "El correo es requerido";
    } else if (!EMAIL_REGEX.test(email)) {
      newErrors.email = "Ingrese un correo válido";
    }

    if (!password) {
      newErrors.password = "La contraseña es requerida";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setApiError("");

    if (!validate()) return;

    try {
      await login(email, password);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setApiError(err.message);
      } else {
        setApiError("Error al iniciar sesión. Verifica tus credenciales.");
      }
    }
  }

  return (
    <div className={styles.page}>
      <form className={styles.card} onSubmit={handleSubmit} noValidate>
        <div className={styles.header}>
          <h1 className={styles.title}>TACO App</h1>
          <p className={styles.subtitle}>Iniciar Sesión</p>
        </div>

        {apiError && <div className={styles.apiError}>{apiError}</div>}

        <InputField
          label="Correo electrónico"
          type="email"
          placeholder="correo@ejemplo.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={errors.email}
          autoComplete="email"
          autoFocus
        />

        <InputField
          label="Contraseña"
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={errors.password}
          autoComplete="current-password"
        />

        <Button type="submit" isLoading={isLoading}>
          Iniciar Sesión
        </Button>
      </form>
    </div>
  );
}

export default LoginPage;
