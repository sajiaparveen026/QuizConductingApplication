import React from 'react'
import Login from "./Student/login";
import Signup from './Student/Signup';
import {BrowserRouter, Routes , Route} from 'react-router-dom'
import AdminLogin from './Admin/AdminLogin';
import HomePage from './Admin/HomePage';
import Categories from './Admin/Categories';
import Dashboard from './Admin/Dashboard';
import ManageQuiz from './Admin/ManageQuiz';
import AddCategory from './Admin/AddCategory';
import CreateQuiz from './Admin/createQuiz';
import StudentInfo from './Admin/StudentInfo';
import EditQuiz from './Admin/EditQuiz';
import StudentHome from './Student/StudentHome';
import Profile from './Student/Profile';
import PlayQuiz from './Student/PlayQuiz';
import TestReport from './Student/TestReport';
import StudentDashboard from './Student/StudentDashboard';
import EditProfile from './Student/EditProfile';
import CategoryList from './Student/CategoryList';
import Result from './Student/Result';
import AdminSignup from './Admin/AdminSignup';



function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<AdminLogin/>}></Route>
      <Route path='/adminsignup' element={<AdminSignup/>}></Route>
      <Route path='/home' element={<HomePage/>}>
        <Route path='' element={<Dashboard/>}></Route>
        <Route path='/home/manageQuiz' element={<ManageQuiz/>}></Route>
        <Route path='/home/categories' element={<Categories/>}></Route>
        <Route path='/home/studentsinfo' element={<StudentInfo/>}></Route>
        <Route path='/home/add_category' element={<AddCategory/>}></Route>
        <Route path='/home/create_quiz' element={<CreateQuiz/>}></Route>
        <Route path='/home/edit_quiz/:id' element={<EditQuiz/>}></Route>
      </Route>

      <Route path='/signup' element={<Signup/>}></Route>
      <Route path='/student' element={<Login/>}></Route>
      <Route path='/student/home/:id' element={<StudentHome/>}> 
       <Route path='' element={<StudentDashboard/>}></Route>
       <Route path='/student/home/:id/profile' element={<Profile/>}></Route>
       <Route path='/student/home/:id/edit_profile' element={<EditProfile/>}></Route>
      <Route path='/student/home/:id/category_list' element={<CategoryList/>}></Route>
      <Route path='/student/home/:id/play_quiz/:categoryid' element={<PlayQuiz/>}></Route>
      <Route path='/student/home/:id/result' element={<Result/>}></Route>
      <Route path='/student/home/:id/test_report' element={<TestReport/>}></Route>
      </Route>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
