import React from 'react';
import classnames from 'classnames';
import {
  gql,
  graphql
} from 'react-apollo';

const coveragesQuery = gql`
query Coverages {
    coverages {
        id
        name
    }
}
`;

const CoverageList = ({ handleClick, selectedCoverage, data: {loading, error, coverages }}) => {
  if (loading) {
    return <p>Fetching Data...</p>;
  }
  if (error) {
    return <p>{error.message}</p>;
  }

  if (coverages) {
    const li = coverages.map( coverage =>{
      const btnClass = classnames({
        button: true,
        'is-primary': selectedCoverage === coverage.id,
      });
      return (
        <li key={coverage.id}>
          <a onClick={() => handleClick(coverage.id)} className={btnClass}>{coverage.name || coverage.id}</a>
        </li>)
    });

    return (
      <div>
        <ul>{ li }</ul>
      </div> )
    } else {
      return <div>Rien</div>
    }
  };

const CoverageListData = graphql(coveragesQuery)(CoverageList);

export default CoverageListData
