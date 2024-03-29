"use client"
import React, { useRef } from 'react';


const CreateNews = ({setTitle , setDescription , setIsEditor}) => {
    const handleSubmit = (e) => {
        e.preventDefault()
        setTitle(e.target.title.value)
        setDescription(e.target.description.value)
        setIsEditor(true)
        console.log(e.target.title.value , e.target.description.value)

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
                    <input type='text' required={true} name='title' className='input-form' placeholder='Enter name' />
                </div>
                <div className='form-control'>
                    <label>
                        Description
                    </label>
                    <textarea rows={5} required={true} name='description' className='input-form' placeholder='Enter description'>

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

export default CreateNews;