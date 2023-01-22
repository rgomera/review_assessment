import React from 'react';
import Footer from './Footer';
import Navbar from './Navbar';

const About = () => {
   return (
      <>
         <Navbar />
         <div className='mt-4 mb-5 mx-5'>
            <div className='mb-5'>
               <h2 className='h2 fw-bold text-center'>About Us</h2>
               <p className='text-center text-muted'>Learn more about who we really are and our objectives, mission and vision.</p>
            </div>
            <div className='rounded-4 bg-body-secondary p-5'>
               <p className='text-muted mb-4'>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus id consequatur, accusamus corrupti porro dolorem consectetur
                  omnis? Non mollitia nemo recusandae odit eum, maiores aut, ullam excepturi quas id obcaecati. Nulla atque adipisci iste veritatis?
                  Soluta, sapiente porro rerum ut saepe animi. Tempora, nobis iusto magni consequuntur velit exercitationem minus dicta asperiores
                  ipsa blanditiis impedit ut porro quisquam omnis nesciunt.
               </p>
               <div className='mb-4'>
                  <h3 className='h4 fw-bold'>Objectives</h3>
                  <p className='text-muted'>
                     Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iste laboriosam ab ipsam molestiae quo commodi dolor, ipsa, alias error
                     fuga illo obcaecati. Esse provident debitis quo vero.
                  </p>
                  <ul>
                     <li className='text-muted'>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus voluptatum incidunt voluptas provident.
                     </li>
                     <li className='text-muted'>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus voluptatum incidunt voluptas provident.
                     </li>
                     <li className='text-muted'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus voluptatum incidunt.</li>
                  </ul>
               </div>
               <div className='mb-4'>
                  <h3 className='h4 fw-bold'>Mission</h3>
                  <p className='text-muted'>
                     Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iste laboriosam ab ipsam molestiae quo commodi dolor, ipsa, alias error
                     fuga illo obcaecati. Esse provident debitis quo vero doloribus nulla laudantium. Provident pariatur reprehenderit nisi neque hic?
                     Quas deserunt, dolorum tempore delectus id laudantium eos et adipisci unde impedit voluptates reiciendis possimus commodi qui
                     consequuntur laborum nobis. Dignissimos cumque fugiat nisi?
                  </p>
               </div>
               <div className='mb-4'>
                  <h3 className='h4 fw-bold'>Vision</h3>
                  <p className='text-muted'>
                     Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iste laboriosam ab ipsam molestiae quo commodi dolor, ipsa, alias error
                     fuga illo obcaecati. Esse provident debitis quo vero doloribus nulla laudantium. Provident pariatur reprehenderit nisi neque hic?
                     Quas deserunt, dolorum tempore delectus id laudantium eos et adipisci unde impedit voluptates reiciendis possimus commodi qui
                     consequuntur laborum nobis. Dignissimos cumque fugiat nisi?
                  </p>
               </div>
            </div>
         </div>
         <Footer />
      </>
   );
};

export default About;
