import {
  Avatar,
  Box,
  Button,
  Checkbox,
  CssBaseline,
  FormControlLabel,
  Grid,
  Link,
  Paper,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import { useAuth } from "context/AuthContext";
import { useRouter } from "next/router";
import { forwardRef, useState } from "react";
import { useForm } from "react-hook-form";
import MuiAlert, { AlertProps } from "@mui/material/Alert";

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://www.filify.app/">
        AsgerMovies
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function SignInSide() {
  const [openError, setOpenError] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [MessageSuccess, setMessageSuccess] = useState("");
  const [MessageError, setMessageError] = useState("");

  const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref
  ) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const router = useRouter();
  //const is login state

  const [isLogin, setIsLogin] = useState(true);
  function switchAuthModeHandler() {
    setIsLogin((prevState) => !prevState);
  }

  //const auth context

  const { user, signup, login } = useAuth();

  //const handle signup

  const handleSignupCreate = async (data: any) => {
    if (isLogin) {
      try {
        await login(data.email, data.password);
        router.push("/dashboard");
      } catch (err: any) {
        setOpenError(true);
        setMessageError(err.code);
      }
    } else {
      try {
        await signup(data.email, data.password);
        setOpenSuccess(true);
        setMessageSuccess("Account created successfully");
      } catch (err: any) {
        setOpenError(true);
        setMessageError(err.code);
      }
    }
  };

  //const handle close
  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenError(false);
    setOpenSuccess(false);
  };

  //const use form hook

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  //form-all the page

  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: "url(https://wallpapercave.com/wp/wp10615910.jpg)",
          backgroundRepeat: "no-repeat",
          backgroundColor: (t) =>
            t.palette.mode === "light"
              ? t.palette.grey[50]
              : t.palette.grey[900],
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}></Avatar>
          <Typography component="h1" variant="h5">
            {isLogin ? "Sign in" : "Create Account"}
          </Typography>

          {/* Form */}

          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit(handleSignupCreate)}
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              fullWidth
              id="email"
              label="Email Address"
              autoComplete="email"
              autoFocus
              {...register("email", {
                required: "E-mail Address is required.",
              })}
              error={Boolean(errors.email)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="Password"
              type="password"
              id="password"
              {...register("password", {
                required: "Last Name is required.",
              })}
              error={Boolean(errors.password)}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label={isLogin ? "Remember me" : ""}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              {isLogin ? "Sign in" : "Create Account"}
            </Button>

            <Snackbar
              open={openSuccess}
              autoHideDuration={6000}
              onClose={handleClose}
            >
              <Alert
                onClose={handleClose}
                severity="success"
                sx={{ width: "100%" }}
              >
                {MessageSuccess}
              </Alert>
            </Snackbar>

            <Snackbar
              open={openError}
              autoHideDuration={6000}
              onClose={handleClose}
            >
              <Alert
                onClose={handleClose}
                severity="error"
                sx={{ width: "100%" }}
              >
                {MessageError}
              </Alert>
            </Snackbar>

            <Grid container>
              <Grid item>
                <Button variant="contained" onClick={switchAuthModeHandler}>
                  {isLogin ? "Create Account" : "Sign in"}
                </Button>
              </Grid>
            </Grid>
            <Copyright sx={{ mt: 5 }} />
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}
