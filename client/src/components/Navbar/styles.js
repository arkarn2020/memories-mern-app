import { makeStyles } from '@material-ui/core/styles';
import { deepPurple } from '@material-ui/core/colors';

export default makeStyles((theme) => ({
  appBar: {
    borderRadius: 10,
    marginBottom: '15px',
    padding: '5px 0',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    // backgroundColor: '#dedede',
    // backgroundColor: '#f7f8fc',
  },
  brandContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  image: {
    marginLeft: '15px',
    height: '60px',
  },
  heading: {
    color: 'rgba(0,183,255, 1)',
    textDecoration: 'none',
    marginLeft: '5px',
    fontSize: '48px',
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'flex-start',
    marginLeft: 'auto',
  },
  profile: {
    display: 'flex',
    justifyContent: 'space-between',
  },

  purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
    marginRight: '15px',
  },
  userName: {
    display: 'flex',
    alignItems: 'center',
    marginRight: '15px',
  },
  logout: {
    padding: '10px 25px',
  },
  login: {
    padding: '10px 25px',
  },

  [theme.breakpoints.down('xs')]: {
    appBar: {
      padding: 0,
    },
    image: {
      marginLeft: '10px',
      height: '40px',
    },
    heading: {
      fontSize: '0',
    },
    purple: {
      marginRight: '0',
    },
    userName: {
      fontSize: '0',
    },
    logout: {
      margin: '0',
      padding: '0 10px',
      fontSize: '12px',
    },
    login: {
      padding: '5px 10px',
    },
  },
}));
