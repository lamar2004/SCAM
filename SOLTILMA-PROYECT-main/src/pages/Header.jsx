import { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Chip,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import SchoolIcon from "@mui/icons-material/School";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import PersonIcon from "@mui/icons-material/Person";
import MenuIcon from "@mui/icons-material/Menu";
import SettingsIcon from "@mui/icons-material/Settings";
import { signOut } from "firebase/auth";
import { auth } from "../firebaseConfig/firebase.js";
import PanelIndustrial from "../pages/PanelIndustrial.jsx";

export default function Header({ usuario, onLogout }) {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleLogout = async () => {
    await signOut(auth);
    if (onLogout) onLogout();
    navigate("/");
  };

  const rol = usuario?.rol || "USUARIO";

  return (
    <AppBar position="static" sx={{ background: "rgb(255, 255, 255)", display: "flex", flexDirection: "row", justifyContent: "space-around", boxShadow: 4, gap: 15, borderRadius: 100, width: "1300px", width: { xs: "98%", sm: "90%", lg: "1300px" }, mx: "auto", mt: 2 }}>
      <Toolbar sx={{ minHeight: { xs: 64, sm: 70 }, px: { xs: 2, sm: 3 } }}>
        {/* Logo */}
        <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1, gap: 1 }}>
          <SchoolIcon sx={{ fontSize: { xs: 32, sm: 40 }, mr: 1 }} />
          <Box sx={{  margin: 5, display: "flex", flexDirection: "column" }}>
          <Typography
            variant="h5"
            sx={{ fontWeight: "bold", fontSize: { xs: "20px", sm: "1.8rem" } }}
          >
            SCAM
          </Typography>
          </Box>
        </Box>

        {/* Menú Desktop */}
        <Box sx={{ display: { xs: "none", md: "flex" }, gap: 6, alignItems: "center" }}>
          {rol === "ADMIN" && (
            <>
              <Button color="inherit" component={Link} to="/datos" sx={{ transition: "transform 0.3s",
                "&:hover": {
                  transform: "translateY(-5px)",
                  boxShadow: 6, backgroundColor: "#000000" , color: "#ffffff"}}}>Usuarios</Button>
              <Button color="inherit" component={Link} to="/admin" sx={{ transition: "transform 0.3s",
                "&:hover": {
                  transform: "translateY(-5px)",
                  boxShadow: 6, backgroundColor: "#000000" , color: "#ffffff"}}}>Admin Panel</Button>
            </>
          )}

          {rol === "INDUSTRIA" && (
            <>
              <Button color="inherit" component={Link} to="/analisis" sx={{ transition: "transform 0.3s",
                "&:hover": {
                  transform: "translateY(-5px)",
                  boxShadow: 6,}}}>Monitoreo</Button>
              <Button color="inherit" component={Link} to="/panel-industrial" sx={{ transition: "transform 0.3s",
                "&:hover": {
                  transform: "translateY(-5px)",
                  boxShadow: 6,}}}>Panel Industrial</Button>
            </>
          )}

          {rol === "USUARIO" && (
            <>
              <Button color="inherit" component={Link} to="/analisis" sx={{ transition: "transform 0.3s",
                "&:hover": {
                  transform: "translateY(-5px)",
                  boxShadow: 6, backgroundColor: "#000000" , color: "#ffffff"}}}>Análisis</Button>
              <Button color="inherit" component={Link} to="/clima" sx={{ transition: "transform 0.3s",
                "&:hover": {
                  transform: "translateY(-5px)",
                  boxShadow: 6, backgroundColor: "#000000" , color: "#ffffff"}}}>Clima</Button>
              <Button color="inherit" component={Link} to="/datos-personales" sx={{ transition: "transform 0.3s",
                "&:hover": {
                  transform: "translateY(-5px)",
                  boxShadow: 6, backgroundColor: "#000000" , color: "#ffffff"}}}>Mis Datos</Button>
            </>
          )}
        </Box>

        {/* Información del Usuario + Cerrar Sesión */}
        <Box sx={{ display: { xs: "none", md: "flex" }, alignItems: "center", gap: 2 }}>
          <PersonIcon />

          <Box>
            <Typography variant="body1" sx={{ fontWeight: "bold" }}>
              {usuario?.nombre} {rol === "INDUSTRIA" && `(${usuario?.nombreIndustria})`}
            </Typography>
            <Typography variant="caption" sx={{ display: "block", textAlign: "right" }}>
              {rol}
            </Typography>
          </Box>

          {/* Estado del Sistema (Solo para Industria) */}
          {rol === "INDUSTRIA" && (
            <Chip
              label="Sistema Activo"
              color="success"
              size="small"
              sx={{ ml: 2 }}
            />
          )}

          <Button
            color="inherit"
            variant="outlined"
            startIcon={<ExitToAppIcon />}
            onClick={handleLogout}
            sx={{ borderColor: "white", ml: 2 , transition: "transform 0.3s",
                "&:hover": {
                  transform: "translateY(-5px)",
                  boxShadow: 6, backgroundColor: "#000000" , color: "#ffffff"}}
              }
          >
            Cerrar Sesión
          </Button>
        </Box>

        {/* Menú Móvil */}
        <Box sx={{ display: { xs: "flex", md: "none" } }}>
          <IconButton color="inherit" onClick={handleMenu}>
            <MenuIcon />
          </IconButton>
          <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
            {/* Opciones según rol */}
            {rol === "ADMIN" && (
              <>
                <MenuItem component={Link} to="/datos" onClick={handleClose}>Gestión de Usuarios</MenuItem>
                <MenuItem component={Link} to="/admin" onClick={handleClose}>Panel Administrador</MenuItem>
              </>
            )}

            {rol === "INDUSTRIA" && (
              <>
                <MenuItem component={Link} to="/analisis" onClick={handleClose}>Monitoreo en Tiempo Real</MenuItem>
                <MenuItem component={Link} to="/panel-industrial" onClick={handleClose}>Panel Industrial</MenuItem>
              </>
            )}

            {rol === "USUARIO" && (
              <>
                <MenuItem component={Link} to="/analisis" onClick={handleClose}>Análisis</MenuItem>
                <MenuItem component={Link} to="/clima" onClick={handleClose}>Clima</MenuItem>
                <MenuItem component={Link} to="/datos-personales" onClick={handleClose}>Mis Datos</MenuItem>
              </>
            )}

            <MenuItem onClick={() => { handleClose(); handleLogout(); }}>
              <ExitToAppIcon sx={{ mr: 1 }} /> Cerrar Sesión
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}