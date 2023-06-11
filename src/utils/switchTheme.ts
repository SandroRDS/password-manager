export default function switchTheme() {
  const bodyClassList = document.body.classList;
  
  bodyClassList.toggle('dark-mode');
  bodyClassList.toggle('white-mode');
}