import React, { useState } from 'react'

const App = () => {
  const [data, setData] = useState([])
  const [scrollPercentage, setScrollPercentage] = useState(0)
  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState(null)

  

  return (
    <div>App</div>
  )
}

export default App