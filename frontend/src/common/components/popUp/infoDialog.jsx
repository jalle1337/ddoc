import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import SecondaryButton from "../button/secondaryBtn";

const Transition = React.forwardRef(function Transition(props, ref) {
    // @ts-ignore
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function InfoDialog({ open, title, children }) {
    const [showDialog, setShowDialog] = React.useState(true);

    const handleClose = () => {
        setShowDialog(false);
    };
    React.useEffect(() => {
        setShowDialog(open);
    }, [open]);

    return (
        <div>
            {showDialog && (
                <Dialog
                    open={showDialog}
                    // @ts-ignore
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={handleClose}
                    aria-describedby="alert-dialog-slide-description"
                >
                    <DialogTitle>{title}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-slide-description">
                            {children}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <SecondaryButton onClick={handleClose}>
                            Close
                        </SecondaryButton>
                    </DialogActions>
                </Dialog>
            )}
        </div>
    );
}
