import { Provider } from 'react-redux';
import { store } from './store';
import MindMap from './components/MindMap';
import {  ReactFlowProvider } from '@xyflow/react';
export default function App() {
  
 
  return (
    <ReactFlowProvider>
      <Provider store={store}>
        <ReactFlowProvider>
          <MindMap />
        </ReactFlowProvider>
        
      </Provider>
    </ReactFlowProvider>
  );
}
          

