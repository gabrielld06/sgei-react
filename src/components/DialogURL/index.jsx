import * as React from 'react';
import { useMediaQuery } from '@mui/material'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import PropTypes from 'prop-types';

DialogURL.protoType = {
    handleChangeImage: PropTypes.func
}

export default function DialogURL(props) {
    const { handleChangeImage } = props;
    const matches = useMediaQuery('(min-width:420px)');
    const [imageURL, setImageURL] = React.useState();

    const handleChange = (event) => {
        setImageURL(event.target.value);
    };

    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleClickSend = (url) => {
        handleChangeImage(url);
        setOpen(false);
    }

    return (
        <div>
            <IconButton
                height='50%'
                onClick={handleClickOpen}
                sx={{
                    position: 'relative',
                    color: 'white',
                    backgroundColor: 'rgba(0, 0, 0, .4)',
                    left: (matches ? '950%' : '450%'),
                    bottom: "50%",
                    verticalAlign: 'middle'
                }}>
                <EditIcon />
            </IconButton>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Adicionar imagem</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Insira a URL de uma imagem:
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="Image-URL"
                        fullWidth
                        variant="standard"
                        onChange={handleChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancelar</Button>
                    <Button onClick={(e) => { handleClickSend(imageURL); handleClose() }}>Enviar</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}