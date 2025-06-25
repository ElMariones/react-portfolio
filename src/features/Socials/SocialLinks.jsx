import React, { useState } from 'react';
import { SocialIcon } from 'react-social-icons';
import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';
import { FiCopy, FiMail } from 'react-icons/fi'; // Added FiMail icon

// --- Keyframes for the rotating gradient animation ---
const rotateGradient = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

// --- Styled Components ---
const CoolCard = styled(motion.div)`
  font-family: 'Inter', sans-serif;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: ${({ theme }) => theme.borderRadius};
  padding: ${({ theme }) => theme.spacing.large};
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  transition: all 0.3s ease;
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.large};
  color: ${({ theme }) => theme.colors.text};
  font-weight: 600;
`;

const SocialsContainer = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.large};
  margin-bottom: ${({ theme }) => theme.spacing.large};
`;

// --- Updated IconWrapper with the gradient glow ---
const IconWrapper = styled(motion.div)`
  position: relative;
  cursor: pointer;
  z-index: 1;

  /* The pseudo-element creates the gradient background */
  &::before {
    content: '';
    position: absolute;
    top: -3px;
    left: -3px;
    right: -3px;
    bottom: -3px;
    border-radius: 50%;
    background: conic-gradient(
      from 0deg,
      ${({ theme }) => theme.colors.primary},
      ${({ theme }) => theme.colors.secondary},
      ${({ theme }) => theme.colors.primary}
    );
    filter: blur(6px); /* Creates the soft glow effect */
    z-index: -1;
    animation: ${rotateGradient} 4s linear infinite; /* Apply the rotation */
    opacity: 0.8;
    transition: opacity 0.3s ease;
  }

  /* Enhance the glow on hover */
  &:hover::before {
    opacity: 1;
    animation-duration: 2s; /* Speed up the rotation on hover */
  }
`;

// Wrapper for the email section, including the copy button's new position
const EmailSectionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 400px;
  margin-top: ${({ theme }) => theme.spacing.medium};
`;

const EmailWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.medium};
  background: rgba(0, 0, 0, 0.2);
  padding: ${({ theme }) => theme.spacing.medium};
  border-radius: ${({ theme }) => theme.borderRadius};
  width: 100%;
`;

const EmailText = styled.span`
  font-family: 'Roboto Mono', monospace;
  color: ${({ theme }) => theme.colors.text};
  font-size: 0.8rem;
`;

// --- New styling for the CopyButton ---
const CopyButton = styled.button`
  font-family: 'Inter', sans-serif;
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.textSecondary};
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.9rem;
  padding: 8px;
  margin-top: ${({ theme }) => theme.spacing.medium}; /* Space from the email box */
  transition: color 0.2s ease;
  white-space: nowrap;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.3 },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

const SocialLinks = () => {
  const [copied, setCopied] = useState(false);
  const email = 'mariolandaburuclares@gmail.com';

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <CoolCard
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -5, boxShadow: '0 12px 40px 0 rgba(0, 0, 0, 0.15)' }}
    >
      <Title>Connect With Me</Title>
      <SocialsContainer variants={containerVariants} initial="hidden" animate="visible">
        <IconWrapper variants={itemVariants} whileHover={{ scale: 1.15, rotate: -5 }} transition={{ type: 'spring', stiffness: 300 }}>
          <SocialIcon url="https://github.com/ElMariones" target="_blank" rel="noopener noreferrer" style={{ height: 64, width: 64 }} bgColor="transparent" fgColor="white" />
        </IconWrapper>
        <IconWrapper variants={itemVariants} whileHover={{ scale: 1.15, rotate: 5 }} transition={{ type: 'spring', stiffness: 300 }}>
          <SocialIcon url="https://linkedin.com/in/mario-landaburu" target="_blank" rel="noopener noreferrer" style={{ height: 64, width: 64 }} bgColor="transparent" fgColor="white" />
        </IconWrapper>
      </SocialsContainer>
      
      {/* Restructured Email Section */}
      <EmailSectionWrapper>
        <EmailWrapper>
          <FiMail size={20} color={({ theme }) => theme.colors.textSecondary} />
          <EmailText>{email}</EmailText>
        </EmailWrapper>
        <CopyButton onClick={handleCopyEmail}>
          <FiCopy />
          {copied ? 'Copied!' : 'Copy Email'}
        </CopyButton>
      </EmailSectionWrapper>
    </CoolCard>
  );
};

export default SocialLinks;
