import { loadDatabase } from './database/manageDatabase';

function AppMobile() {
  loadDatabase();

  return <p>Bem-vindo!</p>
}

export default AppMobile;
