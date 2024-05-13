import { useEffect } from 'react';
import { Button, CircularProgress, Container, Grid,Theme, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { deleteNoteAsync, notesAsync, removeNote, setNote } from '../features/notesSlice';
import { makeStyles } from '@mui/styles';
import { Note } from '../type';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    marginTop: "50px",
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: "30px",
  },
  loading: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '50vh',
  },
  noteCard: {
    padding: "30px",
    maxHeight: '50vh',
    border: '1px solid #ccc',
    borderRadius: "10px",
  },
  actionButtons: {
    marginTop: "30px",
    display: 'flex',
    justifyContent: 'space-between',
  },
}));

const NotesList = () => {
  const classes = useStyles();
  const { notes,status } = useAppSelector(state => state.notes);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(notesAsync());
  }, []);

  return (
    <Container maxWidth="md" className={classes.root}>
      <div className={classes.header}>
        <Typography variant="h4" gutterBottom>
          Notes
        </Typography>
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to="/create"
        >
          Add Note
        </Button>
      </div>
    {status === 'loading' ? (
      <div className={classes.loading}>
        <CircularProgress />
      </div>
    ) :  (
      <Grid container spacing={3}>
        {notes.map((note: Note) => (
          <Grid item xs={1} sm={12} md={12} key={note.id}>
            <div className={classes.noteCard}>
              <Typography variant="h6">{note.title}</Typography>
              <Typography variant="body2" color="textSecondary">{note.body}</Typography>
              <div className={classes.actionButtons}>
                <Button variant="contained" color="info" component={Link} to={`/${note.id}`} onClick={() => {
                  dispatch(setNote(note))
                }}>View</Button>
                <Button variant="contained" color="secondary" onClick={() => {
                  dispatch(deleteNoteAsync(note.id))
                  dispatch(removeNote(note.id))
                }}>Delete</Button>
              </div>
            </div>
          </Grid>
        ))}
      </Grid>
    )}
  </Container>
    );
};

export default NotesList;