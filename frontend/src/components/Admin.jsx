import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './styles.css';

const Admin = () => {
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin-login');
      return;
    }

    const fetchApplicants = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/applicants`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        if (!res.ok) {
          localStorage.removeItem('adminToken');
          navigate('/admin-login');
          return;
        }

        const data = await res.json();
        setApplicants(data);
      } catch {
        console.error('Failed to fetch applicants');
      } finally {
        setLoading(false);
      }
    };

    fetchApplicants();
  }, [navigate]);

  return (
    <div className="admin-wrapper">
      <h2>Applicants List</h2>
      <Link className="btn-secondary" to="/">Back to Home</Link>

      {loading ? (
        <p>Loading...</p>
      ) : applicants.length === 0 ? (
        <p>No applicants found.</p>
      ) : (
        <div className="table-responsive">
          <table>
            <thead>
              <tr>
                <th>Name</th><th>Email</th><th>Phone</th><th>Role</th><th>Skills</th><th>Registered At</th>
              </tr>
            </thead>
            <tbody>
              {applicants.map(app => (
                <tr key={app._id}>
                  <td>{app.name}</td>
                  <td>{app.email}</td>
                  <td>{app.phone || '-'}</td>
                  <td>{app.role}</td>
                  <td>{app.skills.join(', ')}</td>
                  <td>{new Date(app.createdAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Admin;
