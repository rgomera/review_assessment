import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { auth, db } from '../firebase';
import { createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

const Register = () => {
   const [inputs, setInputs] = useState({ firstname: '', lastname: '', email: '', password: '', confirmPassword: '', sex: '', address: '' });
   const { firstname, lastname, email, password, confirmPassword, sex, address } = inputs;

   const handleInputChange = e => {
      setInputs({ ...inputs, [e.target.name]: e.target.value });
   };

   const handleSubmit = e => {
      e.preventDefault();
      e.target.className += ' was-validated';

      if (firstname && lastname && email && password && confirmPassword && sex && address) {
         if (password !== confirmPassword) {
            toast.error("Password and confirm password doesn't match.");
            return;
         }

         createUserWithEmailAndPassword(auth, email, password)
            .then(userCredentials => {
               // after successful creation of user, we can access the user
               // destructure the uid
               const { uid } = userCredentials.user;
               const docRef = doc(db, 'users', uid);

               // create a user document using user's uid
               setDoc(docRef, {
                  firstname,
                  lastname,
                  email,
                  sex,
                  address,
                  role: 'customer',
               })
                  .then(async () => {
                     e.target.classList.remove('was-validated');
                     setInputs({ firstname: '', lastname: '', email: '', password: '', confirmPassword: '', sex: '', address: '' });
                     toast.success('Registered successfully.');

                     // logout user to avoid automatic login
                     await signOut(auth);
                  })
                  .catch(err => {
                     toast.error(err.message);
                  });
            })
            .catch(err => {
               e.target.classList.remove('was-validated');

               switch (err.code) {
                  case 'auth/invalid-email':
                     toast.error('Invalid email.');
                     break;
                  case 'auth/weak-password':
                     toast.error('Password should be at least 6 characters.');
                     break;
                  case 'auth/email-already-in-use':
                     toast.error('Email already in use.');
               }
            });
      } else {
         toast.error('Please fill in the required fields.');
      }
   };

   return (
      <div className='mx-5 my-auto py-5 px-2'>
         <h1 className='h1 text-center m-0 fw-bold w-100'>Register</h1>
         <p className='mt-2 text-center text-muted'>Be part of our increasing loyal customers and enjoy our wonderful services.</p>
         <form className='container d-flex flex-column mt-5 w-75 needs-validation' noValidate onSubmit={handleSubmit}>
            <div className='row'>
               <div className='col-12 col-lg-6 mb-3'>
                  <label className='mb-1' htmlFor='firstname'>
                     First Name
                  </label>
                  <input
                     type='text'
                     className='form-control'
                     value={firstname}
                     id='firstname'
                     name='firstname'
                     required
                     onChange={handleInputChange}
                  />
                  <div className='invalid-feedback'>First name can't be empty.</div>
               </div>

               <div className='col-12 col-lg-6 mb-3'>
                  <label className='mb-1' htmlFor='lastname'>
                     Last Name
                  </label>
                  <input type='text' className='form-control' value={lastname} id='lastname' name='lastname' required onChange={handleInputChange} />
                  <div className='invalid-feedback'>Last name can't be empty.</div>
               </div>
            </div>

            <div className='mb-3'>
               <label className='mb-1' htmlFor='email'>
                  Email
               </label>
               <input type='email' className='form-control' value={email} id='email' name='email' required onChange={handleInputChange} />
               <div className='invalid-feedback'>Email can't be empty.</div>
            </div>

            <div className='row'>
               <div className='col-12 col-lg-6 mb-3'>
                  <label className='mb-1' htmlFor='password'>
                     Password
                  </label>
                  <input
                     type='password'
                     className='form-control'
                     value={password}
                     id='password'
                     name='password'
                     required
                     onChange={handleInputChange}
                  />
                  <div className='invalid-feedback'>Password can't be empty.</div>
               </div>

               <div className='col-12 col-lg-6 mb-3'>
                  <label className='mb-1' htmlFor='confirmPassword'>
                     Confirm Password
                  </label>
                  <input
                     type='password'
                     className='form-control'
                     value={confirmPassword}
                     id='confirmPassword'
                     name='confirmPassword'
                     required
                     onChange={handleInputChange}
                  />
                  <div className='invalid-feedback'>Confirm password can't be empty.</div>
               </div>
            </div>

            <div className='mb-3'>
               <label htmlFor='address' className='mb-1'>
                  Address
               </label>
               <textarea
                  className='form-control'
                  name='address'
                  id='address'
                  rows='4'
                  value={address}
                  onChange={handleInputChange}
                  required
               ></textarea>
               <div className='invalid-feedback'>Address can't be empty.</div>
            </div>

            <div className='mb-3'>
               <label className=' mb-1' htmlFor='sex'>
                  Sex
               </label>
               <select className='form-select' name='sex' id='sex' value={sex} required onChange={handleInputChange}>
                  <option value=''>Select Sex</option>
                  <option value='Male'>Male</option>
                  <option value='Female'>Female</option>
               </select>
               <div className='invalid-feedback'>Please select a sex.</div>
            </div>

            <button className='btn btn-dark mt-2 p-2'>Register</button>

            <div className='mt-3 text-center'>
               Already have an account? &nbsp;
               <Link className='text-decoration-none text-primary' to='/login'>
                  Login
               </Link>
            </div>
         </form>
      </div>
   );
};

export default Register;
