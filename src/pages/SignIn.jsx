import React from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Field, Form, FormSpy } from "react-final-form";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Typography from "../components/Typography.jsx";
import AppForm from "../modules/views/AppForm.jsx";
import { email, required } from "../modules/form/validation.jsx";
import RFTextField from "../modules/form/RFTextField.jsx";
import FormButton from "../modules/form/FormButton.jsx";
import FormFeedback from "../modules/form/FormFeedback.jsx";

function SignIn() {
  const [sent, setSent] = React.useState(false);

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

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
    try {
      setSent(true);
      // Send a POST request to backend endpoint with the form values
      const response = await axios.post(`${backendUrl}/auth/sign-in`, values);
      console.log("--- try --- response -- ", response.data);

      // Successful sign-in redirecting to the home page.
      if (response.status === 200) {
        window.location.href = "http://localhost:5173/";
        setSent(false);
      } else {
        console.log("error response", response.message);
      }
    } catch (error) {
      // Handle network errors or other exceptions here
      console.error("Error submitting form:", error);
      // Show a generic error message to the user
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.message,
      });
    }
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
