import React from 'react';
import PropTypes from 'prop-types';

import Dietary from '../Dietary';

const Dietaries = ({ dietaries }) => dietaries.map((dietary) => <Dietary key={dietary} dietary={dietary} />);

Dietaries.propTypes = {
  dietaries: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Dietaries;
