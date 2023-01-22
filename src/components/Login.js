import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { auth } from '../firebase';

const Login = () => {
   const [inputs, setInputs] = useState({ email: '', password: '' });
   const { email, password } = inputs;

   const handleInputChange = e => {
      setInputs({ ...inputs, [e.target.name]: e.target.value });
   };

   const handleSubmit = e => {
      e.preventDefault();
      e.target.className += ' was-validated';

      if (email && password) {
         signInWithEmailAndPassword(auth, email, password)
            .then(userCredentials => {
               e.target.classList.remove('was-validated');
               toast.success('Login successfully!');
            })
            .catch(err => {
               e.target.classList.remove('was-validated');

               switch (err.code) {
                  case 'auth/invalid-email':
                     toast.error('Invalid email.');
                     break;
                  case 'auth/wrong-password':
                     toast.error('Password incorrect.');
                     break;
                  case 'auth/user-not-found':
                     toast.error("User doesn't exist.");
               }
            });
      } else toast.error('Please fill in the required fields.');
   };

   return (
      <div className='mx-5 my-auto py-5 px-2'>
         <h1 className='h1 text-center fw-bold w-100'>Login</h1>
         <p className='mt-2 text-center text-muted'>Welcome back!, Please enter your details.</p>
         <form className='container d-flex flex-column mt-5 w-75 needs-validation' noValidate onSubmit={handleSubmit}>
            <div className='mb-3'>
               <label className='mb-1' htmlFor='email'>
                  Email
               </label>
               <input type='email' className='form-control' value={email} id='email' name='email' required onChange={handleInputChange} />
               <div className='invalid-feedback'>Email can't be empty.</div>
            </div>
            <div className='mb-3'>
               <label className='mb-1' htmlFor='password'>
                  Password
               </label>
               <input type='password' className='form-control' value={password} id='password' name='password' required onChange={handleInputChange} />
               <div className='invalid-feedback'>Password can't be empty.</div>
            </div>

            <button className='btn btn-dark mt-2 p-2'>Login</button>

            <div className='mt-3'>
               Don't have an account yet? &nbsp;
               <Link className='text-decoration-none text-primary' to='/register'>
                  Register
               </Link>
            </div>
         </form>
      </div>
   );
};

export default Login;
