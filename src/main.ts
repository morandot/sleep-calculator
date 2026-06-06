import './style.css';
import { updateDOMStrings } from './i18n';
import { initTheme } from './state';
import { initApp } from './app';

// Apply theme before first paint to prevent flash
initTheme();
updateDOMStrings();

function start(): void {
  initApp();
  // Small delay to ensure CSS transitions apply after initial render
  requestAnimationFrame(() => {
    document.body.classList.add('ready');
  });
}

// DOMContentLoaded may have already fired by the time this module loads,
// because <script type="module"> is deferred by spec.
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', start);
} else {
  start();
}
