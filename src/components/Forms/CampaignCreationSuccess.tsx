import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import Checkbox from "@material-ui/core/Checkbox";
import {
  Grid,
  Paper,
  TableCell,
  TableContainer,
  TableHead,
  Table,
  TableBody,
  TableRow,
} from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
    },
    formControl: {
      margin: theme.spacing(3),
    },
  })
);

export default function CampaignCreationSuccess(props: any) {
  const classes = useStyles();
  debugger;
  return (
    <div className={classes.root}>
      <TableContainer component={Paper}>
        <Table size="small" aria-label="a dense table">
          <TableBody>
            <TableRow>
              <TableCell component="th" scope="row">
                Campign Id
              </TableCell>
              <TableCell component="th" scope="row">
                {props.campaignData?.campaignID}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row">
                Campign Name
              </TableCell>
              <TableCell component="th" scope="row">
                {props.campaignData?.campaignName}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row">
                Target Env
              </TableCell>
              <TableCell component="th" scope="row">
                {props.campaignData?.targetEnv}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row">
                Client ID
              </TableCell>
              <TableCell component="th" scope="row">
                {props.campaignData?.clientID}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row">
                Contact Flow ID
              </TableCell>
              <TableCell component="th" scope="row">
                {props.campaignData?.contactFlowID}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row">
                Primary Queue
              </TableCell>
              <TableCell component="th" scope="row">
                {props.campaignData?.primaryQueue}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row">
                Wait Queue
              </TableCell>
              <TableCell component="th" scope="row">
                {props.campaignData?.waitQueue}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
