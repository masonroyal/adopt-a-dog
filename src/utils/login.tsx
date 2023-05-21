// export default async function loginUser(
//   event: React.FormEvent,
//   name: string,
//   email: string
// ) {
//   event.preventDefault();

//   const response = await fetch(`${API_ENDPOINT}/auth/login`, {
//     method: 'POST',
//     body: JSON.stringify({ name, email }),
//     credentials: 'include',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   });

//   if (!response.ok) {
//     throw new Error('Login failed');
//   }

//   return;
// }
