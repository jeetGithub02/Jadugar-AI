
import React from 'react';

export const UploadIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
    {...props}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M7 16a4 4 0 01-4-4V7a4 4 0 014-4h10a4 4 0 014 4v5a4 4 0 01-4 4H7z"
    />
    <path strokeLinecap="round" strokeLinejoin="round" d="M16 16v-4l-4-4-4 4v4" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 12v9" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M8 21h8" />
  </svg>
);
