"use client"
import { axiosPublic } from '@/axios/api';
import moment from 'moment';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

const DashboardNews = () => {

    const [skipPages, setSkipPages] = useState(0);
    const [allNews, setAllNews] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [totalPages, setTotalPages] = useState(0); // Initialize totalPages state

    useEffect(() => {
        setIsLoading(true); // Set loading state to true when fetching new data
        axiosPublic.get(`/allNews?skipPages=${skipPages}&perPageData=${16}`)
            .then(res => {
                setAllNews(res.data.news);
                setTotalPages(res.data.totalPages); // Set total pages received from API
                setIsLoading(false);
            })
            .catch(error => {
                console.error(error.message);
                setIsLoading(false);
            });
    }, [skipPages]); // Include category in dependency array

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
    const renderPaginationButtons = () => {
        const maxButtons = 6; // Maximum number of pagination buttons to display
        const halfMaxButtons = Math.floor(maxButtons / 2); // Half of the maximum buttons
        const startPage = Math.max(0, skipPages - halfMaxButtons); // Calculate the starting page number
        const endPage = Math.min(totalPages - 1, startPage + maxButtons - 1); // Calculate the ending page number

        const paginationButtons = [];

        // Add Previous button if skipPages > 0
        if (skipPages > 0) {
            paginationButtons.push(
                <button key="previous" className='px-6 py-2 cursor-pointer rounded-md  text-white  bg-neutral transition duration-300 ease-in-out' onClick={handlePreviousPage} >Previous</button>
            );
        }

        // Add page buttons
        for (let i = startPage; i <= endPage; i++) {
            paginationButtons.push(
                <button key={i} onClick={() => handlePageClick(i)} className={skipPages === i ? 'px-4 py-2 cursor-pointer rounded-md   border  border-neutral transition duration-300 ease-in-out' : 'hover:border hover:border-neutral transition duration-300 ease-in-out px-4 py-2 cursor-pointer rounded-md '}>
                    {i + 1}
                </button>
            );
        }

        // Add Next button if skipPages !== totalPages - 1
        if (skipPages !== totalPages - 1) {
            paginationButtons.push(
                <button key="next" className='px-6  py-2 cursor-pointer rounded-md  text-white  bg-neutral transition duration-300 ease-in-out' onClick={handleNextPage} >Next</button>
            );
        }

        return paginationButtons;
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
    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosPublic.delete(`/news/${id}`)
                    .then(res => {
                        const filteredNews = allNews?.filter(news => news?._id === id)
                        setAllNews(filteredNews)
                        if (res.data.deletedCount > 0) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });

                        }
                    })
                    .catch(error => {
                        console.error(error?.message)
                    })

            }
        });
    }
    return (
        <>
            <div className='container'>
                <div className="overflow-x-auto">
                    <table className="table table-zebra">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>News</th>
                                <th>News title</th>
                                <th>Category</th>
                                <th>Publish time</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* row 1 */}

                            {allNews?.map(news => (
                                <tr key={news?._id}>
                                    <td>
                                        <img width={100} height={100} src={news?.image} alt='news-image' />
                                    </td>
                                    <td className=' max-w-[25vw]'>
                                        {news?.title}
                                    </td>
                                    <td>
                                        {news?.category}
                                    </td>
                                    <td>
                                        {moment(news?.createdAt).format('MMMM Do YYYY, h:mm:ss a')}
                                    </td>
                                    <td className=' space-x-5'>
                                        <Link href={`/dashboard/edit/${news?._id}`} className='btn btn-neutral'>Edit</Link>
                                        <button onClick={() => { handleDelete(news?._id) }} className='btn btn-neutral'>Delete</button>
                                    </td>
                                </tr>
                            ))}


                        </tbody>
                    </table>
                </div>
            </div>
            {/* Pagination buttons */}
            {totalPages > 1 &&
                <div className="flex  mt-8 mb-8  justify-end space-x-3">
                    {renderPaginationButtons()}
                </div>
            }
            <Link href='/create' className=' btn btn-neutral fixed top-[20vh] right-5'>
                Create News
            </Link>
        </>
    );
};

export default DashboardNews;