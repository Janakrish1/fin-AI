// export const fetchLinks = async (keyword) => {
//     const response = await fetch('https://3f63-34-125-121-131.ngrok-free.app/dropdownVal', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ keyword : keyword }),
//     });
  
//     if (!response.ok) {
//       throw new Error('Failed to fetch links');
//     }
  
//     return response.json();
//   };