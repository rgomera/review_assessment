import React, { useContext, useEffect, useState } from 'react';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { db } from '../firebase';
import { MdFastfood } from 'react-icons/md';
import ReactPaginate from 'react-paginate';

import Footer from './Footer';
import Navbar from './Navbar';
import { UserContext } from '../contexts/UserContext';

const Order = () => {
   const [foods, setFoods] = useState([]);
   const [isLoading, setIsLoading] = useState(false);
   const { setCart } = useContext(UserContext);

   const [pageNumber, setPageNumber] = useState(0);
   const itemPerPage = 10;
   const pageVisited = pageNumber * itemPerPage;
   const pageCount = Math.ceil(foods.length / itemPerPage);

   const changePage = ({ selected }) => {
      setPageNumber(selected);
   };

   const Loading = ({ size, color }) => {
      return (
         <div className='p-5'>
            <div className={`text-center spinner-border ${color}`} role='status' style={{ width: size, height: size }}></div>
         </div>
      );
   };

   const addToCart = (e, food) => {
      e.preventDefault();

      const quantity = parseInt(e.target[food.id].value);
      if (!isNaN(quantity)) {
         setCart(prev => [...prev, { ...food, quantity, total: food.price * quantity }]);
         toast.success('Added to cart successfully.');
         e.target.reset();
      } else return;
   };

   useEffect(() => {
      setIsLoading(true);
      const q = query(collection(db, 'foods'), orderBy('name', 'asc'));
      const unsubscribe = onSnapshot(
         q,
         snapshot => {
            if (!snapshot.empty) {
               setFoods(
                  snapshot.docs.map(doc => ({
                     id: doc.id,
                     ...doc.data(),
                  }))
               );
            }
            setIsLoading(false);
         },
         err => {
            toast.error(err.message);
            setIsLoading(false);
         }
      );

      // clean up
      return () => {
         unsubscribe();
      };
   }, []);

   return (
      <>
         <Navbar />
         <div className='container mt-4 mb-5'>
            <div className='mb-5'>
               <h2 className='h2 fw-bold text-center'>Order Food</h2>
               <p className='text-center text-muted'>Various foods from different locations in the Philippines are available here.</p>
            </div>

            {!isLoading ? (
               <>
                  <div className='row justify-content-center mb-4'>
                     {foods && foods.length > 0 ? (
                        foods.slice(pageVisited, pageVisited + itemPerPage).map(food => (
                           <div key={food.id} className='col-4 col-md-3 col-lg-2 bg-body-secondary rounded-4 p-3 mx-2 mb-3'>
                              <div className='d-flex flex-column justify-content-center align-items-center'>
                                 <MdFastfood className='fs-3 mb-2' />
                                 <h2 className='h6 fw-bold text-center'>{food.name}</h2>
                                 <p className='fw-bold fs-5 mb-2 text-center'>₱{food.price}.00</p>
                              </div>
                              <form className='d-flex flex-column justify-content-center align-items-center' onSubmit={e => addToCart(e, food)}>
                                 <input className='form-control w-50 mx-auto mb-2 text-center' type='number' min='1' name={food.id} id={food.id} />
                                 <button className='btn btn-dark'>Add to Cart</button>
                              </form>
                           </div>
                        ))
                     ) : (
                        <div className='text-center'>No food available at the moment..</div>
                     )}
                  </div>

                  <div className='d-flex justify-content-center'>
                     {foods.length > 0 && (
                        <ReactPaginate
                           previousLabel='Previous'
                           breakLabel='...'
                           nextLabel='Next'
                           pageCount={pageCount}
                           onPageChange={changePage}
                           containerClassName='pagination'
                           previousClassName='page-item'
                           previousLinkClassName='page-link'
                           nextClassName='page-item'
                           nextLinkClassName='page-link'
                           pageClassName='page-item'
                           pageLinkClassName='page-link'
                           breakClassName='page-item'
                           breakLinkClassName='page-link'
                           activeClassName='active'
                        />
                     )}
                  </div>
               </>
            ) : (
               <div className='p-5 m-5 d-flex justify-content-center align-items-center'>
                  <Loading size={100} color='text-dark' />
               </div>
            )}
         </div>
         <Footer />
      </>
   );
};

export default Order;
