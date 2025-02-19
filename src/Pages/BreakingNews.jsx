import React, { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import NewsCard from '../Components/NewsCard';

const BreakingNews = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const apiKey = '4c0eb3a1a11e4535b33e1042e6882169';
  const url = `https://newsapi.org/v2/everything?q=breaking&sortBy=popularity&apiKey=${apiKey}`;

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.status === "ok") {
          setArticles(data.articles || []);
        } else {
          throw new Error(data.message || "Failed to fetch breaking news");
        }
      } catch (error) {
        console.error("Error fetching news:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[100vh] space-y-4 bg-purple-50">
        <Loader2 className="w-12 h-12 text-purple-600 animate-spin" />
        <p className="text-lg font-medium text-purple-800">Loading Breaking News...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border-l-4 border-purple-600 p-4 m-2">
        <h2 className="text-xl font-bold text-purple-800 mb-2">Failed to Load News</h2>
        <p className="text-gray-700">{error}</p>
        <button
          className="mt-4 bg-purple-600 hover:bg-purple-700 text-white font-medium py-1 px-3 rounded-md transition-colors duration-300"
          onClick={() => window.location.reload()}
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="bg-purple-50">
      <h1 className="text-2xl font-bold text-purple-800 mb-4 mt-2 text-center md:text-xs md:text-transparent md:m-0">
        Breaking News
      </h1>

      {articles.length === 0 ? (
        <div className="text-center p-4 bg-white rounded-lg shadow-md border border-purple-200 mx-2">
          <p className="text-purple-700">No breaking news articles available.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mx-3 mb-3">
          {articles.map((news, index) => (
            <NewsCard
              key={index}
              author={news.author || "Unknown Author"}
              title={news.title || "No Title Available"}
              description={news.description || "No description available"}
              url={news.url}
              urlToImage={news.urlToImage || "https://via.placeholder.com/150"}
              publishedAt={news.publishedAt || "Unknown Date"}
              content={news.content || "No content available"}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default BreakingNews;