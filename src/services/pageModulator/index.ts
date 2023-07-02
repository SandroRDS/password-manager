export default class PageModulatorService {
  setPageTitle(title: string): void {
    const titleEl = document.querySelector('title') as HTMLTitleElement;
    titleEl.innerText = title;
  }
}
