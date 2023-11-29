

const ContactUs = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-2xl w-full h-4/5 p-8 bg-white shadow-lg rounded-md flex">
        {/* Left Side: Contact Information */}
        <div className="w-1/2 pr-8">
          <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
          <p className="text-gray-600 mb-4">If you have any questions or concerns, feel free to contact us:</p>
          <ul className="list-disc ml-6">
            <li>Email: info@blooddonation.org</li>
            <li>Phone: +1 (555) 123-4567</li>
            <li>Address: 123 Donation Street, Cityville, Bloodland</li>
          </ul>
        </div>

        {/* Right Side: Contact Form */}
        <div className="w-1/2">
          <h2 className="text-2xl font-semibold mb-4">Send us a Message</h2>
          <form action="/submit-contact-form" method="post">
            <label className="block mb-2" htmlFor="name">Your Name:</label>
            <input className="w-full p-2 border rounded-md mb-4" type="text" id="name" name="name" required />

            <label className="block mb-2" htmlFor="email">Your Email:</label>
            <input className="w-full p-2 border rounded-md mb-4" type="email" id="email" name="email" required />

            <label className="block mb-2" htmlFor="message">Your Message:</label>
            <textarea className="w-full p-2 border rounded-md mb-6" id="message" name="message" rows="4" required></textarea>

            <button className="bg-blue-500 text-white px-4 py-2 rounded-md" type="submit">Send Message</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
