import Navbar from './Navbar';
import Footer from './Footer';

import img1 from '../assets/img1.jpg';
import img2 from '../assets/img2.jpg';
import img5 from '../assets/img5.svg';
import vid1 from '../assets/vid1.mp4';

import { MdFastfood, MdStore, MdShoppingCart } from 'react-icons/md';
import { Link } from 'react-router-dom';

const Home = () => {
   return (
      <>
         <Navbar />
         <section>
            <div id='my-carousel' className='carousel slide' data-bs-ride='carousel'>
               <div className='carousel-indicators'>
                  <button className='carousel-indicator-circle active' type='button' data-bs-target='#my-carousel' data-bs-slide-to='0'></button>
                  <button className='carousel-indicator-circle' type='button' data-bs-target='#my-carousel' data-bs-slide-to='1'></button>
               </div>
               <div className='carousel-inner'>
                  <div className='carousel-item active' style={{ backgroundImage: `url(${img1})` }}></div>
                  <div className='carousel-item' style={{ backgroundImage: `url(${img2})` }}></div>
               </div>
               <button className='carousel-control-prev' type='button' data-bs-target='#my-carousel' data-bs-slide='prev'>
                  <span className='carousel-control-prev-icon'></span>
                  <span className='visually-hidden'>Previous</span>
               </button>
               <button className='carousel-control-next' type='button' data-bs-target='#my-carousel' data-bs-slide='next'>
                  <span className='carousel-control-next-icon'></span>
                  <span className='visually-hidden'>Next</span>
               </button>
            </div>
         </section>
         <section className='bg-dark section'>
            <div className='text-center mb-3'>
               <h1 className='h2 fw-bold text-white'>Why choose us?</h1>
               <p className='text-white text-opacity-75'>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quia veritatis esse nesciunt possimus praesentium.
               </p>
            </div>
            <div className='row justify-content-evenly'>
               <div className='col-12 col-lg-3 d-flex flex-column justify-content-center align-items-center my-5 mx-4'>
                  <div className='d-flex justify-content-center align-items-center rounded-circle bg-white mb-3' style={{ width: 60, height: 60 }}>
                     <MdFastfood className='text-dark fs-2' />
                  </div>
                  <h2 className='h2 fw-bold text-white'>Sample Title</h2>
                  <p className='text-white text-opacity-75 text-center'>
                     Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eveniet, suscipit nisi commodi neque, est animi repudiandae nemo
                     officiis corporis sed.
                  </p>
               </div>
               <div className='col-12 col-lg-3 d-flex flex-column justify-content-center align-items-center my-5 mx-4'>
                  <div className='d-flex justify-content-center align-items-center rounded-circle bg-white mb-3' style={{ width: 60, height: 60 }}>
                     <MdStore className='text-dark fs-2' />
                  </div>
                  <h2 className='h2 fw-bold text-white'>Sample Title</h2>
                  <p className='text-white text-opacity-75 text-center'>
                     Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eveniet, suscipit nisi commodi neque, est animi repudiandae nemo
                     officiis corporis sed.
                  </p>
               </div>
               <div className='col-12 col-lg-3 d-flex flex-column justify-content-center align-items-center my-5 mx-4'>
                  <div className='d-flex justify-content-center align-items-center rounded-circle bg-white mb-3' style={{ width: 60, height: 60 }}>
                     <MdShoppingCart className='text-dark fs-2' />
                  </div>
                  <h2 className='h2 fw-bold text-white'>Sample Title</h2>
                  <p className='text-white text-opacity-75 text-center'>
                     Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eveniet, suscipit nisi commodi neque, est animi repudiandae nemo
                     officiis corporis sed.
                  </p>
               </div>
            </div>
         </section>
         <section className='bg-white section'>
            <div className='container d-flex flex-column justify-content-evenly align-items-center align-items-lg-start flex-lg-row'>
               <div className='my-5 mx-4'>
                  <h1 className='h1 fw-bold'>Sample Section Title</h1>
                  <p className='text-muted mt-2'>
                     Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque, harum expedita! Ipsam atque animi dignissimos, quis sint
                     recusandae enim inventore velit natus quas neque veniam ad nam, hic dolores. Est?
                  </p>
                  <Link className='btn btn-dark btn-lg mt-2' to='/order'>
                     Order Now
                  </Link>
               </div>
               <div className='my-5 mx-4'>
                  <img src={img5} alt='img-5' width='450' />
               </div>
            </div>
         </section>
         <section className='bg-body-tertiary section'>
            <div className='container d-flex flex-column justify-content-evenly align-items-center align-items-lg-start flex-lg-row'>
               <div className='my-5 mx-4'>
                  <video width='450' controls>
                     <source src={vid1} type='video/mp4' />
                     Your browser does not support HTML video.
                  </video>
               </div>
               <div className='my-5 mx-4'>
                  <h1 className='h1 fw-bold'>Sample Section Title</h1>
                  <p className='text-muted mt-2'>
                     Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque, harum expedita! Ipsam atque animi dignissimos, quis sint
                     recusandae enim inventore velit natus quas neque veniam ad nam, hic dolores. Est?
                  </p>
               </div>
            </div>
         </section>
         <Footer />
      </>
   );
};

export default Home;
