import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'start',
    margin: '5px 0',
  },

  gridContainer: {
    padding: 0,
  },
  mainGrid: {
    flexDirection: 'row',
  },
  postsGrid: {
    padding: '0 10px',
  },
  formGrid: {
    padding: '0 10px',
  },
  appbarSearch: {
    borderRadius: 4,
    marginBottom: '1rem',
    display: 'flex',
    padding: '16px',
  },
  tagsbox: {
    borderRadius: 4,
    margin: '15px 0',
    padding: '4px',
  },
  chip: {
    margin: '1px',
  },
  paginate: {
    borderRadius: 4,
    marginTop: '1rem',
    padding: '16px',
  },
  buttonSearch: {
    marginBottom: '10px',
  },
  [theme.breakpoints.down('lg')]: {
    gridContainer: {
      margin: '0',
      padding: '0',
    },
    mainGrid: {
      // flexDirection: 'column-reverse',
      // alignItems: 'center',
      padding: '0 3rem',
    },
    postsGrid: {
      padding: '0 1rem',
      margin: 0,
    },
    formGrid: {
      padding: '0 1rem',
      margin: 0,
    },
    paginate: {
      marginBottom: '25px',
    },
  },
  [theme.breakpoints.down('md')]: {
    gridContainer: {
      margin: '0',
      padding: '0',
    },
    mainGrid: {
      // flexDirection: 'column-reverse',
      // alignItems: 'center',
      padding: 0,
    },
    postsGrid: {
      padding: '0',
      margin: 0,
    },
    formGrid: {
      padding: '0 1rem',
      margin: 0,
    },
    paginate: {
      marginBottom: '25px',
    },
  },
  [theme.breakpoints.down('sm')]: {
    gridContainer: {
      margin: '0',
      padding: '0',
    },
    mainGrid: {
      flexDirection: 'column-reverse',
      alignItems: 'center',
    },
    postsGrid: {
      padding: '0',
      margin: 0,
    },
    formGrid: {
      padding: 0,
      margin: 0,
    },
    paginate: {
      marginBottom: '25px',
    },
  },
  [theme.breakpoints.down('xs')]: {
    gridContainer: {
      padding: 0,
      margin: 0,
    },
    mainGrid: {
      flexDirection: 'column-reverse',
      alignItems: 'center',
      padding: 0,
    },
    postsGrid: {
      padding: 0,
      margin: 0,
    },
    formGrid: {
      padding: 0,
      margin: 0,
    },
    paginate: {
      marginBottom: '25px',
    },
  },
}));
