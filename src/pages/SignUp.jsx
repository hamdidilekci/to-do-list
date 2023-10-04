import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Grid, Link, Card, Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { Field, Form, FormSpy } from "react-final-form";
import Typography from "../components/Typography.jsx";
import AppForm from "../components/layout/AppForm.jsx";
import { email, required } from "../components/form/validation.jsx";
import RFTextField from "../components/form/RFTextField.jsx";
import FormButton from "../components/form/FormButton.jsx";
import FormFeedback from "../components/form/FormFeedback.jsx";
import { useBackend } from "../context/backend-context.jsx";
import convertToBase64 from "../helpers/fileToBase64.js";

function SignUp() {
  const [sent, setSent] = React.useState(false);
  const navigateTo = useNavigate();
  const backend = useBackend();
  const [selectedFile, setSelectedFile] = React.useState(null);

  const fileInputRef = React.createRef();

  // handle image input
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  let selectedFileUrl;
  selectedFile && (selectedFileUrl = URL.createObjectURL(selectedFile));

  const validate = (values) => {
    const errors = required(
      ["firstName", "lastName", "email", "password"],
      values
    );

    if (!errors.email) {
      const emailError = email(values.email);
      if (emailError) {
        errors.email = emailError;
      }
    }

    return errors;
  };

  const handleSubmit = async (values) => {
    setSent(true);
    const file = fileInputRef.current.files[0];

    if (file) {
      const base64File = await convertToBase64(file);

      values.avatar = base64File;
    }
    // Send a POST request to backend endpoint with the form values
    await backend.post("auth/sign-up", values, false).then((response) => {
      if (response) {
        // save user data and token to cache
        localStorage.setItem("token", response.accessToken);
        localStorage.setItem("user", JSON.stringify(response.user));
        // navigate to home page
        navigateTo("/Sign-in");
      }
      setSent(false);
    });
  };

  return (
    <>
      <AppForm>
        <>
          <Typography variant="h3" gutterBottom marked="center" align="center">
            Sign Up
          </Typography>
          <Typography variant="body2" align="center">
            <Link href="/Sign-in" underline="always">
              Already have an account?
            </Link>
          </Typography>
        </>
        <Form
          onSubmit={handleSubmit}
          subscription={{ submitting: true }}
          validate={validate}
        >
          {({ handleSubmit: handleSubmit2, submitting }) => (
            <Box
              component="form"
              onSubmit={handleSubmit2}
              noValidate
              sx={{ mt: 6 }}
            >
              <Grid container spacing={2}>
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
                    required
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
                    required
                  />
                </Grid>
              </Grid>
              <Field
                autoComplete="email"
                component={RFTextField}
                disabled={submitting || sent}
                fullWidth
                label="Email"
                margin="normal"
                name="email"
                required
              />
              <Field
                fullWidth
                component={RFTextField}
                disabled={submitting || sent}
                required
                name="password"
                autoComplete="new-password"
                label="Password"
                type="password"
                margin="normal"
              />
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
                color="secondary"
                fullWidth
              >
                {submitting || sent ? "In progress…" : "Sign Up"}
              </FormButton>
            </Box>
          )}
        </Form>
      </AppForm>
    </>
  );
}

export default SignUp;
