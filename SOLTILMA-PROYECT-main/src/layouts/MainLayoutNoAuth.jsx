import { Box } from "@mui/material";
import HeaderPrincipal from "../components/HeaderPrincipal.jsx";
import Home from "../components/Home.jsx";
import Footer from "../components/Footer.jsx";

export default function MainLayoutNoAuth() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <HeaderPrincipal />

      {/* Contenido principal que crece */}
      <Box sx={{ flex: 1 }}>
        <Home />
      </Box>

      {/* Footer siempre al final */}
      <Footer />
    </Box>
  );
}