import { SettingsBar, Table, Instruction, GameBar, EndGame, Github } from './components';
import { useSelector } from 'react-redux';
import classNames from 'classnames';
import { RootState } from './redux/store';

function App() {
  const gameCounter = useSelector((state: RootState) => state.cards.gameCounter);
  const { gameCounterMain, hideHUD } = useSelector((state: RootState) => state.settings);

  const createCountItem = (item: number, index: number) => {
    if (item) {
      return (
        <li
          key={index}
          className={classNames('counter__item', {
            'counter__item--win': 0 === index,
            'counter__item--draw': 1 === index,
            'counter__item--lose': 2 === index,
          })}>
          {item}
        </li>
      );
    } else {
      return (
        <li key={index} className='counter__item'>
          0
        </li>
      );
    }
  };

  const counterItems = gameCounter.map((item: number, index: number) => createCountItem(item, index));

  return (
    <>
      <div className='wrapp'>
        <header className='header'>
          <div className='settings-bar'>
            <SettingsBar counterItems={counterItems} />
            <Instruction hideHUD={hideHUD} />
          </div>
          <ul className='counter counter--active'>{gameCounterMain && !hideHUD && counterItems}</ul>
        </header>

        <div className='container'>
          <Table />
        </div>

        <div className='bottom'></div>
      </div>

      <GameBar hideHUD={hideHUD} />
      <EndGame />
      <Github hideHUD={hideHUD} className='github' />
    </>
  );
}

export default App;
