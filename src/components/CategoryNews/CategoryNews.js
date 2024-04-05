"use client"
import { useEffect, useState } from 'react';
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
    const [isLoading , setIsLoading] = useState(true)

    useEffect(() => {
        axiosPublic.get(`/categoryNews?skipPages=${skipPages}&perPageData=${16}&category=${category}`)
            .then(res => {
                setAllNews(res.data)
                console.log(res.data)
                setIsLoading(false)
            })
            .catch(error => {
                console.error(error.message)

            })

    }, [skipPages])

    function truncateText(text, maxCharacters) {
        if (text.length > maxCharacters) {
            const truncatedText = text.slice(0, maxCharacters);
            return truncatedText + '...';
        }
        return text;
    }
    if(isLoading){
        return(
            <span className="loading loading-bars fixed top-[50vh] left-[50vw] loading-lg"></span>
        )
    }

    return (
        <section>
        <section className="space-y-7">
            <section>
                <Searchbar setIsLoading={setIsLoading} setAllNews={setAllNews} />
            </section>
            <section className="grid lg:grid-cols-3 xl:grid-cols-4 gap-7 md:grid-cols-2 grid-cols-1">
                {allNews?.map(news => (
                    <div
                        key={news?._id}
                        className="pb-5 flex flex-col justify-between drop-shadow-xl space-y-5 shadow-xl relative overflow-hidden"
                        onMouseEnter={() => setHoveredId(news?._id)}
                        onMouseLeave={() => setHoveredId(null)}
                    >
                        <div>
                            <div className="h-[218px] overflow-hidden">
                                <img
                                    className={`w-full h-full object-cover transition-transform duration-300 transform-gpu ${hoveredId === news?._id ? 'scale-110' : ''}`}
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
                        <Link href={`/news/${news?._id}`} className="ml-4 flex items-center gap-1">See More <HiOutlineArrowLongRight /></Link>
                    </div>
                ))}
            </section>
        </section>
        <Footer/>
        </section>
    );
};

export default CategoryNews;
