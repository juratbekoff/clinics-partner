import ClinicGeneralForm from "../../components/forms/clinics/clinic-general.tsx";
import Navbar from "../../components/navbar.tsx";

const CreateClinic = () => {
    return (
        <>
            <Navbar name={"Create clinic"}/>

            <ClinicGeneralForm action={"CREATE"}/>
        </>
    );
};

export default CreateClinic;