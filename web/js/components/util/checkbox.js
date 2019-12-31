import React from 'react';
import PropTypes from 'prop-types';

/*
 * A checkbox component
 * @class Checkbox
 * @extends React.Component
 */
export class Checkbox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: props.checked
    };
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (this.state.checked !== nextProps.checked) {
      this.setState({
        checked: nextProps.checked
      });
    }
  }

  onClick(e) {
    const { onClick } = this.props;
    if (onClick) {
      e.stopPropagation();
      onClick(e);
    }
  }

  handleChange(e) {
    const { onCheck } = this.props;
    const boo = !this.state.checked;
    this.setState({
      checked: boo
    });
    if (onCheck) onCheck(boo);
  }

  render() {
    // console.log(this.props);
    const { checked } = this.state;
    const { isRound, color, classNames, id, name, optionalCaseClassName, optionalLabelClassName, title, label } = this.props;
    const roundClassName = isRound ? 'wv-checkbox-round ' : '';
    const defaultClassName = 'wv-checkbox ';
    const checkedClassName = checked ? 'checked ' : '';
    const caseClassName =
      defaultClassName + roundClassName + checkedClassName + optionalCaseClassName + color;

    return (
      <div className={caseClassName} onClick={this.onClick.bind(this)}>
        <input
          type="checkbox"
          id={id}
          title={title}
          name={name}
          checked={checked}
          className={classNames}
          onChange={this.handleChange.bind(this)}
        />
        <label className={optionalLabelClassName} htmlFor={id}>{label}</label>
      </div>
    );
  }
}
Checkbox.defaultProps = {
  inputPosition: 'left',
  checked: true,
  color: '',
  isRound: false,
  onCheck: null,
  optionalCaseClassName: '',
  optionalLabelClassName: ''
};

Checkbox.propTypes = {
  checked: PropTypes.bool,
  classNames: PropTypes.string,
  color: PropTypes.string,
  id: PropTypes.string,
  isRound: PropTypes.bool,
  label: PropTypes.string,
  name: PropTypes.string,
  onCheck: PropTypes.func,
  onClick: PropTypes.func,
  optionalCaseClassName: PropTypes.string,
  optionalLabelClassName: PropTypes.string,
  positionRelativeToLabel: PropTypes.string,
  title: PropTypes.string
};
