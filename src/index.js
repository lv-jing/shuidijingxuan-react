
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import router from "./Router"


ReactDOM.render(router, document.getElementById('root'));
registerServiceWorker();
