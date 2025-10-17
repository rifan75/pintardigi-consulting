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
import { useAppDispatch } from "@/store";
// import { setMenu } from "@/_store/menuSlice";
import { FormInput } from "@/components/input/hook-form";
import ButtonLoader from "@/components/loader/ButtonLoader";
import { useAuthorizeClientMutation, useLoginClientMutation } from "@/api/client/loginClientApi";
import { dataCrypt, verifier } from "@/lib/helpers/createRandomString";
import { useForm } from "react-hook-form";
import { saveCookie, saveLocal } from "@/lib/helpers/cookie";
import { setAccessToken } from "@/api/memoryToken";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import { setMenu } from "@/store/menuSlice";

const defaultValues = {
  email: "",
  password: "",
};

const schema = yup
  .object({
    email: yup.string().email().required("*Email is required"),
    password: yup.string().required("*Password is required"),
  })
  .required();

const FormLogin = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const {palette: { primary }} = useTheme();
  const [login] = useLoginClientMutation();
  const [authorize] = useAuthorizeClientMutation();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { handleSubmit, control } = useForm({
    defaultValues,
    mode: "onSubmit",
    resolver: yupResolver(schema),
  });
  // const [checked, setChecked] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleCloseSnackBar = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }

    setError("");
  };

  const onSubmit = (data: any) => {
    data.state = dataCrypt.state;
    data.challenge = dataCrypt.challenge;
    setLoading(true);
    login(data)
      .unwrap()
      .then(async (res: any) => {
        if (data.state === res.state) {
          const dataAuth = {
            verifier: verifier,
            code: res.code,
          };
          authorize(dataAuth)
            .unwrap()
            .then((data: any) => {
              console.log("data", data.menu.legal);
              setLoading(false);
              setAccessToken(data.memory);
              // saveCookie(generalLang.cookieRefreshToken, data.refresh.refresh_token, data.refresh.expires_in);
              saveLocal('cookieRefreshToken', data.refresh.refresh_token);
              saveLocal('cookieUser', data.user);
              saveLocal('cookieMenu', data.menu);
  
              dispatch(
                setMenu({
                  legal: data.menu.legal,
                  tax: data.menu.tax,
                  accounting: data.menu.accounting
                })
              );
  
              // Move redirection inside this block
              router.push("/");
            })
            .catch((error: any) => {
              if (error.data?.message) {
                console.log(error);
                setError(`Code ${error.status} : ${error.data.message}`);
              } else {
                console.log(error.data);
                setError(error.data);
              }
              setLoading(false);
            });
        }
      })
      .catch((error: any) => {
        if (error.data?.message) {
          console.log(error);
          setError(`Code ${error.status} : ${error.data.message}`);
        } else {
          console.log(error.data);
          setError(error.data);
        }
        setLoading(false);
      });
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box sx={{ mb: 20 }}>
          <FormInput control={control} label="Email" name="email" />
        </Box>
        <Box sx={{ mb: 15 }}>
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
              <Typography variant="h4" sx={{ color: "white", padding: "5px 0" }}>Login</Typography>
            </Button>
          )}
        </Box>
      </form>
      <Snackbar open={error !== ""} autoHideDuration={3000} onClose={handleCloseSnackBar}>
        <Alert onClose={handleCloseSnackBar} severity="error" sx={{ width: "100%" }}>
          {error ? error : "Terjadi Kesalahan"}
        </Alert>
      </Snackbar>
    </>
  );
};

export default FormLogin;
