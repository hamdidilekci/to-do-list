import React from "react";
import Swal from "sweetalert2";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import { Field, Form, FormSpy } from "react-final-form";
import Typography from "../components/Typography.jsx";
import AppForm from "../modules/views/AppForm.jsx";
import RFTextField from "../modules/form/RFTextField.jsx";
import FormButton from "../modules/form/FormButton.jsx";
import FormFeedback from "../modules/form/FormFeedback.jsx";
import { useBackend } from "../backend-context.jsx";
import convertToBase64 from "../helpers/fileToBase64.js";

const Profile = () => {
  const [sent, setSent] = React.useState(false);

  const fileInputRef = React.createRef();

  const backend = useBackend();

  // Handle form submission
  const handleSubmit = async (values) => {
    setSent(true);

    const file = fileInputRef.current.files[0];
    const base64File = await convertToBase64(file);

    // append the file
    const formData = new FormData();
    formData.append("avatar", base64File);

    // Add other form values to the FormData as needed
    Object.entries(values).forEach(([key, value]) => {
      formData.append(key, value);
    });

    // Iterate through FormData entries and log them
    for (const entry of formData.entries()) {
      console.log(entry[0], entry[1]);
    }

    await backend
      .put("auth/update-profile", formData)
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
              {/* Add file input for avatar */}
              <Grid item xs={12} sm={12}>
                <label htmlFor="avatar">
                  <input
                    ref={fileInputRef}
                    style={{ display: "none" }}
                    id="avatar"
                    name="avatar"
                    type="file"
                    accept=".jpg, .png, .jpeg"
                  />

                  <Fab
                    color="secondary"
                    size="small"
                    component="span"
                    aria-label="add"
                    variant="extended"
                  >
                    <AddIcon /> Upload photo
                  </Fab>
                </label>
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
              <Grid item xs={12} sm={12}>
                <Field
                  component={RFTextField}
                  disabled={submitting || sent}
                  autoComplete="email"
                  fullWidth
                  label="Email"
                  name="email"
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
          </Box>
        )}
      </Form>
    </AppForm>
  );
};

export default Profile;
