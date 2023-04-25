import './styles/App.css';
import React, {useState, useEffect, useHistory} from 'react';
import { Switch, Route } from "react-router-dom";
import Header from './Header';
import Home from './Home';
import PiecesContainer from './PiecesContainer';
import LandingPageSignUp from './LandingPageSignUp';

function App() {
  const [designer, setDesigner] = useState(null);

  useEffect(() => {
    fetch("http://127.0.0.1:5555/checksession")
      .then(r => {
        if (r.ok) {
          console.log("STATUS:", r.status)
          r.json().then(r => setDesigner(r))
        }
      })
  }, [])



  // const handleResponse = (r) => {
  //   if (r.ok) {
  //     console.log("STATUS:", r.status)
  //     r.json().then(r=> {
  //       setDesigner(r)
  //     })
  //   } else {
  //     console.log("STATUS:", r.status)
  //   }

  // }



  return (
    <div className="App">
     <Header />
     <main>
      {designer ? (
        <Switch >
          <Route exact path='/pieces'>
            <PiecesContainer />
          </Route>
          <Route exact path='/'>
            <Home />
          </Route>
        </Switch>
      ) : (
        <Switch>
          <Route path exact = '/signup' >
            <LandingPageSignUp setDesigner={setDesigner}/>
          </Route>
          <Route>
            
          </Route>
        </Switch>
      )
     }
     </main>
    </div>
  );
}

export default App;
