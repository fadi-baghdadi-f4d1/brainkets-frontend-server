// // 'use client'; // Ensure that this is a client-side component
// //
// // import { useEffect, useState } from 'react';
// // import { useRouter } from 'next/navigation'; // Updated import for Next.js 13+
// // import jwt from 'jsonwebtoken';
// //
// // export default function Dashboard() {
// //   const [user, setUser] = useState(null);
// //   const router = useRouter();
// //
// //   useEffect(() => {
// //     const searchParams = new URLSearchParams(window.location.search);
// //     const token = searchParams.get('token');
// //
// //     if (token) {
// //       try {
// //         const decoded = jwt.verify(token, process.env.NEXT_PUBLIC_JWT_SECRET);
// //         setUser(decoded);
// //       } catch (err) {
// //         console.error('Invalid token', err);
// //         router.push('/login');
// //       }
// //     } else {
// //       router.push('/login');
// //     }
// //   }, [router]);
// //
// //   if (!user) {
// //     return <p>Loading...</p>;
// //   }
// //
// //   return <h2>Welcome to the Booking App, {user.username}!</h2>;
// // }
// 'use client'; // Ensure that this is a client-side component
//
// import { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';
//
// export default function Dashboard() {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const router = useRouter();
//
//   useEffect(() => {
//     const fetchUserData = async () => {
//       const searchParams = new URLSearchParams(window.location.search);
//       const token = searchParams.get('token');
//
//       if (token) {
//         try {
//           // Send token to the backend for validation
//           const response = await fetch(`http://localhost:4000/dashboard?token=${token}`);
//           if (!response.ok) {
//             throw new Error('Invalid token');
//           }
//
//           const userData = await response.json();
//           setUser(userData);
//         } catch (err) {
//           console.error('Invalid token', err);
//           alert(err.message || 'Login failed. Please try again.');
//         }
//       } else {
//         router.push('/');
//       }
//
//       setLoading(false);
//     };
//
//     fetchUserData();
//   }, [router]);
//
//   if (loading) {
//     return <p>Loading...</p>;
//   }
//
//   if (!user) {
//     return <p>Redirecting to login...</p>;
//   }
//
//   return <h2>Welcome to the Booking App, {user.username}!</h2>;
// }
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      const searchParams = new URLSearchParams(window.location.search);
      console.log(searchParams)
      const token = searchParams.get('token');
      console.log(token);
      if (token) {
        try {
          const response = await fetch(`http://localhost:4000/dashboard?token=${token}`);
          if (!response.ok) {
            throw new Error('Invalid token or failed to fetch user data');
          }

          const userData = await response.json();
          console.log('User data received:', userData); // Debugging line
          setUser(userData);
        } catch (err) {
          console.error('Error fetching user data:', err);
          router.push('/login'); // Redirect to login on error
        }
      } else {
        router.push('/login'); // Redirect if no token is found
      }

      setLoading(false);
    };

    fetchUserData();
  }, [router]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!user) {
    return <p>No user data found</p>;
  }

  return <h2>Welcome to the Booking App, {user.username}!</h2>;
}
