import React, { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import NewsCard from '../Components/NewsCard';

function TopHeadlines() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const apiKey = import.meta.env.VITE_NEWS_API_KEY;
  const url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`;

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.status === "ok") {
          setArticles(data.articles || []);
        } else {
          throw new Error(data.message || "Failed to fetch top headlines");
        }
      } catch (error) {
        console.error("Error fetching top headlines:", error);
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
        <p className="text-lg font-medium text-purple-800">Loading Top Headlines...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border-l-4 border-purple-600 p-4 m-2">
        <h2 className="text-xl font-bold text-purple-800 mb-2">Failed to Load Top Headlines</h2>
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

  if (articles.length === 0) {
    return (
      <div className="text-center p-4 m-3 bg-white rounded-lg shadow-sm border border-purple-200">
        <p className="text-purple-700">No headlines are currently available.</p>
      </div>
    );
  }

  return (
    <div className="bg-purple-50">
      <h1 className="text-2xl font-bold text-purple-800 mb-4 mt-2 text-center md:text-xs md:text-transparent md:m-0">Top Headlines</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mx-3 gap-5">
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
    </div>
  );
}

export default TopHeadlines;