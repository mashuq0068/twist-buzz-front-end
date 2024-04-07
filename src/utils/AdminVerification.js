"use client"
import useAdmin from "@/hooks/useAdmin";
import { AuthContext } from "@/providers/AuthProvider";
import { useRouter } from "next/navigation";
import { useContext } from "react";


const AdminVerification = ({children}) => {
    const isAdmin = useAdmin()
    const {loading} = useContext(AuthContext)
    const router = useRouter()
    if(loading){
        return <span className="loading loading-bars fixed top-[50vh] left-[50vw] loading-lg"></span>
    }
     if(isAdmin){
        return children
     }
     else {
        return router.push('/')
     }
};

export default AdminVerification;