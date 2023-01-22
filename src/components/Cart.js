import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../contexts/UserContext';
import Footer from './Footer';
import Navbar from './Navbar';
import { MdRemoveCircle } from 'react-icons/md';
import { toast } from 'react-toastify';
import { addDoc, collection, doc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import Modal from './Modal';

const Cart = () => {
   const { user, cart, setCart, orderType, setOrderType } = useContext(UserContext);
   const [userDetails, setUserDetails] = useState({});

   const removeItem = index => {
      setCart(cart.filter((food, i) => i !== index));
      toast.success('Remove from cart successfully.');
   };

   const handleSubmit = async e => {
      e.preventDefault();
      e.target.className += ' was-validated';

      if (orderType) {
         try {
            await addDoc(collection(db, 'orders'), {
               userId: userDetails.id,
               userName: `${userDetails.lastname}, ${userDetails.firstname}`,
               orderType,
               foods: cart,
               total: cart.map(food => food.total).reduce((a, b) => a + b, 0),
               status: 'pending',
               date: new Date(),
            });
            toast.success('Order successfully.');
            setCart([]);
            setOrderType('');
            e.target.classList.remove('was-validated');
         } catch (err) {
            console.error(err.message);
         }
      } else {
         toast.error('Please fill in the required field.');
      }
   };

   useEffect(() => {
      const docRef = doc(db, 'users', user.uid);
      const unsubscribe = onSnapshot(
         docRef,
         snapshot => {
            if (snapshot.exists()) {
               setUserDetails({ id: snapshot.id, ...snapshot.data() });
            }
         },
         err => toast.error(err.message)
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
               <h2 className='h2 fw-bold text-center'>Cart</h2>
               <p className='text-center text-muted'>Food items you added will be listed in your cart.</p>
            </div>

            <div className='mb-4'>
               <ul className='list-group list-group-flush overflow-auto'>
                  <li className='list-group-item'>
                     <div className='row'>
                        <div className='col-6 fw-bold'>Name</div>
                        <div className='col-2 fw-bold'>Quantity</div>
                        <div className='col-2 fw-bold text-center'>Total</div>
                        <div className='col-2 fw-bold text-center'>Option</div>
                     </div>
                  </li>
                  {cart && cart.length > 0 ? (
                     cart.map((food, i) => (
                        <li key={`${food.id}-${i}`} className='list-group-item'>
                           <div className='row'>
                              <div className='col-6 text-wrap'>
                                 <div className='fs-5 fw-bold'>{food.name}</div>
                                 <small className='text-muted'>₱{food.price}.00</small>
                              </div>
                              <div className='col-2'>x{food.quantity}</div>
                              <div className='col-2 text-center'>{food.total}</div>
                              <div className='col-2 text-center'>
                                 {<MdRemoveCircle className='cursor text-dark fs-3' onClick={() => removeItem(i)} />}
                              </div>
                           </div>
                        </li>
                     ))
                  ) : (
                     <li className='list-group-item text-center m-2'>No food item at the moment..</li>
                  )}
               </ul>
               {cart && cart.length > 0 && (
                  <>
                     <hr className='mt-0' />
                     <div className='d-flex flex-column align-items-end'>
                        <div className='d-flex align-items-center mb-2 w-25'>
                           <div className='fw-bold me-3'>Total: </div>
                           <div className=''>₱{cart.map(food => food.total).reduce((a, b) => a + b, 0)}.00</div>
                        </div>
                        <div className='w-25'>
                           <button className='btn btn-dark w-100' data-bs-toggle='modal' data-bs-target='#modal-order-food'>
                              Order
                           </button>
                        </div>
                     </div>
                  </>
               )}
            </div>

            <Modal title='Order Confirmation' target='modal-order-food' size='modal-lg' resetState={() => setOrderType('')}>
               <form className='needs-validation p-2' noValidate onSubmit={handleSubmit}>
                  <div className='mb-2 text-end'>
                     <span className='me-2'>Date: </span>
                     <span className='fw-bold'>{new Date().toLocaleDateString()}</span>
                  </div>
                  <div className='mb-2'>
                     <label className='mb-1' htmlFor='name'>
                        Name
                     </label>
                     <input className='form-control p-2' value={userDetails && `${userDetails.lastname}, ${userDetails.firstname}`} disabled></input>
                  </div>
                  <div className='mb-2'>
                     <label className='mb-1' htmlFor='address'>
                        Address
                     </label>
                     <input className='form-control p-2' value={userDetails && `${userDetails.address}`} disabled></input>
                  </div>
                  <div className='mb-2'>
                     <label className='mb-1' htmlFor='order-type'>
                        Order Type
                     </label>
                     <select
                        className='form-select'
                        name='order-type'
                        id='oder-type'
                        value={orderType}
                        required
                        onChange={e => setOrderType(e.target.value)}
                     >
                        <option value=''>Select Order Type</option>
                        <option value='Pick-up'>Pick-up</option>
                        <option value='Delivery'>Delivery</option>
                     </select>
                     <div className='invalid-feedback'>Please select an order type.</div>
                  </div>

                  <div className='mb-2'>
                     <label className='mb-1' htmlFor='total'>
                        Total Amount
                     </label>
                     <input
                        className='form-control'
                        disabled
                        value={cart && cart.length > 0 && `₱${cart.map(food => food.total).reduce((a, b) => a + b, 0)}.00`}
                     ></input>
                  </div>

                  <div className='d-flex justify-content-end mt-3 mb-1'>
                     <button class='btn btn-secondary me-2' type='button' data-bs-dismiss='modal' onClick={() => setOrderType('')}>
                        Cancel
                     </button>
                     <button class='btn btn-dark' type='submit' data-bs-dismiss={orderType && 'modal'}>
                        Confirm
                     </button>
                  </div>
               </form>
            </Modal>
         </div>
         <Footer />
      </>
   );
};

export default Cart;
