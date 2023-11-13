import React, { useState, createRef } from "react";
import { useBackend } from "../context/backend-context.jsx";
import Swal from "sweetalert2";
import { Grid, Fab, Box, Card } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { Field, Form, FormSpy } from "react-final-form";
import Typography from "../components/Typography.jsx";
import AppForm from "../components/layout/AppForm.jsx";
import RFTextField from "../components/form/RFTextField.jsx";
import FormButton from "../components/form/FormButton.jsx";
import FormFeedback from "../components/form/FormFeedback.jsx";
import convertToBase64 from "../helpers/fileToBase64.js";

const Profile = () => {
  const [sent, setSent] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = createRef();

  const backend = useBackend();

  const isAuthenticated = localStorage.getItem("token") !== null;

  // handle image input
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  let selectedFileUrl;
  selectedFile && (selectedFileUrl = URL.createObjectURL(selectedFile));

  // Handle form submission
  const handleSubmit = async (values) => {
    setSent(true);

    const file = fileInputRef.current.files[0];

    if (file) {
      const base64File = await convertToBase64(file);

      values.avatar = base64File;
    }

    await backend.put("auth/update-profile", values).then((response) => {
      if (response) {
        // update localstorage with new values and add storage event
        localStorage.setItem("user", JSON.stringify(response));
        Swal.fire({
          icon: "success",
          title: "Profile Updated Successfully",
          timer: 3500,
        });
      }
      setSent(false);
    });
  };

  return (
    isAuthenticated && (
      <AppForm>
        <>
          <Typography variant="h3" gutterBottom marked="center" align="center">
            General information
          </Typography>
        </>
        <Form
          onSubmit={handleSubmit}
          subscription={{ submitting: true }}
          render={({ handleSubmit, submitting }) => (
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                {/* Add file input for avatar */}
                <Grid item xs={12} sm={12}>
                  <Card
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      p: 2,
                    }}
                  >
                    <label htmlFor="avatar">
                      <input
                        ref={fileInputRef}
                        style={{ display: "none" }}
                        id="avatar"
                        name="avatar"
                        type="file"
                        accept=".jpg, .png, .jpeg"
                        onChange={handleFileChange}
                      />
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          cursor: "pointer",
                        }}
                      >
                        {selectedFile ? (
                          <>
                            <img
                              src={selectedFileUrl}
                              alt={selectedFile.name}
                              width={150}
                              height={150}
                              style={{
                                borderRadius: "50%",
                                marginBottom: 1,
                              }}
                            />
                            <Typography
                              variant="subtitle1"
                              color="textSecondary"
                            >
                              {selectedFile.name}
                            </Typography>
                          </>
                        ) : (
                          <>
                            <Fab
                              color="secondary"
                              size="small"
                              component="span"
                              aria-label="add"
                              variant="extended"
                            >
                              <AddIcon /> Upload photo
                            </Fab>
                          </>
                        )}
                      </Box>
                    </label>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Field
                    autoFocus
                    component={RFTextField}
                    disabled={submitting || sent}
                    autoComplete="given-name"
                    fullWidth
                    label="First name"
                    name="firstName"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Field
                    component={RFTextField}
                    disabled={submitting || sent}
                    autoComplete="family-name"
                    fullWidth
                    label="Last name"
                    name="lastName"
                  />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <Field
                    component={RFTextField}
                    disabled={submitting || sent}
                    autoComplete="email"
                    fullWidth
                    label="Email"
                    name="email"
                    type="email"
                    required
                  />
                </Grid>
              </Grid>
              <FormSpy subscription={{ submitError: true }}>
                {({ submitError }) =>
                  submitError ? (
                    <FormFeedback error sx={{ mt: 2 }}>
                      {submitError}
                    </FormFeedback>
                  ) : null
                }
              </FormSpy>
              <FormButton
                sx={{ mt: 3, mb: 2 }}
                disabled={submitting || sent}
                size="small"
                color="secondary"
                fullWidth
              >
                {submitting || sent ? "In progress…" : "Update"}
              </FormButton>
            </form>
          )}
        />
      </AppForm>
    )
  );
};

export default Profile;
