import React, { useState } from "react";
import Swal from "sweetalert2";
import { Field, Form, FormSpy } from "react-final-form";
import Box from "@mui/material/Box";
import Typography from "../components/Typography.jsx";
import AppForm from "../components/layout/AppForm.jsx";
import { checkPasswords, required } from "../components/form/validation.jsx";
import RFTextField from "../components/form/RFTextField.jsx";
import FormButton from "../components/form/FormButton.jsx";
import FormFeedback from "../components/form/FormFeedback.jsx";
import { useBackend } from "../context/backend-context.jsx";

function ResetPasswordForm() {
  const [sent, setSent] = useState(false);
  const backend = useBackend();

  const validate = (values) => {
    const errors = required(["password", "confirmPassword"], values);

    // check if the passwords are matches
    const matchError = checkPasswords(values);

    return { ...errors, ...matchError };
  };

  const handleSubmit = async (values) => {
    setSent(true);
    console.log("Submit", values);
    // send request to reset password request api
    await backend
      .post("auth/reset-password-verify", values)
      .then((response) => {
        if (response) {
          Swal.fire({
            icon: "success",
            title: `İf you have valid email (${response.email}), you will receive a reset password link!`,
            timer: 3500,
          });
        }
        setSent(false);
      });
  };

  return (
    <>
      <AppForm>
        <>
          <Typography variant="h3" gutterBottom marked="center" align="center">
            Your New Password
          </Typography>
          <Typography variant="body2" align="center">
            {"Enter your new password below and we'll " +
              "reset your password."}
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
              <Field
                autoFocus
                component={RFTextField}
                disabled={submitting || sent}
                fullWidth
                type="password"
                name="password"
                label="New Password"
                margin="normal"
              />
              <Field
                autoFocus
                component={RFTextField}
                disabled={submitting || sent}
                fullWidth
                type="password"
                name="confirmPassword"
                label="Confirm New Password"
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
                size="large"
                color="secondary"
                fullWidth
              >
                {submitting || sent ? "In progress…" : "Change Password"}
              </FormButton>
            </Box>
          )}
        </Form>
      </AppForm>
    </>
  );
}

export default ResetPasswordForm;
