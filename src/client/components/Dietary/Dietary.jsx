import React from 'react';
import PropTypes from 'prop-types';

import './Dietary.css';

const Dietary = ({ dietary }) => <span className="dietary">{dietary}</span>;

Dietary.propTypes = {
  dietary: PropTypes.string.isRequired,
};

export default Dietary;
