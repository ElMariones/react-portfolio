import React from 'react'; // <--- THIS IS THE FIX
import { ThemeProvider } from 'styled-components';
import { theme } from './styles/theme';
import { GlobalStyle } from './styles/GlobalStyles';
import DashboardLayout from './components/layout/DashboardLayout';
import Hero from './features/Hero/Hero';
import SocialLinks from './features/Socials/SocialLinks';
import SkillsList from './features/Skills/SkillsList';
import ContactForm from './features/Contact/ContactForm';
import CVDisplay from './features/Hero/CV';
import Location from './features/Hero/Location';
import InteractiveBackground from './components/common/InteractiveBackground'; // Import the new component

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <InteractiveBackground />
      <DashboardLayout>
        <Hero />
        <Location />
        <SocialLinks />
        <SkillsList />
        <CVDisplay />
        <ContactForm />
      </DashboardLayout>
    </ThemeProvider>
  );
}

export default App;