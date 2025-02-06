import { useState } from "react";
import emailjs from "emailjs-com";

export default function ContactForm() {
  const initialFormState = {
    name: "",
    contact: "",
    whatsapp: "",
    email: "",
    location: "",
    business: "",
    queryAbout: "Website",
    minBudget: 9999,
    maxBudget: "",
    startTimeline: "",
    additionalDetails: "",
  };

  const [formData, setFormData] = useState(initialFormState);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRadioChange = (e) => {
    let minBudgetValue;
    if (e.target.value === "Website") minBudgetValue = 9999;
    else if (e.target.value === "App") minBudgetValue = 39999;
    else minBudgetValue = 49999;

    setFormData({
      ...formData,
      queryAbout: e.target.value,
      minBudget: minBudgetValue,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    emailjs
      .send(
        "service_e0smcgb",
        "template_1f6f7u9",
        formData,
        "Br4ZmL9xHF374wGhg"
      )
      .then(
        (response) => {
          console.log("SUCCESS!", response.status, response.text);
          setIsSubmitted(true);
          setFormData(initialFormState); // ✅ Clear form after submission

          setTimeout(() => setIsSubmitted(false), 15000); // ✅ Hide success message after 5 seconds
        },
        (err) => {
          console.log("FAILED...", err);
          setErrorMessage("Something went wrong. Please try again.");
          setTimeout(() => setErrorMessage(""), 3000); // ✅ Hide error message after 3 seconds
        }
      );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0C1A2A] p-4 relative">
      <div className="bg-white p-6 md:p-10 rounded-2xl shadow-lg w-full max-w-lg">
        {isSubmitted ? (
          <div className="text-center">
            <h2 className="text-xl font-semibold text-[#0C1A2A] mb-4">Thank You!</h2>
            <p className="text-gray-700">We have received your inquiry and will get back to you soon.</p>
            <a
              href="https://zoomsterhub.com"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block p-3 bg-[#00B6B6] text-white font-semibold rounded-lg hover:bg-[#008C8C] transition duration-300"
            >
              Visit Our Website
            </a>
          </div>
        ) : (
          <>
          <div className="flex items-center justify-center mb-6">
  <img src="./logo.png" className="w-10 mr-4" alt="Logo" />
  <h2 className="text-xl font-semibold text-[#0C1A2A]">Inquiry Form</h2>
</div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input type="text" name="name" value={formData.name} placeholder="Name" onChange={handleChange} className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00B6B6]" required />
              <input type="text" name="contact" value={formData.contact} placeholder="Contact" onChange={handleChange} className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00B6B6]" required />
              <input type="text" name="whatsapp" value={formData.whatsapp} placeholder="WhatsApp" onChange={handleChange} className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00B6B6]" required />
              <input type="email" name="email" value={formData.email} placeholder="Email" onChange={handleChange} className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00B6B6]" required />
              <input type="text" name="location" value={formData.location} placeholder="Your Location" onChange={handleChange} className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00B6B6]" required />
              <input type="text" name="business" value={formData.business} placeholder="Your Business" onChange={handleChange} className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00B6B6]" required />

              <div className="space-y-2">
                <label className="block text-[#0C1A2A] font-medium">Query About:</label>
                <div className="flex space-x-4">
                  {["Website", "App", "Both"].map((option) => (
                    <label key={option} className="flex items-center space-x-2">
                      <input type="radio" name="queryAbout" value={option} onChange={handleRadioChange} className="w-4 h-4" checked={formData.queryAbout === option} required />
                      <span>{option}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex space-x-2">
                <input
                  type="number"
                  name="minBudget"
                  value={formData.minBudget}
                  readOnly
                  className="w-1/2 p-3 border rounded-lg bg-gray-200 focus:outline-none"
                />
                <input
                  type="number"
                  name="maxBudget"
                  value={formData.maxBudget}
                  placeholder="Your Budget"
                  onChange={handleChange}
                  min={formData.minBudget}
                  className="w-1/2 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00B6B6]"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="block text-[#0C1A2A] font-medium">How soon do you want to get started?</label>
                <div className="flex space-x-4">
                  {["Immediate", "Within 2-3 days", "Within 7 days"].map((option) => (
                    <label key={option} className="flex items-center space-x-2">
                      <input type="radio" name="startTimeline" value={option} onChange={handleChange} className="w-4 h-4" required />
                      <span>{option}</span>
                    </label>
                  ))}
                </div>
              </div>

              <textarea name="additionalDetails" value={formData.additionalDetails} placeholder="Any additional details you’d like to share?" onChange={handleChange} className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00B6B6]" rows="3"></textarea>

              <button type="submit" className="w-full p-3 bg-[#00B6B6] text-white font-semibold rounded-lg hover:bg-[#008C8C] transition duration-300">Submit</button>
              <div className="text-xs text-center text-gray-600 mt-2">
            <p>
              <em>This form submission is not payable.</em>
            </p>
          </div>
            </form>
          </>
        )}
        {errorMessage && (
          <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-red-500 text-white py-2 px-6 rounded-lg shadow-lg text-center text-sm font-medium">{errorMessage}</div>
        )}
      </div>
    </div>
  );
}
