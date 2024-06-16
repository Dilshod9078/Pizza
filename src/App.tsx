import { Route, Routes } from 'react-router-dom'
import './App.css'
import { BuyProduct } from './Pages'
import Product from './Pages/Product'
import { Suspense } from 'react'
import Loading from './components/Loading'

function App() {
  
  return (
    <>
    <div className='bg-white rounded-[10px]'>
    <Routes>
    <Route path='/' element={
      <Suspense fallback={<Loading/>}>
       <Product/>
      </Suspense>
    }/>
     <Route path='/buy' element={
      <Suspense fallback={<Loading/>}>
        <BuyProduct/>
      </Suspense>
    }/>
    </Routes>
    </div>
    </>
  )
}

export default App
