import React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import clsx from "clsx";
import IconButton from "@material-ui/core/IconButton";
import Input from "@material-ui/core/Input";
import FilledInput from "@material-ui/core/FilledInput";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

import { Button, CircularProgress } from "@material-ui/core";
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      marginTop: "200px",
      display: "flex",
      flexWrap: "wrap",
    },
    margin: {
      margin: theme.spacing(1),
    },
    withoutLabel: {
      marginTop: theme.spacing(3),
    },
    textField: {
      width: "25ch",
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: "center",
      color: theme.palette.text.secondary,
    },
  })
);
interface State {
  username: string;
  password: string;
  showPassword: boolean;
}

export function LoginComponent() {
  const classes = useStyles();
  const [loading, setLoading] = React.useState<any>(false);
  const [error, setError] = React.useState<any>(false);

  const [values, setValues] = React.useState<State>({
    username: "",
    password: "",
    showPassword: false,
  });

  const handleChange = (prop: keyof State) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };
  const onClick = () => {
    setLoading(true);
    let url = "/user/token";
    let headers = new Headers();
    headers.set("X-Requested-With", "XMLHttpRequest");
    headers.set("Content-Type", "application/json");
    // headers.set("www-authenticate", "application/json");
    headers.set(
      "Authorization",
      "Basic " + btoa(values.username + ":" + values.password)
    );

    fetch(url, {
      method: "GET",
      headers: headers,
    })
      .then((response) => response.json())
      .then((data) => {
        sessionStorage.setItem("token", data.token);
        sessionStorage.setItem("username", values.username);
        sessionStorage.setItem("password", values.password);
        window.location.reload();
      })
      .catch(() => {
        setLoading(false);
        setError(true);
      });
  };
  return (
    <div className={classes.root}>
      <Grid container spacing={3} justify="center">
        <Grid item xs={8} sm={3}>
          <Paper className={classes.paper} elevation={4}>
            <FormControl
              className={clsx(classes.margin, classes.textField)}
              error={error}
            >
              <InputLabel htmlFor="standard-adornment-UserName">
                UserName
              </InputLabel>
              <Input
                id="standard-adornment-UserName"
                type={"text"}
                value={values.username}
                onChange={handleChange("username")}
                disabled={loading}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      color={error ? "secondary" : "default"}
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      style={{ padding: "0" }}
                    >
                      <AccountCircleIcon></AccountCircleIcon>
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
            <FormControl
              className={clsx(classes.margin, classes.textField)}
              error={error}
            >
              <InputLabel htmlFor="standard-adornment-password">
                Password
              </InputLabel>
              <Input
                id="standard-adornment-password"
                type={values.showPassword ? "text" : "password"}
                value={values.password}
                onChange={handleChange("password")}
                disabled={loading}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      color={error ? "secondary" : "default"}
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      style={{ padding: "0" }}
                    >
                      {values.showPassword ? (
                        <Visibility onClick={handleClickShowPassword} />
                      ) : (
                        <VisibilityOff onClick={handleClickShowPassword} />
                      )}
                    </IconButton>
                  </InputAdornment>
                }
              />
              {error && (
                <FormHelperText id="my-helper-text">
                  Incorrect username or password
                </FormHelperText>
              )}
            </FormControl>
            <FormControl className={clsx(classes.margin, classes.textField)}>
              <Button
                variant="contained"
                color="primary"
                onClick={onClick}
                disabled={loading}
              >
                {loading ? (
                  <CircularProgress color="secondary" size={24} />
                ) : (
                  "Login"
                )}
              </Button>
            </FormControl>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
