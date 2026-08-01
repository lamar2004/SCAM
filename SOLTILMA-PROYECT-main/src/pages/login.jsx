import { useState, useEffect } from "react";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  CircularProgress,
  Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import SchoolIcon from "@mui/icons-material/School";
import Registro from "./Registro.jsx"; // Lo migraremos después
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, onSnapshot } from "firebase/firestore";
import { auth, db } from "../firebaseConfig/firebase.js";

const Logo_URL = "/images/soltilmaLogoSF.png";

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [loading, setLoading] = useState(false);
  const [mostrarRegistro, setMostrarRegistro] = useState(false);
  const navigate = useNavigate();

  // Escuchar cambios en el estado de autenticación (opcional, pero recomendado)
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        // Ya está logueado → cargar datos y redirigir
        cargarDatosUsuario(user.uid);
      }
    });
    return unsubscribe;
  }, []);

  const cargarDatosUsuario = (uid) => {
    const usuarioRef = doc(db, "usuarios", uid);
    const unsub = onSnapshot(usuarioRef, (docSnap) => {
      if (docSnap.exists()) {
        const datos = docSnap.data();
        const usuario = {
          uid: uid,
          nombre: datos.nombre || "",
          apellidos: datos.apellidos || "",
          email: datos.email,
          rol: datos.rol || "USUARIO",
        };

        localStorage.setItem("usuario", JSON.stringify(usuario));
        if (onLogin) onLogin(usuario);

        setMensaje(`¡Bienvenido ${usuario.nombre} ${usuario.apellidos}!`);

        // Redirección según rol
        setTimeout(() => {
          navigate(datos.rol === "ADMIN" ? "/admin" : "/clima");
        }, 800);
      }
    });

    return unsub;
  };

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      setMensaje("Por favor ingresa correo y contraseña.");
      return;
    }

    setLoading(true);
    setMensaje("");

    try {
      await signInWithEmailAndPassword(auth, email.trim(), password);
      // onAuthStateChanged se encargará de cargar datos y redirigir
    } catch (error) {
      setLoading(false);
      const msg = error.code;
      if (msg === "auth/user-not-found" || msg === "auth/wrong-password") {
        setMensaje("Correo o contraseña incorrectos.");
      } else if (msg === "auth/invalid-email") {
        setMensaje("Correo electrónico inválido.");
      } else if (msg === "auth/too-many-requests") {
        setMensaje("Demasiados intentos. Intenta más tarde.");
      } else {
        setMensaje("Error de conexión. Revisa tu internet.");
      }
    }
  };

  return (
    <>
      {!mostrarRegistro ? (
        <Container
          maxWidth="xs"
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            height: "100vh",
            color: "white",
          }}
        >
          <Box
            sx={{
              background: "rgb(0, 0, 0)",
              p: 4,
              borderRadius: 3,
              boxShadow: 3,
            }}
          >
            <img src={Logo_URL} alt="Logo" style={{ display: "block", margin: "0 auto", marginBottom: "16px", width: "100px", height: "100px" }} />
            <Typography variant="h4" textAlign="center" gutterBottom>
              Iniciar Sesión
            </Typography>

            <TextField
              label="Correo Electrónico"
              type="email"
              fullWidth
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
              sx={{backgroundColor:"white"}}
            />
            <TextField
              label="Contraseña"
              type="password"
              fullWidth
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              sx={{backgroundColor:"white"}}
            />

            <Button
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 2 }}
              onClick={handleLogin}
              disabled={loading}
              sx={{ mt: 2, backgroundColor: "#faf8f8", color: "black", "&:hover": { backgroundColor: "green", color:"white" } }}
            >
              {loading ? <CircularProgress size={24} /> : "Iniciar Sesión"}
            </Button>

            <Button
              variant="outlined"
              color="secondary"
              fullWidth
              sx={{ mt: 1 }}
              onClick={() => setMostrarRegistro(true)}
              disabled={loading}
              sx={{ mt: 1, borderColor: "#faf8f8", color: "white", "&:hover": { backgroundColor: "blue", color:"white" } }}
            >
              Registrarse
            </Button>

             <Button
              variant="outlined"
              color="secondary"
              fullWidth
              sx={{ mt: 1 }}
              onClick= {() => navigate("/")}
              disabled={loading}
              sx={{ mt: 1, borderColor: "#faf8f8", color: "white", "&:hover": { backgroundColor: "RED", color:"white" } }}
            >
              VOLVER A INICIO
            </Button>

            {mensaje && (
              <Alert
                severity={mensaje.includes("Bienvenido") ? "success" : "error"}
                sx={{ mt: 2 }}
              >
                {mensaje}
              </Alert>
            )}
          </Box>
        </Container>
      ) : (
        <Registro
          onBack={() => setMostrarRegistro(false)}
          onRegistroExitoso={() => {
            setMostrarRegistro(false);
            setMensaje("¡Registro exitoso! Ya puedes iniciar sesión.");
          }}
        />
      )}
    </>
  );
}
