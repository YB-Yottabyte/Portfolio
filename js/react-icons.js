import React from 'https://esm.sh/react@18.2.0';
import { createRoot } from 'https://esm.sh/react-dom@18.2.0/client?deps=react@18.2.0';
import {
  FaDownload,
  FaEnvelope,
  FaGithub,
  FaLinkedinIn,
  FaMapMarkerAlt,
  FaMedal,
  FaMediumM,
  FaPhoneAlt,
  FaTint,
  FaTrophy
} from 'https://esm.sh/react-icons@5.3.0/fa?deps=react@18.2.0';

const icons = {
  download: FaDownload,
  email: FaEnvelope,
  github: FaGithub,
  linkedin: FaLinkedinIn,
  location: FaMapMarkerAlt,
  medal: FaMedal,
  medium: FaMediumM,
  phone: FaPhoneAlt,
  blood: FaTint,
  trophy: FaTrophy
};

document.querySelectorAll('[data-icon]').forEach(node => {
  const Icon = icons[node.dataset.icon];
  if (!Icon) return;

  try {
    createRoot(node).render(
      React.createElement(Icon, {
        'aria-hidden': 'true',
        focusable: 'false'
      })
    );
  } catch (error) {
    console.error(`Failed to render icon "${node.dataset.icon}"`, error);
  }
});
