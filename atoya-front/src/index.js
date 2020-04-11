import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import {makeMainRoutes} from './routes';

const routes = makeMainRoutes();

ReactDOM.render(
  routes,
  document.getElementById('root')
);