import { Provider } from 'react-redux';
import configureStore from './store';

import { CounterButton } from './CounterButton';

import './App.css';

const App = () => {
  return (
    <Provider store={configureStore}>
      <h1>State Management Example</h1>
      <CounterButton />
    </Provider>
  );
};

export default App;
