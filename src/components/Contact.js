import React from 'react';
import Footer from './Footer';
import Navbar from './Navbar';

import { MdPhone, MdLocationOn, MdEmail } from 'react-icons/md';

const Contact = () => {
   return (
      <>
         <Navbar />
         <div className='mt-4 mb-5 mx-5'>
            <div className='mb-5'>
               <h2 className='h2 fw-bold text-center'>Contact Us</h2>
               <p className='text-center text-muted'>Have many questions? We'd love to hear from you.</p>
            </div>
            <div className='d-flex flex-column flex-lg-row justify-content-evenly align-items-center rounded-4 bg-body-secondary p-5'>
               <div className='mb-4'>
                  <h3 className='h4 mb-3 fw-bold'>Information</h3>
                  <ul className='list-unstyled'>
                     <li className='mb-3'>
                        <MdPhone className='fs-3 me-2' /> +639123456789
                     </li>
                     <li className='mb-3'>
                        <MdEmail className='fs-3 me-2' /> assessment_review@gmail.com
                     </li>
                     <li className='mb-3'>
                        <MdLocationOn className='fs-3 me-2' /> 26985 Brighton Lane, Lake Forest, CA 92630
                     </li>
                  </ul>
               </div>

               <iframe
                  src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3959.482268392569!2d125.59795891429847!3d7.069947018531959!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x32f96d7040fea619%3A0xc5edd89e649e05b0!2sUniversity%20of%20the%20Immaculate%20Conception%20-%20Main!5e0!3m2!1sen!2sph!4v1673835894704!5m2!1sen!2sph'
                  title='Address Google Map'
                  className='contact-map'
                  style={{ border: 0 }}
                  allowFullScreen
                  loading='lazy'
                  referrerPolicy='no-referrer-when-downgrade'
               ></iframe>
            </div>
         </div>
         <Footer />
      </>
   );
};

export default Contact;
