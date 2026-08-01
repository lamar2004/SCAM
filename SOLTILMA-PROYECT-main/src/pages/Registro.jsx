import { useState } from "react";
import {
  Box, Button, Container, TextField, Typography,
  CircularProgress, Alert, FormControl, InputLabel, Select, MenuItem
} from "@mui/material";
import SchoolIcon from "@mui/icons-material/School";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebaseConfig/firebase.js";

const logoURL = "/images/soltilmaLogoSF.png";

export default function Registro({ onBack, onRegistroExitoso }) {
  const [form, setForm] = useState({
    nombre: "",
    apellidos: "",
    correo: "",
    password: "",
    id_esp: "",
    tipoUso: "",           // "PERSONAL" o "INDUSTRIAL"
    nombreIndustria: "",
    rfc: "",
    direccion: "",
    telefono: "",
  });

  const [mensaje, setMensaje] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegistro = async () => {
    const { nombre, apellidos, correo, password, id_esp, tipoUso } = form;

    if (!nombre || !apellidos || !correo || !password || !id_esp || !tipoUso) {
      setMensaje("Todos los campos obligatorios deben completarse.");
      return;
    }

    if (tipoUso === "INDUSTRIAL" && (!form.nombreIndustria || !form.rfc)) {
      setMensaje("Para uso industrial, nombre de empresa y RFC son obligatorios.");
      return;
    }

    setLoading(true);
    setMensaje("");

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, correo.trim(), password);
      const user = userCredential.user;

      const userData = {
        uid: user.uid,
        nombre: nombre.trim(),
        apellidos: apellidos.trim(),
        email: correo.trim(),
        id_esp: id_esp.trim().toUpperCase(),
        rol: tipoUso === "INDUSTRIAL" ? "INDUSTRIA" : "USUARIO",
        tipoUso: tipoUso,
        fechaRegistro: new Date().toISOString(),
      };

      // Datos adicionales solo para industria
      if (tipoUso === "INDUSTRIAL") {
        userData.nombreIndustria = form.nombreIndustria.trim();
        userData.rfc = form.rfc.trim().toUpperCase();
        userData.direccion = form.direccion.trim();
        userData.telefono = form.telefono.trim();
      }

      await setDoc(doc(db, "usuarios", user.uid), userData);

      setMensaje("¡Registro exitoso!");

      const usuarioLogueado = { ...userData };

      localStorage.setItem("usuario", JSON.stringify(usuarioLogueado));

      if (onRegistroExitoso) {
        setTimeout(() => onRegistroExitoso(usuarioLogueado), 1200);
      }
    } catch (error) {
      setLoading(false);
      let msg = "Error en el registro";
      if (error.code === "auth/email-already-in-use") msg = "Este correo ya está registrado.";
      if (error.code === "auth/weak-password") msg = "La contraseña debe tener mínimo 6 caracteres.";
      setMensaje(msg);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ display: "flex", justifyContent: "center", Height: "100vh", py: 4 }}>
      <Box sx={{ background: "rgb(0, 0, 0)", p: 5, borderRadius: 4, boxShadow: 5, width: "100%", maxWidth: 700 }}>
        <img src={logoURL} alt="Logo" style={{ display: "block", margin: "0 auto", marginBottom: "16px", width: "100px", height: "100px" }} />
        <Typography variant="h4" textAlign="center" gutterBottom sx={{color:"white"}}>
          Registro de Usuario
        </Typography>

        {/* Campos generales */}
        <TextField sx={{backgroundColor:"white"}} label="Nombre" fullWidth margin="normal" value={form.nombre} onChange={(e) => setForm({ ...form, nombre: e.target.value })} />
        <TextField sx={{backgroundColor:"white"}} label="Apellidos" fullWidth margin="normal" value={form.apellidos} onChange={(e) => setForm({ ...form, apellidos: e.target.value })} />
        <TextField sx={{backgroundColor:"white"}} label="Correo Electrónico" type="email" fullWidth margin="normal" value={form.correo} onChange={(e) => setForm({ ...form, correo: e.target.value })} />
        <TextField sx={{backgroundColor:"white"}} label="Contraseña" type="password" fullWidth margin="normal" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} helperText="Mínimo 6 caracteres" />

        <TextField sx={{backgroundColor:"white"}} label="ID del ESP8266" fullWidth margin="normal" value={form.id_esp} onChange={(e) => setForm({ ...form, id_esp: e.target.value })} helperText="Ej: ESP-001A, TEX-IND-03" />

        {/* Tipo de Uso */}
        <FormControl fullWidth margin="normal">
          <InputLabel>Tipo de Uso</InputLabel>
          <Select
          sx={{backgroundColor:"white"}}
            value={form.tipoUso}
            label="Tipo de Uso"
            onChange={(e) => setForm({ ...form, tipoUso: e.target.value })}
          >
            <MenuItem value="PERSONAL">Uso Personal / Doméstico</MenuItem>
            <MenuItem value="INDUSTRIAL">Uso Industrial (Secado Textil)</MenuItem>
          </Select>
        </FormControl>

        {/* Campos solo para Industria */}
        {form.tipoUso === "INDUSTRIAL" && (
          <>
            <TextField sx={{backgroundColor:"white"}} label="Nombre de la Industria / Empresa" fullWidth margin="normal" value={form.nombreIndustria} onChange={(e) => setForm({ ...form, nombreIndustria: e.target.value })} />
            <TextField sx={{backgroundColor:"white"}} label="RFC" fullWidth margin="normal" value={form.rfc} onChange={(e) => setForm({ ...form, rfc: e.target.value })} helperText="Ej: ABC123456XYZ" />
            <TextField sx={{backgroundColor:"white"}} label="Dirección de la Planta" fullWidth margin="normal" value={form.direccion} onChange={(e) => setForm({ ...form, direccion: e.target.value })} />
            <TextField sx={{backgroundColor:"white"}} label="Teléfono de Contacto" fullWidth margin="normal" value={form.telefono} onChange={(e) => setForm({ ...form, telefono: e.target.value })} />
          </>
        )}

        <Button variant="contained" fullWidth sx={{ mt: 3, py: 1.5 ,color:"white", backgroundColor: "black", "&:hover": { backgroundColor: "green" } }} onClick={handleRegistro} disabled={loading}>
          {loading ? <CircularProgress size={24} /> : "Registrarse"}
        </Button>

         <Button
          variant="text"
          fullWidth
          color="secondary"
          onClick={() => (window.location.href = "/")}
          disabled={loading}
          sx={{ mt: 1,  color: "white", "&:hover": { backgroundColor: "red", color:"white" } }}
        >
          Volver Pagina de Inicio
        </Button>

        {mensaje && <Alert severity={mensaje.includes("exitoso") ? "success" : "error"} sx={{ mt: 2 }}>{mensaje}</Alert>}
      </Box>
    </Container>
  );
}