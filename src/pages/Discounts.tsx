import {Button} from "../components/ui/button.tsx";
import StateShower from "../components/cards/state-shower.tsx";
import {DialogModal} from "../components/ui/dialog.tsx";
import {useCreateDiscountModal} from "../hooks/useZustand.ts";
import {useGetDiscounts} from "../hooks/useDiscounts.ts";
import {DiscountType} from "../types/discount";
import DiscountsTable from "../components/tables/discounts.tsx";
import Navbar from "../components/navbar.tsx";
import {DiscountForm} from "../components/forms/discount.tsx";

const Discounts = () => {
    const getDiscountsQuery = useGetDiscounts()
    const foldersData: DiscountType[] = getDiscountsQuery?.data?.data?.discounts

    const createDiscountModal = useCreateDiscountModal()

    if (getDiscountsQuery.isLoading) {
        return <StateShower id={"loading"} name={"Loading..."}/>
    }

    return (
        <>
            <DialogModal isOpen={createDiscountModal.isOpen} onClose={createDiscountModal.onClose}>
                <DiscountForm action={"CREATE"}/>
            </DialogModal>

            <Navbar name={"Discounts"}/>

            <div className={"flex justify-end"}>
                <Button onClick={createDiscountModal.onOpen}>Create discount +</Button>
            </div>

            {
                foldersData?.length === 0
                    ? <StateShower id={"no_data"} name={"No Discounts found!"}/>
                    : <DiscountsTable data={foldersData}/>
            }
        </>
    );
};

export default Discounts;