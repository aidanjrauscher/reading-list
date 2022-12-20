import { useState, useEffect } from 'react'

function App() {
  const [metadata, setMetadata] = useState({})
  const [url, setUrl] = useState('http://ogp.me/')

  useEffect(()=>{
    const getUrlMetadata = async()=>{
      
    }

    getUrlMetadata
  }, [url])

  return (
    <div className="App">
      <h1>hi</h1>
    </div>
  )
}

export default App
