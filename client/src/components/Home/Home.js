// external
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';

// material-ui
import Container from '@material-ui/core/Container';
import Grow from '@material-ui/core/Grow';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import AppBar from '@material-ui/core/AppBar';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';

// internal
import { getPosts, getPostsBySearch } from '../../actions/posts';

// components
import Posts from '../Posts/Posts';
import Form from '../Form/Form';
import Paginate from '../Pagination/Paginate.jsx';

// styles
import useStyles from './styles';

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const Home = () => {
  const classes = useStyles();
  const [currentId, setCurrentId] = useState(0);
  const dispatch = useDispatch();
  const query = useQuery();
  const history = useHistory();
  const page = query.get('page') || 1;
  const searchQuery = query.get('searchQuery');
  const [search, setSearch] = useState('');
  const [tag, setTag] = useState('');
  const [tags, setTags] = useState([]);

  useEffect(() => {
    dispatch(getPosts());
  }, [currentId, dispatch]);

  const searchPost = () => {
    if (!search && !tags) {
      return 0;
    } else if (tags || search.trim()) {
      // dispatch -> fetch search posts
      dispatch(getPostsBySearch({ search, tags: tags.join(',') }));
      history.push(
        `/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`
      );
    }
  };

  const handleSearchInput = async (e) => {
    // charCode === 13 means user pressed enter
    if (e.charCode === 13 && (tags || search)) {
      // search posts based on 'search' text
      await searchPost();
    }
  };

  const handleTagInput = async (e) => {
    if (e.charCode === 13) {
      !tags.includes(tag)
        ? await setTags((prevTags) => [...prevTags, tag])
        : await setTags((prevTags) => [...prevTags]);
      await searchPost();
    }
  };

  // const handleTagDelete = (tagtoDelete) => {
  //   const newTags = tags.filter((currentTag) => currentTag !== tagtoDelete);
  //   setTags(newTags);
  // };

  const clearSearch = () => {
    // setCurrentId(0);
    setTags([]);
    setSearch('');
    history.push('/');
  };

  return (
    <Grow in>
      <Container maxWidth="xl" className={classes.gridContainer}>
        <Grid
          className={classes.mainGrid}
          container
          justifyContent="space-between"
          alignItems="stretch"
          spacing={0}
        >
          <Grid
            item
            xs={12}
            sm={10}
            md={7}
            lg={8}
            xl={8}
            className={classes.postsGrid}
          >
            <Posts setCurrentId={setCurrentId} />
          </Grid>
          <Grid
            item
            xs={12}
            sm={9}
            md={5}
            lg={4}
            xl={4}
            className={classes.formGrid}
          >
            <AppBar
              className={classes.appbarSearch}
              position="static"
              color="inherit"
            >
              <TextField
                name="searchField"
                variant="outlined"
                label="Search Memories"
                placeholder="&nbsp;search by title"
                fullWidth
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyPress={handleSearchInput}
              />
              <TextField
                name="tagField"
                variant="outlined"
                label="Search Tags"
                placeholder="&nbsp;search by tags"
                fullWidth
                style={{ margin: '15px 0' }}
                value={tag}
                onChange={(e) => setTag(e.target.value)}
                onKeyPress={handleTagInput}
              />
              {/* <Paper className={classes.root} elevation={0}>
                {tags.map((currentTag) => (
                  <>
                    <Chip
                      key={currentTag}
                      style={{ marginRight: '2px' }}
                      label={currentTag}
                      variant="default"
                      size="small"
                      onDelete={() => handleTagDelete(currentTag)}
                    />
                  </>
                ))}
              </Paper> */}
              <Button
                className={classes.buttonSearch}
                variant="contained"
                color="primary"
                size="large"
                fullWidth
                onClick={searchPost}
              >
                search
              </Button>
              <Button
                variant="contained"
                color="secondary"
                size="small"
                fullWidth
                onClick={clearSearch}
              >
                Clear
              </Button>
            </AppBar>
            <Form currentId={currentId} setCurrentId={setCurrentId} />
            <Paper elevation={6} className={classes.paginate}>
              <Paginate />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default Home;
