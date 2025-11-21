import React, { useState } from 'react';

function ContactPage() {
    // State to hold form data
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    // State for feedback message
    const [status, setStatus] = useState(null); // 'success' or 'error'

    // Update state when inputs change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        // Basic validation
        if (formData.name && formData.email && formData.message) {
            // In a full MERN app, you would axios.post() this data to your backend here.
            console.log("Form Submitted:", formData);

            setStatus('success');
            // Clear form
            setFormData({ name: '', email: '', subject: '', message: '' });
        } else {
            setStatus('error');
        }
    };

    return (
        <div className="container">

            {/* Title Section */}
            <section id="title_container">
                <h1>Contact Us</h1>
                <h2>Have a question about a class or need support? Send us a message!</h2>
            </section>

            {/* Contact Form Section */}
            <section id="contact-section" aria-labelledby="contact-heading">
                <h2 id="contact-heading" className="contact-form-heading">Send us a Message</h2>

                <form id="contact-form" className="detail-form" onSubmit={handleSubmit}>

                    <div className="form-group">
                        <label htmlFor="contact-name">Full Name: <span className="required">*</span></label>
                        <input
                            type="text"
                            id="contact-name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            aria-required="true"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="contact-email">Email Address: <span className="required">*</span></label>
                        <input
                            type="email"
                            id="contact-email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            aria-required="true"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="contact-subject">Subject:</label>
                        <input
                            type="text"
                            id="contact-subject"
                            name="subject"
                            value={formData.subject}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="contact-message">Your Message: <span className="required">*</span></label>
                        <textarea
                            id="contact-message"
                            name="message"
                            rows="6"
                            value={formData.message}
                            onChange={handleChange}
                            required
                            aria-required="true"
                        ></textarea>
                    </div>

                    <button type="submit" id="submit-contact-button">Send Message</button>
                </form>

                {/* Feedback Messages */}
                {status === 'success' && (
                    <div id="contact-feedback" className="success" style={{ display: 'block' }}>
                        Thank you! Your message has been sent. We will be in touch soon.
                    </div>
                )}
                {status === 'error' && (
                    <div id="contact-feedback" className="error" style={{ display: 'block' }}>
                        Error: Please fill out all required fields.
                    </div>
                )}

            </section>
        </div>
    );
}

export default ContactPage;