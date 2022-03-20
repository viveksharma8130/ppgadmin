import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import DialogContent from "@material-ui/core/DialogContent";
const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
    backgroundColor: "#5e72e4",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
    color: "#fff",
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const AddMaterialsModal = ({
  children,
  handleClose,
  open,
  title,
  closemodal,
}) => {
  const classes = useStyles();
  return (
    <>
      <Dialog
        fullScreen
        open={open}
        onClose={closemodal ? closemodal : handleClose}
        TransitionComponent={Transition}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={closemodal ? closemodal : handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              {title}
            </Typography>
          </Toolbar>
        </AppBar>
        <DialogContent>{children}</DialogContent>
      </Dialog>
    </>
  );
};
export default AddMaterialsModal;
