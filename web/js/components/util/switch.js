import React, { useState } from 'react';
import PropTypes from 'prop-types';

// https://upmostly.com/tutorials/build-a-react-switch-toggle-component
const Switch = (props) => {
  const { color, containerId, id, active, toggle, label } = props;
  const [isActive, toggleActive] = useState(active);
  const style = color && isActive ? { backgroundColor: '#' + color } : {};
  return (
    <div id={containerId} className='react-switch'>
      <div className='react-switch-case switch-col'>
        <input
          className="react-switch-checkbox"
          id={id}
          type="checkbox"
          checked={isActive}
          onChange={() => {
            setTimeout(function() {
              toggle(); // wait for css animation to complete before firing action
            }, 200);
            toggleActive(!isActive);
          }}
        />
        <label
          className="react-switch-label"
          htmlFor={id}
          style={style}
        >
          <span className={'react-switch-button'} />
        </label>

      </div>
      <div className='react-switch-label-case switch-col'>{label}</div>
    </div>
  );
};
Switch.defaultProps = {
  containerId: ''
};
Switch.propTypes = {
  active: PropTypes.bool,
  color: PropTypes.string,
  containerId: PropTypes.string,
  id: PropTypes.string,
  label: PropTypes.string,
  toggle: PropTypes.func
};
export default Switch;
