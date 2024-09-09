import React from 'react';

const AddSense = ({pid}) => {
    return (
        <script async 
         src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${pid}`}
            crossOrigin="anonymous">
       </script>
    );
};


export default AddSense;