"use client"

import { axiosPublic } from "@/axios/api";
import { useEffect, useState } from "react";

const useCount = () => {
    const [totalNews , setTotalNews] = useState(0)
    const [totalUser , setTotalUser] = useState(0)

    useEffect(()=>{
        axiosPublic.get('/allCounts')
        .then(res => {
            setTotalNews(res?.data?.totalNews)
            setTotalUser(res?.data?.totalUser)
        })
        
    },[])
    return (
       {totalNews , totalUser}
    );
};

export default useCount;