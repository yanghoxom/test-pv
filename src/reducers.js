/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { combineReducers } from 'redux';
import HomePageReducer from './containers/HomePage/reducer';
/**
 * Merges the main reducer with the router state and dynamically injected reducers
 */
export default function createReducer() {
  const rootReducer = combineReducers({
    HomePage: HomePageReducer,
  });

  return rootReducer;
}
