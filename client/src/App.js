import './styles/App.css';
import React, { useEffect, useContext, useState} from 'react';
import { Switch, Route } from "react-router-dom";
import Header from './Header';
import Home from './Home';
import DesignContainer from './DesignContainer';
import NewDesign from './NewDesign';
import PiecesContainer from './PiecesContainer';
import ProfilePage from './ProfilePage';
import LandingPageSignUp from './Signup';
import LandingPageLogin from './Login';
import { UserContext } from './context/user';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';


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
                    history.push('/signup')
                  }
          })
    }, [])


    const goBackOne = () => {
      history.goBack()
    }

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
            <PiecesContainer 
            pieces={filteredByStyleAndType} 
            addNewPiece={addNewPiece} 
            removePiece={removePiece}
            handleStyleFilter={handleStyleFilter}
            handleTFilter={handleTFilter}/>
          </Route>
          <Route path='/designs'>
            <DesignContainer designs={designs}/>
          </Route>
          <Route exact path='/profile'>
            <ProfilePage />
          </Route>
          <Route exact path='/designs/new'>
            <NewDesign />
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
