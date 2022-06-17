import { SettingsBar, Table, Instruction, GameBar, EndGame, Github } from './components';
import { useSelector } from 'react-redux';
import classNames from 'classnames';

function App() {
  const gameCounter = useSelector(state => state.cards.gameCounter);
  const { gameCounterMain, hideHUD } = useSelector(state => state.settings);

  const createCountItem = (item, index) => {
    if(item) {
      return <li
        key={index}
        className={classNames('counter__item', {
          'counter__item--win': 0 === index,
          'counter__item--draw': 1 === index,
          'counter__item--lose': 2 === index
        })}>
        {item}
      </li>
    }else {
     return <li key={index} className="counter__item">0</li>
    }      
  };

  const counterItems = gameCounter.map((item, index) => createCountItem(item, index));

  return (
    <div className="wrapp">
      <header className="header">
        <div className="settings-bar">
          <SettingsBar counterItems={counterItems} />
          <Instruction hideHUD={hideHUD}/>
        </div>
        <ul className="counter counter--active">{gameCounterMain && !hideHUD && counterItems}</ul>
      </header>

      <div className="container">
        <Table />
      </div>

      <GameBar hideHUD={hideHUD}/>
      <EndGame />

      <Github hideHUD={hideHUD} className="github" />
      <div className="bottom"></div>
    </div>
  );
}

export default App;
