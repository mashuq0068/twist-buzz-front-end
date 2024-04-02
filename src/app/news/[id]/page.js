import { axiosPublic } from "@/axios/api";

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





    return (
        <article className='blog-container'>
            <section>
                <h1 className="text-3xl font-semibold">{news?.title}</h1>
            </section>
            <section id='news-content' dangerouslySetInnerHTML={{ __html: news?.news }}>

            </section>
        </article>
    );
};

export default SingleNews;