import useAxiosPublic from '@/hooks/useAxiosPublic';
import React from 'react';

const SingleNews = async({params}) => {
    const axios = useAxiosPublic()
    const response = await axios.get(`/news/${params?.id}`)
    const news = await response.data
   
    
    
    return (
        <div className='blog-container' id='news-content' dangerouslySetInnerHTML={{ __html: news?.news }}>
            
        </div>
    );
};

export default SingleNews;