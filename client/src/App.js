import './styles/App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import React, { useEffect, useContext, useState} from 'react';
import { Switch, Route } from "react-router-dom";

import Explore from './Explore';
import DesignContainer from './DesignContainer';
import PiecesContainer from './PiecesContainer';
import ProfilePage from './ProfilePage';
import { UserContext } from './context/user';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import LandingPage from './LandingPage';
import Loading from './Loading';
import NotFound from './NotFound';


function App() {
  const {designer, setDesigner} = useContext(UserContext)
  const [designs, setDesigns] = useState([])
  const [piecesLibrary, setPiecesLibrary] = useState([])
  const history= useHistory()


    useEffect(() => {
      fetch("/check_session")
          .then((r) => {
              if (r.ok) {
                  r.json().then(r => {
                    setDesigner(r)
                    setDesigns(r.designs)
                    setPiecesLibrary(r.pieces)
                    })
                 
              } else {
                    console.log("STATUS:", r.status)
                  }
          })
    }, [])

    const goBackOne = () => history.goBack()

    const handleNewD = (newDObj) => {
      setDesigns([...designs, newDObj])
    }

    const removeDesign = (doomedD) => {
      const updatedDesigns = designs.filter(design => design !== doomedD )
      setDesigns(updatedDesigns)
    }

  return (
    <div className="App">
      {designer ? (
        <>
        <main id="main">
        <Switch >
          <Route exact path='/'>
            <LandingPage />
          </Route>
          <Route exact path='/explore'>
            <Explore />
          </Route>
          <Route exact path='/archive'>
            <PiecesContainer
            piecesLibrary={piecesLibrary}
            setPiecesLibrary={setPiecesLibrary} 
            />
          </Route>
          <Route path='/designs'>
            <DesignContainer 
            designs={designs}
            setDesigns={setDesigns} 
            handleNewD={handleNewD}
            removeDesign={removeDesign}
            piecesLibrary={piecesLibrary}
            setPiecesLibrary={setPiecesLibrary}
            />
          </Route>
          <Route exact path='/profile'>
            <ProfilePage />
          </Route>
          <Route path ="*">
           <NotFound/>
          </Route>
        </Switch>
        </main>
        </>
      ) : (
        <Switch>
          <Route exact path='/' >
            <LandingPage setDesigns={setDesigns} />
          </Route>
          <Route path ="*">
           <NotFound/>
          </Route>
        </Switch>
      )}
      
     
    </div>
  );
}

export default App;
