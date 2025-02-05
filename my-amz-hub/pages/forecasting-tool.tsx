import React, { useState } from 'react';
import Papa from 'papaparse';
import FileSaver from 'file-saver';

const ForecastingToolPage = () => {
  const [statusMessage, setStatusMessage] = useState('Upload your Sales Data to generate stock reordering recommendations.');
  const [forecastData, setForecastData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isResultsVisible, setIsResultsVisible] = useState(false);

  const validateFile = (file: File | null): boolean => {
    if (!file || file.type !== "text/csv") {
      alert("Please upload a valid CSV file.");
      return false;
    }
    return true;
  };

  const processData = async () => {
    const fileInput = document.getElementById('salesFile') as HTMLInputElement;
    const files = { sales: fileInput.files ? fileInput.files[0] : null };

    if (!validateFile(files.sales)) return;
    if (!files.sales) {
      alert("Please select a sales data file.");
      return;
    }

    setStatusMessage("Generating forecast... Please wait.");
    setIsLoading(true);
    setIsResultsVisible(false);

    try {
      const salesData = await parseCSV(files.sales);
      const calculatedData = calculateForecastMetrics(salesData);

      renderForecastTable(calculatedData);
      setIsResultsVisible(true);
      setStatusMessage("Forecast generated!");
    } catch (error: any) {
      console.error(error);
      setStatusMessage("An error occurred during processing. Please check the console for details.");
    } finally {
      setIsLoading(false);
    }
  };

  const parseCSV = (file: File): Promise<any> => {
    return new Promise((resolve, reject) => {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          if (results.errors.length > 0) {
            reject(new Error("Error parsing CSV file."));
          } else {
            resolve(results.data);
          }
        },
      });
    });
  };

  const calculateForecastMetrics = (data: any[]): any[] => {
    // Placeholder function for forecasting logic
    console.log("Data received for forecasting:", data);
    setStatusMessage("Forecast calculation logic is not yet implemented.");
    return []; // Return empty array for now
  };

  const renderForecastTable = (forecastData: any[]) => {
    setForecastData(forecastData);
    if (forecastData.length === 0) {
      setStatusMessage("No forecast data available to display.");
    }
  };

  const downloadCSV = () => {
    const csv = Papa.unparse(forecastData);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    FileSaver.saveAs(blob, 'forecast_results.csv');
  };

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
          <button onClick={() => document.documentElement.classList.toggle('dark')} className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-4 py-2 rounded-full">
            Toggle Dark Mode
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="container bg-white dark:bg-gray-800 p-6 sm:p-12 rounded-xl shadow-lg text-center max-w-2xl w-full mt-8">
        <h1 className="text-3xl font-bold text-purple-600 mb-8">Amazon Forecasting Tool</h1>
        <p className="text-gray-700 dark:text-gray-300 mb-8">
          {statusMessage}
        </p>

        <div className="file-input mb-6 text-left">
          <label htmlFor="salesFile" className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">Sales Data:</label>
          <input type="file" id="salesFile" accept=".csv" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline cursor-pointer hover:border-purple-500" />
        </div>

        <button onClick={processData} className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-8 rounded-full focus:outline-none focus:shadow-outline mt-6" aria-label="Generate Forecast">
          Generate Forecast
        </button>

        <div id="progress-container" className={`mt-8 ${isLoading ? '' : 'hidden'}`}>
          <div className="loading-spinner border-4 border-gray-200 border-t-purple-600 rounded-full w-8 h-8 mx-auto animate-spin"></div>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">Processing your data...</p>
        </div>

        <p id="status" className="mt-8 text-sm text-gray-700 dark:text-gray-300 italic"></p>

        <div id="results" className={`mt-8 ${isResultsVisible ? '' : 'hidden'}`}>
          <h2 className="text-2xl font-bold text-purple-600 mb-4">Forecast Results</h2>
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="bg-gray-200 border border-gray-300 px-4 py-2 font-semibold text-left">Date</th>
                <th className="bg-gray-200 border border-gray-300 px-4 py-2 font-semibold text-left">Forecast</th>
              </tr>
            </thead>
            <tbody id="forecastTableBody">
              {forecastData.map((item, index) => (
                <tr key={index}>
                  <td className="border border-gray-300 px-4 py-2">{item.date}</td>
                  <td className="border border-gray-300 px-4 py-2">{item.forecast}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Download Button */}
          <button id="downloadBtn" onClick={downloadCSV} className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-8 rounded-full focus:outline-none focus:shadow-outline mt-6">
            Download Results
          </button>
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

export default ForecastingToolPage;
