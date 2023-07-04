import SessionService from "./session";
import PageModulatorService from './pageModulator';
import SystemConfigService from "./systemConfig";

const services = {
  pageModulator: new PageModulatorService(),
  session: new SessionService(),
  systemConfig: new SystemConfigService(), 
}

export default services;
