import React from 'react';
import OriginalNavbar from '@theme-original/Navbar';

export default function NavbarWrapper(props) {
  return (
    <OriginalNavbar
      {...props}
      logo={{
        src: '/img/logo.png',
        alt: 'Benefit Plan Standard',
        href: '/',
      }}
      title="Benefit Plan Standard"
    />
  );
}
