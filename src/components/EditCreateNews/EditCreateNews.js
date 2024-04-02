"use client"
import { axiosPublic } from '@/axios/api';
import { useEffect, useState } from 'react';


const EditCreateNews = ({ setTitle, setDescription, setIsEditor, setCategory, setImage, id }) => {
    const [news, setNews] = useState("")
    useEffect(() => {

        axiosPublic.get(`/news/${id}`)
            .then(response => {
                setNews(response.data);
            })
            .catch(error => {
                console.error('Error fetching news:', error);

            });


    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault()
        setTitle(e.target.title.value)
        setDescription(e.target.description.value)
        setImage(e.target.image.value)
        setCategory(e.target.category.value)
        setIsEditor(true)


    }



    return (
        <section className='flex flex-col justify-center items-center min-h-[100vh]'>

            <form onSubmit={handleSubmit} className=' space-y-5'>
                <div className='space-y-2'>
                    <h3 className='text-2xl text-blue-700 '>Making news</h3>
                    <p className='text-gray-400'>Start your new hot topic from here!</p>
                </div>
                <div className='form-control'>
                    <label>
                        Title
                    </label>
                    <input defaultValue={news?.title} type='text' required={true} name='title' className='input-form' placeholder='Enter name' />
                </div>
                <div className='form-control'>
                    <label>
                        Category
                    </label>
                    <select required={true} name='category' placeholder='Select category' className='input-form'>
                        <option value='politics'>Politics</option>
                        <option value='business'>Business</option>
                        <option value='technology'>Technology</option>
                        <option value='sports'>Sports</option>
                        <option value='crime'>Crime</option>
                        <option value='others'>Others</option>
                    </select>
                </div>
                <div className='form-control'>
                    <label>
                        Image
                    </label>
                    <input defaultValue={news?.image} type='text' required={true} name='image' className='input-form' placeholder='Enter Image-url' />
                </div>
                <div className='form-control'>
                    <label>
                        Description
                    </label>
                    <textarea defaultValue={news?.description} rows={5} required={true} name='description' className='input-form' placeholder='Enter description'>

                    </textarea>
                </div>
                <div className='relative'>
                    <input type='submit' value='Next' className="px-8 py-2 cursor-pointer rounded-md absolute right-0 text-white  bg-[#5c5cea] transition duration-300 ease-in-out"

                    />
                </div>
            </form>

        </section>
    );
};

export default EditCreateNews;