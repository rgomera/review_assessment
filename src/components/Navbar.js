import { NavLink, Link } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../contexts/UserContext';
import { MdShoppingCart } from 'react-icons/md';

const Navbar = () => {
   const { user, logout, cart } = useContext(UserContext);

   return (
      <nav className='navbar navbar-expand-lg bg-white p-4'>
         <div className='container'>
            <Link className='fw-bold navbar-brand' to='/'>
               Review
            </Link>
            <button className='navbar-toggler' type='button' data-bs-toggle='collapse' data-bs-target='#navbarSupportedContent'>
               <span className='navbar-toggler-icon'></span>
            </button>
            <div className='collapse navbar-collapse' id='navbarSupportedContent'>
               <ul className='navbar-nav mx-auto mb-2 mb-lg-0'>
                  <li className='nav-item d-block text-center d-lg-inline'>
                     <NavLink className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')} to='/'>
                        Home
                     </NavLink>
                  </li>
                  <li className='nav-item d-block text-center d-lg-inline'>
                     <NavLink className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')} to='/services'>
                        Services
                     </NavLink>
                  </li>
                  <li className='nav-item d-block text-center d-lg-inline'>
                     <NavLink className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')} to='/order'>
                        Order Food
                     </NavLink>
                  </li>
                  <li className='nav-item d-block text-center d-lg-inline'>
                     <NavLink className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')} to='/about'>
                        About Us
                     </NavLink>
                  </li>
                  <li className='nav-item d-block text-center d-lg-inline'>
                     <NavLink className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')} to='/contact'>
                        Contact Us
                     </NavLink>
                  </li>
                  {!user ? (
                     <>
                        <li className='d-block d-lg-none'>
                           <Link className='btn btn-link w-100 text-decoration-none text-reset' to='/register'>
                              Register
                           </Link>
                        </li>
                        <li className='d-block d-lg-none'>
                           <Link className='btn btn-dark w-100' to='/login'>
                              Login
                           </Link>
                        </li>
                     </>
                  ) : (
                     <>
                        <li className='d-flex justify-content-center d-lg-none mb-3'>
                           <div
                              className='d-flex justify-content-center align-items-center bg-dark rounded-circle text-white fw-bold'
                              style={{ width: 38, height: 38 }}
                           >
                              {user.email && user.email.charAt(0).toUpperCase()}
                           </div>
                        </li>
                        <li className='d-flex justify-content-center d-block d-lg-none mb-2'>
                           <Link className='text-decoration-none text-reset' to='/cart'>
                              <div className='d-flex-justify-content-center align-items-center position-relative'>
                                 <MdShoppingCart className='text-dark fs-1' />
                                 <span className='position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger'>
                                    {cart.length > 0 && cart.length}
                                 </span>
                              </div>
                           </Link>
                        </li>
                        <li className='d-block d-lg-none'>
                           <button className='btn btn-danger w-100' onClick={logout}>
                              Logout
                           </button>
                        </li>
                     </>
                  )}
               </ul>
            </div>
            <div className='d-none d-lg-block'>
               <ul className='navbar-nav'>
                  {!user ? (
                     <>
                        <li className='nav-item d-lg-inline'>
                           <Link className='btn btn-link w-100 text-decoration-none text-reset' to='/register'>
                              Register
                           </Link>
                        </li>
                        <li className='nav-item d-lg-inline'>
                           <Link className='btn btn-dark w-100' to='/login'>
                              Login
                           </Link>
                        </li>
                     </>
                  ) : (
                     <>
                        <li className='nav-item d-lg-flex align-items-center'>
                           <div
                              className='d-flex justify-content-center align-items-center bg-dark rounded-circle text-white fw-bold me-3'
                              style={{ width: 38, height: 38 }}
                           >
                              {user.email && user.email.charAt(0).toUpperCase()}
                           </div>
                        </li>
                        <li className='nav-item d-lg-flex align-items-center me-3 position-relative'>
                           <Link className='text-decoration-none text-reset' to='/cart'>
                              <MdShoppingCart className='text-dark fs-2' />
                              <span className='position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger'>
                                 {cart.length > 0 && cart.length}
                              </span>
                           </Link>
                        </li>
                        <li className='nav-item d-lg-flex align-items-center'>
                           <button className='btn btn-danger' onClick={logout}>
                              Logout
                           </button>
                        </li>
                     </>
                  )}
               </ul>
            </div>
         </div>
      </nav>
   );
};

export default Navbar;
