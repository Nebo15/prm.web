import React, { PropTypes } from 'react';
import classnames from 'classnames';
import withStyles from 'withStyles';
import styles from './icons.font';

export const icons = [
  'add',
];

const Icon = ({ name }) => React.createElement('i', {
  className: classnames(styles.icon, styles[`icon-${name}`]),
});

Icon.propTypes = {
  name: PropTypes.oneOf(icons).isRequired,
};

export default withStyles(styles)(Icon);
