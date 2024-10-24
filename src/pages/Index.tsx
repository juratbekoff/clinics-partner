import {useGetPartnerInfoStore} from "../hooks/useZustand.ts";
import ClinicsList from "./clinics/List.tsx";
import {Navigate} from "react-router-dom";

const Index = () => {
    const {subscription} = useGetPartnerInfoStore()

    if (subscription === "FREE") {
        return <Navigate to={"/clinics"}/>
    }

    if (subscription === "START" || subscription === "FULL") {
        return <Navigate to={"/services"}/>
    }

    return <ClinicsList/>
};

export default Index;