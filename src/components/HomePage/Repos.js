import React, { useEffect, useState } from 'react';
import RepoItem from './RepoItem';
import Settings from '../../utils/settings';

function Repos({
  data,
  loadMore,
  currentPage,
  username,
  totalCount,
  loadStargazers,
  requesting,
}) {
  const [canLoadMore, checkLoadMoreAvaiable] = useState(true);

  useEffect(() => {
    return checkLoadMoreAvaiable(
      totalCount/Settings.defaultReposPerPage - currentPage > 0
    )
  }, [totalCount, currentPage]);

  return (
    <div className='repos'>
      {canLoadMore && <input
        className="button"
        type="button"
        value="Load More"
        onClick={() => loadMore(username, currentPage + 1)}
      />}
      <label className='pull-right'>
        Total: {`${data.length}/${totalCount}`}
      </label>
      {
        data.map((repo, i) => (
          <RepoItem data={repo}  key={repo.id} loadStargazers={loadStargazers}/>
      ))
      }
    </div>
  )
}

export default Repos;