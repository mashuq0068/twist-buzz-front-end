"use client"
import React, { useEffect, useState } from 'react';
import Image from "next/image";
import Searchbar from "../Searchbar/Searchbar";
import { HiOutlineArrowLongRight } from "react-icons/hi2";
import { axiosPublic } from '@/axios/api';
import Link from 'next/link';
import Footer from '../Footer/Footer';

const CategoryNews = ({ category }) => {
    const [hoveredId, setHoveredId] = useState(null);
    const [skipPages, setSkipPages] = useState(0);
    const [allNews, setAllNews] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [totalPages, setTotalPages] = useState(0); // Initialize totalPages state

    useEffect(() => {
        setIsLoading(true); // Set loading state to true when fetching new data
        axiosPublic.get(`/categoryNews?skipPages=${skipPages}&perPageData=${16}&category=${category}`)
            .then(res => {
                setAllNews(res.data.news);
                setTotalPages(res.data.totalPages); // Set total pages received from API
                setIsLoading(false);
            })
            .catch(error => {
                console.error(error.message);
                setIsLoading(false);
            });
    }, [skipPages, category]); // Include category in dependency array

    function truncateText(text, maxCharacters) {
        if (text.length > maxCharacters) {
            const truncatedText = text.slice(0, maxCharacters);
            return truncatedText + '...';
        }
        return text;
    }

    const handlePreviousPage = () => {
        setSkipPages(prevSkipPages => Math.max(prevSkipPages - 1, 0));
    };

    const handleNextPage = () => {
        setSkipPages(prevSkipPages => Math.min(prevSkipPages + 1, totalPages - 1));
    };

    const handlePageClick = page => {
        setSkipPages(page);
    };

    if (isLoading) {
        return (
            <span className="loading loading-bars fixed top-[50vh] left-[50vw] loading-lg"></span>
        );
    } else if (allNews.length === 0) {
        return (
            <div className=' text-2xl text-gray-400 font-semibold text-center absolute left-[45%] top-[40%]'>
                No news available
            </div>
        );
    }

    return (
        <section className=''>
            <section className="space-y-7">
                <section>
                    <Searchbar setIsLoading={setIsLoading} setAllNews={setAllNews} />
                </section>
                <section className="grid lg:grid-cols-3 xl:grid-cols-4 gap-7 md:grid-cols-2 grid-cols-1">
                    {allNews.map(news => (
                        <div
                            key={news._id}
                            className="pb-5 flex flex-col justify-between drop-shadow-xl space-y-5 shadow-xl relative rounded-md overflow-hidden"
                            onMouseEnter={() => setHoveredId(news._id)}
                            onMouseLeave={() => setHoveredId(null)}
                        >
                            <div>
                                <div className="h-[218px] overflow-hidden">
                                    <img
                                        className={`w-full h-full object-cover transition-transform duration-300 transform-gpu ${hoveredId === news._id ? 'scale-110' : ''}`}
                                        src={news.image}
                                        alt="news-image"
                                    />
                                </div>
                                <div className="space-y-2 px-4">
                                    <div className="tooltip" data-tip={news.title}>
                                        <h3 className="text-xl mt-4 text-left font-semibold">{truncateText(news.title, 75)}</h3>
                                    </div>
                                    <p className="">{truncateText(news.description, 148)}</p>
                                </div>
                            </div>
                            <Link href={`/news/${news._id}`} className="ml-4 flex items-center gap-1">See More <HiOutlineArrowLongRight /></Link>
                        </div>
                    ))}
                </section>
            </section>

            {/* Pagination buttons */}
            {totalPages > 1 &&
                <div className="flex  mt-8 mb-8  justify-end space-x-3">
                    {skipPages > 0 && <button className='px-6 py-2 cursor-pointer rounded-md  text-white  bg-neutral transition duration-300 ease-in-out' onClick={handlePreviousPage} >Previous</button>}
                    {[...Array(totalPages)].map((_, index) => (
                        <button  key={index} onClick={() => handlePageClick(index)} className={skipPages === index ? 'px-4 py-2 cursor-pointer rounded-md   border  border-neutral transition duration-300 ease-in-out' : 'hover:border hover:border-neutral transition duration-300 ease-in-out px-4 py-2 cursor-pointer rounded-md '}>
                            {index + 1}
                        </button>
                    ))}
                    {skipPages !== totalPages - 1 && <button className='px-6  py-2 cursor-pointer rounded-md  text-white  bg-neutral transition duration-300 ease-in-out' onClick={handleNextPage} >Next</button>}
                </div>
            }
            <Footer />
        </section>
    );
};

export default CategoryNews;
