"use client"
import CreateNews from '@/components/CreateNews/CreateNews';
import Editor from '@/components/Editor/Editor';
import React, { useState } from 'react';

const Create = () => {
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [isEditor, setIsEditor] = useState(false)
    console.log(title , description)
    

    return (
        <div>
            {
                isEditor ?
                    <Editor title={title} description={description} />
                    :
                    <CreateNews setTitle={setTitle} setDescription={setDescription} setIsEditor={setIsEditor} />
            }
        </div>
    );
};

export default Create;