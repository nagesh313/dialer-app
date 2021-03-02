import { Container, Paper } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Stepper from "@material-ui/core/Stepper";
import Typography from "@material-ui/core/Typography";
import React from "react";
import { connect } from "react-redux";
import { setSnackBar } from "../redux/actions";
import CampaignCreationSuccess from "./Forms/CampaignCreationSuccess";
import CreateNewCampaignForm from "./Forms/CreateNewCampaignForm";
import ListUpload from "./Forms/ListUpload";
function getSteps() {
  return ["Select Campaign Name", "List Upload", "Ad Summary"];
}

function CreateCampaignStepper() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [campaignID, setCampaignID] = React.useState("");
  const [campaignData, setCampaignData] = React.useState<any>("");
  const steps = getSteps();
  const handleCreateNewCampaignSuccess = (
    campaignID: any,
    campaignData: any
  ) => {
    setCampaignID(campaignID);
    setCampaignData(campaignData);
    handleNext();
  };
  const handleFileUploadSuccess = () => {
    handleNext();
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const getStepForm = (stepIndex: any) => {
    switch (stepIndex) {
      case 0:
        return (
          <CreateNewCampaignForm
            handleCreateNewCampaignSuccess={handleCreateNewCampaignSuccess}
          ></CreateNewCampaignForm>
        );
      case 1:
        return (
          <ListUpload
            campaignID={campaignID}
            handleFileUploadSuccess={handleFileUploadSuccess}
          ></ListUpload>
        );
      case 2:
        return (
          <CampaignCreationSuccess
            campaignID={campaignID}
            campaignData={campaignData}
          ></CampaignCreationSuccess>
        );
      default:
        return "Unknown stepIndex";
    }
  };

  return (
    <Container>
      <Paper style={{ padding: "10px" }}>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <>
          {activeStep === steps.length ? (
            <div>
              <Typography>All steps completed</Typography>
              <Button onClick={handleReset}>Reset</Button>
            </div>
          ) : (
            <>{getStepForm(activeStep)}</>
          )}
        </>
      </Paper>
    </Container>
  );
}
const mapStateToProps = (state: any) => {
  return { ...state.snackbar };
};
export default connect(mapStateToProps, { setSnackBar })(CreateCampaignStepper);
