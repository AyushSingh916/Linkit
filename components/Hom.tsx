import React from 'react';

import TextHome from './TextHome';
import PrevHome from './PrevHome';
import Appbar from './Appbar';

function Hom() {
  return (
    <div className='bg-black min-h-screen'>
      <Appbar></Appbar>
      <div className='grid sm:grid-cols-1 md:grid-cols-2'>
        <TextHome />
        <div className='hidden md:block'>
          <PrevHome />
        </div>
      </div>
    </div>
  );
}

export default Hom;
