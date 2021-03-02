import { Button, CircularProgress, Grid, TextField } from "@material-ui/core";
import "date-fns";
import { Form, Formik } from "formik";
import React from "react";
import { connect } from "react-redux";
import * as Yup from "yup";
import { setSnackBar } from "../../redux/actions";
function CreateNewCampaignForm(props: any) {
  const [loading, setLoading] = React.useState<any>(false);
  const [error, setError] = React.useState<any>(false);
  const FormSchema = Yup.object().shape({
    campaignName: Yup.string().required("Required"),
    targetEnv: Yup.string().required("Required"),
    clientID: Yup.string().required("Required"),
  });
  const submitForm = (values: any) => {
    createNewCampaign(values);
  };
  const createNewCampaign = (values: any) => {
    setLoading(true);
    let url = "/campaign/create";
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
      headers: headers,
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify(values),
    })
      .then((response: any) => {
        if (response.ok) {
          return response.json();
        } else {
          throw error();
        }
      })
      .then((data: any) => {
        setLoading(false);
        props.setSnackBar({
          snackbar: { message: "Campaign Creation Successful", open: true },
        });
        props.handleCreateNewCampaignSuccess(
          data?.response?.campaign_id,
          values
        );
      })
      .catch(() => {
        props.setSnackBar({
          snackbar: {
            message: "Operation failed!",
            open: true,
            severity: "error",
          },
        });
        setLoading(false);
        setError(true);
      });
  };
  return (
    <>
      <Formik
        validationSchema={FormSchema}
        initialValues={{
          campaignName: "Test Campaign",
          targetEnv: "aws",
          clientID: "leadgen",
          contactFlowID: "",
          primaryQueue: "",
          waitQueue: "",
        }}
        onSubmit={(values) => submitForm(values)}
      >
        {({
          errors,
          handleBlur,
          handleChange,
          handleSubmit,
          isSubmitting,
          touched,
          values,
          setFieldValue,
          submitCount,
          isValid,
        }) => (
          <Form noValidate onSubmit={handleSubmit}>
            <Grid container justify="center" style={{ padding: "20px" }}>
              <Grid item xs={4} style={{ textAlign: "center" }}>
                <TextField
                  disabled={loading}
                  onChange={handleChange}
                  value={values.campaignName}
                  label="Campaign Name"
                  name="campaignName"
                  error={Boolean(touched.campaignName && errors.campaignName)}
                />
              </Grid>
              <Grid item xs={4} style={{ textAlign: "center" }}>
                <TextField
                  disabled={loading}
                  onChange={handleChange}
                  value={values.targetEnv}
                  label="Target Env"
                  name="targetEnv"
                  error={Boolean(touched.targetEnv && errors.targetEnv)}
                />
              </Grid>
              <Grid item xs={4} style={{ textAlign: "center" }}>
                <TextField
                  disabled={loading}
                  onChange={handleChange}
                  value={values.clientID}
                  label="Client ID"
                  name="clientID"
                  error={Boolean(touched.clientID && errors.clientID)}
                />
              </Grid>
              <Grid item xs={4} style={{ textAlign: "center" }}>
                <TextField
                  disabled={loading}
                  onChange={handleChange}
                  value={values.contactFlowID}
                  label="Contact Flow ID"
                  name="contactFlowID"
                  error={Boolean(touched.contactFlowID && errors.contactFlowID)}
                />
              </Grid>
              <Grid item xs={4} style={{ textAlign: "center" }}>
                <TextField
                  disabled={loading}
                  onChange={handleChange}
                  value={values.primaryQueue}
                  label="Primary Queue"
                  name="primaryQueue"
                  error={Boolean(touched.primaryQueue && errors.primaryQueue)}
                />
              </Grid>
              <Grid item xs={4} style={{ textAlign: "center" }}>
                <TextField
                  disabled={loading}
                  onChange={handleChange}
                  value={values.waitQueue}
                  label="Wait Queue"
                  name="waitQueue"
                  error={Boolean(touched.waitQueue && errors.waitQueue)}
                />
              </Grid>
            </Grid>
            <Grid container justify="center">
              <Button
                color="primary"
                disabled={!isValid || loading}
                type="submit"
                variant="contained"
              >
                {loading ? (
                  <CircularProgress color="secondary" size={24} />
                ) : (
                  "Submit"
                )}
              </Button>
            </Grid>
          </Form>
        )}
      </Formik>
    </>
  );
}
const mapStateToProps: any = (state: any) => {
  return { ...state.snackbar };
};
export default connect(mapStateToProps, { setSnackBar })(CreateNewCampaignForm);
