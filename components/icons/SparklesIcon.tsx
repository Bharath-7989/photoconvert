
import React from 'react';

export const SparklesIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path
      fillRule="evenodd"
      d="M9.315 7.584C12.195 3.883 16.695 1.5 21.75 1.5a.75.75 0 01.75.75c0 5.056-2.383 9.555-6.084 12.436A6.75 6.75 0 019.75 22.5a.75.75 0 01-.75-.75v-7.19c0-1.754.665-3.39 1.815-4.576zM16.5 6.75a.75.75 0 00-1.5 0v.316a4.502 4.502 0 00-3.58 3.58H11.25a.75.75 0 000 1.5h.316a4.502 4.502 0 003.58 3.58v.316a.75.75 0 001.5 0v-.316a4.502 4.502 0 003.58-3.58h.316a.75.75 0 000-1.5h-.316a4.502 4.502 0 00-3.58-3.58V6.75z"
      clipRule="evenodd"
    />
  </svg>
);
