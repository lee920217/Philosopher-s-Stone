/* eslint-disable @next/next/no-img-element */
import React from 'react';

interface DobImageProps {
  bgUrl: string;
  imgUrl: string;
}

const DobImage: React.FC<DobImageProps> = ({ bgUrl, imgUrl }) => {
  return (
    <div className="my-6 relative">
      {bgUrl && (
        <img className="absolute w-96 h-96" src={bgUrl} alt="Background" />
      )}
      {imgUrl && (
        <img src={imgUrl} className="relative z-10 w-96 h-96" alt="Overlay" />
      )}
    </div>
  );
};

export default DobImage;
