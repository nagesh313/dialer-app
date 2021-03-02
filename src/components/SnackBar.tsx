import Snackbar from "@material-ui/core/Snackbar";
import { makeStyles, Theme } from "@material-ui/core/styles";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";
import React from "react";
import { connect } from "react-redux";
import { setSnackBar } from "../redux/actions";

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

function GlobalSnackBar(props: any) {
  const classes = useStyles();

  const handleClick = () => {};

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    props.setSnackBar({ snackbar: { message: "", open: false } });
  };
  return (
    <div className={classes.root}>
      <Snackbar
        open={props.snackbar.open && props.snackbar.message !== ""}
        color=""
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={handleClose}
          severity={
            props.snackbar?.severity ? props.snackbar?.severity : "success"
          }
        >
          {props.snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
}
const mapStateToProps = (state: any) => {
  return { ...state.snackbar };
};
export default connect(mapStateToProps, { setSnackBar })(GlobalSnackBar);
