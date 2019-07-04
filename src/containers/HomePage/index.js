import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import FormInput from '../../components/HomePage/FormInput';
import Repos from '../../components/HomePage/Repos';
import { loadRepos, loadStargazers } from './actions';
import { compose } from 'redux';
import {
  makeSelectRepos,
  makeSelectRequesting,
  makeSelectCurrentPageRepos,
  makeSelectUsername,
  makeSelectTotalRepos,
} from './selectors';
import LoadingIndicator from '../../components/LoadingIndicator';
import Settings from '../../utils/settings';

class HomePage extends React.Component {
  render(){
    return(
      <div>
        {
          this.props.requesting ?
            <LoadingIndicator /> :
            [
              <FormInput
                onSubmit={values => this.props.onSubmitForm(values, this.props.currentPageRepos)}
                requesting={this.props.requesting}
                username={this.props.username}
              />,
              this.props.repos.length > 0 ?
                <Repos
                  data={this.props.repos}
                  username={this.props.username}
                  loadMore={this.props.loadMore}
                  currentPage={this.props.currentPageRepos}
                  canLoadMore={this.props.totalRepos/Settings.defaultReposPerPage - this.props.currentPageRepos > 0}
                  totalCount={`${this.props.repos.length}/${this.props.totalRepos}`}
                  loadStargazers={this.props.loadStargazers}
                /> :
                null,
            ]
        }
      </div>
    )
  }
}

HomePage.propTypes = {
  onSubmitForm: PropTypes.func,
};

const mapStateToProps = state => ({
  repos: makeSelectRepos(state),
  requesting: makeSelectRequesting(state),
  currentPageRepos: makeSelectCurrentPageRepos(state) ,
  username: makeSelectUsername(state),
  totalRepos: makeSelectTotalRepos(state),
});

const mapDispatchToProps = dispatch => {
  return {
    onSubmitForm: (values, page) => {
      dispatch(
        loadRepos(
          values.target.elements.username.value, page
        ),
      );
    },
    loadMore: (username, nextPage) => {
      dispatch(
        loadRepos(username, nextPage)
      )
    },
    loadStargazers: repo => {
      dispatch(loadStargazers(repo))
    }
  };
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
)(HomePage);

