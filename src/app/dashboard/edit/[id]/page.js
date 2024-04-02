"use client"

import EditCreateNews from '@/components/EditCreateNews/EditCreateNews';
import EditNewsEditor from '@/components/EditNewsEditor/EditnewsEditor';

import React, { useState } from 'react';

const Edit = ({ params }) => {
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [category, setCategory] = useState("")
    const [image, setImage] = useState("");
    const [isEditor, setIsEditor] = useState(false)

    return (
        <div className='blog-container'>
        {
            isEditor ?
                <EditNewsEditor id={params?.id} title={title} description={description} category={category} image={image} />
               
                :
                <EditCreateNews setTitle={setTitle} setDescription={setDescription} setImage={setImage} setCategory={setCategory} setIsEditor={setIsEditor} id={params?.id}  />
                
        }
    </div>
    );
};

export default Edit;