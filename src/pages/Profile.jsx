import React, { useState } from "react";
import Swal from "sweetalert2";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Field, Form, FormSpy } from "react-final-form";
import Typography from "../components/Typography.jsx";
import AppForm from "../modules/views/AppForm.jsx";
import RFTextField from "../modules/form/RFTextField.jsx";
import FormButton from "../modules/form/FormButton.jsx";
import FormFeedback from "../modules/form/FormFeedback.jsx";
import { useBackend } from "../backend-context.jsx";

const Profile = () => {
  const [sent, setSent] = React.useState(false);

  const backend = useBackend();

  // Handle form submission
  const handleSubmit = async (values) => {
    setSent(true);
    await backend
      .put("auth/update-profile", values)
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Profile Updated Successfully",
          timer: 3500,
        });
      })
      .finally(() => {
        setSent(false);
      });
  };

  return (
    <AppForm>
      <>
        <Typography variant="h3" gutterBottom marked="center" align="center">
          General information
        </Typography>
      </>
      <Form onSubmit={handleSubmit} subscription={{ submitting: true }}>
        {({ handleSubmit: handleSubmit2, submitting }) => (
          <Box component="form" onSubmit={handleSubmit2} sx={{ mt: 6 }}>
            <Grid container spacing={2}>
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
          </Box>
        )}
      </Form>
    </AppForm>
  );
};

export default Profile;
