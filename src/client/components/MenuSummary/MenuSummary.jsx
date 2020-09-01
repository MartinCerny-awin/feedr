import React from 'react';
import PropTypes from 'prop-types';

import Dietary from '../Dietary';

import './MenuSummary.css';

const MenuSummary = ({ numberOfSelectedItems, selectedDietaries }) => (
  <div className="menu-summary">
    <div className="container">
      <div className="row">
        <div className="col-6 menu-summary-left">
          <span>{numberOfSelectedItems} items</span>
        </div>
        <div className="col-6 menu-summary-right">
          {Object.keys(selectedDietaries).map((key) => (
            <React.Fragment key={key}>
              {selectedDietaries[key]}x <Dietary dietary={key} />
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  </div>
);

MenuSummary.propTypes = {
  numberOfSelectedItems: PropTypes.number.isRequired,
  selectedDietaries: PropTypes.objectOf(PropTypes.number).isRequired,
};

export default MenuSummary;
