import './button.scss';
import classNames from 'classnames';
import { memo } from 'react';

const Button = memo(function Button({ className, children, onClickFunc, disabled }) {
  return (
    <button
      onClick={onClickFunc}
      className={classNames('btn', className)}
      disabled={disabled}>
      {children}
    </button>
  );
});

export default Button;
