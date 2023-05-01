import './styles/App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import React, { useEffect, useContext, useState} from 'react';
import { Switch, Route } from "react-router-dom";
import Header from './Header';
import Home from './Home';
import DesignContainer from './DesignContainer';
import PiecesContainer from './PiecesContainer';
import ProfilePage from './ProfilePage';
import { UserContext } from './context/user';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import LandingPage from './LandingPage';


function App() {
  const {designer, setDesigner} = useContext(UserContext)
  const [pieces, setPieces] = useState([])
  const [styleFilter, setStyleFilter] = useState("")
  const [typeFilter, setTypeFilter] = useState("")
  const [designs, setDesigns] = useState([])
  const history= useHistory()


    useEffect(() => {
      fetch("/check_session")
          .then((r) => {
              if (r.ok) {
                  r.json().then(r => {
                    console.log(r.designs)
                    setDesigner(r)
                    setPieces(r.pieces)
                    setDesigns(r.designs)
                    })
                 
              } else {
                    console.log("STATUS:", r.status)
                  }
          })
    }, [])


    const goBackOne = () => history.goBack()
    

    const addNewPiece = (piece) => {
      setPieces((pieces) => [...pieces, piece])
    }
    const removePiece = (piece) => {
      const updatedPieces = pieces.filter((p) => p.id !== piece.id)
      setPieces(updatedPieces)
    }

    const handleStyleFilter = (value) => setStyleFilter(value)
    const filteredByStyle = (styleFilter !== "") ? pieces.filter((p) => p.style === styleFilter) : [...pieces]
    // console.log("FILTER BY STYLE:", filteredByStyle)
    const handleTFilter = (value) => setTypeFilter(value)
    const filteredByStyleAndType = (typeFilter !=="") ? filteredByStyle.filter((p) => p.type ===typeFilter) : [...filteredByStyle]
    // console.log("FILTER BY STYLE AND TYPE:", filteredByStyleAndType)
    
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
            pieces={filteredByStyleAndType} 
            addNewPiece={addNewPiece} 
            removePiece={removePiece}
            handleStyleFilter={handleStyleFilter}
            handleTFilter={handleTFilter}/>
          </Route>
          <Route path='/designs'>
            <DesignContainer 
            designs={designs} 
            handleNewD={handleNewD}
            removeDesign={removeDesign}
            addNewPiece={addNewPiece}/>
          </Route>
          <Route exact path='/profile'>
            <ProfilePage />
          </Route>
        </Switch>
      ) : (
        <Switch>
          <Route exact path='/' >
            <LandingPage />
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
