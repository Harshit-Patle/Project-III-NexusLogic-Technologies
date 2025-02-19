import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Newspaper, Radio, Layout, Search } from 'lucide-react';

function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();

    const isActive = (path) => location.pathname === path ? 'underline' : '';

    return (
        <div className='w-full bg-purple-700 p-4'>
            <div className='flex justify-between items-center'>
                {/* Logo */}
                <div className='flex items-center gap-3 pointer-events-none select-none'>
                    <img src="/image.png" alt="News App Logo" className='w-12 md:w-16' />
                    <h1 className='text-white font-bold text-xl md:text-3xl'>News App</h1>
                </div>

                {/* Desktop Navigation */}
                <div className='hidden md:flex gap-5'>
                    <Link
                        to='/'
                        className={`text-white font-semibold text-xl hover:text-[#ffffffde] flex items-center gap-2 ${isActive('/')}`}
                    >
                        <Newspaper size={24} />
                        Top Headlines
                    </Link>
                    <Link
                        to='/breaking-news'
                        className={`text-white font-semibold text-xl hover:text-[#ffffffde] flex items-center gap-2 ${isActive('/breaking-news')}`}
                    >
                        <Radio size={24} />
                        Breaking News
                    </Link>
                    <Link
                        to='/category'
                        className={`text-white font-semibold text-xl hover:text-[#ffffffde] flex items-center gap-2 ${isActive('/category')}`}
                    >
                        <Layout size={24} />
                        News by Category
                    </Link>
                    <Link to='/search' className={`text-white font-semibold text-xl hover:text-[#ffffffde] flex items-center gap-2 ${isActive('/search')}`}><Search size={24} />Search News</Link>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className='md:hidden text-white'
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    aria-label="Toggle menu"
                >
                    {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Navigation */}
            {isMenuOpen && (
                <div className='md:hidden mt-4 flex flex-col gap-4 pb-4'>
                    <Link
                        to='/'
                        className={`text-white font-semibold text-lg hover:text-[#ffffffde] flex items-center gap-2 ${isActive('/')}`}
                        onClick={() => setIsMenuOpen(false)}
                    >
                        <Newspaper size={20} />
                        Top Headlines
                    </Link>
                    <Link
                        to='/breaking-news'
                        className={`text-white font-semibold text-lg hover:text-[#ffffffde] flex items-center gap-2 ${isActive('/breaking-news')}`}
                        onClick={() => setIsMenuOpen(false)}
                    >
                        <Radio size={20} />
                        Breaking News
                    </Link>
                    <Link
                        to='/category'
                        className={`text-white font-semibold text-lg hover:text-[#ffffffde] flex items-center gap-2 ${isActive('/category')}`}
                        onClick={() => setIsMenuOpen(false)}
                    >
                        <Layout size={20} />
                        Category
                    </Link>
                    <Link to='/search' className={`text-white font-semibold text-xl hover:text-[#ffffffde] flex items-center gap-2 ${isActive('/search')}`}><Search size={24} />Search News</Link>
                </div>
            )}
        </div>
    );
}

export default Header;