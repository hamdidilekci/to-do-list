import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";

const footerContainerStyle = {
  backgroundColor: "#28282a",
  color: "common.white",
  paddingBottom: "20px",
};

const copyrightStyle = {
  fontSize: 16,
  color: "common.white",
  textAlign: "center",
  padding: "8px",
};

const LANGUAGES = [
  {
    code: "en-US",
    name: "English",
  },
  {
    code: "fr-FR",
    name: "Français",
  },
];

export default function AppFooter() {
  return (
    <Box sx={footerContainerStyle}>
      <Container maxWidth="lg">
        <Grid
          container
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
        >
          <Grid item xs={12} sm={4}>
            <Box sx={copyrightStyle}>
              {"© "}
              <Link
                href="https://www.linkedin.com/in/dilekcihamdi/"
                sx={{ color: "common.white" }}
              >
                Hamdi DİLEKÇİ{" "}
              </Link>
              {new Date().getFullYear()}
            </Box>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Grid container alignItems="center">
              <Grid item xs={3}>
                <Typography variant="subtitle1" sx={{ color: "common.white" }}>
                  Language
                </Typography>
              </Grid>
              <Grid item xs={3} sx={{ backgroundColor: "#656575" }}>
                <TextField
                  select
                  size="small"
                  variant="outlined"
                  SelectProps={{
                    native: true,
                  }}
                  sx={{
                    width: "100%",
                  }}
                >
                  {LANGUAGES.map((language) => (
                    <option value={language.code} key={language.code}>
                      {language.name}
                    </option>
                  ))}
                </TextField>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
