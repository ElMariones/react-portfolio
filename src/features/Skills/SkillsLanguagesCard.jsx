import React, { useState } from "react";
import styled, { css } from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { FiEye, FiDownload, FiX, FiCpu, FiGlobe } from "react-icons/fi";

/*********************************
 * DATA --------------------------
 *********************************/

// Spanish Flag SVG Component
const SpanishFlag = () => (
  <svg width="24" height="16" viewBox="0 0 5 3" xmlns="http://www.w3.org/2000/svg">
    <rect width="5" height="3" fill="#C60B1E" />
    <rect width="5" height="2" y="0.5" fill="#FFC400" />
  </svg>
);

// UK Flag SVG Component
const UKFlag = () => (
  <svg width="24" height="16" viewBox="0 0 60 36" xmlns="http://www.w3.org/2000/svg">
    <clipPath id="uk-a"><path d="M0 0v36h60V0z" /></clipPath>
    <path d="M0 0v36h60V0z" fill="#012169" />
    <path d="M0 0l60 36m0-36L0 36" stroke="#fff" strokeWidth="6" clipPath="url(#uk-a)" />
    <path d="M0 0l60 36m0-36L0 36" stroke="#C8102E" strokeWidth="4" clipPath="url(#uk-a)" />
    <path d="M30 0v36M0 18h60" stroke="#fff" strokeWidth="10" />
    <path d="M30 0v36M0 18h60" stroke="#C8102E" strokeWidth="6" />
  </svg>
);

const SKILLS = [ "JavaScript", "React", "Node.js", "Python", "SQL", "Git", "Docker", "AWS", "PHP", "Java", "C++" ];

const LANGUAGES = [
    { name: "Spanish", level: "Native", flag: <SpanishFlag /> },
    { name: "English", level: "C2 Proficient", flag: <UKFlag /> }
];

const CV_URL = "/Mario-Landaburu-CV.pdf";
const CV_FILENAME = "Mario Landaburu - CV.pdf";


/*********************************
 * STYLED COMPONENTS -------------
 *********************************/

// Shared glassmorphism style
const glassy = css`
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.12);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.22);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
`;

// Main card container
const Card = styled(motion.section)`
  ${glassy};
  font-family: "Inter", sans-serif;
  border-radius: ${({ theme }) => theme.borderRadius};
  padding: ${({ theme }) => theme.spacing.xlarge};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xlarge};
  width: 100%;
`;

// Section title with icon
const SectionTitle = styled.h2`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 1.75rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
  margin: 0 0 0.5rem 0;
`;

/* Skills Section */
const SkillsGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.small};
`;

const SkillChip = styled.span`
  background: rgba(255, 255, 255, 0.1);
  color: ${({ theme }) => theme.colors.textSecondary};
  padding: 6px 14px;
  border-radius: 16px;
  font-size: 0.9rem;
  font-weight: 500;
`;

/* Languages & CV Section */
const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.large};
  align-items: flex-start;
`;

const LangList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.medium};
`;

const LangRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  strong {
    color: ${({ theme }) => theme.colors.text};
    font-weight: 600;
  }
`;

const CVContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing.medium};
`;

const BtnGroup = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.medium};
`;

const Button = styled(motion.button)`
  all: unset;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 10px 20px;
  border-radius: ${({ theme }) => theme.borderRadius};
  font-weight: 600;
  font-size: 0.95rem;
  cursor: pointer;
  border: 2px solid transparent;
  transition: all 0.2s ease-in-out;

  &.primary {
    background-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.background};
    &:hover {
        opacity: 0.9;
    }
  }

  &.secondary {
    background: transparent;
    border-color: ${({ theme }) => theme.colors.textSecondary};
    color: ${({ theme }) => theme.colors.text};
     &:hover {
        background-color: rgba(255, 255, 255, 0.1);
        border-color: ${({ theme }) => theme.colors.primary};
     }
  }
`;

// Use .attrs to forward props to the anchor tag
const DownloadAnchor = styled(Button).attrs({ as: "a" })``;

/* Modal for CV Viewer */
const Backdrop = styled(motion.div)`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
  padding: 2rem;
`;

const ModalView = styled(motion.div)`
  width: 100%;
  height: 100%;
  max-width: 1100px;
  background: ${({ theme }) => theme.colors.background};
  border-radius: ${({ theme }) => theme.borderRadius};
  display: flex;
  flex-direction: column;
  box-shadow: 0 16px 48px rgba(0, 0, 0, 0.3);
`;

const ModalHeader = styled.div`
    padding: ${({ theme }) => theme.spacing.medium};
    display: flex;
    justify-content: flex-end;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

const CloseButton = styled(motion.button)`
  all: unset;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.textSecondary};
  transition: color 0.2s;
  &:hover {
    color: ${({ theme }) => theme.colors.text};
  }
`;

const Iframe = styled.iframe`
  flex: 1;
  border: none;
  border-bottom-left-radius: ${({ theme }) => theme.borderRadius};
  border-bottom-right-radius: ${({ theme }) => theme.borderRadius};
`;

/*********************************
 * MAIN COMPONENT ----------------
 *********************************/
export default function SkillsLanguagesCard() {
  const [isModalOpen, setModalOpen] = useState(false);

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.85, y: 50 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", damping: 25, stiffness: 200 } },
    exit: { opacity: 0, scale: 0.85, y: -50, transition: { duration: 0.3 } },
  };

  return (
    <>
      <Card
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        layout
      >
        {/* Skills Section */}
        <div>
          <SectionTitle><FiCpu /> Skills & Tools</SectionTitle>
          <SkillsGrid>
            {SKILLS.map((skill) => (
              <SkillChip key={skill}>{skill}</SkillChip>
            ))}
          </SkillsGrid>
        </div>

        {/* Languages & CV Section */}
        <div>
          <SectionTitle><FiGlobe /> Languages & CV</SectionTitle>
          <ContentContainer>
             <LangList>
               {LANGUAGES.map((lang) => (
                 <LangRow key={lang.name}>
                   {lang.flag}
                   <strong>{lang.name}:</strong> {lang.level}
                 </LangRow>
               ))}
            </LangList>
            
            <BtnGroup>
              <Button
                className="secondary"
                onClick={() => setModalOpen(true)}
                whileHover={{ scale: 1.05, y: -2 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <FiEye /> Read CV
              </Button>

              <DownloadAnchor
                href={CV_URL}
                download={CV_FILENAME}
                className="primary"
                whileHover={{ scale: 1.05, y: -2 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <FiDownload /> Download
              </DownloadAnchor>
            </BtnGroup>
          </ContentContainer>
        </div>
      </Card>

      {/* CV Viewer Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <Backdrop
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <ModalView variants={modalVariants} initial="hidden" animate="visible" exit="exit">
              <ModalHeader>
                <CloseButton onClick={() => setModalOpen(false)} whileHover={{ scale: 1.2, rotate: 90 }}>
                  <FiX size={24} />
                </CloseButton>
              </ModalHeader>
              <Iframe src={CV_URL} title={`${CV_FILENAME} Viewer`} />
            </ModalView>
          </Backdrop>
        )}
      </AnimatePresence>
    </>
  );
}
