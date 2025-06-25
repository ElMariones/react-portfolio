import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';


// The main card sets the font and the "glass" effect
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

// A consistent, styled title
const Title = styled.h2`
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.large};
  color: ${({ theme }) => theme.colors.text};
  font-weight: 600;
`;

// The grid will be the container for our staggered animation
const SkillsGrid = styled(motion.div)`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.medium}; // A slightly larger gap for better spacing
  justify-content: center;
  align-items: center;
  width: 100%;
`;

// The tags are now animated motion components
const SkillTag = styled(motion.span)`
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.primary}, ${({ theme }) => theme.colors.secondary});
  color: ${({ theme }) => theme.colors.background};
  padding: 8px 16px;
  border-radius: 16px;
  font-weight: bold;
  font-size: 0.9rem;
  box-shadow: 0 4px 15px 0 rgba(0, 0, 0, 0.1);
  cursor: default; // It's not a button, so default cursor is best
`;

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};


const SkillsList = () => {
  const skills = [...new Set(['JavaScript', 'React', 'Node.js', 'Python', 'SQL', 'Git', 'Docker', 'AWS', 'PHP', 'Java', 'C++'])];

  return (
    <CoolCard
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -5, boxShadow: '0 12px 40px 0 rgba(0, 0, 0, 0.15)' }}
    >
      <Title>Skills & Tools</Title>
      <SkillsGrid
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {skills.map((skill) => (
          <SkillTag
            key={skill}
            variants={itemVariants}
            whileHover={{ scale: 1.1, y: -2 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            {skill}
          </SkillTag>
        ))}
      </SkillsGrid>
    </CoolCard>
  );
};

export default SkillsList;