import SessionService from "./session";
import PageModulatorService from './pageModulator';

const services = {
  pageModulator: new PageModulatorService(),
  session: new SessionService(), 
}

export default services;
