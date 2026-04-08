import './style.css';
import { updateDOMStrings } from './i18n';
import { initUI } from './ui';

updateDOMStrings();

document.addEventListener('DOMContentLoaded', () => {
  initUI();
  setTimeout(() => {
    document.body.classList.add('ready');
    document.body.style.opacity = '1';
  }, 50);
});

// @ts-ignore
window.dataLayer = window.dataLayer || [];
function gtag(){
  // @ts-ignore
  dataLayer.push(arguments);
}
// @ts-ignore
gtag('js', new Date());
// @ts-ignore
gtag('config', 'G-V4MRZL3F6K');
