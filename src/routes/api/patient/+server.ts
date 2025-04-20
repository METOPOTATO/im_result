import { json } from '@sveltejs/kit';

export async function POST({ request }) {
  const { phone, password } = await request.json();

  // Giả lập API nội bộ (thay bằng API thật nếu có)
  if (phone === '0901234567' && password === '123456') {
    const dummyData = {
      name: 'Nguyễn Văn A',
      dob: '1990-01-01',
      visitDate: '2025-04-15',
      diagnosis: 'Cảm cúm',
      prescription: ['Paracetamol 500mg', 'Vitamin C']
    };
    return json(dummyData);
  } else {
    return new Response('Unauthorized', { status: 401 });
  }
}