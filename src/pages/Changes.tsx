import { Link, useLocation } from 'react-router-dom';
import { Button, TextField, Theme, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Formik, Form, Field } from 'formik';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { createNoteAsync, setField, updateNoteAsync } from '../features/notesSlice';

const useStyles: any = makeStyles((theme: Theme) =>({
    formContainer: {
      marginTop: '50px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    },
    textField: {
      margin: '20px',
      width: '100%',
    },
    button: {
      margin: '20px',
    },
  })
);

const Changes = () => {
  const classes = useStyles();
  const id = useLocation().pathname.replace('/', '')
  const { notes, title, body,hasError } = useAppSelector(state => state.notes);
  const dispatch = useAppDispatch();

  const noteToEdit = Number.isNaN(+id) ? null : notes.find(note => note.id === +id);

  const handleSubmit = (event: any) => {
    if (noteToEdit) {
      dispatch(updateNoteAsync({ title, body, id }));
    } else {
      dispatch(createNoteAsync({
        title: title,
        body: body,
        userId: 1,
      }));
    }
  };
  
  return (
    <div className={classes.formContainer}>
      <Typography variant="h4" gutterBottom>{noteToEdit ? 'Edit a note' : 'Create a note'}</Typography>
      <Formik
        initialValues={{ title: noteToEdit ? noteToEdit.title : '', text: noteToEdit ? noteToEdit.body : '' }}
        onSubmit={(e) => handleSubmit(e)}
      >
        <Form>
          <Field
            required
            margin="normal"
            className={classes.textField}
            as={TextField}
            name="title"
            defaultValue={noteToEdit?.title}
            label="Title"
            value={title}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => dispatch(setField({name: 'title', text: e.target.value}))}
          />
          <Field
            required
            margin="normal"
            className={classes.textField}
            as={TextField}
            name="body"
            label="Text of the note"
            defaultValue={noteToEdit?.body}
            multiline
            rows={4}
            value={body}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => dispatch(setField({name: 'body', text: e.target.value}))}
          />
          <Button
            className={classes.button}
            type="submit"
            variant="contained"
            color="primary"
          >
            Save
          </Button>
          <Button
            className={classes.button}
            component={Link}
            to="/"
            variant="contained"
            color="secondary"
            style={{ marginLeft: '10px' }}
            onClick={() => {
              dispatch(setField({name: 'body', text: ''}))
              dispatch(setField({name: 'title', text: ''}))
            }}
          >
            Cancel
          </Button>
          {hasError && <div style={{color: "red", fontWeight: 600,fontSize: "18px"}}>ERROR!Unable to save changes</div>}
        </Form>
      </Formik>
    </div>
  );
};

export default Changes;