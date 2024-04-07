"use client"
import CreateNews from '@/components/CreateNews/CreateNews';
import NewsEditor from '@/components/NewsEditor/NewsEditor';
import AdminVerification from '@/utils/AdminVerification';

import React, { useState } from 'react';

const Create = () => {
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [category, setCategory] = useState("")
    const [image, setImage] = useState("");
    const [isEditor, setIsEditor] = useState(false)
    console.log(title, description)


    return (
        <AdminVerification>
            <div className='blog-container'>
                {
                    isEditor ?
                        <NewsEditor title={title} description={description} category={category} image={image} />

                        :
                        <CreateNews setTitle={setTitle} setDescription={setDescription} setImage={setImage} setCategory={setCategory} setIsEditor={setIsEditor} />
                }
            </div>
        </AdminVerification>
    );
};

export default Create;