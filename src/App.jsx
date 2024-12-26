import React, { useState,useEffect } from 'react'
import { useDispatch } from 'react-redux'
import authService from './appwrite/auth';
import './App.css'
import  Footer  from './components/Footer/Footer.jsx';
import  Header  from './components/Header/Header.jsx';

function App() {
 // सबसे पहले एक state बनाएंगे-लोडिंग. क्योंकि जब आप एप्लिकेशन से डेटा फ़ेच करेंगे, अगर loading=true है तो लोडिंग spinner का icon दिखाएंगे.. अगर loading=false है मतलब data लोड हुआ है तो डेटा दिखाएंगे
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
// jaise hi application load ho, ek useeffect lo, usse pucho ki aap logged in ho ya nahi ho
// Concept-  initially loading is true. When app loads, (react renders it for the first time, -> because loading true hai to loading spinner dikhega aur useeffect run hoga for the 1st time.)
  useEffect(() => { 
   authService.getCurrentUser()
   .then((userData)=>{           // successfully user mil gaya to. And that userData variable used in login and logout action of authSlice.js(a reducer)
      if(userData){                  
        dispatch(login({userData})); // why sending userData in object? -> because login action expects an object as payload
      }else{
        dispatch(logout());
      }
   })                          
   .finally(()=>{ 
      setLoading(false);
    });
  }, []);

  return !loading ?(
    <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
      <div className='w-full block'>
          <Header />
          <main> 
            TODO:{/*<Outlet /> */}</main>
          <Footer />
      </div>
      </div>
  ) : null // agar loading false hai to data dikhao, nahi to null dikhao
}


export default App
