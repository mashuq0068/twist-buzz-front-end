"use client"
import { axiosPublic } from "@/axios/api";
import { useEffect, useState } from "react";

const Searchbar = ({ setAllNews, setIsLoading }) => {
    const [searchedText, setSearchedText] = useState("")
    const [isSearchDone, setIsSearchDone] = useState(false)

    const fetchSearchedNews = () => {
       
        if (searchedText) {

            return (
                axiosPublic.get(`/searchedNews?searchedText=${searchedText}`)
                    .then(res => {

                        setAllNews(res?.data)
                        setIsLoading(false)



                    })
                    .catch(error => {
                        console.error(error?.message)
                    })
            )
        }
     


    }
    useEffect(() => {
        fetchSearchedNews()
       
    }, [searchedText])


    const handleSearch = (e) => {
        e.preventDefault()
        setSearchedText(e.target.search.value)


    }
    return (
        <div className="container bg-gradient-to-r from-gray-100 via-[#bce1ff] to-gray-100  flex justify-center md:h-[300px] h-[200px] md:px-0 px-9 items-center">

            <form onSubmit={handleSearch} className="absolute flex justify-center items-center">
                <input placeholder="Search your news" name="search" className="input-form border-none focus:border-gray-200 border-white drop-shadow-md shadow-md focus:shadow-xl" type="text" />
                <button className="px-8 py-2 cursor-pointer h-full  rounded-md absolute right-0 text-white bg-neutral transition duration-300 ease-in-out"><svg className="svg-icon-search" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19.0008 19.0008L13.8038 13.8038M13.8038 13.8038C15.2104 12.3972 16.0006 10.4895 16.0006 8.50028C16.0006 6.51108 15.2104 4.60336 13.8038 3.19678C12.3972 1.79021 10.4895 1 8.50028 1C6.51108 1 4.60336 1.79021 3.19678 3.19678C1.79021 4.60336 1 6.51108 1 8.50028C1 10.4895 1.79021 12.3972 3.19678 13.8038C4.60336 15.2104 6.51108 16.0006 8.50028 16.0006C10.4895 16.0006 12.3972 15.2104 13.8038 13.8038V13.8038Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                </button>
            </form>
        </div>
    );
};

export default Searchbar;