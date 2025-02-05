// src/components/SEOInput.tsx
import React from 'react';

interface SEOInputProps {
    id: string;
    placeholder: string;
    rows: number;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const SEOInput: React.FC<SEOInputProps> = ({ id, placeholder, rows, value, onChange }) => {
    return (
        <div className="mb-6">
            <textarea
                id={id}
                placeholder={placeholder}
                rows={rows}
                value={value}
                onChange={onChange}
                className="w-full p-3 border border-gray-300 rounded-md text-gray-700 focus:ring-purple-500 focus:border-purple-500 transition-shadow duration-300 shadow-sm"
            />
        </div>
    );
};

export default SEOInput;