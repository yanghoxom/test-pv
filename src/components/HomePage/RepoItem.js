import React from 'react';
import Stargazer from './Stargazer';
import Settings from '../../utils/settings';

const RepoItem = ({data, loadStargazers}) => (
  <div className='repo'>
    {`${data.name} star: ${data.stargazers_count}`}
    {
      data.stargazers_count > 0 ?
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
      [<input
        className="button"
        type="button"
        value="Load More"
        onClick={() => loadStargazers(data)}
        disabled={data.stargazers_count/Settings.defaultReposPerPage - data.current_page > 0 ? null : "disabled"}
      />,
      <label>
        Total: {`${data.list_stargazers.length}/${data.stargazers_count}`}
      </label>]
    }
  </div>
)

export default RepoItem;