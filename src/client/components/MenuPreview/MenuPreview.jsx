import React from 'react';
import PropTypes from 'prop-types';

import Dietaries from '../Dietaries';

import './MenuPreview.css';

const MenuPreview = ({ selectedItems, handleRemoveItem }) => (
  <>
    <h2>Menu preview</h2>
    <ul className="menu-preview">
      {selectedItems.map(({ id, name, dietaries }) => (
        <li className="item" key={id}>
          <h2>{name}</h2>
          <p>
            <Dietaries dietaries={dietaries} />
          </p>
          <button
            type="button"
            className="remove-item"
            onClick={() => handleRemoveItem(id)}
          >
            x
          </button>
        </li>
      ))}
    </ul>
  </>
);

MenuPreview.propTypes = {
  selectedItems: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      dietaries: PropTypes.arrayOf(PropTypes.string).isRequired,
    }).isRequired,
  ).isRequired,
  handleRemoveItem: PropTypes.func.isRequired,
};

export default MenuPreview;
