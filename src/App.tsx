import {Route, Routes} from "react-router-dom";
import {AuthChecker} from "@/middlewares/AuthChecker.tsx";
import RootLayout from "@/layouts/RootLayout.tsx";
import {Bookings, Employees, Folders, Reviews, Services, Subscription, SubServices, Transactions} from "./pages";
import AuthLayout from "@/layouts/AuthLayout.tsx";
import SubsLayout from "./layouts/SubsLayout.tsx";
import AuthForm from "./components/forms/auth.tsx";
import EmployeesLayout from "./layouts/EmployeesLayout.tsx";
import React from "react";
import ClinicsList from "./pages/clinics/List.tsx";
import ClinicAuth from "./pages/clinics/Auth.tsx";
import CreateClinic from "./pages/clinics/CreateClinic.tsx";
import EditClinic from "./pages/clinics/EditClinic.tsx";

function App() {
    return (
        <Routes>
            {/* Root layout */}
            <Route
                element={
                    <AuthChecker>
                        <RootLayout/>
                    </AuthChecker>
                }
            >
                <Route index element={<Services/>}/>
                <Route path={"bookings"} element={<Bookings/>}/>

                <Route element={<EmployeesLayout/>}>
                    <Route path={"employees"} element={<Employees/>}/>
                    <Route path={"folder"} element={<Folders/>}/>
                </Route>

                <Route path={"clinics"} element={<ClinicsList/>}/>
                <Route path={"clinics/create"} element={<CreateClinic/>}/>
                <Route path={"clinics/edit/:clinicId"} element={<EditClinic/>}/>

                <Route path={"reviews"} element={<Reviews/>}/>
                <Route path={"sub-services/:clinicServiceId"} element={<SubServices/>}/>

                <Route element={<SubsLayout/>}>
                    <Route path={"subscriptions"} element={<Subscription/>}/>
                    <Route path={"transactions"} element={<Transactions/>}/>
                </Route>

                <Route path={"*"} element={<h1>404</h1>}/>
            </Route>

            <Route path={"/auth"} element={<AuthLayout/>}>
                <Route path={"step-1"} element={<AuthForm/>}/>
                <Route path={"step-2"} element={<ClinicAuth/>}/>
            </Route>
        </Routes>
    );
}

export default App;