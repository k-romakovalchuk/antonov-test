import React from 'react';
import { Typography, Container, Theme, Button } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useAppSelector,useAppDispatch } from '../app/hooks';
import { Link } from 'react-router-dom';
import { setField } from '../features/notesSlice';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    marginTop: "50px",
  },
  buttonContainer: {
    marginTop: "20px",
    display: 'flex',
    gap: "30px"
  },
}));

const NotePage: React.FC = () => {
  const classes = useStyles();
  const { note } = useAppSelector(state => state.notes);

  const dispatch = useAppDispatch();

  return (
    <Container maxWidth="lg" className={classes.root}>
      <Typography variant="h4" gutterBottom>
        Note Details
      </Typography>
      <Typography variant="body1">
        <Typography variant="h6">{note?.title}</Typography>
        <Typography variant="body2" color="textSecondary">{note?.body}</Typography>
      </Typography>
      <div className={classes.buttonContainer}>
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to={`/change/${note?.id}`}
          onClick={() => {
            dispatch(setField({name: 'body', text: note?.body || ''}))
            dispatch(setField({name: 'title', text: note?.title || ''}))
          }}
        >
          Edit
        </Button>
        <Button variant="contained" component={Link} to='/'>
          Back to Home
        </Button>
      </div>
    </Container>
  );
};

export default NotePage;