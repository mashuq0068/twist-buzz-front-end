"use client"
import { useEffect, useState } from 'react';
import Image from "next/image";
import Searchbar from "../Searchbar/Searchbar";
import { HiOutlineArrowLongRight } from "react-icons/hi2";
import { axiosPublic } from '@/axios/api';
import Link from 'next/link';

const News = () => {
    const [hoveredItems, setHoveredItems] = useState({});
    const [isHovered, setIsHovered] = useState(false);
        const [skipPages, setSkipPages] = useState(0)
        const [allNews, setAllNews] = useState([])
    
        useEffect(() => {
            axiosPublic.get(`/allNews?skipPages=${skipPages}&perPageData=${16}`)
                .then(res => {
                    setAllNews(res.data)
                    console.log(res.data)
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

    const handleMouseEnter = (itemId) => {
        setHoveredItems(prevState => ({
            ...prevState,
            [itemId]: true
        }));
    };

    const handleMouseLeave = (itemId) => {
        setHoveredItems(prevState => ({
            ...prevState,
            [itemId]: false
        }));
    };

    return (
        <section className="space-y-7">
            <section>
                <Searchbar />
            </section>
            <section className="grid lg:grid-cols-3 xl:grid-cols-4 gap-7 md:grid-cols-2 grid-cols-1">
                {allNews?.map(news => (
                    <div
                        key={news.id}
                        className="pb-5 drop-shadow-xl space-y-5 shadow-xl relative overflow-hidden"
                        onMouseEnter={() => handleMouseEnter(news.id)}
                        onMouseLeave={() => handleMouseLeave(news.id)}
                    >
                        <div className="max-h-[218px] overflow-hidden">
                            <img
                                className={`w-full h-full object-cover transition-transform duration-300 transform-gpu ${hoveredItems[news.id] ? 'scale-110' : ''}`}
                                src={news.image}
                                alt="news-image"
                            />
                        </div>
                        <div className="space-y-2 px-4">
                            <div className="tooltip" data-tip={news.title}>
                                <h3 className="text-xl min-h-[85px] text-left font-semibold">{truncateText(news.title, 75)}</h3>
                            </div>
                            <p className="">{truncateText(news.description, 148)}</p>
                        </div>
                        <Link href={`/news/${news?._id}`} className="ml-4 flex items-center gap-1">See More <HiOutlineArrowLongRight /></Link>
                    </div>
                ))}
            </section>
        </section>
    );
};

export default News;

