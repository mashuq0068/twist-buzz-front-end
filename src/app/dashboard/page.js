"use client"
import { axiosPublic } from '@/axios/api';
import moment from 'moment';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const Dashboard = () => {
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
                            <tr key={news.id}>
                                <td>
                                    <img width={100} height={100} src={news?.image} alt='news-image' />
                                </td>
                                <td>
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
                                    <button className='btn btn-neutral'>Delete</button>
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

export default Dashboard;