import React, { useEffect, useState } from 'react';
import Stargazer from './Stargazer';
import Settings from '../../utils/settings';

function RepoItem({data, loadStargazers}) {
  const [canLoad, checkLoadAvaiable] = useState(true);

  useEffect(() => {
    return checkLoadAvaiable(data.stargazers_count/Settings.defaultReposPerPage - data.current_page + 1 > 0);
  }, [data.stargazers_count, data.current_page]);

  return (
    <div className='repo'>
      {`${data.name} star: ${data.stargazers_count}`}
      {
        data.stargazers_count > 0 && data.list_stargazers.length === 0 ?
          <label className="pull-right" onClick={() => loadStargazers(data)}>
            Show Stargazer
          </label> :
          null
      }
      {
        data.list_stargazers.length > 0 && data.list_stargazers.map(stargazer => (
          <Stargazer data={stargazer} key={stargazer.node_id} />
        ))
      }
      { data.list_stargazers.length > 0 &&
        [canLoad && <input
          className="button"
          type="button"
          value="Load More"
          onClick={() => loadStargazers(data)}
        />,
        <label className='pull-right'>
          Total: {`${data.list_stargazers.length}/${data.stargazers_count}`}
        </label>]
      }
    </div>
  )
}

export default RepoItem;