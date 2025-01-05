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

const handleScrollPercentage = () => {
  const howMuchScrolled = document.documentElement.scrollTop || document.body.scrollTop
  const hight = document.documentElement.scrollHeight - document.documentElement.clientHeight
  setScrollPercentage((howMuchScrolled / hight) * 100)
}

  useEffect(() => {
    fetchData()
}, [])

useEffect(() => {
  window.addEventListener('scroll', handleScrollPercentage)

  return () => {
      window.removeEventListener('scroll', () => {});
    }
}, [])

if (loading) {
  return <div>Loading data! Please Wait.</div>}

if(errorMsg) {
  return <div>Error ! {errorMsg}</div>}

  return (
    <div>
        <div className='fixed flex flex-col top-0 z-10 w-full items-center bg-yellow-300'>
        <h1 className='text-3xl font-bold py-4'>Custom Scroll Indicator</h1>
        <div className='w-full h-3 bg-green-600'>
            <div className='h-3 bg-red-600 w-0' style={{ width: `${scrollPercentage}%`}}>
            </div>
            </div>
        </div>
        <div className='mt-24 flex flex-col items-center gap-2'>
            { data ? data.map((dataItem, index) => <p className='font-bold' key={index}>{dataItem.title}</p>) : null }
        </div>
    </div>
  )
}

export default App