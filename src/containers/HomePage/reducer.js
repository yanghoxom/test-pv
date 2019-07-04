import { fromJS } from 'immutable';
import {
  LOAD_REPOS,
  LOAD_REPOS_SUCCESS,
  LOAD_REPOS_FAIL,
  LOAD_MORE_REPOS_SUCCESS,
  LOAD_STARGAZERS,
  LOAD_STARGAZERS_SUCCESS,
  LOAD_STARGAZERS_FAIL,
} from './constants';

export const initialState = fromJS({
  requesting: false,
  successful: false,
  error: false,
  repos: [],
  username: null,
  totalCount: 0,
  currentPageRepos: 1,
});

function homePageReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_REPOS:
      return state.merge({
        requesting: true,
        successful: false,
        username: action.username,
      });
    case LOAD_REPOS_SUCCESS:
      return state.merge({
        error: false,
        requesting: false,
        successful: true,
        repos: action.repos,
        currentPageRepos: action.page,
        totalCount: action.total_count,
      });
    case LOAD_MORE_REPOS_SUCCESS:
      return state.merge({
        error: false,
        requesting: false,
        successful: true,
        repos: state.get('repos').concat(action.repos),
        currentPageRepos: action.page,
        totalCount: action.total_count,
      });
    case LOAD_REPOS_FAIL:
      return state.merge({
        requesting: false,
        successful: false,
        error: action.error,
      });
    case LOAD_STARGAZERS:
      return state.merge({
        requesting: true,
        successful: false,
      });
    case LOAD_STARGAZERS_SUCCESS:
      state.setIn(['repos', 'id', action.repo.id], action.repo)
      return state.merge({
        error: false,
        requesting: false,
        successful: true,
      });
    default:
      return state;
  }
}

export default homePageReducer;
