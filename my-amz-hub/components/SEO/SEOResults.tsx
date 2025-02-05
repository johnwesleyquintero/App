// src/components/SEOResults.tsx
import React from 'react';

interface SEOResultsProps {
    results: string[];
}

const SEOResults: React.FC<SEOResultsProps> = ({ results }) => {
    if (!results || results.length === 0) {
        return null; // Don't render results section if no results
    }

    return (
        <div className="mt-8 text-left">
            <h2 className="text-xl font-semibold text-purple-700 mb-3">Analysis Results</h2>
            <ul className="list-none p-0">
                {results.map((result, index) => (
                    <li key={index} className="bg-gray-50 p-3 border border-gray-200 rounded-md mb-2">
                        {result}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SEOResults;