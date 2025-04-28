import React, { useState } from 'react';

const index = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  // setting values with changing  input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  // handle submission of details 
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    // clearing value after submission 
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: '',
    });
  };

  return (
    <>
      <div>
        <header className='m-2 p-2'>
          <h1 className='text-5xl text-red-400 text-center font-bold'>CONTACT US</h1>
        </header>
        <main className='container bg-gradient-to-tl from-stone-50 via-red-50 to-red-200 flex flex-col p-1 space-y-8 py-5 mx-auto'>
          <div className='w-1/2 relative left-10 md:left-50'>
            <section>
              <p className='font-bold text-2xl  space-y-5 p-8'>Share your Details. We will Reach you Soon !</p>
            </section>
            {/* after submitting form  */}
            {submitted ? (
              <section className="text-red-400 font-semibold text-center text-lg">
                Thank you! We're happy to help you. 😊
              </section>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* name */}
                <section>
                  <label className="block text-sm font-medium text-gray-600">Name</label>
                  <input type="text" name="name" required className="w-full border rounded p-2 mt-1"
                    value={formData.name}
                    onChange={handleChange} />
                </section>
                {/* email */}
                <section>
                  <label className="block text-sm font-medium text-gray-600">Email</label>
                  <input type="email" name="email" required className="w-full border rounded p-2 mt-1"
                    value={formData.email} onChange={handleChange} />
                </section>
                {/* subject */}
                <section>
                  <label className="block text-sm font-medium text-gray-600">Subject</label>
                  <input type="text" name="subject" required className="w-full border rounded p-2 mt-1"
                    value={formData.subject}
                    onChange={handleChange}
                  />
                </section>
                <section>
                  <label className="block text-sm font-medium text-gray-600">Message</label>
                  <textarea name="message" rows="4" required className="w-full border rounded p-2 mt-1"
                    value={formData.message}
                    onChange={handleChange} />
                </section>
                {/* submit button */}
                <button
                  type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded transition" >Send Message
                </button>
              </form>
            )}
          </div>
        </main>
      </div>
    </>
  );
};
export default index;
