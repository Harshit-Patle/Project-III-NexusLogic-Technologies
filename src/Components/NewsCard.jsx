import React from 'react';

function NewsCard({ author, title, description, url, urlToImage, publishedAt, content }) {
    const formatDate = (dateString) => {
        if (!dateString) return "Unknown date";
        const date = new Date(dateString);
        return date.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });
    };

    return (
        <div className="bg-white rounded-lg overflow-hidden shadow-lg border border-purple-200 transition-all duration-300 hover:shadow-xl hover:border-purple-300 h-full flex flex-col">
            {/* Image */}
            <div className="relative h-48 overflow-hidden bg-purple-100">
                <img
                    src={urlToImage}
                    alt={title}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    onError={(e) => {
                        e.target.src = "https://via.placeholder.com/300x200?text=News";
                    }}
                />
                <div className="absolute bottom-0 left-0 bg-purple-700 text-white px-2 py-1 text-xs">
                    {formatDate(publishedAt)}
                </div>
            </div>

            {/* Content */}
            <div className="p-4 flex-grow flex flex-col">
                <h2 className="text-lg font-bold text-purple-900 mb-2 line-clamp-2">{title}</h2>
                <p className="text-sm text-gray-600 mb-2">By {author}</p>
                <p className="text-gray-700 mb-4 line-clamp-3">{description}</p>
                <div className="mt-auto">
                    <a
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-300"
                    >
                        Read More
                    </a>
                </div>
            </div>
        </div>
    );
}

export default NewsCard;