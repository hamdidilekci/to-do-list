import React from "react";
import { Field, Form, FormSpy } from "react-final-form";
import Box from "@mui/material/Box";
import Typography from "../components/Typography.jsx";
import AppForm from "../components/layout/AppForm.jsx";
import { email, required } from "../components/form/validation.jsx";
import RFTextField from "../components/form/RFTextField.jsx";
import FormButton from "../components/form/FormButton.jsx";
import FormFeedback from "../components/form/FormFeedback.jsx";

function ForgotPassword() {
  const [sent, setSent] = React.useState(false);

  const validate = (values) => {
    const errors = required(["email"], values);

    if (!errors.email) {
      const emailError = email(values.email);
      if (emailError) {
        errors.email = emailError;
      }
    }

    return errors;
  };

  const handleSubmit = () => {
    setSent(true);
  };

  return (
    <>
      <AppForm>
        <>
          <Typography variant="h3" gutterBottom marked="center" align="center">
            Forgot your password?
          </Typography>
          <Typography variant="body2" align="center">
            {"Enter your email address below and we'll " +
              "send you a link to reset your password."}
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
                autoComplete="email"
                component={RFTextField}
                disabled={submitting || sent}
                fullWidth
                label="Email"
                margin="normal"
                name="email"
                required
                size="large"
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
                {submitting || sent ? "In progress…" : "Send reset link"}
              </FormButton>
            </Box>
          )}
        </Form>
      </AppForm>
    </>
  );
}

export default ForgotPassword;
