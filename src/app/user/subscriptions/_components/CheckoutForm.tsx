import {Button, Modal, ModalBody, ModalContent, ModalHeader} from "@nextui-org/react";
import {AddressElement, PaymentElement, useElements, useStripe} from "@stripe/react-stripe-js";
import {FormEvent, useState} from "react";
import {toast} from "react-toastify";

interface Props {
    show: boolean;
    setShow: (show: boolean) => void;
}


const CheckoutForm = (props: Props) => {
    const [isLoading, setIsLoading] = useState(false);
    const stripe = useStripe();
    const elements = useElements();
    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            setIsLoading(true);
            if (!elements || !stripe)
                return;

           const result =  await stripe?.confirmPayment({
                elements, confirmParams: {
                    return_url: 'http://localhost:3000/user/profile'
                },
                redirect: 'if_required'
            });
           if(result.error){
               toast.error(result.error.message);
           }else {
               toast.success("Payment Successful.");
           }
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <Modal isOpen={props.show} onOpenChange={() => props.setShow(false)}>
            <ModalContent>
                <ModalHeader>Complete your subscription purchase</ModalHeader>
                <ModalBody>
                    <form onSubmit={handleSubmit}>
                        <PaymentElement/>
                        <AddressElement options={{
                            mode: "shipping",
                            allowedCountries: ["US"]
                        }}/>

                        <div className="flex justify-center gap-3 mt-5">
                            <Button isDisabled={isLoading} onClick={() => props.setShow(false)} color="danger"
                                    variant="light">Cancel</Button>
                            <Button isLoading={isLoading} color="primary" type="submit">Pay</Button>
                        </div>
                    </form>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};

export default CheckoutForm;