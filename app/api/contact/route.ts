// import { Resend } from 'resend';
// import { NextResponse } from 'next/server';

// const resend = new Resend(process.env.RESEND_API_KEY);

// export async function POST(request: Request) {
//   try {
//     const { name, email, message } = await request.json();

//     const data = await resend.emails.send({
//       from: 'Madaga Engineering <onboarding@resend.dev>', // use your verified domain
//       to: ['your-email@example.com'], // client's email
//       subject: `New Contact from ${name}`,
//       text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
//     });

//     return NextResponse.json(data);
//   } catch (error) {
//     return NextResponse.json({ error: 'Failed to send' }, { status: 500 });
//   }
// }