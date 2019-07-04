import { all } from 'redux-saga/effects'
import HomePageSaga from './containers/HomePage/saga';
export default function* rootSaga() {
  yield all([
    HomePageSaga(),
  ])
}