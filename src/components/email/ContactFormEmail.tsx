import React from 'react';

interface ContactFormEmailProps {
  name: string;
  email: string;
  message: string;
}

const ContactFormEmail: React.FC<Readonly<ContactFormEmailProps>> = ({
  name,
  email,
  message,
}) => (
  <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '600px', margin: '0 auto' }}>
    <div style={{ backgroundColor: '#f8fafc', padding: '20px', borderRadius: '8px' }}>
      <h2 style={{ color: '#1e293b', marginBottom: '20px' }}>New Contact Form Submission</h2>
      
      <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '6px', marginBottom: '20px' }}>
        <h3 style={{ color: '#475569', marginBottom: '15px' }}>Contact Details</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <tr>
            <td style={{ padding: '8px 0', fontWeight: 'bold', color: '#64748b', width: '80px' }}>Name:</td>
            <td style={{ padding: '8px 0', color: '#1e293b' }}>{name}</td>
          </tr>
          <tr>
            <td style={{ padding: '8px 0', fontWeight: 'bold', color: '#64748b' }}>Email:</td>
            <td style={{ padding: '8px 0', color: '#1e293b' }}>
              <a href={`mailto:${email}`} style={{ color: '#3b82f6', textDecoration: 'none' }}>
                {email}
              </a>
            </td>
          </tr>
        </table>
      </div>

      <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '6px' }}>
        <h3 style={{ color: '#475569', marginBottom: '15px' }}>Message</h3>
        <div style={{ 
          backgroundColor: '#f1f5f9', 
          padding: '15px', 
          borderRadius: '4px',
          color: '#1e293b',
          lineHeight: '1.6',
          whiteSpace: 'pre-wrap'
        }}>
          {message}
        </div>
      </div>

      <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#e0f2fe', borderRadius: '6px' }}>
        <p style={{ margin: 0, fontSize: '14px', color: '#0369a1' }}>
          💡 <strong>Quick Actions:</strong>
        </p>
        <p style={{ margin: '8px 0 0 0', fontSize: '14px', color: '#0369a1' }}>
          • Reply directly to this email to respond to {name}<br/>
          • The reply-to address is automatically set to: {email}
        </p>
      </div>

      <div style={{ marginTop: '20px', textAlign: 'center' }}>
        <p style={{ fontSize: '12px', color: '#64748b' }}>
          This email was sent from your portfolio contact form at{' '}
          <a href="https://cythical.cyth.me" style={{ color: '#3b82f6' }}>cythical.cyth.me</a>
        </p>
      </div>
    </div>
  </div>
);

export default ContactFormEmail;
