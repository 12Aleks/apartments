"use client";
import {deleteProperty} from "@/lib/actions/property";
import {Modal, ModalBody, ModalHeader, ModalContent, ModalFooter, Button} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import {useState , useEffect} from 'react';

interface Props {
    params: { id: string };
}

const ModalDeletePropertyPage = ({params}: Props) => {
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();

    useEffect(() => {
        setIsOpen(true);
    }, []);

    const handldeDelete = async () => {
        try {
            await deleteProperty(Number(params.id));

            router.push("/user/properties");

            setIsOpen(false);
        } catch (e) {
            throw e;
        }
    };

    const handleCancel = () => {
        router.push("/user/properties");
        setIsOpen(false);
    };

    return (
        <Modal isOpen={isOpen} onOpenChange={handleCancel}>
            <ModalContent>
                <ModalHeader>Delete Property</ModalHeader>
                <ModalBody>
                    <p className="text-xl mb-4">Are you sure you want to delete this property?</p>
                </ModalBody>
                <ModalFooter>
                    <Button onClick={handleCancel}>Cancel</Button>
                    <Button onClick={handldeDelete} color="danger">Delete</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default ModalDeletePropertyPage;