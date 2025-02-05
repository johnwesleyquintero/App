import React, { useState } from 'react';

const restrictedKeywords = [
  "best seller", "cheap", "discount", "free shipping", "guaranteed", "on sale",
  "organic", "premium", "top rated", "100% satisfaction", "FDA approved",
  "Amazon’s choice", "lowest price", "limited time offer", "compare to [brand]",
  "better than [brand]"
];

const SEOToolPage = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [keywords, setKeywords] = useState('');
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const analyzeSEO = async () => {
    setIsLoading(true);
    setResults([]);

    if (!title || !description || !keywords) {
      alert("Please fill in all fields.");
      setIsLoading(false);
      return;
    }

    // Simulate analysis (replace with actual logic)
    setTimeout(() => {
      const keywordList = keywords.split(',').map(k => k.trim());
      const analysisResults = [
        `Title contains ${countKeywords(title, keywordList)} target keywords.`,
        `Description contains ${countKeywords(description, keywordList)} target keywords.`,
        `Keyword density in title: ${calculateDensity(title, keywordList)}%`,
        `Keyword density in description: ${calculateDensity(description, keywordList)}%`,
        "Suggestions: Add more keywords to the title and description for better visibility."
      ];

      const restrictedInTitle = scanForRestrictedKeywords(title);
      const restrictedInDescription = scanForRestrictedKeywords(description);
      const restrictedInKeywords = keywordList.filter(keyword => restrictedKeywords.includes(keyword.toLowerCase()));

      const restrictedResults = displayRestrictedResults(restrictedInTitle, restrictedInDescription, restrictedInKeywords);

      setResults([...analysisResults, ...restrictedResults]);
      setIsLoading(false);
    }, 2000);
  };

  const countKeywords = (text: string, keywords: string[]) => {
    return keywords.filter(keyword => text.toLowerCase().includes(keyword.toLowerCase())).length;
  };

  const calculateDensity = (text: string, keywords: string[]) => {
    const totalWords = text.split(/\s+/).length;
    const keywordCount = keywords.reduce((count, keyword) => {
      return count + (text.toLowerCase().split(keyword.toLowerCase()).length - 1);
    }, 0);
    return ((keywordCount / totalWords) * 100).toFixed(2);
  };

  const scanForRestrictedKeywords = (text: string) => {
    return restrictedKeywords.filter(keyword => text.toLowerCase().includes(keyword.toLowerCase()));
  };

  const displayRestrictedResults = (restrictedInTitle: string[], restrictedInDescription: string[], restrictedInKeywords: string[]) => {
    const results: string[] = [];
    if (restrictedInTitle.length > 0) {
      results.push(`🚫 Restricted keywords found in title: ${restrictedInTitle.join(', ')}`);
      restrictedInTitle.forEach(keyword => {
        results.push(`💡 Suggestion: Replace "${keyword}" with "${suggestAlternatives(keyword)}"`);
      });
    }

    if (restrictedInDescription.length > 0) {
      results.push(`🚫 Restricted keywords found in description: ${restrictedInDescription.join(', ')}`);
    }

    if (restrictedInKeywords.length > 0) {
      results.push(`🚫 Restricted keywords found in target keywords: ${restrictedInKeywords.join(', ')}`);
    }

    if (restrictedInTitle.length === 0 && restrictedInDescription.length === 0 && restrictedInKeywords.length === 0) {
      results.push(`✅ No restricted keywords found. You're good to go!`);
    }
    return results;
  };

  const suggestAlternatives = (keyword: string) => {
    const alternatives: { [key: string]: string } = {
      "best seller": "popular choice", "cheap": "affordable", "discount": "value deal",
      "free shipping": "fast delivery", "guaranteed": "reliable", "on sale": "special offer",
      "organic": "natural", "premium": "high-quality", "top rated": "highly rated",
      "100% satisfaction": "customer favorite", "FDA approved": "meets safety standards",
      "Amazon’s choice": "customer favorite", "lowest price": "competitive pricing",
      "limited time offer": "exclusive deal", "compare to [brand]": "similar to [brand]",
      "better than [brand]": "comparable to [brand]"
    };
    return alternatives[keyword.toLowerCase()] || "No alternative found.";
  };

  return (
    <div className="bg-gray-100 text-gray-900 flex flex-col min-h-screen justify-center items-center">
      <header className="bg-white shadow-md sticky top-0 z-50 w-full">
        <div className="max-w-7xl mx-auto px-4 py-5 flex justify-between items-center">
          <nav>
            <ul className="flex space-x-6">
              <li><a href="index.html" className="hover:text-purple-600">Home</a></li>
              <li><a href="Pages/Amz_Data_Tool.html" className="hover:text-purple-600">Data Tool</a></li>
              <li><a href="Pages/Amz_Forecasting_Tool.html" className="hover:text-purple-600">Forecasting Tool</a></li>
              <li><a href="Pages/Amz_SEO_Tool.html" className="hover:text-purple-600">SEO Tool</a></li>
            </ul>
          </nav>
        </div>
      </header>

      <div className="container bg-white p-12 rounded-xl shadow-lg text-center max-w-2xl w-full mt-8">
        <h1 className="text-3xl font-bold text-purple-600 mb-8">Amazon SEO Tool</h1>
        <p className="text-gray-700 mb-8">
          Optimize your product listings with our SEO tool. Enter your product details below and get actionable insights.
        </p>
        <div className="input-group mb-6 text-left">
          <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">Product Title:</label>
          <textarea
            id="title"
            placeholder="Enter product title..."
            rows={2}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="input-group mb-6 text-left">
          <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">Product Description:</label>
          <textarea
            id="description"
            placeholder="Enter product description..."
            rows={5}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="input-group mb-6 text-left">
          <label htmlFor="keywords" className="block text-gray-700 text-sm font-bold mb-2">Target Keywords:</label>
          <textarea
            id="keywords"
            placeholder="Enter target keywords (comma-separated)..."
            rows={3}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
          />
        </div>
        <button onClick={analyzeSEO} className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-8 rounded-full focus:outline-none focus:shadow-outline">Analyze SEO</button>

        <div id="progress-container" className={`mt-8 ${isLoading ? '' : 'hidden'}`}>
          <div className="loading-spinner border-4 border-gray-200 border-t-purple-600 rounded-full w-8 h-8 mx-auto animate-spin"></div>
        </div>

        <div className="results mt-8 text-left" id="results">
          <h2 className="text-2xl font-bold text-purple-600 mb-4">Analysis Results</h2>
          <ul id="resultsList" className="list-none p-0">
            {results.map((result, index) => (
              <li key={index} className={`bg-gray-50 p-3 border border-gray-200 rounded-md mb-2 ${result.startsWith('🚫') ? 'bg-red-100 border-l-4 border-red-500 text-red-700' : ''} ${result.startsWith('💡') ? 'bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700' : ''} ${result.startsWith('✅') ? 'bg-green-100 border-l-4 border-green-500 text-green-700' : ''}`}>
                {result}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <footer className="bg-gray-900 dark:bg-gray-800 text-white py-8 w-full mt-8">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p>&copy; 2025 Amazon Tools Suite. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default SEOToolPage;
