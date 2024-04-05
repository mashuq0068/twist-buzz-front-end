"use client"
import { axiosPublic } from '@/axios/api';
import moment from 'moment';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

const DashboardNews = () => {
    const [skipPages, setSkipPages] = useState(0)
    const [allNews, setAllNews] = useState([])
    console.log(allNews)
    useEffect(() => {
        axiosPublic.get(`/allNews?skipPages=${skipPages}&perPageData=${16}`)
            .then(res => {
                console.log(res.data)
                setAllNews(res.data)
            })
            .catch(error => {
                console.error(error)
            })
    }, [skipPages])
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
    function truncateText(text , maxCharacters) {
        if (text.length > maxCharacters) {
            const truncatedText = text.slice(0, maxCharacters);
            return truncatedText + '...';
        }
        return text;
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
            <Link href='/create' className=' btn btn-neutral fixed top-[20vh] right-5'>
                Create News
            </Link>
        </>
    );
};

export default DashboardNews;