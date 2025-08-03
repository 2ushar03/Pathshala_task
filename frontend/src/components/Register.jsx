import React, { useState } from 'react';
import './styles.css';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', role: '', skills: ''
  });
  const [message, setMessage] = useState('');

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setMessage('');

    const applicant = {
      ...formData,
      skills: formData.skills.split(',').map(skill => skill.trim())
    };

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/applicants`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(applicant)
      });

      if (res.ok) {
        setMessage('Registration successful!');
        setFormData({ name: '', email: '', phone: '', role: '', skills: '' });
      } else {
        setMessage('Registration failed.');
      }
    } catch (err) {
      setMessage('Error occurred.');
    }
  };

  return (
    <div className="form-wrapper">
      <h2>Intern/Volunteer Registration</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name*</label>
          <input name="name" value={formData.name} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Email*</label>
          <input name="email" type="email" value={formData.email} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Phone</label>
          <input name="phone" value={formData.phone} onChange={handleChange} />
        </div>

        <div className="form-group">
        <label>Role*</label>
        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          required
        >
          <option value="">-- Select Role --</option>
          <option value="Volunteer">Volunteer</option>
          <option value="Intern">Intern</option>
        </select>
        </div>

        <div className="form-group">
          <label>Skills (comma separated)</label>
          <input name="skills" value={formData.skills} onChange={handleChange} />
        </div>

        <div className="buttons">
          <button type="submit">Submit</button>
        </div>

        {message && <p className="message">{message}</p>}
      </form>
    </div>
  );
};

export default Register;
