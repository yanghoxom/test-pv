import {
  LOAD_REPOS,
  LOAD_REPOS_SUCCESS,
  LOAD_REPOS_FAIL,
  LOAD_MORE_REPOS_SUCCESS,
  LOAD_STARGAZERS,
  LOAD_STARGAZERS_SUCCESS,
  LOAD_STARGAZERS_FAIL,
 } from './constants';

export function loadRepos(username, page) {
  return {
    type: LOAD_REPOS,
    username,
    page
  };
}

export function loadReposSuccess(repos, total_count, page) {
  return {
    type: LOAD_REPOS_SUCCESS,
    repos,
    total_count,
    page,
  };
}

export function loadMoreReposSuccess(repos, total_count, page) {
  return {
    type: LOAD_MORE_REPOS_SUCCESS,
    repos,
    total_count,
    page,
  };
}

export function loadReposFail(error) {
  return {
    type: LOAD_REPOS_FAIL,
    error,
  };
}

export function loadStargazers(repo) {
  return {
    type: LOAD_STARGAZERS,
    repo,
  }
}

export function loadStargazersSuccess(repo){
  return {
    type: LOAD_STARGAZERS_SUCCESS,
    repo
  }
}

export function loadStargazersFail(){
  return {
    type: LOAD_STARGAZERS_FAIL,
  }
}
