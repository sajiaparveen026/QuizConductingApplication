import { Link, Outlet, useParams } from 'react-router-dom'
import "bootstrap-icons/font/bootstrap-icons.css";

const StudentHome = () => {
  const {id} = useParams();
  
  return (
    <div className='container-fluid bg-light'>
      <div className='row flex-nowrap'>
        {/* Left Side Menu Section */}
        <div className='col-auto col-md-3 col-xl-2 px-sm-2 px-0' style={{ backgroundColor: '#3D405B'}}>
          <div className='d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100'>
              <Link to={`/student/home/`+id}
              className='d-flex align-items-center pb-3 mb-md-1 mt-md-3 me-md-auto text-white text-decoration-none'>
                <span className='fs-5 fw-bolder d-none d-sm-inline'> Hello Student <i class="bi bi-person-arms-up fs-1"></i></span> </Link>

              <ul className='nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start'>
                <li className='w-100'>
             <Link to={`/student/home/`+id}className='nav-link text-white px-0 align-middle'>
              <i className='fs-3 bi-speedometer2 ms-2'></i><span className='ms-2 d-none d-sm-inline'> Dashboard</span> </Link>
                </li>

                <li className='w-100'>
             <Link to={`/student/home/`+id+`/category_list`} className='nav-link text-white px-0 align-middle' >
         <i className='bi bi-clipboard-heart-fill fs-3 ms-2'></i><span className='ms-2 d-none d-sm-inline'> Let's Play Quiz</span> </Link>
                </li>

                <li className='w-100'>
                <Link to={`/student/home/`+id+`/test_report`}className='nav-link text-white px-0 align-middle'>
       <i className='bi bi-postcard fs-3 ms-2'></i><span className='ms-2 d-none d-sm-inline'> Test Report</span>
           </Link>
                </li>

                <li className='w-100'>
                <Link to={`/student/home/`+id+`/profile`}className='nav-link text-white px-0 align-middle'>
      <i className='fs-3 bi-person ms-2'></i><span className='ms-2 d-none d-sm-inline'> Profile</span> </Link>
                </li>

                <li className='w-100'>
                  <Link to="/student"className='nav-link text-white px-0 align-middle'>
      <i className='fs-3 bi-power ms-2'></i><span className='ms-2 d-none d-sm-inline'> Logout</span> </Link>
                </li>

              </ul>
          </div>
        </div>
        {/* Right Side Content Section */}
        <div className='col p-0 m-0'>
          <div className='p-2 d-flex justify-content-center shadow' style={{ backgroundColor: '#3D405B'}}>
            <h4 style={{color:'white'}}><i class="bi bi-book-half"></i> Welcome to the Quiz <i class="bi bi-book-half"></i></h4>
              </div> <Outlet /> {/* It will display content on right side */} 
        </div>
      </div> </div>)
}

export default StudentHome