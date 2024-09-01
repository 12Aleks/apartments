"use client";
import { useState } from "react";
import { PlusCircleIcon } from "@heroicons/react/16/solid";
import {
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    Button,
    useDisclosure,
    Image
} from "@nextui-org/react";
import FileInput from "@/app/components/fileUpload";
import {uploadBadge} from "@/lib/upload";
import {useRouter} from "next/navigation";
import {updateBadgeUrl} from "@/lib/actions/unit";


interface IProps {
    unitId?: string
    setBadgeImage: (badgeImage: File) => void
}


const UploadFile = (props: IProps) => {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const [imageUrl, setImageUrl] = useState<File>();
    const [isSubmitting, setIsSubmitting] = useState(false);


    return (
        <div>
            <button type="button" onClick={onOpen} className="absolute z-10 top-0 right-0">
                <PlusCircleIcon className="w-8 text-gray-400 hover:text-gray-600 transition-colors"/>
            </button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Upload unit badge</ModalHeader>
                            <ModalBody>
                                <FileInput onChange={e => setImageUrl((e as any).target.files[0])}/>
                            </ModalBody>
                            <ModalFooter>
                                <Button isLoading={isSubmitting} color="primary" onPress={async () => {
                                    imageUrl && props.setBadgeImage(imageUrl);
                                    onClose()
                                }}>
                                    Save Badge
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </div>
    );
};

export default UploadFile;