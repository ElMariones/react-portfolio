import React, { useState, useCallback, memo } from "react";
import styled, { css } from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiChevronDown,
  FiBriefcase,
  FiMusic,
  FiGrid,
  FiSmartphone,
  FiCpu,
  FiGlobe,
} from "react-icons/fi";

/*********************************************************
 * DATA --------------------------------------------------
 * Ideally keep this in a separate file (e.g. data.js) and
 * import it so the component stays purely presentational.
 *********************************************************/
const EXPERIENCE = {
  role: "Intern Software Engineer",
  company: "Prima‑Ram",
  location: "Pulpí, Spain",
  tasks: [
    "Web application development using PHP & JavaScript.",
    "Design and organization of MySQL databases.",
    "Provided general IT support.",
  ],
};

const PROJECTS = [
  {
    title: "Harmonia – Music Store Management System",
    icon: FiMusic,
    summary:
      "A complete Java desktop application for managing all operations of a music store.",
    details: [
      "Designed and implemented modular backend logic using Java for scalability.",
      "Developed and connected SQL‑based databases for persistent storage.",
      "Created UML diagrams with Modelio to design system architecture.",
      "Delivered full CRUD functionality across all modules.",
      "Developed intuitive user interfaces with robust validation.",
      "Applied the Rational Unified Process (RUP).",
      "Produced IEEE‑compliant documentation (SRS, user manuals).",
      "Ensured quality with unit, integration & performance tests.",
    ],
  },
  {
    title: "All In: La Última Mano – Web Game",
    icon: FiGrid,
    summary: "A 2D pixel‑art adventure game built with JavaScript and Phaser.",
    details: [
      "Led the end‑to‑end development of the game.",
      "Implemented core mechanics with JavaScript, Phaser & HTML5.",
      "Created a dynamic top‑down map with 4‑directional movement.",
      "Implemented a poker‑inspired card‑duel system.",
      "Designed pixel‑art assets in Photoshop and maps in Tiled.",
      "Managed the project on GitHub using issues & PRs.",
    ],
  },
  {
    title: "E‑commerce Web Developer – WordPress",
    icon: FiGlobe,
    summary:
      "Contributed to a WordPress/WooCommerce site for refurbished electronics.",
    details: [
      "Set up and configured WooCommerce for end‑to‑end commerce.",
      "Performed deep SEO analysis and optimisation.",
      "Extended WordPress plugins with custom features.",
      "Implemented multilingual support & product comparison.",
    ],
  },
  {
    title: "Internal Tools with AI Integration",
    icon: FiCpu,
    summary:
      "Enhanced internal workflows with scheduling tools & automated AI reporting.",
    details: [
      "Built an internal scheduling tool with weekly PDF digests.",
      "Created structured data forms for project tracking.",
      "Hooked into the OpenAI API to auto‑generate client reports.",
      "Automated branded PDF creation with logos & layouts.",
    ],
  },
  {
    title: "Android WebView App",
    icon: FiSmartphone,
    summary:
      "A lightweight Android WebView app giving users seamless site access.",
    details: [
      "Implemented an optimised WebView with custom navigation handling.",
      "Designed responsive XML layouts matching brand identity.",
      "Delivered a mobile bridge without duplicating backend logic.",
    ],
  },
];

/*********************************************************
 * STYLES ------------------------------------------------
 *********************************************************/
const glassy = css`
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.12);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.22);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
`;

const Card = styled(motion.section)`
  ${glassy};
  border-radius: ${({ theme }) => theme.borderRadius};
  padding: ${({ theme }) => theme.spacing.xlarge};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xlarge};
  width: 100%;
`;

const SectionTitle = styled.h2`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 1.75rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
  margin: 0;
`;

const Role = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0.25rem 0;
  color: ${({ theme }) => theme.colors.text};
`;

const Company = styled.p`
  margin: 0 0 1rem;
  font-size: 0.95rem;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const BulletList = styled.ul`
  list-style: disc inside;
  margin: 0;
  padding-left: 1rem;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const AccordionItem = styled.div`
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  &:last-of-type {
    border-bottom: none;
  }
`;

const HeaderButton = styled(motion.button)`
  all: unset;
  cursor: pointer;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.medium} 0;
`;

const HeaderTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 1rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
`;

const Content = styled(motion.div)`
  overflow: hidden;
  padding-left: 2.5rem;
`;

const DetailList = styled.ul`
  list-style: '› ' outside;
  margin: 0 0 ${({ theme }) => theme.spacing.large};
  padding-left: 0.75rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  li {
    margin: 0.35rem 0;
  }
`;

/*********************************************************
 * COMPONENTS -------------------------------------------
 *********************************************************/
const ProjectAccordion = memo(({ project, idx, expanded, onToggle }) => {
  const Icon = project.icon;
  return (
    <AccordionItem>
      <HeaderButton
        onClick={() => onToggle(idx)}
        whileHover={{ scale: 1.02 }}
        initial={false}
      >
        <HeaderTitle>
          <Icon size={18} />
          {project.title}
        </HeaderTitle>
        <motion.span animate={{ rotate: expanded ? 180 : 0 }}>
          <FiChevronDown size={18} />
        </motion.span>
      </HeaderButton>

      <AnimatePresence initial={false}>
        {expanded && (
          <Content
            key="content"
            variants={{
              open: { height: "auto", opacity: 1 },
              collapsed: { height: 0, opacity: 0 },
            }}
            initial="collapsed"
            animate="open"
            exit="collapsed"
            transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
          >
            <DetailList>
              {project.details.map((d, i) => (
                <li key={i}>{d}</li>
              ))}
            </DetailList>
          </Content>
        )}
      </AnimatePresence>
    </AccordionItem>
  );
});

/*********************************************************
 * MAIN EXPERIENCE COMPONENT -----------------------------
 *********************************************************/
export default function Experience() {
  const [expandedIdx, setExpandedIdx] = useState(null);
  const handleToggle = useCallback(
    (idx) => setExpandedIdx(idx === expandedIdx ? null : idx),
    [expandedIdx]
  );

  return (
    <Card
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
      layout
    >
      {/* Work Experience */}
      <div>
        <SectionTitle>
          <FiBriefcase /> Work Experience
        </SectionTitle>
        <Role>{EXPERIENCE.role}</Role>
        <Company>
          {EXPERIENCE.company} • {EXPERIENCE.location}
        </Company>
        <BulletList>
          {EXPERIENCE.tasks.map((t, i) => (
            <li key={i}>{t}</li>
          ))}
        </BulletList>
      </div>

      {/* Projects */}
      <div>
        <SectionTitle>Major Projects</SectionTitle>
        {PROJECTS.map((p, i) => (
          <ProjectAccordion
            key={p.title}
            project={p}
            idx={i}
            expanded={expandedIdx === i}
            onToggle={handleToggle}
          />
        ))}
      </div>
    </Card>
  );
}
