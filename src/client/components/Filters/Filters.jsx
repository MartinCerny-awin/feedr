import React from 'react';
import PropTypes from 'prop-types';

import Dietaries from '../Dietaries';

import './Filters.css';

const Filters = ({
  filteredItems,
  searchTerm,
  setSearchTerm,
  handleAddItem,
}) => (
  <>
    <div className="filters">
      <input
        className="form-control"
        placeholder="Name"
        value={searchTerm}
        onChange={(ev) => setSearchTerm(ev.target.value)}
      />
    </div>
    <ul className="item-picker">
      {filteredItems.map(({ id, name, dietaries }) => (
        <li key={id} className="item" onClick={() => handleAddItem(id)}>
          <h2>{name}</h2>
          <p>
            <Dietaries dietaries={dietaries} />
          </p>
        </li>
      ))}
    </ul>
  </>
);

Filters.propTypes = {
  filteredItems: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      dietaries: PropTypes.arrayOf(PropTypes.string).isRequired,
    }).isRequired,
  ).isRequired,
  searchTerm: PropTypes.string.isRequired,
  setSearchTerm: PropTypes.func.isRequired,
  handleAddItem: PropTypes.func.isRequired,
};

export default Filters;
