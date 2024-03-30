"use client"
import CreateNews from '@/components/CreateNews/CreateNews';
import NewsEditor from '@/components/NewsEditor/NewsEditor';

import React, { useState } from 'react';

const Create = () => {
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [isEditor, setIsEditor] = useState(false)
    console.log(title , description)
    

    return (
        <div className='blog-container'>
            {
                isEditor ?
                <NewsEditor title={title} description={description}/>
                    
                    :
                    <CreateNews setTitle={setTitle} setDescription={setDescription} setIsEditor={setIsEditor} />
            }
        </div>
    );
};

export default Create;