import { Button, CircularProgress, Grid } from "@material-ui/core";
import "date-fns";
import React from "react";
import ReactFileReader from "react-file-reader";
import { connect } from "react-redux";
import { setSnackBar } from "../../redux/actions";

function ListUpload(props: any) {
  const [loading, setLoading] = React.useState<any>(false);
  const [error, setError] = React.useState<any>(false);

  const submit = (data: any) => {
    setLoading(true);
    let lines: any = data.split("\n");
    let result: any = [];
    var csvHeaders: any = lines[0].split(",");
    for (var i = 1; i < lines.length; i++) {
      var obj: any = {};
      var currentline = lines[i].split(",");
      result.push({ name: currentline[0], phone_number: currentline[1] });
    }
    const payload = {
      multiplier: 1,
      waitTime: 60,
      data: result,
    };
    let url = "/campaign/" + props.campaignID + "/list/upload";
    let headers = new Headers();
    headers.set("X-Requested-With", "XMLHttpRequest");
    headers.set("Content-Type", "application/json");
    headers.set(
      "Authorization",
      "Basic " +
        btoa(
          sessionStorage.getItem("username") +
            ":" +
            sessionStorage.getItem("password")
        )
    );
    fetch(url, {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers,
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify(payload),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error();
        }
      })
      .then((data) => {
        props.setSnackBar({
          snackbar: {
            message: data.response,
            open: true,
          },
        });
        setLoading(false);
        setError(false);
        props.handleFileUploadSuccess()
      })
      .catch(() => {
        props.setSnackBar({
          snackbar: {
            message: "Failed to Upload",
            open: true,
            severity: "error",
          },
        });
        setLoading(false);
        setError(true);
      });
  };
  const handleFiles = (files: any) => {
    if (files[0].size / 1024 / 1024 > 4) {
      props.setSnackBar({
        snackbar: {
          message: "File size greater than 4MB",
          open: true,
          severity: "error",
        },
      });
      return;
    }
    var reader = new FileReader();
    reader.onload = function (e) {
      submit(reader.result);
    };
    reader.readAsText(files[0]);
  };
  return (
    <>
      <Grid container spacing={3} justify="center" style={{ padding: "20px" }}>
        <ReactFileReader
          handleFiles={(files: any) => handleFiles(files)}
          fileTypes={".csv"}
        >
          <Button
            variant="contained"
            color="primary"
            disabled={loading}
            style={{ marginBottom: "10px" }}
          >
            {loading ? (
              <CircularProgress color="secondary" size={24} />
            ) : (
              "Upload List"
            )}
          </Button>
        </ReactFileReader>
      </Grid>
    </>
  );
}
const mapStateToProps: any = (state: any) => {
  return { ...state.snackbar };
};
export default connect(mapStateToProps, { setSnackBar })(ListUpload);
