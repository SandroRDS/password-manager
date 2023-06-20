export default function isMobileDevice() {
  return ('ontouchstart' in window || navigator.maxTouchPoints) && window.innerWidth < 996;
}
