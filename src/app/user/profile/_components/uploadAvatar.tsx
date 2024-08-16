"use client"
import {useState} from "react";
import {PencilIcon} from "@heroicons/react/16/solid";
import {Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Button, useDisclosure, Image} from "@nextui-org/react";
import FileInput from "@/app/components/fileUpload";


const UploadAvatar = () => {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const [imageUrl, setImageUrl] = useState<File>();

    return (
        <div>
            <button onClick={onOpen}>
                <PencilIcon className="w-6 text-slate-400 hover:text-slate-600 transition-colors"/>
            </button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Upload avatar</ModalHeader>
                            <ModalBody>
                               <FileInput onChange={e => setImageUrl((e as any).target.files[0])}/>
                                {imageUrl && <Image src={URL.createObjectURL(imageUrl)} alt="img"/>}
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Close
                                </Button>
                                <Button color="primary" onPress={onClose}>
                                    Change Avatar
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </div>
    );
};

export default UploadAvatar;