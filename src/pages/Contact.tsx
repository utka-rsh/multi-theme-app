// import React, { useState } from 'react';

// const Contact: React.FC = () => {
//   const [form, setForm] = useState({ name: '', email: '', message: '' });

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     alert(`Message sent from ${form.name}`);
//     setForm({ name: '', email: '', message: '' });
//   };

//   return (
//     <div className="flex items-center justify-center min-h-[calc(100vh-5rem)] px-4">
//       <div className="w-full max-w-3xl">
//         <h1 className="text-3xl font-bold mb-6 text-center">
//           Contact Us
//         </h1>
//         <form
//           onSubmit={handleSubmit}
//           className="p-6 rounded shadow space-y-4 border border-gray-300 dark:border-gray-700"
//         >
//           <input
//             type="text"
//             name="name"
//             value={form.name}
//             onChange={handleChange}
//             placeholder="Your Name"
//             className="w-full p-2 rounded border border-gray-300 dark:border-gray-700 bg-transparent"
//             required
//           />
//           <input
//             type="email"
//             name="email"
//             value={form.email}
//             onChange={handleChange}
//             placeholder="Your Email"
//             className="w-full p-2 rounded border border-gray-300 dark:border-gray-700 bg-transparent"
//             required
//           />
//           <textarea
//             name="message"
//             value={form.message}
//             onChange={handleChange}
//             placeholder="Your Message"
//             rows={5}
//             className="w-full p-2 rounded border border-gray-300 dark:border-gray-700 bg-transparent"
//             required
//           />
//           <button
//             type="submit"
//             className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
//           >
//             Send
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Contact;


import React, { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import emailjs from 'emailjs-com';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

// EmailJS config — replace with your real values
const SERVICE_ID = 'service_rp4c63c';
const TEMPLATE_ID = 'template_erialfj';
const PUBLIC_KEY = 'okDPwNpBdlZd9c9yr';

// Validation schema
const schema = yup.object().shape({
  name: yup.string().required('Name is required').min(3, 'Name must be at least 3 characters'),
  email: yup.string().required('Email is required').email('Enter a valid email'),
  message: yup.string().required('Message is required').min(10, 'Message must be at least 10 characters'),
});

const Contact: React.FC = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState({ type: '', message: '' });
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = () => {
    if (!formRef.current) return;
    setLoading(true);

    emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, PUBLIC_KEY)
      .then(() => {
        setStatus({ type: 'success', message: 'Message sent successfully!' });
        reset();
      })
      .catch(() => {
        setStatus({ type: 'error', message: 'Something went wrong. Please try again.' });
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-5rem)] px-4">
      <div className="w-full max-w-3xl">
        <h1 className="text-3xl font-bold mb-6 text-center text-[var(--color-text)]">Contact Us</h1>

        {status.message && (
          <div
            className={`mb-4 text-sm px-4 py-2 rounded ${
              status.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}
          >
            {status.message}
          </div>
        )}

        <form
          ref={formRef}
          onSubmit={handleSubmit(onSubmit)}
          className="p-6 rounded shadow space-y-4 border border-gray-300 dark:border-gray-700 bg-[var(--color-bg)] text-[var(--color-text)]"
        >
          <div>
            <input
              type="text"
              placeholder="Your Name"
              {...register('name')}
              className="w-full p-2 rounded border border-gray-300 dark:border-gray-700 bg-transparent"
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
          </div>

          <div>
            <input
              type="email"
              placeholder="Your Email"
              {...register('email')}
              className="w-full p-2 rounded border border-gray-300 dark:border-gray-700 bg-transparent"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>

          <div>
            <textarea
              rows={5}
              placeholder="Your Message"
              {...register('message')}
              className="w-full p-2 rounded border border-gray-300 dark:border-gray-700 bg-transparent"
            />
            {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            {loading ? 'Sending...' : 'Send'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
