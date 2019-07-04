import { takeLatest, call, put } from 'redux-saga/effects';
import { LOAD_REPOS, LOAD_STARGAZERS} from './constants';
import {
  loadReposSuccess,
  loadReposFail,
  loadMoreReposSuccess,
  loadStargazers,
  loadStargazersSuccess,
  loadStargazersFail,
} from './actions';
import axios from 'axios';

export function* handleLoadRepos(action) {
  const { username, page } = action;
  try {
    const response = yield call(axios.get, `https://api.github.com/search/repositories?q=user:${username}&page=${page}`);

    const items = response.data.items.map(item => (
      {
        id: item.id,
        name: item.name,
        stargazers_count: item.stargazers_count,
        stargazers_url: item.stargazers_url,
        current_page: 1,
        list_stargazers: [],
      }
    ))
    if(page === 1) {
      yield put(loadReposSuccess(items, response.data.total_count, page));
    } else {
      yield put(loadMoreReposSuccess(items, response.data.total_count, page));
    }
  } catch (err) {
    yield put(loadReposFail(err.message));
  }
}

export function* handleLoadStargazers(action) {
  const { repo : { current_page, stargazers_url }, repo } = action;
  try {
    const response = yield call(axios.get, `${stargazers_url}?page=${current_page}`);

    repo.current_page = current_page + 1;
    repo.list_stargazers = repo.list_stargazers.concat(response.data);
    yield put(loadStargazersSuccess(repo));
  } catch (err) {
    yield put(loadStargazersFail(err.message));
  }
}

export function* watcherSaga() {
  yield takeLatest(LOAD_REPOS, handleLoadRepos);
  yield takeLatest(LOAD_STARGAZERS, handleLoadStargazers)
}

export default watcherSaga;