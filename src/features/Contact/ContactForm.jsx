import emailjs from '@emailjs/browser';
import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import Card from '../../components/common/Card';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.medium};
  width: 100%;
`;

const Input = styled.input`
  padding: 12px;
  border-radius: ${({ theme }) => theme.borderRadius};
  border: 1px solid ${({ theme }) => theme.colors.textSecondary};
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  font-family: inherit;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const Textarea = styled(Input).attrs({ as: 'textarea' })`
  resize: vertical;
  min-height: 120px;
`;

const Button = styled.button`
  padding: 18px 40px;
  border-radius: ${({ theme }) => theme.borderRadius};
  border: none;
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.gradientStart}, ${({ theme }) => theme.colors.gradientEnd});
  color: ${({ theme }) => theme.colors.background};
  font-family: inherit;
  font-size: 1.5rem;
  font-weight: bold;
  cursor: pointer;
  transition: filter 0.3s ease;
  position: relative;
  overflow: hidden;

  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    filter: brightness(1.2);
  }
  
  &:disabled {
    cursor: not-allowed;
    filter: brightness(0.8);
  }
`;

const StatusOverlay = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: ${({ theme }) => theme.borderRadius};
`;

const Loader = () => (
  <motion.div
    style={{
      width: 30,
      height: 30,
      border: '4px solid #fff',
      borderTop: '4px solid transparent',
      borderRadius: '50%',
    }}
    animate={{ rotate: 360 }}
    transition={{ loop: Infinity, ease: 'linear', duration: 1 }}
  />
);

const SuccessIcon = () => (
    <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        width="48"
        height="48"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#4CAF50"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <motion.path
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            d="M22 11.08V12a10 10 0 1 1-5.93-9.14"
        />
        <motion.path
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
            d="M22 4L12 14.01l-3-3"
        />
    </motion.svg>
);

const ErrorMessage = styled.p`
  margin-top: 1rem;
  color: #F44336;
  text-align: center;
`;

const SendIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="22" y1="2" x2="11" y2="13" />
    <polygon points="22 2 15 22 11 13 2 9 22 2" />
  </svg>
);

const WideCard = styled(Card)`
  width: 1600px; /* Assuming default is 400px, adjust as needed */
  max-width: 100vw;
  margin: 0 auto;
`;

const ContactForm = () => {
    const form = useRef();
    const [status, setStatus] = useState({ type: '', message: '' });

    const sendEmail = (e) => {
        e.preventDefault();
        setStatus({ type: 'loading', message: '' });

        emailjs
            .sendForm(
                import.meta.env.VITE_EMAILJS_SERVICE_ID,
                import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
                form.current,
                import.meta.env.VITE_EMAILJS_PUBLIC_KEY
            )
            .then(
                (result) => {
                    console.log('SUCCESS!', result.text);
                    setStatus({ type: 'success', message: 'Message sent successfully!' });
                    form.current.reset();
                    setTimeout(() => setStatus({ type: '', message: '' }), 3000); // Reset after 3 seconds
                },
                (error) => {
                    console.log('FAILED...', error.text);
                    setStatus({ type: 'error', message: 'Failed to send. Please try again.' });
                }
            );
    };

    return (
        <WideCard>
            <AnimatePresence>
                {status.type === 'success' ? (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        style={{ textAlign: 'center', padding: '2rem' }}
                    >
                        <SuccessIcon />
                        <h3 style={{ marginTop: '1rem', color: '#4CAF50' }}>Message Sent!</h3>
                    </motion.div>
                ) : (
                    <motion.div
                        initial={{ opacity: 1 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <h2 style={{ textAlign: 'center', marginBottom: '1rem' }}>Send a Message</h2>
                        <Form ref={form} onSubmit={sendEmail}>
                            <Input type="text" name="from_name" placeholder="Your Name" required />
                            <Input type="email" name="from_email" placeholder="Your Email" required />
                            <Textarea name="message" placeholder="Your Message" required />
                            <Button type="submit" disabled={status.type === 'loading'}>
                                <AnimatePresence>
                                    {status.type === 'loading' ? (
                                        <StatusOverlay
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                        >
                                            <Loader />
                                        </StatusOverlay>
                                    ) : (
                                        <SendIcon />
                                    )}
                                </AnimatePresence>
                            </Button>
                        </Form>
                        {status.type === 'error' && <ErrorMessage>{status.message}</ErrorMessage>}
                    </motion.div>
                )}
            </AnimatePresence>
        </WideCard>
    );
};

export default ContactForm;