import './styles/App.css';
import React, { useEffect, useContext} from 'react';
import { Switch, Route } from "react-router-dom";
import Header from './Header';
import Home from './Home';
import PiecesContainer from './PiecesContainer';
import LandingPageSignUp from './LandingPageSignUp';
import LandingPageLogin from './LandingPageLogin';
import { UserContext } from './context/user';

function App() {
const {designer, setDesigner} = useContext(UserContext)

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
    useEffect(() => {
      fetch("/check_session")
          .then((r) => {
              if (r.ok) {
                  r.json().then(r => setDesigner(r))
              } else {
                    console.log("STATUS:", r.status)
                  }
          })
    }, [])


  console.log(designer)

  return (
    <div className="App">
     <Header />
     <main>
      {designer ? (
        <Switch >
          <Route exact path='/'>
            <Home />
          </Route>
          <Route exact path='/pieces'>
            <PiecesContainer />
          </Route>
          
        </Switch>
      ) : (
        <Switch>
          <Route exact path='/' >
            <LandingPageSignUp />
          </Route>
          <Route exact path='/login'>
            <LandingPageLogin />
          </Route>
          <Route path ="*">
            <h1>404 Not Found!!!</h1>
          </Route>
        </Switch>
      )}
     </main>
    </div>
  );
}

export default App;
