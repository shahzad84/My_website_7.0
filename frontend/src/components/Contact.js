import React, { useState } from "react";
import "./Contact.css";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
const Contact = () => {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    countryCode: "",
    message: ""
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  // ✅ Email validation
  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  // ✅ all phone validation
  const isValidPhone = (phone) => {
    // Remove spaces, dashes, brackets, etc.
    const cleaned = phone.replace(/[\s\-().]/g, "");

    // Must start with + OR digit
    // Must be 7 to 15 digits (E.164 standard)
    return /^\+?[1-9]\d{6,14}$/.test(cleaned);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value
    });

    let newErrors = { ...errors };

    if (name === "email") {
      if (!isValidEmail(value)) {
        newErrors.email = "Enter valid email (example: name@gmail.com)";
      } else {
        delete newErrors.email;
      }
    }

    if (name === "phone") {
      if (value && !isValidPhone(value)) {
        newErrors.phone = "Enter valid phone (10 digits)";
      } else {
        delete newErrors.phone;
      }
    }

    if (name === "name") {
      if (!value.trim()) {
        newErrors.name = "Name is required";
      } else {
        delete newErrors.name;
      }
    }

    if (name === "message") {
      if (!value.trim()) {
        newErrors.message = "Message required";
      } else {
        delete newErrors.message;
      }
    }

    setErrors(newErrors);
  };

  const handleSubmit = async () => {

    let newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!isValidEmail(formData.email)) {
      newErrors.email = "Invalid email";
    }

    if (!formData.phone || formData.phone.length < 8) {
      newErrors.phone = "Enter valid phone number";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message required";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setStatus("❌ Fix errors above");
      return;
    }

    try {
      setLoading(true);
      setStatus("");

      await fetch(process.env.REACT_APP_GOOGLE_SCRIPT_URL, {
        method: "POST",
        body: JSON.stringify(formData),
      });

      setStatus("✅ Message sent!");

      setFormData({
        name: "",
        email: "",
        phone: "",
        message: ""
      });

      setErrors({});

    } catch (err) {
      setStatus("❌ Something went wrong");
    } finally {
      setLoading(false);
    }
  };

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

            <a href="https://youtube.com" className="contact-link" target="_blank" rel="noreferrer">
              <div className="contact-icon">📺</div>
              <div>
                <div className="lbl">YouTube</div>
                <div className="val">youtube.com/@channel</div>
              </div>
            </a>

            <a href="https://twitter.com" className="contact-link" target="_blank" rel="noreferrer">
              <div className="contact-icon">𝕏</div>
              <div>
                <div className="lbl">Twitter / X</div>
                <div className="val">@handle</div>
              </div>
            </a>

            {/* ✅ ADDED INSTAGRAM BACK */}
            <a href="https://instagram.com" className="contact-link" target="_blank" rel="noreferrer">
              <div className="contact-icon">📸</div>
              <div>
                <div className="lbl">Instagram</div>
                <div className="val">@yourhandle</div>
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

          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && <p className="error">{errors.name}</p>}

          <input
            type="email"
            name="email"
            placeholder="Email (e.g. name@gmail.com)"
            value={formData.email}
            onChange={handleChange}
            inputMode="email"
            autoComplete="email"
            spellCheck="false"
            className={errors.email ? "error-border" : ""}
          />
          {errors.email && <p className="error">{errors.email}</p>}

          <PhoneInput
            country={"in"}
            value={formData.phone}
            onChange={(value, country) => {
              setFormData({
                ...formData,
                phone: value,                     // full number
                countryCode: country.dialCode    // ONLY code
              });
            }}
            inputStyle={{
              width: "100%",
              background: "rgba(20,20,30,0.6)",
              border: "1px solid rgba(0,255,163,0.2)",
              color: "#e8e8f0",
            }}
            containerStyle={{
              marginBottom: "1rem"
            }}
          />
          {errors.phone && <p className="error">{errors.phone}</p>}

          <textarea
            name="message"
            placeholder="Your Message..."
            value={formData.message}
            onChange={handleChange}
          />
          {errors.message && <p className="error">{errors.message}</p>}

          <button
            className="form-submit"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Sending..." : "Send Message →"}
          </button>

          {status && <p className="form-status">{status}</p>}

        </div>

      </div>
    </section>
  );
};

export default Contact;