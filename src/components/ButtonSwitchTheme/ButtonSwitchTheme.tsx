import switchTheme from '../../utils/switchTheme';
import './ButtonSwitchTheme.scss';

function ButtonSwitchTheme() {
  return (
    <button onClick={ () => switchTheme() }>
      Mudar Tema
    </button>
  );
}

export default ButtonSwitchTheme;
