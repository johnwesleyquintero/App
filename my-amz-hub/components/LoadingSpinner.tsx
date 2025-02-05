// src/components/LoadingSpinner.tsx
import React from 'react';

const LoadingSpinner: React.FC = () => {
    return (
        <div className="border-4 border-gray-300 border-t-4 border-purple-700 rounded-full w-8 h-8 animate-spin mx-auto"></div>
    );
};

export default LoadingSpinner;