"use client"
import CreateNews from '@/components/CreateNews/CreateNews';
import NewsEditor from '@/components/NewsEditor/NewsEditor';

import React, { useState } from 'react';

const Create = () => {
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [category, setCategory] = useState("")
    const [image, setImage] = useState("");
    const [isEditor, setIsEditor] = useState(false)
    console.log(title, description)


    return (
        <div className='blog-container'>
            {
                isEditor ?
                    <NewsEditor title={title} description={description} category={category} image={image} />

                    :
                    <CreateNews setTitle={setTitle} setDescription={setDescription} setImage={setImage} setCategory={setCategory} setIsEditor={setIsEditor} />
            }
        </div>
    );
};

export default Create;