"use client"
import useAxiosPublic from '@/hooks/useAxiosPublic';
import { Editor } from '@tinymce/tinymce-react';
import { useState } from 'react';

const NewsEditor = ({title, description}) => {
  const [editorContent, setEditorContent] = useState('');
  console.log(editorContent)
  const axios = useAxiosPublic()
  const handleEditorChange = (content, editor) => {
    setEditorContent(content);
    };
    const handlePublish = () => {
      const data = {
        title,
        description,
        news:editorContent

      }
      axios.post("/news" , data)
      .then(
        res => {
          if(res.data.insertedId > 0){
            console.log("success")
          }
        }
      )
      .catch(error => {
        console.error(error.message)
      })
    }
  return (
    <>
    <Editor
  
      init={{
        content_style: 'font-family: "Work Sans", "sans-serif" ; font-size: 18px;',
        plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed linkchecker a11ychecker tinymcespellchecker permanentpen powerpaste advtable advcode editimage advtemplate ai mentions tinycomments tableofcontents footnotes mergetags autocorrect typography inlinecss markdown',
        toolbar: 'undo redo | blocks fontselect fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
        tinycomments_mode: 'embedded',
        tinycomments_author: 'Author name',
        mergetags_list: [
          { value: 'First.Name', title: 'First Name' },
          { value: 'Email', title: 'Email' },
        ],
        ai_request: (request, respondWith) => respondWith.string(() => Promise.reject("This feature is not currently available")),
        
        setup: editor => {
          editor.on('change', () => {
            handleEditorChange(editor.getContent());
          })
          
        }
        ,
        initialValue :'welcome to twist-buzz!',
      }}
      
     
    />
    <div className='h-[10vh] p-4 shadow-xl drop-shadow-xl '>
      <button onClick={handlePublish}  className="px-8 py-2 cursor-pointer  rounded-md absolute top-[30%] right-4 text-white  bg-[#5c5cea] transition duration-300 ease-in-out">Publish</button>
    </div>
    
    </>
  );
}
export default NewsEditor;


