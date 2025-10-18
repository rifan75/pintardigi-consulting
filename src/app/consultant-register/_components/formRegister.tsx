"use client";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Alert,
  Box,
  Button,
  IconButton,
  InputAdornment,
  Snackbar,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useState } from "react";
import { FormInput } from "@/components/input/hook-form";
import ButtonLoader from "@/components/loader/ButtonLoader";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";

const defaultValues = {
  name: "",
  email: "",
  password: "",
  password_confirmation: "",
  company_name: "",
  company_email: "",
  phone: "",
  address: "",
};

const schema = yup
  .object({
    name: yup.string().required("*Name is required").max(255, "Name must not exceed 255 characters"),
    email: yup.string().email("Invalid email format").required("*Email is required"),
    password: yup.string().required("*Password is required").min(8, "Password must be at least 8 characters"),
    password_confirmation: yup.string().required("*Password confirmation is required").oneOf([yup.ref('password')], 'Passwords must match'),
    company_name: yup.string().required("*Company name is required").max(255, "Company name must not exceed 255 characters"),
    company_email: yup.string().email("Invalid email format").required("*Company email is required"),
    phone: yup.string().max(20, "Phone must not exceed 20 characters"),
    address: yup.string(),
  })
  .required();

const FormRegister = () => {
  const router = useRouter();
  const { palette: { primary } } = useTheme();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const { handleSubmit, control } = useForm({
    defaultValues,
    mode: "onSubmit",
    resolver: yupResolver(schema),
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleClickShowPasswordConfirmation = () => {
    setShowPasswordConfirmation(!showPasswordConfirmation);
  };

  const handleCloseSnackBar = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setError("");
    setSuccess("");
  };

  const onSubmit = (data: any) => {
    setLoading(true);
    // TODO: Implement register API call
    console.log("Register data:", data);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setSuccess("Registration successful! Please check your email for verification.");
      // Redirect to login after successful registration
      setTimeout(() => {
        router.push("/login");
      }, 2000);
    }, 2000);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box sx={{ mb: 20 }}>
          <FormInput control={control} label="Full Name" name="name" />
        </Box>
        <Box sx={{ mb: 20 }}>
          <FormInput control={control} label="Email" name="email" type="email" />
        </Box>
        <Box sx={{ mb: 20 }}>
          <FormInput
            control={control}
            label="Password"
            name="password"
            type={showPassword ? "text" : "password"}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  edge="end"
                  size="large"
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
          />
        </Box>
        <Box sx={{ mb: 20 }}>
          <FormInput
            control={control}
            label="Confirm Password"
            name="password_confirmation"
            type={showPasswordConfirmation ? "text" : "password"}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password confirmation visibility"
                  onClick={handleClickShowPasswordConfirmation}
                  edge="end"
                  size="large"
                >
                  {showPasswordConfirmation ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
          />
        </Box>
        <Box sx={{ mb: 20 }}>
          <FormInput control={control} label="Company Name" name="company_name" />
        </Box>
        <Box sx={{ mb: 20 }}>
          <FormInput control={control} label="Company Email" name="company_email" type="email" />
        </Box>
        <Box sx={{ mb: 20 }}>
          <FormInput control={control} label="Phone (Optional)" name="phone" />
        </Box>
        <Box sx={{ mb: 15 }}>
          <FormInput control={control} label="Address (Optional)" name="address" multiline minRows={3} />
        </Box>
        <Box sx={{ mt: 35 }}>
          {loading ? (
            <ButtonLoader />
          ) : (
            <Button
              disableElevation
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              sx={{ backgroundColor: primary.main }}
            >
              <Typography variant="h4" sx={{ color: "white", padding: "5px 0" }}>
                Create Account
              </Typography>
            </Button>
          )}
        </Box>
      </form>
      <Snackbar open={error !== ""} autoHideDuration={3000} onClose={handleCloseSnackBar}>
        <Alert onClose={handleCloseSnackBar} severity="error" sx={{ width: "100%" }}>
          {error ? error : "Registration failed"}
        </Alert>
      </Snackbar>
      <Snackbar open={success !== ""} autoHideDuration={3000} onClose={handleCloseSnackBar}>
        <Alert onClose={handleCloseSnackBar} severity="success" sx={{ width: "100%" }}>
          {success}
        </Alert>
      </Snackbar>
    </>
  );
};

export default FormRegister;