import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
 const [userData, setUserData] = useState({
   username: '',
   email: '',
   password: '',
   password2: ''
 });
 const navigate = useNavigate();

 const handleSubmit = async (e) => {
   e.preventDefault();
   if (userData.password !== userData.password2) {
     alert("Passwords don't match");
     return;
   }

   try {
     const response = await fetch('/api/register/', {
       method: 'POST',
       headers: { 'Content-Type': 'application/json' },
       body: JSON.stringify(userData)
     });

     if (response.ok) {
       navigate('/login');
     }
   } catch (error) {
     console.error('Registration failed:', error);
   }
 };

 return (
   <div className="min-h-screen flex items-center justify-center bg-[#1A1A1A]">
     <div className="max-w-md w-full space-y-8 p-8 bg-[#282828] rounded-lg shadow-lg">
       <h2 className="text-center text-3xl font-bold text-white">Join CodePro</h2>
       <form onSubmit={handleSubmit} className="mt-8 space-y-6">
         <input
           type="text"
           placeholder="Username"
           className="w-full px-3 py-2 bg-[#3B3B3B] border border-[#4B4B4B] rounded text-white placeholder-gray-400"
           onChange={e => setUserData({...userData, username: e.target.value})}
         />
         <input
           type="email"
           placeholder="Email"
           className="w-full px-3 py-2 bg-[#3B3B3B] border border-[#4B4B4B] rounded text-white placeholder-gray-400"
           onChange={e => setUserData({...userData, email: e.target.value})}
         />
         <input
           type="password"
           placeholder="Password"
           className="w-full px-3 py-2 bg-[#3B3B3B] border border-[#4B4B4B] rounded text-white placeholder-gray-400"
           onChange={e => setUserData({...userData, password: e.target.value})}
         />
         <input
           type="password"
           placeholder="Confirm Password"
           className="w-full px-3 py-2 bg-[#3B3B3B] border border-[#4B4B4B] rounded text-white placeholder-gray-400"
           onChange={e => setUserData({...userData, password2: e.target.value})}
         />
         <button
           type="submit"
           className="w-full py-2 px-4 bg-[#2CBB5D] text-white rounded hover:bg-[#259D4F] transition duration-200"
         >
           Register
         </button>
         <p className="text-center text-gray-400">
           Already have an account? <Link to="/login" className="text-[#2CBB5D] hover:text-[#259D4F]">Sign in</Link>
         </p>
       </form>
     </div>
   </div>
 );
};

export default Register;