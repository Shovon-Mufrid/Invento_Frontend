// import React, { useEffect } from 'react';
// import axios from 'axios';

// function SessionResetter() {
//   const resetSessionTimeout = () => {
//     axios.post('/api/contact/reset-session-timeout/')
//       .then(response => {
//         if(response.data.message) {
//             window.location.href = "/login";
//         }
//       })
//       .catch(error => {
//         console.error('Error resetting session timeout:', error);
//       });
//   };

//   useEffect(() => {
//     document.addEventListener('mousemove', resetSessionTimeout);
//     document.addEventListener('keydown', resetSessionTimeout);

//     return () => {
//       document.removeEventListener('mousemove', resetSessionTimeout);
//       document.removeEventListener('keydown', resetSessionTimeout);
//     };
//   }, []);

//   return null;
// }

// export default SessionResetter;
