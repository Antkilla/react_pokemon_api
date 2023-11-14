import React, { useState, useEffect  }from "react";
import PokemonList from "./Pokemon.List";
import Pagination from "./Pagination";
import axios from "axios";

function App() {
  const [Pokemon, setPokemon] = useState([])
  const [currentPageUrl, setCurrentPageUrl] = useState("https://pokeapi.co/api/v2/pokemon")
  const [prevPageUrl, setPrevPageUrl] = useState()
  const [nextPageUrl, setNextPageUrl] = useState()
  const [loading, setLoading] = useState(true)


  useEffect(() => {
    setLoading(true)
    let Cancel
    axios.get(currentPageUrl, {
      cancelToken: new axios.CancelToken(c => Cancel = c)
    }).then(res => {
      setLoading(false)
      setNextPageUrl(res.data.next)
      setPrevPageUrl(res.data.previous)
      setPokemon(res.data.results.map(p => p.name))
    })

    return () => Cancel() 
  }, [currentPageUrl])

  function goToNextPage() {
    setCurrentPageUrl(nextPageUrl)
  }

  function goToPrevPage() {
    setCurrentPageUrl(prevPageUrl)
  }

  if (loading) return "Loading..."
  
  return (
    <>
      <PokemonList Pokemon={Pokemon}  />
      <Pagination 
        goToNextPage={nextPageUrl ? goToNextPage : null}
        goToPrevPage={prevPageUrl ? goToPrevPage : null}
      />
    </>
  );
};

export default App;
