import {Routes,Route} from 'react-router-dom'
import Home from './Page/Home'
import Chat from './Page/Chat'
import './App.css'
function App() {

  return (
     <div className='App'>
     <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/chat' element={<Chat/>}/>
     </Routes>
     </div>
  )
}

export default App
