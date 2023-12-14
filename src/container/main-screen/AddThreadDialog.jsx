import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const AddThreadDialog = (props) => {

  const [title, setTitle] = React.useState('');
  const [content, setContent] = React.useState('');

  const handleClose = () => {
    props.onChangeStateDialog(false);
  };

  const handleSave = () => {
    props.handleSave({title: title, content: content});
    handleClose()
  }

  return (
      <Dialog open={props.isOpen} onClose={handleClose}>
        <DialogTitle>{props.dialogTitle}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {props.dialogText}
          </DialogContentText>
          <TextField
            margin="dense"
            id="title"
            label="Title"
            type="text"
            fullWidth
            variant="standard"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
          <TextField
            margin="dense"
            id="content"
            label="Content"
            type="text"
            fullWidth
            variant="standard"
            multiline
            value={content}
            onChange={(event) => setContent(event.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave}>Save Thread</Button>
        </DialogActions>
      </Dialog>
  );
}

export default AddThreadDialog;