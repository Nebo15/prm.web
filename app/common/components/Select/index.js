import React, { PropTypes } from 'react';
import classnames from 'classnames';
import withStyles from 'withStyles';
import { ErrorMessages } from 'modules/validate';

import OuterClick from 'components/OuterClick';

import styles from './styles.scss';

const LIST_HEIGHT_PADDING = 32;

const isActive = (target, value) => {
  if (value instanceof Object) {
    return JSON.stringify(target) === JSON.stringify(value);
  }

  return target === value;
};

class Select extends React.Component {
  static propTypes = {
    active: PropTypes.any,
    labelText: PropTypes.string,
    open: PropTypes.bool,
    disabled: PropTypes.bool,
    placeholder: PropTypes.string,
    options: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired, // eslint-disable-line react/no-unused-prop-types
        name: PropTypes.any.isRequired, // eslint-disable-line react/no-unused-prop-types
        disabled: PropTypes.bool, // eslint-disable-line react/no-unused-prop-types
      })
    ).isRequired,
    onChange: PropTypes.func,
  };

  static defaultProps = {
    open: false,
  };

  state = {
    open: this.props.open,
    active: (() => this.props.options.filter(item => isActive(item.name, this.props.active))[0])(),
  };

  componentWillReceiveProps(props) {
    if (props.active) {
      this.setState({
        active: this.props.options.filter(item => isActive(item.name, props.active))[0],
      });
    }
  }

  onSelect(item = {}) {
    this.setState({ active: item, open: false });
    this.props.onChange && this.props.onChange(item.name);
  }

  /**
   * Calculate open drop down popup position
   * @returns {String<'top'|'bottom'>}
   */
  get position() {
    if (!this.selectNode) {
      return 'bottom';
    }

    const selectSize = this.selectNode.getBoundingClientRect();
    const screenHeight = document.documentElement.clientHeight;
    const selectHeight = this.listNode.clientHeight;

    if (screenHeight - selectSize.bottom > selectHeight + LIST_HEIGHT_PADDING) {
      return 'bottom';
    }

    return 'top';
  }

  get value() {
    return this.state.active;
  }

  /* eslint-disable jsx-a11y/no-static-element-interactions */
  render() {
    const {
      options = [],
      placeholder,
      disabled,
      labelText,
      error,
      children,
    } = this.props;

    const activeItem = this.state.active || {};
    const classNames = classnames(
      styles.select,
      this.state.open && styles[this.position],
      this.state.open && styles.open,
      disabled && styles.disabled,
      error && styles.errored,
    );

    return (
      <OuterClick onClick={() => this.setState({ open: false })}>
        <section ref={ref => (this.selectNode = ref)} className={classNames}>
          {labelText && <div className={styles.label}>{labelText}</div>}
          <div className={styles.in}>
            <input className={styles.input} />
            <div
              onClick={() => this.setState({ open: !this.state.open })}
              className={styles.control}
            >
              <span hidden={activeItem.title} className={styles.placeholder}>{placeholder}</span>
              <span className={styles.title} hidden={!activeItem.title}>
                {activeItem && activeItem.title}
              </span>
              <span className={styles.arrow}>
                <span className={styles.arrow__in} />
              </span>
            </div>
            <ul ref={ref => (this.listNode = ref)} className={styles.list}>
              {
                options.map(item => (
                  <li
                    onClick={() => !item.disabled && this.onSelect(item)}
                    className={classnames(
                      item.name === activeItem.name && styles.active,
                      item.disabled && styles.disabled
                    )}
                    key={item.name instanceof Object ? JSON.stringify(item.name) : item.name}
                  >
                    {item.title}
                  </li>
                ))
              }
            </ul>
          </div>
          { error &&
            <div className={styles['error-message']}>
              { typeof error === 'string' ? error : <ErrorMessages error={error}>{children}</ErrorMessages> }
            </div>
          }
        </section>
      </OuterClick>
    );
  }
}

export default withStyles(styles)(Select);
