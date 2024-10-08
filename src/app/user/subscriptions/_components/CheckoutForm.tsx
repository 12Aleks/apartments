import {Button, Modal, ModalBody, ModalContent, ModalHeader} from "@nextui-org/react";
import {PaymentElement} from "@stripe/react-stripe-js";

interface Props{
    show: boolean;
    setShow: (show: boolean) => void;
}


const CheckoutForm = (props: Props) => {
    return (
        <Modal isOpen={props.show}>
            <ModalContent>
                <ModalHeader>Complete your subscription purchase</ModalHeader>
                <ModalBody>
                    <PaymentElement />
                    <form>
                        <div className="flex justify-center gap-3">
                            <Button onClick={() => props.setShow(false)} color="danger" variant="light">Cancel</Button>
                            <Button color="primary" type="submit">Pay</Button>
                        </div>
                    </form>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};

export default CheckoutForm;