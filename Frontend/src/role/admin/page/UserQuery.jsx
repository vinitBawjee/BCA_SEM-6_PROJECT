import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './UserQuery.module.css'; 

const UserQuery = () => {
  const API_URL = import.meta.env.VITE_API_URL; 

  const [contacts, setContacts] = useState([]);
  const [responseMessage, setResponseMessage] = useState('');

  // Fetch contact messages
  useEffect(() => {
    axios
      .get(`${API_URL}/admin/contacts`)  
      .then((response) => {
        setContacts(response.data);
      })
      .catch((error) => {
        console.error('Error fetching contacts:', error);
      });
  }, []);

  const handleSendResponse = (email) => {
    if (!responseMessage.trim()) {
      alert('Please enter a response message.');
      return;
    }

    axios
      .post(`${API_URL}/admin/send-response`, { email, responseMessage })
      .then((response) => {
        if (response.data.success) {
          alert(`Response sent to ${email}`);
          setResponseMessage(''); 
        } else {
          alert('Failed to send response');
        }
      })
      .catch((error) => {
        console.error('Error sending response:', error);
        alert('Error sending response');
      });
  };

  return (
    <div className={styles['admin-panel']}>
      <h1>Contact Message</h1>

      {contacts.length === 0 ? (
        <p>No contact messages</p>
      ) : (
        <div className={styles['table-container']}>
          <table>
            <thead>
              <tr>
                <th>Full Name</th>
                <th>Email</th>
                <th>Subject</th>
                <th>Message</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((contact, index) => (
                <tr key={index}>
                  <td>{contact.fullName}</td>
                  <td>{contact.email}</td>
                  <td>{contact.subject}</td>
                  <td>{contact.message}</td>
                  <td>
                    <input
                      type="text"
                      value={responseMessage}
                      onChange={(e) => setResponseMessage(e.target.value)}
                      placeholder="Write your response here"
                    />
                    <button className="btn btn-primary" onClick={() => handleSendResponse(contact.email)}>
                      Send Response
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default UserQuery;
