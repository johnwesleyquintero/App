// src/components/AmazonSEOAnalyzer.tsx
import React, { useState, useCallback } from 'react';
import SEOInput from './components/SEOInput';
import SEOResults from './components/SEOResults';
import LoadingSpinner from './components/LoadingSpinner';
import logger from './logger';

const restrictedKeywords = [
    "best seller", "cheap", "discount", "free shipping", "guaranteed", "on sale", "organic", "premium", "top rated",
    "100% satisfaction", "FDA approved", "Amazon’s choice", "lowest price", "limited time offer", "compare to [brand]",
    "better than [brand]"
];

const suggestAlternatives = (keyword: string) => {
    const alternatives: { [key: string]: string } = {
        "best seller": "popular choice", "cheap": "affordable", "discount": "value deal", "free shipping": "fast delivery",
        "guaranteed": "reliable", "on sale": "special offer", "organic": "natural", "premium": "high-quality",
        "top rated": "highly rated", "100% satisfaction": "customer favorite", "FDA approved": "meets safety standards",
        "Amazon’s choice": "customer favorite", "lowest price": "competitive pricing", "limited time offer": "exclusive deal",
        "compare to [brand]": "similar to [brand]", "better than [brand]": "comparable to [brand]"
    };
    return alternatives[keyword.toLowerCase()] || "No alternative found.";
};

const scanForRestrictedKeywords = (text: string, keywords: string[]) => {
    const foundKeywords: string[] = [];
    const lowerText = text.toLowerCase();
    keywords.forEach(keyword => {
        if (lowerText.includes(keyword.toLowerCase())) {
            foundKeywords.push(keyword);
        }
    });
    return foundKeywords;
};

const AmazonSEOAnalyzer = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [keywords, setKeywords] = useState('');
    const [results, setResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const handleAnalyzeSEO = useCallback(async () => {
        logger.info('Starting SEO analysis');
        setIsLoading(true);
        setResults([]); // Clear previous results

        if (!title || !description || !keywords) {
            logger.error('Analysis failed: One or more fields are empty.');
            console.error('Analysis failed: One or more fields are empty.');
            alert("Please fill in all fields.");
            setIsLoading(false);
            process.exit(1);
        }

        const keywordsArray = keywords.split(',').map(k => k.trim());

        // Simulate analysis delay (replace with actual logic later)
        setTimeout(() => {
            // Scan for restricted keywords
            const restrictedInTitle = scanForRestrictedKeywords(title, restrictedKeywords);
            const restrictedInDescription = scanForRestrictedKeywords(description, restrictedKeywords);
            const restrictedInKeywords = keywordsArray.filter(keyword => restrictedKeywords.includes(keyword.toLowerCase()));

            const analysisResults: string[] = [];

            if (restrictedInTitle.length > 0) {
                analysisResults.push(`🚫 Restricted keywords found in title: ${restrictedInTitle.join(', ')}`);
                restrictedInTitle.forEach(keyword => {
                    analysisResults.push(`💡 Suggestion: Replace "${keyword}" with "${suggestAlternatives(keyword)}"`);
                });
            }
            if (restrictedInDescription.length > 0) {
                analysisResults.push(`🚫 Restricted keywords found in description: ${restrictedInDescription.join(', ')}`);
                restrictedInDescription.forEach(keyword => {
                    analysisResults.push(`💡 Suggestion: Replace "${keyword}" with "${suggestAlternatives(keyword)}"`);
                });
            }
            if (restrictedInKeywords.length > 0) {
                analysisResults.push(`🚫 Restricted keywords found in target keywords: ${restrictedInKeywords.join(', ')}`);
                restrictedInKeywords.forEach(keyword => {
                    analysisResults.push(`💡 Suggestion: Replace "${keyword}" with "${suggestAlternatives(keyword)}"`);
                });
            }

            if (analysisResults.length === 0) {
                analysisResults.push(`✅ No restricted keywords found. You're good to go!`);
            }

            setResults(analysisResults);
            setIsLoading(false);
        }, 1000); // Simulate 1 second analysis time
    }, [title, description, keywords]);

    return (
        <div className="bg-gray-100 min-h-screen flex justify-center items-center py-10">
            <div className="container max-w-3xl w-full bg-white p-8 rounded-xl shadow-lg text-center">
                <h1 className="text-3xl font-bold text-purple-700 mb-4">Amazon SEO Tool</h1>
                <p className="text-gray-700 text-lg mb-6 leading-relaxed">
                    Optimize your product listings with our SEO tool. Enter your product details below and get actionable insights.
                </p>

                <SEOInput
                    id="title"
                    placeholder="Enter product title..."
                    rows={2}
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <SEOInput
                    id="description"
                    placeholder="Enter product description..."
                    rows={5}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <SEOInput
                    id="keywords"
                    placeholder="Enter target keywords (comma-separated)..."
                    rows={3}
                    value={keywords}
                    onChange={(e) => setKeywords(e.target.value)}
                />

                <button
                    className="px-6 py-3 text-lg font-semibold bg-purple-700 hover:bg-purple-600 text-white rounded-lg transition-colors duration-300"
                    onClick={handleAnalyzeSEO}
                    disabled={isLoading}
                >
                    {isLoading ? 'Analyzing...' : 'Analyze SEO'}
                </button>

                {isLoading && (
                    <div className="mt-6">
                        <LoadingSpinner />
                    </div>
                )}

                <SEOResults results={results} />
            </div>
        </div>
    );
};

export default AmazonSEOAnalyzer;
