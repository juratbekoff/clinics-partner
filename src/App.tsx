import {Route, Routes} from "react-router-dom";
import {AuthChecker} from "@/middlewares/AuthChecker.tsx";
import RootLayout from "@/layouts/RootLayout.tsx";
import {Bookings, Employees, Folders, Reviews, Services, Subscription, SubServices} from "./pages";
import AuthLayout from "@/layouts/AuthLayout.tsx";
import SettingsLayout from "./layouts/SettingsLayout.tsx";
import AuthForm from "./components/forms/auth.tsx";
import EmployeesLayout from "./layouts/EmployeesLayout.tsx";
import React, {useEffect} from "react";
import ClinicsList from "./pages/clinics/List.tsx";
import ClinicAuth from "./pages/clinics/Auth.tsx";
import EditClinic from "./pages/clinics/EditClinic.tsx";
import Profile from "./pages/Profile.tsx";
import {useGetPartnerInfo} from "./hooks/usePartner.ts";
import {PartnerType} from "./types";
import {useGetPartnerInfoStore} from "./hooks/useZustand.ts";
import Forbidden from "./pages/Forbidden.tsx";
import PermChecker from "./middlewares/PermChecker.tsx";

function App() {
    const getPartnerInfoQuery = useGetPartnerInfo();
    const partnerInfo: PartnerType = getPartnerInfoQuery.data?.data?.info

    const {setPartnerInfo, setIsLoading} = useGetPartnerInfoStore()

    useEffect(() => {
        if (getPartnerInfoQuery.isLoading) {
            setIsLoading?.(true)
        }

        if (getPartnerInfoQuery.isSuccess) {
            setIsLoading?.(false)
        }

        if (partnerInfo) {
            setPartnerInfo(partnerInfo);
        }
    }, [partnerInfo]);

    return (
        <Routes>
            <Route
                element={
                    <AuthChecker>
                        <PermChecker>
                            <RootLayout/>
                        </PermChecker>
                    </AuthChecker>
                }
            >
                <Route index element={<ClinicsList/>}/>
                <Route path={"bookings"} element={<Bookings/>}/>
                <Route path={"services"} element={<Services/>}/>

                <Route element={<EmployeesLayout/>}>
                    <Route path={"employees"} element={<Employees/>}/>
                    <Route path={"folder"} element={<Folders/>}/>
                </Route>

                {/*<Route path={"clinics/create"} element={<CreateClinic/>}/>*/}
                <Route path={"clinics/edit/:clinicId"} element={<EditClinic/>}/>

                <Route path={"reviews"} element={<Reviews/>}/>
                <Route path={"sub-services/:clinicServiceId"} element={<SubServices/>}/>

                <Route path={"settings"} element={<SettingsLayout/>}>
                    <Route path={"profile"} element={<Profile/>}/>
                    <Route path={"subscriptions"} element={<Subscription/>}/>
                </Route>

                <Route path={"*"} element={<h1>404</h1>}/>
            </Route>

            <Route path={"/auth"} element={<AuthLayout/>}>
                <Route path={"step-1"} element={<AuthForm/>}/>
                <Route path={"step-2"} element={<ClinicAuth/>}/>
            </Route>

            <Route path={"/403"} element={<Forbidden/>}/>
        </Routes>
    );
}

export default App;