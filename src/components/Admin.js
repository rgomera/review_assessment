import { collection, doc, onSnapshot, orderBy, query, updateDoc } from 'firebase/firestore';
import React, { useContext, useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { toast } from 'react-toastify';
import { UserContext } from '../contexts/UserContext';
import { db } from '../firebase';
import { MdRemoveRedEye, MdModeEdit } from 'react-icons/md';
import ReactPaginate from 'react-paginate';
import Modal from './Modal';

const Admin = () => {
   const { user, logout } = useContext(UserContext);
   const [orders, setOrders] = useState([]);
   const [isLoading, setIsLoading] = useState(false);

   const [pageNumber, setPageNumber] = useState(0);
   const itemPerPage = 10;
   const pageVisited = pageNumber * itemPerPage;
   const pageCount = Math.ceil(orders.length / itemPerPage);

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

   const updateStatus = async (id, status) => {
      const docRef = doc(db, 'orders', id);

      try {
         await updateDoc(docRef, {
            status: status === 'pending' ? 'being delivered' : status === 'being delivered' && 'done',
         });
         toast.success('Order status updated successfully.');
      } catch (err) {
         console.error(err.message);
      }
   };

   useEffect(() => {
      setIsLoading(true);
      const q = query(collection(db, 'orders'), orderBy('date', 'desc'));
      const unsubscribe = onSnapshot(
         q,
         snaphost => {
            if (!snaphost.empty) {
               setOrders(snaphost.docs.map(doc => ({ id: doc.id, ...doc.data() })));
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
         <nav className='navbar navbar-expand-lg bg-white p-4'>
            <div className='container'>
               <Link className='fw-bold navbar-brand' to='/admin'>
                  Review
               </Link>
               <button className='navbar-toggler' type='button' data-bs-toggle='collapse' data-bs-target='#navbarSupportedContent'>
                  <span className='navbar-toggler-icon'></span>
               </button>
               <div className='collapse navbar-collapse' id='navbarSupportedContent'>
                  <ul className='navbar-nav mx-auto mb-2 mb-lg-0'>
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
                           <li className='d-flex justify-content-center d-lg-none mb-2'>
                              <div
                                 className='d-flex justify-content-center align-items-center bg-dark rounded-circle text-white fw-bold'
                                 style={{ width: 40, height: 40 }}
                              >
                                 {user.email && user.email.charAt(0).toUpperCase()}
                              </div>
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
                           <li className='nav-item d-lg-inline'>
                              <div
                                 className='d-flex justify-content-center align-items-center bg-dark rounded-circle text-white fw-bold me-2'
                                 style={{ width: 40, height: 40 }}
                              >
                                 {user.email && user.email.charAt(0).toUpperCase()}
                              </div>
                           </li>
                           <li className='nav-item d-lg-inline'>
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

         <div className='mt-4 mb-5'>
            <div className='mb-5'>
               <h2 className='h2 fw-bold text-center'>Customer Order</h2>
            </div>

            <div className='container'>
               {!isLoading ? (
                  <>
                     <table className='table table-responsive table-striped align-middle'>
                        <thead>
                           <tr>
                              <th>Date</th>
                              <th>Name</th>
                              <th>Order Type</th>
                              <th>Total Amount</th>
                              <th>Status</th>
                              <th>Options</th>
                           </tr>
                        </thead>
                        <tbody>
                           {orders &&
                              orders.length > 0 &&
                              orders.slice(pageVisited, pageVisited + itemPerPage).map(order => (
                                 <tr key={order.id}>
                                    <td>{new Date(order.date.toDate()).toLocaleDateString()}</td>
                                    <td>{order.userName}</td>
                                    <td>{order.orderType}</td>
                                    <td>₱{order.total}.00</td>
                                    <td>
                                       <span
                                          class={`badge ${
                                             order.status === 'pending'
                                                ? 'bg-danger'
                                                : order.status === 'being delivered'
                                                ? 'bg-primary'
                                                : 'bg-success'
                                          }`}
                                       >
                                          {order.status}
                                       </span>
                                    </td>
                                    <td className='d-flex flex-column align-items-center'>
                                       <button
                                          className='btn btn-dark btn-sm mb-2'
                                          data-bs-toggle='modal'
                                          data-bs-target={`#modal-order-view-${order.id}`}
                                       >
                                          <MdRemoveRedEye className='fs-5' />
                                       </button>
                                       <button
                                          className='btn btn-warning btn-sm'
                                          onClick={() => updateStatus(order.id, order.status)}
                                          disabled={order.status === 'done'}
                                       >
                                          <MdModeEdit className='fs-5' />
                                       </button>

                                       <Modal title='Order Details' target={`modal-order-view-${order.id}`} size='modal-lg'>
                                          <div className='m-3 d-flex flex-column'>
                                             <div className='mb-1'>
                                                <label className='fw-bold me-2' htmlFor='date'>
                                                   Date:
                                                </label>
                                                <span>{new Date(order.date.toDate()).toLocaleDateString()}</span>
                                             </div>
                                             <div className='mb-1'>
                                                <label className='fw-bold me-2' htmlFor='date'>
                                                   Name:
                                                </label>
                                                <span>{order.userName}</span>
                                             </div>
                                             <div className='mb-1'>
                                                <label className='fw-bold me-2' htmlFor='date'>
                                                   Order Type:
                                                </label>
                                                <span>{order.orderType}</span>
                                             </div>
                                             <div className='mb-1'>
                                                <label className='fw-bold me-2' htmlFor='date'>
                                                   Status:
                                                </label>
                                                <span
                                                   class={`badge ${
                                                      order.status === 'pending'
                                                         ? 'bg-danger'
                                                         : order.status === 'being delivered'
                                                         ? 'bg-primary'
                                                         : 'bg-success'
                                                   }`}
                                                >
                                                   {order.status}
                                                </span>
                                             </div>
                                             <div className='mb-1'>
                                                <ul className='list-group list-group-flush overflow-auto' style={{ height: 280 }}>
                                                   <li className='list-group-item'>
                                                      <div className='row'>
                                                         <div className='col-6 fw-bold'>Name</div>
                                                         <div className='col-3 fw-bold'>Quantity</div>
                                                         <div className='col-3 fw-bold'>Total</div>
                                                      </div>
                                                   </li>
                                                   {order.foods.map(food => (
                                                      <li key={food.id} className='list-group-item'>
                                                         <div className='row'>
                                                            <div className='col-6'>{food.name}</div>
                                                            <div className='col-3'>{food.quantity}</div>
                                                            <div className='col-3'>{food.total}</div>
                                                         </div>
                                                      </li>
                                                   ))}
                                                </ul>

                                                <div className='text-end'>
                                                   <span className='fw-bold me-2'>Total: </span>
                                                   <span>₱{order.foods.map(food => food.total).reduce((a, b) => a + b, 0)}.00</span>
                                                </div>
                                             </div>
                                          </div>
                                       </Modal>
                                    </td>
                                 </tr>
                              ))}
                        </tbody>
                     </table>

                     <div className='d-flex justify-content-center'>
                        {orders.length > 0 && (
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
         </div>

         <footer className='mt-auto bg-dark p-2 text-center'>
            <small className='text-white'>Assessment Review &copy; 2023</small>
         </footer>
      </>
   );
};

export default Admin;
