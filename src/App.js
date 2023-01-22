import './App.css';
import { ToastContainer, Flip, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth, db } from './firebase';
import { doc, getDoc } from 'firebase/firestore';

import Home from './components/Home';
import Order from './components/Order';
import Services from './components/Services';
import About from './components/About';
import Contact from './components/Contact';
import Register from './components/Register';
import Login from './components/Login';
import { UserContext } from './contexts/UserContext';
import Admin from './components/Admin';
import Cart from './components/Cart';

function App() {
   const [user, setUser] = useState(null);
   const [role, setRole] = useState('');
   const [cart, setCart] = useState([]);
   const [orderType, setOrderType] = useState('');

   const getRole = async uid => {
      const docRef = doc(db, 'users', uid);

      try {
         const userDoc = await getDoc(docRef);
         if (userDoc.exists()) {
            const { role } = userDoc.data();
            return role;
         }
      } catch (err) {
         console.error(err.message);
      }
   };

   const logout = () => {
      signOut(auth).then(() => toast.success('Logout successfully.'));
   };

   useEffect(() => {
      const unsubscribe = onAuthStateChanged(
         auth,
         async userCredentials => {
            if (userCredentials) {
               const role = await getRole(userCredentials.uid);

               setRole(role);
               setUser(userCredentials);
            } else setUser(null);
         },
         err => {
            toast.error(err.message);
         }
      );

      // clean up
      return () => {
         unsubscribe();
      };
   });

   const userContextValue = { user, setUser, role, setRole, logout, cart, setCart, orderType, setOrderType };

   return (
      <UserContext.Provider value={userContextValue}>
         <Router>
            <Routes>
               <Route path='/' element={<Home />} />
               <Route path='/order' element={user ? <Order /> : <Navigate replace to='/login' />} />
               <Route path='/cart' element={user ? <Cart /> : <Navigate replace to='/login' />} />
               <Route path='/services' element={<Services />} />
               <Route path='/about' element={<About />} />
               <Route path='/contact' element={<Contact />} />
               <Route path='/register' element={<Register />} />
               <Route path='/login' element={!user ? <Login /> : role === 'admin' ? <Navigate replace to='/admin' /> : <Navigate replace to='/' />} />
               <Route path='/admin' element={user ? <Admin /> : <Navigate replace to='/login' />} />
            </Routes>
         </Router>
         <ToastContainer theme='light' transition={Flip} autoClose='2000' />
      </UserContext.Provider>
   );
}

export default App;
