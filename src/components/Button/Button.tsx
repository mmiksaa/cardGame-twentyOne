import { memo } from 'react';
import classNames from 'classnames';
import './button.scss';

type Button = {
  className: string;
  children: React.ReactNode;
  onClickFunc: () => void;
  disabled?: boolean;
};

const Button: React.FC<Button> = memo(function Button({ className, children, onClickFunc, disabled }) {
  return (
    <button onClick={onClickFunc} className={classNames('btn', className)} disabled={disabled}>
      {children}
    </button>
  );
});

export default Button;
