import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, Stack, Container, IconButton } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";

function AboutUs() {
  const navigateTo = useNavigate();

  return (
    <Container>
      <IconButton>
        <HomeIcon fontSize="large" onClick={navigateTo("/")} />
      </IconButton>
    </Container>
  );
}

export default AboutUs;
