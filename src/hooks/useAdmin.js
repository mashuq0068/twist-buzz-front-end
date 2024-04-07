import { AuthContext } from "@/providers/AuthProvider";
import { useAmp } from "next/amp";
import { useContext } from "react";


const useAdmin = () => {
    const { user , loading } = useContext(AuthContext)
    if(loading){
        return false
    }
    if ( user?.email === "mashuq0068@gmail.com") {
        return true
    }
    else {
        return false
    }
};

export default useAdmin;