import { Link } from 'react-router-dom';

const Footer = () => {
   return (
      <footer className='mt-auto bg-dark'>
         <div className='p-5 pb-0 text-center'>
            <div className='row flex-wrap justify-content-center justify-content-md-start'>
               <div className='col-11 col-md-5 d-flex flex-column'>
                  <a className='text-decoration-none' href='/'>
                     <div className='d-flex align-items-center mb-2'>
                        <h1 className='h1 fw-bold text-white'>Review</h1>
                     </div>
                  </a>
                  <small className='text-start text-white'>
                     Lorem ipsum, dolor sit amet consectetur adipisicing elit. Incidunt repellendus unde vel a odit laboriosam, qui perspiciatis
                     tenetur, repellat recusandae tempore sunt dolores quis beatae amet sed voluptatum iste nam.
                  </small>
               </div>
               <div className='col-11 col-md-2 d-flex flex-column mt-3 mt-md-0'>
                  <h4 className='h5 fw-bold mb-4 text-start text-white'>Useful links</h4>
                  <ul className='footer-links text-start text-white'>
                     <li>
                        <Link to='/'>
                           <small>Home</small>
                        </Link>
                     </li>
                     <li>
                        <Link to='/menu'>
                           <small>Menu</small>
                        </Link>
                     </li>
                     <li>
                        <Link to='/services'>
                           <small>Services</small>
                        </Link>
                     </li>
                     <li>
                        <Link to='/about'>
                           <small>About Us</small>
                        </Link>
                     </li>
                  </ul>
               </div>
               <div className='col-11 col-md-2 d-flex flex-column mt-3 mt-md-0'>
                  <h4 className='h5 fw-bold mb-4 text-start text-white'>Address</h4>
                  <small className='text-start text-white text-white'>26985 Brighton Lane, Lake Forest, CA 92630</small>
               </div>
               <div className='col-11 col-md-2 d-flex flex-column mt-3 mt-md-0'>
                  <h4 className='h5 fw-bold mb-4 text-start text-white'>Contact Us</h4>
                  <small className='text-start text-white'>assessment_review@gmail.com</small>
               </div>
            </div>
            <small className='border-top border-dark-subtle w-100 d-block mt-5 py-3 text-center text-white'>Assessment Review &copy; 2023</small>
         </div>
      </footer>
   );
};

export default Footer;
