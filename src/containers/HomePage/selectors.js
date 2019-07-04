import { createSelector } from 'reselect';

const selectHomePageDomain = state => state.HomePage;

const makeSelectRepos =
  createSelector(selectHomePageDomain, substate => substate.get('repos'));

const makeSelectRequesting =
  createSelector(selectHomePageDomain, substate => substate.get('requesting'));

const makeSelectUsername =
  createSelector(selectHomePageDomain, substate => substate.get('username'));

const makeSelectTotalRepos =
  createSelector(selectHomePageDomain, substate => substate.get('totalCount'));

const makeSelectCurrentPageRepos =
  createSelector(selectHomePageDomain, substate => substate.get('currentPageRepos'));


const makeSelectHomePageSuccess =
  createSelector(selectHomePageDomain, homePage =>
    homePage.get('successful'),
  );

const makeSelectHomePageError =
  createSelector(selectHomePageDomain, homePage => homePage.get('error'));

export {
  selectHomePageDomain,
  makeSelectRepos,
  makeSelectRequesting,
  makeSelectHomePageSuccess,
  makeSelectHomePageError,
  makeSelectUsername,
  makeSelectCurrentPageRepos,
  makeSelectTotalRepos,
};