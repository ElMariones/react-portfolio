import React from 'react';
import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';
import profileImage from '../../assets/mario.png';

// --- Keyframes for Animations ---

const shimmerAnimation = keyframes`
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
`;

// Purple pulse for the profile image (kept from before)
const pulseAnimation = keyframes`
  0% { box-shadow: 0 0 0 0 rgba(138, 43, 226, 0.7); }
  70% { box-shadow: 0 0 0 15px rgba(138, 43, 226, 0); }
  100% { box-shadow: 0 0 0 0 rgba(138, 43, 226, 0); }
`;

// NEW: Green pulse for the availability status
const greenPulseAnimation = keyframes`
  0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(46, 204, 113, 0.7); }
  70% { transform: scale(1); box-shadow: 0 0 0 10px rgba(46, 204, 113, 0); }
  100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(46, 204, 113, 0); }
`;


// --- Styled Components ---

// HeaderWrapper size has been reverted to be more compact
const HeaderWrapper = styled(motion.header)`
  font-family: 'Inter', sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem 1rem; // Adjusted padding for the compact size
  text-align: center;
  overflow: hidden;
`;

const ProfileImageWrapper = styled(motion.div)`
  position: relative;
  width: 150px; // Reverted to original size
  height: 150px; // Reverted to original size
  margin-bottom: 1.5rem;
  
  &::after {
    content: '';
    position: absolute;
    inset: -4px;
    border-radius: 50%;
    animation: ${pulseAnimation} 2s infinite;
  }
`;

const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid rgba(255, 255, 255, 0.2);
  position: relative;
  z-index: 2;
`;

const Name = styled(motion.h1)`
  font-size: clamp(2.5rem, 8vw, 3.5rem); // Slightly adjusted for compact view
  margin: 0;
  font-weight: 800;
  background: linear-gradient(90deg, #8A2BE2, #4A00E0, #8A2BE2);
  background-size: 200% auto;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: ${shimmerAnimation} 4s linear infinite;
`;

const TitleContainer = styled(motion.div)`
  font-size: clamp(1rem, 4vw, 1.2rem);
  opacity: 0.8;
  margin-top: 0.5rem;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

// --- NEW: Availability Badge Components ---
const AvailabilityBadge = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 10px;
  background: rgba(46, 204, 113, 0.1); // Translucent green background
  border: 1px solid rgba(46, 204, 113, 0.3);
  border-radius: 20px;
  padding: 8px 15px;
  margin-top: 1.5rem;
  color: #2ecc71; // Vibrant green text
`;

const StatusIndicator = styled.div`
  width: 10px;
  height: 10px;
  background-color: #2ecc71;
  border-radius: 50%;
  animation: ${greenPulseAnimation} 2s infinite;
`;

const StatusText = styled.span`
  font-size: 0.9rem;
  font-weight: 500;
  color: #E0E0E0; // A light color for contrast
`;

// --- Framer Motion Variants (for the typing effect) ---
const sentenceVariants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: { delay: 0.5, staggerChildren: 0.04 },
  },
};

const letterVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const Header = () => {
  const subtitle = "Full-Stack Developer | Tech Enthusiast";

  return (
    <HeaderWrapper>
      <ProfileImageWrapper
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, type: 'spring', stiffness: 150, damping: 15 }}
        whileHover={{ scale: 1.05 }}
        style={{ perspective: 800 }}
      >
        <motion.div style={{ transformStyle: 'preserve-3d' }} whileHover={{ rotateY: 15, rotateX: -10 }}>
            <ProfileImage src={profileImage} alt="Mario Landaburu" />
        </motion.div>
      </ProfileImageWrapper>
      
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
        <Name>Mario Landáburu</Name>
      </motion.div>

      <TitleContainer variants={sentenceVariants} initial="hidden" animate="visible">
        {subtitle.split("").map((char, index) => (
          <motion.span key={char + "-" + index} variants={letterVariants}>
            {char}
          </motion.span>
        ))}
      </TitleContainer>

      {/* --- NEW: The animated availability badge --- */}
      <AvailabilityBadge
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1.5 }} // Delayed to appear last
      >
        <StatusIndicator />
        <StatusText>Available for work</StatusText>
      </AvailabilityBadge>
    </HeaderWrapper>
  );
};

export default Header;