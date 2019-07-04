import React from 'react';
import RepoItem from './RepoItem';

const Repos = ({
  data,
  loadMore,
  currentPage,
  username,
  canLoadMore,
  totalCount,
  loadStargazers
}) => (
  <div className='repos'>
    {
      data.map((repo, i) => (
        <RepoItem data={repo}  key={repo.id} loadStargazers={loadStargazers}/>
    ))
    }
    <input
      className="button"
      type="button"
      value="Load More"
      onClick={() => loadMore(username, currentPage + 1)}
      disabled={canLoadMore ? null : "disabled"}
    />
    <label>
      Total: {totalCount}
    </label>
  </div>
)

export default Repos;