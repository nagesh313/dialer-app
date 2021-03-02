import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import React from "react";
function SimpleDialog(props: any) {
  const { onClose, text, open } = props;

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}
    >
      <DialogTitle id="simple-dialog-title">
        {props.text + " "}To Be Implemented
      </DialogTitle>
    </Dialog>
  );
}
export default SimpleDialog;
