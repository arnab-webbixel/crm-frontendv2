import React from 'react';

const Footer = () => {
  return (
    <div className='text-center border-t p-4 bg-[#94A3B8]' >
      <span>Copyright </span>
      <span>&copy; {new Date().getFullYear()} </span>
      <span>All rights reserved | <span className='text-[#14758d] font-bold text-md' >Webbixel</span> </span>
    </div>
  );
};

export default Footer;
