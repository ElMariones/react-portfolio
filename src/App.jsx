import React from 'react'; // <--- THIS IS THE FIX
import { ThemeProvider } from 'styled-components';
import { theme } from './styles/theme';
import { GlobalStyle } from './styles/GlobalStyles';
import DashboardLayout from './components/layout/DashboardLayout';
import Hero from './features/Hero/Hero';
import Experience from './features/Skills/Experience';
import SocialLinks from './features/Socials/SocialLinks';
import SkillsLanguagesCard from './features/Skills/SkillsLanguagesCard';
import ContactForm from './features/Contact/ContactForm';
import Location from './features/Hero/Location';
import InteractiveBackground from './components/common/InteractiveBackground';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <InteractiveBackground />
      <DashboardLayout>
        <Hero />
        <Location />
        <SocialLinks />
        <Experience />
        <SkillsLanguagesCard />
        <ContactForm />
      </DashboardLayout>
    </ThemeProvider>
  );
}

export default App;