import React from "react";

import { Field, Form, FormSpy } from "react-final-form";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Typography from "../components/Typography.jsx";
import AppForm from "../modules/views/AppForm.jsx";
import { email, required } from "../modules/form/validation.jsx";
import RFTextField from "../modules/form/RFTextField.jsx";
import FormButton from "../modules/form/FormButton.jsx";
import FormFeedback from "../modules/form/FormFeedback.jsx";
import { useBackend } from "../backend-context.jsx";

function SignIn() {
  const [sent, setSent] = React.useState(false);

  const backend = useBackend();

  const validate = (values) => {
    const errors = required(["email", "password"], values);

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
    // Send a POST request to backend endpoint with the form values
    await backend
      .post("auth/sign-in", values, false)
      .then((response) => {
        console.log("status", response);

        // save user data and token to cache
        localStorage.setItem("token", response.accessToken);
        localStorage.setItem("user", JSON.stringify(response.user));

        // Successful sign-in redirecting to the home page.
        window.location.href = "http://localhost:5173/";
      })
      .finally(() => {
        setSent(false);
      });
  };

  return (
    <>
      <AppForm>
        <>
          <Typography variant="h3" gutterBottom marked="center" align="center">
            Sign In
          </Typography>
          <Typography variant="body2" align="center">
            {"Not a member yet? "}
            <Link href="/Sign Up" align="center" underline="always">
              Sign Up here
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
              <Field
                autoComplete="email"
                autoFocus
                component={RFTextField}
                disabled={submitting || sent}
                fullWidth
                label="Email"
                margin="normal"
                name="email"
                required
                size="large"
              />
              <Field
                fullWidth
                size="large"
                component={RFTextField}
                disabled={submitting || sent}
                required
                name="password"
                autoComplete="current-password"
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
                size="large"
                color="secondary"
                fullWidth
              >
                {submitting || sent ? "In progress…" : "Sign In"}
              </FormButton>
            </Box>
          )}
        </Form>
        <Typography align="center">
          <Link underline="always" href="/ForgotPassword">
            Forgot password?
          </Link>
        </Typography>
      </AppForm>
    </>
  );
}

export default SignIn;
