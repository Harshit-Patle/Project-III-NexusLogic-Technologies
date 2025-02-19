import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import NewsCard from '../Components/NewsCard';

const API_KEY = import.meta.env.VITE_NEWS_API_KEY;;

function SearchNews() {
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState(searchParams.get("search_query") || "");
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [searchPerformed, setSearchPerformed] = useState(!!searchParams.get("search_query"));

    // Effect to perform search when URL parameters change
    useEffect(() => {
        const query = searchParams.get("search_query");
        if (query) {
            performSearch(query);
        }
    }, [searchParams]);

    const performSearch = async (query) => {
        if (!query.trim()) return;

        setLoading(true);
        setError(null);
        setSearchPerformed(true);

        try {
            const response = await fetch(
                `https://newsapi.org/v2/everything?q=${encodeURIComponent(query)}&apiKey=${API_KEY}`
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

    const handleSearch = (e) => {
        e.preventDefault();
        if (!searchQuery.trim()) return;

        // Update URL with search query using YouTube-style format
        setSearchParams({ search_query: searchQuery });
    };

    return (
        <div className="p-4 bg-purple-50 min-h-screen">
            {/* Search Header and Form */}
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-purple-800 mb-4">
                    Search News
                </h1>

                <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-2">
                    <div className="relative flex-grow">
                        <input
                            type="text"
                            placeholder="Search for news..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full px-4 py-2 border border-purple-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
                        />
                    </div>
                    <button
                        type="submit"
                        className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition duration-200 shadow-sm flex items-center justify-center"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        Search
                    </button>
                </form>
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
                        <p className="text-purple-600 text-sm">{`Searching for ${searchQuery} news...`}</p>
                    </div>
                </div>
            ) : (
                <>
                    {/* Search Results */}
                    {searchPerformed && (
                        <div className="mb-4">
                            <h2 className="text-lg font-medium text-purple-700">
                                {articles.length > 0
                                    ? `Found ${articles.length} results for "${searchQuery}"`
                                    : `No results found for "${searchQuery}"`}
                            </h2>
                        </div>
                    )}

                    {/* Results Grid */}
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
                            searchPerformed && (
                                <div className="col-span-full text-center p-4 bg-white rounded-lg shadow-sm border border-purple-200">
                                    <p className="text-purple-700">Try a different search term.</p>
                                </div>
                            )
                        )}
                    </div>
                </>
            )}

            {/* Initial State - Before Search */}
            {!searchPerformed && !loading && (
                <div className="flex flex-col items-center justify-center h-64 text-center">
                    <div className="bg-purple-100 p-6 rounded-lg shadow-sm border border-purple-200 max-w-md">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-purple-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        <h3 className="text-xl font-semibold text-purple-800 mb-2">Search for Any Topic</h3>
                        <p className="text-purple-600">Enter keywords to find the latest news on any subject you're interested in.</p>
                    </div>
                </div>
            )}
        </div>
    );
}

export default SearchNews;