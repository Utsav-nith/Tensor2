import './App.css';
import Add from './components/Add';
import Edit from './components/Edit';
import { Routes, Route } from 'react-router-dom';
import Headers from './components/Headers';
import Login from './components/Login';
import Dashboard from './components/Dashboard';


function App() {

  return (
    <>
      <Headers />
      <Routes>
             
            <Route path='/' element={<Dashboard/>} />
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/add' element={<Add />} />
            <Route path='/edit/:id' element={<Edit />} />
            <Route path='/login' element={<Login />} />
      </Routes>
    </>
  );
}

export default App;