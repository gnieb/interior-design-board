import './styles/App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import React, { useEffect, useContext, useState} from 'react';
import { Switch, Route } from "react-router-dom";
import Header from './Header';
import DesignContainer from './DesignContainer';
import PiecesContainer from './PiecesContainer';
import ProfilePage from './ProfilePage';
import { UserContext } from './context/user';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import LandingPage from './LandingPage';


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

    // const removePiece = (piece) => {
    //   const updatedPieces = pieces.filter((p) => p.id !== piece.id)
    //   setPieces(updatedPieces)
    // }

    const handleNewD = (newDObj) => {
      setDesigns([...designs, newDObj])
    }

    const removeDesign = (doomedD) => {
      const updatedDesigns = designs.filter(design => design !== doomedD )
      setDesigns(updatedDesigns)
    }

  return (
    <div className="App">
     <Header />
     <main>
      {designer ? (
        <Switch >
          <Route exact path='/'>
            <LandingPage />
          </Route>
          <Route exact path='/pieces'>
            <PiecesContainer
            piecesLibrary={piecesLibrary}
            setPiecesLibrary={setPiecesLibrary} 
            />
          </Route>
          <Route path='/designs'>
            <DesignContainer 
            designs={designs} 
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
            <>
            <h1>404 Not Found!!!</h1>
            <button onClick={goBackOne}>back to safety</button>
            </>
          </Route>
        </Switch>
      ) : (
        <Switch>
          <Route exact path='/' >
            <LandingPage setDesigns={setDesigns} />
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
