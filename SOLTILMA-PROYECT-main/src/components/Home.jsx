import { motion } from "framer-motion";
import {
  Box,
  Button,
  Container,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import DevicesIcon from "@mui/icons-material/Devices";
import StorageIcon from "@mui/icons-material/Storage";
import CloudIcon from "@mui/icons-material/Cloud";
import EngineeringIcon from "@mui/icons-material/Engineering";

export default function Home() {
  const navigate = useNavigate();

  const CloudGIFL = "/images/Cloud.gif";
  const INFO_IMAGE_URL = "/images/soltilmaLogoSF.png";
  const Imagen_Maquetado= "/images/Sistema2.png";

  const tecnologias = [
    {
      title: "Flutter",
      subtitle: "Desarrollo Móvil (App)",
      icon: <DevicesIcon sx={{ color: "primary.main", fontSize: 50 }} />,
      description: "Permite construir una única base de código para iOS y Android.",
    },
    {
      title: "React",
      subtitle: "Web y Móvil (App)",
      icon: <CloudIcon sx={{ color: "primary.main", fontSize: 50 }} />,
      description: "Estándar para crear interfaces dinámicas y modernas.",
    },
    {
      title: "Raspberry Pi / Arduino",
      subtitle: "Plataforma Hardware",
      icon: <StorageIcon sx={{ color: "primary.main", fontSize: 50 }} />,
      description: "Control inteligente y lectura de sensores en tiempo real.",
    },
  ];

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "rgb(0, 0, 0)", color: "white" }}>
      
      {/* HERO SECTION */}
      <Container maxWidth="lg" sx={{ pt: 8, pb: 12 }}>
        <motion.div
          initial={{ opacity: 0, x: -80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9 }}
        >
          <Box    
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              alignItems: "center",
              gap: 8,
              background: "#ffffff",
              p: { xs: 5, md: 8 },
              borderRadius: 5,
              color: "Black",
            }}
          >
            <Box sx={{ flex: 1 }}>
              <Typography variant="h2" fontWeight="bold" gutterBottom>
                INICIAR SESION
              </Typography>
              <Typography variant="h5">
                Accede a SCAM. El clima bajo tu control.
              </Typography>

              <Box sx={{ mt: 5, display: "flex", gap: 3, flexWrap: "wrap" }}>
                <Button
                  variant="contained"
                  size="large"
                  onClick={() => navigate("/login")}
                  sx={{ backgroundColor: "#000", px: 6, py: 1.5, color: "white", "&:hover": { backgroundColor: "gray", color:"white", transform: "translatex(3px)", transition: "all 0.3s ease" } }}
                >
                  Iniciar Sesión
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  onClick={() => navigate("/registro")}
                  sx={{backgroundColor:"BLACK", borderColor: "white", color: "white", px: 6, py: 1.5, "&:hover": { backgroundColor: "GRAY", color: "WHITE", transform: "translatex(3px)", transition: "all 0.3s ease" }  }}
                >
                  Crear perfil
                </Button>
              </Box>
            </Box>

            <Box sx={{flex:1, maxWidth:{md:480}}}>
              <video 
              autoPlay
              loop
              muted
              playsInline
              style={{
                width:"100%",
                height:"100%",
                borderRadius:"16px",
                objectFit:"cover",
                boxshadow:"0 10px 30px, rgba(0,0,0,0.3)",
              }}
              >
                <source src="../public/videos/Sistema_Bodega_Inteligente.mp4" type="video/mp4" />
              </video>
              </Box>
            </Box>
        </motion.div>
      </Container>

      {/* TECNOLOGÍAS - Con mejor espaciado */}
      <Container maxWidth="lg" sx={{ pb: 10 }}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <Typography variant="h4" align="center" gutterBottom sx={{ mb: 8, color: "white" }}>
            Tecnologías del proyecto
          </Typography>
        </motion.div>

        <Grid container spacing={3} sx={{display:"flex", justifyContent:"space-around"}}>
          {tecnologias.map((tech, index) => (
            <Grid item xs={7} sm={6} md={4} key={index}>
              <motion.div
                initial={{ opacity: 0, y: 80 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: index * 0.15 }}
              >
                <Paper
                  elevation={8}
                  sx={{
                    p: 5,
                    height: "100%",
                    textAlign: "center",
                    borderRadius: 4,
                    "&:hover": { transform: "translateY(-12px)", transition: "all 0.3s ease", boxShadow: 12 },
                  }}
                >
                  {tech.icon}
                  <Typography variant="h6" sx={{ mt: 3, fontWeight: "bold" }}>
                    {tech.title}
                  </Typography>
                  <Typography variant="subtitle1" color="primary.main" sx={{ mb: 2 }}>
                    {tech.subtitle}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {tech.description}
                  </Typography>
                </Paper>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* BLOQUE FINAL */}
      <Container maxWidth="lg" sx={{ pb: 12 }}>
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
        >
          <Paper elevation={10} sx={{ p: { xs: 5, md: 8 }, borderRadius: 5 }}>
            <Grid container spacing={6} alignItems="center">
              <Grid item xs={12} md={7}>
                <Typography variant="h4" fontWeight="bold" gutterBottom>
                  ¿Qué es SCAM?
                </Typography>
                <Typography variant="body1" paragraph>
                  Soltima es un proyecto de ingeniería multidisciplinario que tiene
                  como objetivo automatizar completamente el proceso de tender la ropa
                  mediante el desarrollo de un tendedero inteligente.
                </Typography>
              </Grid>
              <Grid item xs={12} md={5}>
                <Box sx={{flex:1, maxWidth:{md:480}}}/>
                <video 
                  autoPlay
                  loop
                  muted
                  playsInline
                  style={{
                    width:"100%",
                    height:"100%",
                    borderRadius:"16px",
                    objectFit:"cover",
                    boxshadow:"0 10px 30px, rgba(0,0,0,0.3)",
                  }}
                >
                  <source src="../public/videos/Escenario_Empresarial.mp4" type="video/mp4" />
                </video>
              </Grid>
            </Grid>
          </Paper>
        </motion.div>
      </Container>

      <Container maxWidth="lg" sx={{ pb: 12 }}>
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
        >
          <Paper elevation={10} sx={{ p: { xs: 5, md: 8 }, borderRadius: 5 }}>
            <Grid container spacing={6} alignItems="center">
              <Grid item xs={12} md={7}>
                <Typography variant="h4" fontWeight="bold" gutterBottom>
                   Gestión de Ventilación y Humedad (El Entorno)
                </Typography>
                <ul>
                  <li>
                    <Typography variant="body1" paragraph>
                      Función: Controlar la calidad del aire interior. Si el aire está saturado de agua, no importa cuánto muevas el rack, nada se secará.
                    </Typography>
                  </li>
                  <Typography variant="body1" fontFamily={'bold'} paragraph>
                      INTELIGENCIA
                  </Typography>
                  <li>
                    <Typography variant="body1" paragraph>
                      Modo Abierto: Si afuera está seco, abre extractores y usa aire natural (costo $0$).
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="body1" paragraph>
                        Modo Cerrado (Lluvia): Cierra compuertas, activa deshumidificadores y recircula el aire interno para "extraerle" el agua mecánicamente.
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="body1" paragraph>
                      Hardware clave: Extractores axiales, sensores DHT22 (o industriales) y relés para los deshumidificadores.
                    </Typography>
                  </li>
                </ul>
              </Grid>
              <Grid item xs={12} md={5}>
                <Box sx={{flex:1, maxWidth:{md:480}}}/>
                <img src="/public/images/Sistema2.png" style={{width:"100%", height:"100%", borderRadius:"16px", objectFit:"cover"}} />
              </Grid>
            </Grid>
          </Paper>
        </motion.div>
      </Container>


    </Box>
  );
}