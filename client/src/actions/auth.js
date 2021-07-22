import { AUTH } from '../constants/actionTypes';
import * as api from '../api/index.js';

// Action Creators

// fetchPosts
export const login = (formData, history) => async (dispatch) => {
  try {
    //login user
    const { data } = await api.logIn(formData);

    dispatch({ type: AUTH, data });

    history.push('/');
  } catch (error) {
    console.log(error);
  }
};

// createPost
export const signup = (formData, history) => async (dispatch) => {
  try {
    //signup user
    const { data } = await api.signUp(formData);

    dispatch({ type: AUTH, data });

    history.push('/');
  } catch (error) {
    console.log(error);
  }
};
