import React from 'react';
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
                username={this.props.username}
              />,
              this.props.repos.length > 0 ?
                <Repos
                  data={this.props.repos}
                  username={this.props.username}
                  loadMore={this.props.loadMore}
                  currentPage={this.props.currentPageRepos}
                  totalCount={this.props.totalRepos}
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
    onSubmitForm: (username, page) => {
      dispatch(
        loadRepos(
          username, page
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

