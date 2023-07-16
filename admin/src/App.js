import { Routes,Route } from 'react-router-dom';
import Home from './pages/HomePage/Home';
import LoginPage from './pages/LoginPage/LoginPage';
import { useSelector } from 'react-redux';
import ManageUser from './pages/manageUser/ManageUser';
import ManageAuthor from './pages/ManageAuthor/ManageAuthor';
import ManageCategory from './pages/ManageCategory/ManageCategory';
import AddCategory from './pages/AddCategory/AddCategory';
import EditCategory from './pages/EditCategory/EditCategory';
import ManageReport from './pages/ManageReport/ManageReport';

function App() {



  const token=useSelector((state)=>state.token)
  const admin=useSelector((state)=>state.admin)
  console.log(admin);


  return (
    <div className="App">
    <Routes>
    <Route path='/' element={token?<Home/>:<LoginPage/>}/>
    <Route path='/login' element={<LoginPage/>}/>
    <Route path='/users' element={token?<ManageUser/>:<LoginPage/>}/>
    <Route path='/authors' element={token?<ManageAuthor/>:<LoginPage/>}/>
    <Route path='/category' element={token?<ManageCategory/>:<LoginPage/>}/>
    <Route path='/report' element={token?<ManageReport/>:<LoginPage/>}/>
    <Route path='/addCategory' element={token?<AddCategory/>:<LoginPage/>}/> 
    <Route path='/editCategory/:id' element={token?<EditCategory/>:<LoginPage/>}/> 
  </Routes>

    </div>
  );
}

export default App;





      
      





