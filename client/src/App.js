import './styles/App.css';
import React, { useEffect, useContext, useState} from 'react';
import { Switch, Route } from "react-router-dom";
import Header from './Header';
import Home from './Home';
import Designs from './Designs';
import PiecesContainer from './PiecesContainer';
import ProfilePage from './ProfilePage';
import LandingPageSignUp from './Signup';
import LandingPageLogin from './Login';
import { UserContext } from './context/user';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';


function App() {
const {designer, setDesigner} = useContext(UserContext)
const [pieces, setPieces] = useState([])
const [designs, setDesigns] = useState([])
const history= useHistory()


    useEffect(() => {
      fetch("/check_session")
          .then((r) => {
              if (r.ok) {
                  r.json().then(r => setDesigner(r))
              } else {
                    console.log("STATUS:", r.status)
                    history.push('/signup')
                  }
          })
    }, [])

    useEffect(() => {
      fetch("/pieces")
      .then((r) => {
        if (r.ok) {
          r.json().then(r => {
            setPieces(r)
          } )
        } else {
          r.json().then(console.log)
        }
      })
    }, [])

    const goBackOne = () => {
      history.goBack()
    }

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
            <PiecesContainer pieces={pieces} />
          </Route>
          <Route exact path='/designs'>
            <Designs />
          </Route>
          <Route exact path='/profile'>
            <ProfilePage />
          </Route>
        </Switch>
      ) : (
        <Switch>
          <Route exact path='/signup' >
            <LandingPageSignUp />
          </Route>
          <Route exact path='/login'>
            <LandingPageLogin />
          </Route>
          <Route path ="*">
            <>
            <h1>404 Not Found!!!</h1>
            <button onClick={goBackOne}>back to safety</button>
            </>
          </Route>
        </Switch>
      )}
     </main>
    </div>
  );
}

export default App;
