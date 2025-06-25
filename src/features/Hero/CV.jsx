import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FiEye, FiDownload, FiX } from 'react-icons/fi';

// --- SVG Flag Icons (Self-contained and easy to style) ---
const SpanishFlag = () => (
  <svg width="28" height="20" viewBox="0 0 5 3" xmlns="http://www.w3.org/2000/svg">
    <rect width="5" height="3" fill="#C60B1E"/>
    <rect width="5" height="2" y="0.5" fill="#FFC400"/>
  </svg>
);

const UKFlag = () => (
    <svg width="28" height="20" viewBox="0 0 60 36" xmlns="http://www.w3.org/2000/svg">
        <clipPath id="a"><path d="M0 0v36h60V0z"/></clipPath>
        <path d="M0 0v36h60V0z" fill="#012169"/>
        <path d="M0 0l60 36m0-36L0 36" stroke="#fff" strokeWidth="6" clipPath="url(#a)"/>
        <path d="M0 0l60 36m0-36L0 36" clipPath="url(#a)" stroke="#C8102E" strokeWidth="4"/>
        <path d="M30 0v36M0 18h60" stroke="#fff" strokeWidth="10"/>
        <path d="M30 0v36M0 18h60" stroke="#C8102E" strokeWidth="6"/>
    </svg>
);


// --- Styled Components ---
const CoolCard = styled(motion.div)`
  font-family: 'Inter', sans-serif; // Assumes "Inter" is loaded in your project
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

const Title = styled(motion.h2)`
  margin-bottom: ${({ theme }) => theme.spacing.large};
  color: ${({ theme }) => theme.colors.text};
  font-weight: 600;
`;

const ContentWrapper = styled(motion.div)`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.large};
`;

const LanguagesContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing.medium};
    align-items: flex-start;
`;

const LanguageItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px; /* Space between flag and text */
  font-size: 1.1rem;
  color: ${({ theme }) => theme.colors.textSecondary};

  strong {
    color: ${({ theme }) => theme.colors.text};
    font-weight: 600;
  }
`;

const CVTitle = styled.h3`
  margin-top: ${({ theme }) => theme.spacing.medium};
  margin-bottom: 0;
  font-size: 1.2rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.primary};
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.medium};
  margin-top: ${({ theme }) => theme.spacing.small};
`;

// Updated button to be a motion.button for the modal
const ActionButton = styled(motion.button)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 10px 20px;
  border-radius: ${({ theme }) => theme.borderRadius};
  font-weight: bold;
  font-size: 1rem;
  text-decoration: none;
  cursor: pointer;
  border: 2px solid transparent;

  &.primary {
    background: linear-gradient(135deg, ${({ theme }) => theme.colors.gradientStart}, ${({ theme }) => theme.colors.gradientEnd});
    color: ${({ theme }) => theme.colors.text};
  }

  &.secondary {
    background-color: transparent;
    border-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const DownloadLink = styled(ActionButton).attrs({ as: 'a' })``; // Inherits styles for the download link

// --- PDF Modal Components ---
const ModalBackdrop = styled(motion.div)`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.7);
    backdrop-filter: blur(5px);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
`;

const ModalContent = styled(motion.div)`
    width: 90%;
    height: 90%;
    max-width: 1000px;
    background: ${({ theme }) => theme.colors.background};
    border-radius: ${({ theme }) => theme.borderRadius};
    box-shadow: ${({ theme }) => theme.shadows ? theme.shadows.xl : '0 16px 48px rgba(0, 0, 0, 0.25)'};
    padding: ${({ theme }) => theme.spacing.medium};
    display: flex;
    flex-direction: column;
`;

const CloseButton = styled(motion.button)`
    align-self: flex-end;
    background: none;
    border: none;
    color: ${({ theme }) => theme.colors.textSecondary};
    cursor: pointer;
    padding: 8px;
`;

const PDFViewer = styled.iframe`
    flex-grow: 1;
    border: none;
    border-radius: 8px; /* Inner border radius */
    margin-top: ${({ theme }) => theme.spacing.medium};
`;


// --- Animation Variants ---
const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.3 } } };
const itemVariants = { hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } };
const modalVariants = { hidden: { opacity: 0, scale: 0.8 }, visible: { opacity: 1, scale: 1 } };

const LanguagesCVCard = () => {
  const [isCvVisible, setIsCvVisible] = useState(false);
  
  const cvUrl = '/Mario-Landaburu-CV.pdf';

  return (
    <>
      <CoolCard initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} whileHover={{ y: -5, boxShadow: '0 12px 40px 0 rgba(0, 0, 0, 0.15)' }}>
        <ContentWrapper variants={containerVariants} initial="hidden" animate="visible">
          <motion.div variants={itemVariants}>
            <Title>Languages & CV</Title>
            <LanguagesContainer>
              <LanguageItem><SpanishFlag /> <strong>Spanish:</strong> Native</LanguageItem>
              <LanguageItem><UKFlag /> <strong>English:</strong> C2 Proficient</LanguageItem>
            </LanguagesContainer>
          </motion.div>

          <motion.div variants={itemVariants}>
            <CVTitle>My CV</CVTitle>
            <ButtonGroup>
              <ActionButton className="secondary" onClick={() => setIsCvVisible(true)} whileHover={{ scale: 1.05, y: -2, transition: { yoyo: Infinity } }}>
                <motion.div whileHover={{ scale: 1.2 }}><FiEye /></motion.div> Read
              </ActionButton>
              <DownloadLink href={cvUrl} download="Mario Landaburu - CV.pdf" className="primary" whileHover={{ scale: 1.05 }}>
                <motion.div initial={{ y: 0 }} whileHover={{ y: 3 }}><FiDownload /></motion.div> Download
              </DownloadLink>
            </ButtonGroup>
          </motion.div>
        </ContentWrapper>
      </CoolCard>

      <AnimatePresence>
        {isCvVisible && (
          <ModalBackdrop initial="hidden" animate="visible" exit="hidden" variants={modalVariants}>
            <ModalContent variants={modalVariants}>
              <CloseButton onClick={() => setIsCvVisible(false)} whileHover={{ scale: 1.2, color: '#FFFFFF' }}><FiX size={24} /></CloseButton>
              <PDFViewer src={cvUrl} title="Mario Landaburu CV" />
            </ModalContent>
          </ModalBackdrop>
        )}
      </AnimatePresence>
    </>
  );
};

export default LanguagesCVCard;
