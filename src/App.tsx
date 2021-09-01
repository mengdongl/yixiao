import React from 'react';
import './App.css';
import { ProjectListScreen } from 'screens/project-list/index'
import { TsReactTest} from 'try-use-array'
import { LoginScreen } from 'screens/login/index'

function App() {
  return (
    <div className="App">
      {/* <ProjectListScreen/> */}
      <LoginScreen></LoginScreen>
    </div>
  );
}

export default App;
