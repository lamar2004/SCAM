import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Box } from "@mui/material";
import { onAuthStateChanged } from "firebase/auth";
import { doc, onSnapshot } from "firebase/firestore";

import { auth, db } from "./firebaseConfig/firebase.js";

import Header from "./pages/Header.jsx";
import Datos from "./pages/Datos.jsx";
import Clima from "./pages/Clima.jsx";
import Analisis from "./pages/Analisis.jsx";
import DatosPersonales from "./pages/DatosPersonales.jsx";
import AdminPanel from "./pages/AdminPanel.jsx";
import PanelIndustrial from "./pages/PanelIndustrial.jsx";
import Login from "./pages/login.jsx";
import Registro from "./pages/Registro.jsx";

import MainLayoutNoAuth from "./layouts/MainLayoutNoAuth.jsx";

export default function App() {
  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(true);

  // Carga mejorada: Firebase Auth + Firestore en tiempo real
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        const userRef = doc(db, "usuarios", firebaseUser.uid);

        const unsubDoc = onSnapshot(userRef, (snap) => {
          if (snap.exists()) {
            const data = snap.data();
            const usuarioCompleto = {
              uid: firebaseUser.uid,
              email: firebaseUser.email,
              ...data,
            };
            localStorage.setItem("usuario", JSON.stringify(usuarioCompleto));
            setUsuario(usuarioCompleto);
          }
          setLoading(false);
        });

        return () => unsubDoc();
      } else {
        localStorage.removeItem("usuario");
        setUsuario(null);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("usuario");
    setUsuario(null);
  };

  if (loading) {
    return <Box sx={{ textAlign: "center", mt: 10 }}>Cargando aplicación...</Box>;
  }

  return (
    <Router>
      <Routes>
        {/* Página Pública */}
        <Route
          path="/"
          element={
            usuario ? (
              <Navigate
                to={
                  usuario.rol === "ADMIN"
                    ? "/admin"
                    : usuario.rol === "INDUSTRIA"
                    ? "/panel-industrial"
                    : "/analisis"
                }
                replace
              />
            ) : (
              <MainLayoutNoAuth />
            )
          }
        />

        <Route path="/login" element={usuario ? <Navigate to="/" replace /> : <Login onLogin={() => {}} />} />
        <Route path="/registro" element={usuario ? <Navigate to="/" replace /> : <Registro />} />

        {/* Rutas Protegidas */}
        {usuario && (
          <Route
            path="/*"
            element={
              <>
                <Header usuario={usuario} onLogout={handleLogout} />
                <Box sx={{ flex: 1, p: { xs: 2, md: 4 } }}>
                  <Routes>
                    <Route path="/analisis" element={<Analisis usuario={usuario} />} />
                    <Route path="/clima" element={<Clima />} />
                    <Route path="/datos-personales" element={<DatosPersonales usuario={usuario} />} />
                    <Route path="/panel-industrial" element={<PanelIndustrial usuario={usuario} />} />

                    {usuario.rol === "ADMIN" && (
                      <>
                        <Route path="/datos" element={<Datos usuario={usuario} />} />
                        <Route path="/admin" element={<AdminPanel />} />
                      </>
                    )}

                    <Route
                      path="*"
                      element={
                        <Navigate
                          to={
                            usuario.rol === "ADMIN"
                              ? "/admin"
                              : usuario.rol === "INDUSTRIA"
                              ? "/panel-industrial"
                              : "/analisis"
                          }
                          replace
                        />
                      }
                    />
                  </Routes>
                </Box>
              </>
            }
          />
        )}

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}