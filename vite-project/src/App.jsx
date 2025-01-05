import React, { useState, useEffect } from 'react'

const App = () => {
  const [data, setData] = useState([])
  const [scrollPercentage, setScrollPercentage] = useState(0)
  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState(null)

  const fetchData = async () => {
    try {
        setLoading(true)
        const res = await fetch('https://dummyjson.com/products?limit=100')
        const data = await res.json()
        
        console.log(data)
        if(data && data.products) {
            setData(data.products)
            setLoading(false)
        }
    }
    catch (e) {
       console.log(e.message)
       setErrorMsg(e.message) 
       setLoading(false)
    }
}

  useEffect(() => {
    fetchData()
}, [])

if (loading) {
  return <div>Loading data! Please Wait.</div>}

if(errorMsg) {
  return <div>Error ! {errorMsg}</div>}

  return (
    <div>
      { data ? data.map((dataItem, index) => <p className='font-bold' key={index}>{dataItem.title}</p>) : null }
    </div>
  )
}

export default App