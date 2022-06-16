import classNames from 'classnames';
import './cardBlock.scss';

function CardBlock({ children, hideJDK }) {
  
  if(!hideJDK) {
    children = children === 11 ? 't' : children;
    children = children === 2 ? 'j' : children;
    children = children === 3 ? 'd' : children;
    children = children === 4 ? 'k' : children;
  }

  return (
    <div
      className={classNames('card', {
        'card--djoker': children === 't',
      })}>
      <div className="card__name">{children}</div>
    </div>
  );
}

export default CardBlock;
