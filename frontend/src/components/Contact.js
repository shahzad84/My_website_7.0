import React from "react";
import "./Contact.css";

const Contact = () => {
  return (
    <section className="contact">
      <div className="contact-inner">

        {/* LEFT SIDE */}
        <div className="contact-info">

          <p className="section-label">Get in Touch</p>
          <h2 className="section-title">
            Let's Build Something Together
          </h2>

          <p className="section-desc">
            Have a custom project, collab idea, or just want to say hi? Reach out — we respond fast.
          </p>

          <div className="contact-links">

            <a href="mailto:hello@devstore.in" className="contact-link">
              <div className="contact-icon">✉️</div>
              <div>
                <div className="lbl">Email</div>
                <div className="val">hello@devstore.in</div>
              </div>
            </a>

            <a href="https://youtube.com" className="contact-link">
              <div className="contact-icon">📺</div>
              <div>
                <div className="lbl">YouTube</div>
                <div className="val">youtube.com/@channel</div>
              </div>
            </a>

            <a href="https://twitter.com" className="contact-link">
              <div className="contact-icon">𝕏</div>
              <div>
                <div className="lbl">Twitter / X</div>
                <div className="val">@handle</div>
              </div>
            </a>

          </div>
        </div>

        {/* RIGHT SIDE FORM */}
        <div className="contact-form">

          <div className="form-title">Send a Message</div>
          <div className="form-sub">
            We usually reply within 24 hours.
          </div>

          <input type="text" placeholder="Your Name" />
          <input type="email" placeholder="Email Address" />
          <input type="phone" placeholder="Phone Number" />
          {/* <select>
            <option>Select a topic</option>
            <option>Course Inquiry</option>
            <option>Product Purchase</option>
            <option>Collaboration</option>
            <option>Custom Project</option>
            <option>Other</option>
          </select> */}

          <textarea placeholder="Your Message..." />

          <button className="form-submit">
            Send Message →
          </button>

        </div>

      </div>
    </section>
  );
};

export default Contact;