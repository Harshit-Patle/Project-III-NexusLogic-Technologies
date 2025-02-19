import React, { useState, useEffect } from "react";
import NewsCard from '../Components/NewsCard';

const API_KEY = import.meta.env.VITE_NEWS_API_KEY; 
const CATEGORIES = ["business", "entertainment", "general", "health", "science", "sports", "technology"];

function Category() {
    const [category, setCategory] = useState("general"); // Default category
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchNews = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await fetch(
                    `https://newsapi.org/v2/top-headlines?category=${category}&apiKey=${API_KEY}`
                );
                const data = await response.json();

                if (data.status === "ok") {
                    setArticles(data.articles || []);
                } else {
                    throw new Error(data.message || "Failed to fetch news");
                }
            } catch (error) {
                setError(error.message);
                setArticles([]);
            }
            setLoading(false);
        };

        fetchNews();
    }, [category]);

    return (
        <div className="p-4 bg-purple-50 min-h-screen">
            {/* Improved header and category selector layout */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                <h1 className="text-2xl font-bold text-purple-800 mb-2 sm:mb-0">
                    {category.charAt(0).toUpperCase() + category.slice(1)} News
                </h1>

                <div className="relative inline-block w-full sm:w-48">
                    <select
                        className="appearance-none w-full bg-white border border-purple-300 hover:border-purple-400 px-3 py-1 pr-8 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500 text-purple-800 font-medium"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        {CATEGORIES.map((cat) => (
                            <option key={cat} value={cat} className="text-gray-800">
                                {cat.charAt(0).toUpperCase() + cat.slice(1)}
                            </option>
                        ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-purple-700">
                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                        </svg>
                    </div>
                </div>
            </div>

            {/* Error Message */}
            {error && (
                <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-3 mb-4 rounded shadow-sm">
                    <p>{error}</p>
                </div>
            )}

            {/* Loading Indicator */}
            {loading ? (
                <div className="flex justify-center items-center h-48">
                    <div className="animate-pulse flex flex-col items-center">
                        <div className="w-10 h-10 rounded-full border-3 border-purple-300 border-t-purple-600 animate-spin mb-2"></div>
                        <p className="text-purple-600 text-sm">
                            {`Loading ${category.charAt(0).toUpperCase()+category.slice(1)} news...`}
                        </p>

                    </div>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                    {articles.length > 0 ? (
                        articles.map((news, index) => (
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
                        ))
                    ) : (
                        <div className="col-span-full text-center p-4 bg-white rounded-lg shadow-sm border border-purple-200">
                            <p className="text-purple-700">No news available for this category.</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default Category;