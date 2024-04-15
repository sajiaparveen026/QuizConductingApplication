import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import "bootstrap-icons/font/bootstrap-icons.css";


const HomePage = () => {
  return (
    <div className='container-fluid' style={{backgroundColor: '#1f1f1f',minHeight: '100vh' }} >
      <div className='row flex-nowrap' style={{ minHeight: '100vh' }}>

        {/* Left Side Menu  */}
        <div className='col-auto col-md-3 col-xl-2 px-sm-2 px-0' style={{ backgroundColor: '#3D405B',position:'fixed'}}>
          <div className='d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100'>
         <Link to="/home"className='d-flex align-items-center pb-3 mb-md-1 mt-md-3 me-md-auto text-white text-decoration-none'>
                <span className='fs-5 fw-bolder d-none d-sm-inline'>Admin Space</span> </Link>

              <ul className='nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start'>

                <li className='w-100'>
                  <Link to="/home" className='nav-link text-white px-0 align-middle' >
                 <i className='fs-4 bi-speedometer2 ms-2'></i> <span className='ms-2 d-none d-sm-inline'>Dashboard</span> </Link>
                </li>

                <li className='w-100'>
               <Link to="/home/manageQuiz"className='nav-link text-white px-0 align-middle' >
              <i className='bi bi-award-fill ms-2 fs-4'></i><span className='ms-2 d-none d-sm-inline'>Manage Quiz</span> </Link>
                </li>

                <li className='w-100'>
               <Link to="/home/categories" className='nav-link text-white px-0 align-middle' >
              <i className='fs-4 bi-columns ms-2'></i><span className='ms-2 d-none d-sm-inline'> Categories
              </span>  </Link>
                </li>

              <li className='w-100'>
                  <Link to='/home/studentsinfo'className='nav-link text-white px-0 align-middle'>
                  <i className='fs-3 bi-person ms-2'></i><span className='ms-2 d-none d-sm-inline'>Students
                  </span>  </Link>
                </li>

                <li className='w-100'>
                  <Link to="/" className='nav-link text-white px-0 align-middle'>
                <i className='fs-3 bi-power ms-2'></i><span className='ms-2 d-none d-sm-inline'>Logout</span>
                </Link>
                </li>
              </ul>
          </div>  </div>
          
        {/* Right Side Content */}
        <div className='col-md-9 col-xl-10' style={{ marginLeft: 'auto' }}>
          <div className='p-2 d-flex justify-content-center shadow' style={{ backgroundColor: '#B56576'}}>
         <h4><i class="bi bi-caret-down-square"></i> Manage Quiz App <i class="bi bi-caret-up-square"></i></h4>
          </div> <Outlet />   {/* Will display the content on the right side */}
        </div>
      </div> </div> )
}

export default HomePage