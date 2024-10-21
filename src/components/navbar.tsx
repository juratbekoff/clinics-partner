import ClinicDropdown from "./clinic-dropdown.tsx";

const Navbar = ({name}: { name: string }) => {

    return (
        <>
            <div
                className={
                    "flex justify-between items-center shadow rounded-sm bg-white p-3 mt-3"
                }
            >
                <div className="flex flex-col gap-[2px]">
                    <h1 className={"text-base font-medium"}>{name}</h1>
                </div>
                
                <ClinicDropdown/>
            </div>

        </>
    )
};

export default Navbar;
