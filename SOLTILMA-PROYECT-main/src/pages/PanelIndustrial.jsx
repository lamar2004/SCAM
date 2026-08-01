import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Paper,
  CircularProgress,
  Alert,
} from "@mui/material";
import { Factory } from "@mui/icons-material";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebaseConfig/firebase.js";

export default function PanelIndustrial({ usuario }) {
  const [datos, setDatos] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  const idEsp = usuario?.id_esp?.trim();

  console.log("👤 Usuario completo:", usuario);
  console.log("🔑 ID ESP recibido:", idEsp);

  useEffect(() => {
    if (!idEsp) {
      setError("No se encontró 'id_esp' en el perfil del usuario.");
      setCargando(false);
      return;
    }

    console.log(`📡 Intentando leer: tendederos/${idEsp}`);

    const unsub = onSnapshot(doc(db, "tendederos", idEsp), (docSnap) => {
      console.log("📥 Documento existe:", docSnap.exists());

      if (docSnap.exists()) {
        const data = docSnap.data();
        console.log("✅ Datos del tendedero:", data);
        setDatos(data);
      } else {
        setError(`No existe el documento tendederos/${idEsp}`);
      }
      setCargando(false);
    });

    return () => unsub();
  }, [idEsp]);

  if (cargando) {
    return (
      <Box sx={{ textAlign: "center", mt: 10 }}>
        <CircularProgress size={80} />
        <Typography sx={{ mt: 3 }}>Cargando sistema industrial...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ maxWidth: 700, mx: "auto", mt: 8, p: 3 }}>
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
        <Typography variant="body1" align="center">
          ID ESP actual: <strong>{idEsp || "NO DEFINIDO"}</strong>
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h3" align="center" gutterBottom>
        Panel Industrial - {usuario?.nombreIndustria}
      </Typography>
      <Paper sx={{ p: 5, textAlign: "center" }}>
        <Factory sx={{ fontSize: 100 }} />
        <Typography variant="h4" sx={{ mt: 3 }}>
          Sistema conectado correctamente
        </Typography>
      </Paper>
    </Box>
  );
}