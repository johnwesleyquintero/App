import React from 'react';
import Papa from 'papaparse';
import FileSaver from 'file-saver';
import stringSimilarity from 'string-similarity';

const DataToolPage = () => {
  // Javascript functions from the HTML file will go here

  return (
    <div className="bg-gray-100 text-gray-900 flex flex-col min-h-screen">
      <header className="bg-white dark:bg-gray-800 shadow-md sticky top-0 z-50 w-full">
        <div className="max-w-7xl mx-auto px-4 py-5 flex justify-between items-center">
          <nav>
            <ul className="flex space-x-6">
              <li><a href="index.html" className="hover:text-purple-600 dark:hover:text-purple-400">Home</a></li>
              <li><a href="Pages/Amz_Data_Tool.html" className="hover:text-purple-600 dark:hover:text-purple-400">Data Tool</a></li>
              <li><a href="Pages/Amz_Forecasting_Tool.html" className="hover:text-purple-600 dark:hover:text-purple-400">Forecasting Tool</a></li>
              <li><a href="Pages/Amz_SEO_Tool.html" className="hover:text-purple-600 dark:hover:text-purple-400">SEO Tool</a></li>
            </ul>
          </nav>
          <button onClick={() => {}} className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-4 py-2 rounded-full">
            Toggle Dark Mode
          </button>
        </div>
      </header>

      {/* Tab Navigation */}
      <div className="container bg-white p-12 rounded-xl shadow-lg text-center max-w-2xl w-full mt-8 flex flex-col items-center">
        <h1 className="text-3xl font-bold text-purple-600 mb-4">Data Tools Suite</h1>
        <p className="text-gray-700 mb-6 text-lg">
          Choose a tool from the menu to get started!
        </p>

        {/* Tab Links */}
        <nav>
          <ul className="flex space-x-6">
            <li><a href="#csv-merger" onClick={() => {}} className="hover:text-purple-600 tab-link active">CSV Merger</a></li>
            <li><a href="#data-fusion" onClick={() => {}} className="hover:text-purple-600 tab-link">Data Fusion</a></li>
          </ul>
        </nav>
      </div>

      {/* CSV Merger Tab */}
      <div id="csv-merger" className="container bg-white p-12 rounded-xl shadow-lg text-center max-w-2xl w-full mt-8 flex flex-col items-center tab-content">
        <h1 className="text-3xl font-bold text-purple-600 mb-4">CSV Merger Tool</h1>
        <p className="text-gray-700 mb-6 text-lg">
          <strong>Drag. Merge. Download.</strong> Combine multiple CSV files into one.
        </p>

        <div id="monitor" className="w-full h-36 border border-gray-300 rounded-md bg-gray-50 mb-4 overflow-y-auto p-3 text-left text-sm text-gray-800">
          <p>Monitor updates will appear here...</p>
        </div>

        <label htmlFor="fileInput" id="drag-drop-area" className="w-full h-48 border-2 border-dashed border-purple-600 bg-gray-100 flex justify-center items-center text-purple-600 rounded-md mb-4 cursor-pointer hover:bg-purple-50 transition duration-300">
          Drag and drop CSV files here or click to select
        </label>
        <input type="file" id="fileInput" accept=".csv" multiple className="hidden" onChange={() => {}} />

        <div className="mb-4 text-left w-full">
          <label htmlFor="discardHeaders" className="inline-flex items-center text-gray-700">
            <input type="checkbox" id="discardHeaders" className="form-checkbox h-5 w-5 text-purple-600 rounded focus:shadow-outline mr-2" />
            <span className="text-sm">Discard headers (except first file)</span>
          </label>
        </div>

        <button onClick={() => {}} className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-8 rounded-full focus:outline-none focus:shadow-outline mt-2">Merge Files</button>
        <button id="downloadBtn" onClick={() => {}} className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-full focus:outline-none focus:shadow-outline mt-4 hidden">Download</button>
      </div>

      {/* Data Fusion Tab */}
      <div id="data-fusion" className="container bg-white p-12 rounded-xl shadow-lg text-center max-w-2xl w-full mt-8 tab-content hidden">
        <h1 className="text-3xl font-bold text-purple-600 mb-8">Amazon Data Fusion</h1>
        <p className="text-gray-700 mb-8">
          Upload Amazon reports to generate insights.
        </p>

        <div className="file-input mb-6 text-left">
          <label htmlFor="adsFile" className="block text-gray-700 text-sm font-bold mb-2">Advertising Data:</label>
          <input type="file" id="adsFile" accept=".csv" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline cursor-pointer hover:border-purple-500" />
        </div>

        <div className="file-input mb-6 text-left">
          <label htmlFor="sqpFile" className="block text-gray-700 text-sm font-bold mb-2">Search Query Performance:</label>
          <input type="file" id="sqpFile" accept=".csv" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline cursor-pointer hover:border-purple-500" />
        </div>

        <div className="file-input mb-6 text-left">
          <label htmlFor="bizFile" className="block text-gray-700 text-sm font-bold mb-2">Business Reports:</label>
          <input type="file" id="bizFile" accept=".csv" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline cursor-pointer hover:border-purple-500" />
        </div>

        <button onClick={() => {}} className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-8 rounded-full focus:outline-none focus:shadow-outline mt-2">Process Data</button>

        <div id="progress-container" className="mt-8 hidden">
          <div className="loading-spinner border-4 border-gray-200 border-t-purple-600 rounded-full w-8 h-8 mx-auto animate-spin"></div>
        </div>

        <div className="table-container mt-8 overflow-x-auto w-full" id="tableContainer">
          <table className="w-full border-collapse" id="resultTable">
            <thead id="tableHeader" className="bg-gray-50"></thead>
            <tbody id="tableBody"></tbody>
          </table>
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

export default DataToolPage;
