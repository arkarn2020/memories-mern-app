import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(0),
    },
  },
  paper: {
    padding: theme.spacing(0.5),
    marginBottom: '20px',
  },
  form: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  textField: {
    paddingBottom: '7px',
  },
  fileInput: {
    width: '95%',
    margin: '10px 0',
    cursor: 'pointer',
  },
  buttonSubmit: {
    marginBottom: 10,
    backgroundColor: '#50c878',
  },
}));
