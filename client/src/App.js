import './styles/App.css';
import React, {useState, useEffect, useHistory} from 'react';
import { Switch, Route } from "react-router-dom";
import Header from './Header';
import Home from './Home';
import PiecesContainer from './PiecesContainer';

function App() {
  const [designer, setDesigner] = useState(null);

  useEffect(() => {
    fetch("")
  })



  return (
    <div className="App">
     <Header />
     <Switch >
      <Route exact path='/pieces'>
        <PiecesContainer />
      </Route>
      <Route exact path='/'>
        <Home />
      </Route>
     </Switch>
    </div>
  );
}

export default App;
