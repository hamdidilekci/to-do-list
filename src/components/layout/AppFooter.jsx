import React from "react";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Container from "@mui/material/Container";

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
      </Container>
    </Stack>
  );
}
