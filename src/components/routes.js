import About from './about/About';
import Select from './steps/select/Select';
import Process from './steps/process/Process';
import Customise from './steps/customise/Customise';
import Finalise from './steps/finalise/Finalise';

const basePath = '/print-a-gif';

export default [
  { id: 'home', name: 'Home', path: '/', component: Select },
  { id: 'about', name: 'About', path: '/about', component: About },
  { id: 'select', name: 'Select', path: '/select', component: Select },
  { id: 'process', name: 'Process', path: '/process', component: Process },
  { id: 'customise', name: 'Customise', path: '/customise', component: Customise },
  { id: 'finalise', name: 'Finalise', path: '/finalise', component: Finalise },
].map(route => ({ ...route, path: `${basePath}${route.path}` }));
