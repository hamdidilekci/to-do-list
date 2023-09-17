import React from "react";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Container from "@mui/material/Container";
import TextField from "../../components/TextField.jsx";
import Typography from "../../components/Typography.jsx";

const footerContainerStyle = {
  backgroundColor: "#3874CB",
  color: "common.white",
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
    <Stack sx={footerContainerStyle}>
      <Container maxWidth="lg">
        <Grid
          container
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
        >
          <Grid item xs={12} sm={4}>
            <Stack sx={copyrightStyle}>
              {"© "}
              <Link
                href="https://www.linkedin.com/in/dilekcihamdi/"
                sx={{ color: "common.white" }}
              >
                Hamdi DİLEKÇİ{" "}
              </Link>
              {new Date().getFullYear()}
            </Stack>
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
    </Stack>
  );
}
