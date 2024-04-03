import { axiosPublic } from "@/axios/api";
import { TfiTimer } from "react-icons/tfi";
import { PiNewspaperThin } from "react-icons/pi";

export const generateMetadata = async ({ params }) => {
    const response = await axiosPublic.get(`/news/${params?.id}`);
    const news = await response.data;

    return {
        title: news.title,
        description: news.description // Generate dynamic description here
    };
};


const SingleNews = async ({ params }) => {
    const response = await axiosPublic.get(`/news/${params?.id}`)
    const news = await response.data

    const getElapsedTime = (timestamp) => {
        const commentDate = new Date(timestamp);
        const currentDate = new Date();
        const timeDifference = currentDate.getTime() - commentDate.getTime();

        const seconds = Math.floor(timeDifference / 1000);
        if (seconds <= 0) {
            return 'Just now';
        }
        if (seconds < 60) {
            return `${seconds} second${seconds !== 1 ? 's' : ''} ago`;
        }
        const minutes = Math.floor(seconds / 60);
        if (minutes < 60) {
            return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`;
        }
        const hours = Math.floor(minutes / 60);
        if (hours < 24) {
            return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
        }
        const days = Math.floor(hours / 24);
        if (days < 30) {
            return `${days} day${days !== 1 ? 's' : ''} ago`;
        }
        const months = Math.floor(days / 30);
        if (months < 12) {
            return `${months} month${months !== 1 ? 's' : ''} ago`;
        }
        const years = Math.floor(months / 12);
        return `${years} year${years !== 1 ? 's' : ''} ago`;
    };

    const getReadTime = (words) => {
        const avgWordsPerMinute = 200; 
        const timeInMinutes = Math.ceil(words / avgWordsPerMinute);
        return timeInMinutes

    }





    return (
        <article className='blog-container'>
            <section className="  mt-4 mb-8 md:mt-8 md:mb-12">
                <h1 style={{ lineHeight: '2.8rem' }} className="md:text-3xl  text-2xl  font-semibold">{news?.title}</h1>
                <div className=" flex gap-5">
                    <p className=" mt-5 flex gap-1 items-center  ">
                        <TfiTimer />
                        {getElapsedTime(news?.createdAt)}</p>
                    <p className=" mt-5 flex gap-1 items-center  ">
                        <PiNewspaperThin className=" text-xl" />
                        {getReadTime(news?.news?.split(/\s+/)?.length)}min read</p>
                </div>
            </section>
            <section style={{ lineHeight: '2rem' }} id='news-content' className="text-base md:text-[18px] " dangerouslySetInnerHTML={{ __html: news?.news }}>

            </section>
        </article>
    );
};

export default SingleNews;