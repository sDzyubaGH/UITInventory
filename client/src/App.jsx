import {useEffect, useState} from "react"

function App() {
  const [response, setResponse] = useState({})

  const doFetch = async () => {
    const response = await fetch(`http://localhost:8000/api/statements`)
    const data = await response.json()
    setResponse(data)
  }

  useEffect(() => {
    // const res = fetch(`http://localhost:8000/api/statements`)
    //   .then((response) => response.json())
    //   .then((data) => setResponse(data))
    doFetch()
    // console.log(res)
  }, [])

  return <div>{response?.message}</div>
}

export default App
