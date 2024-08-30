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
}


const UploadFile = (props: IProps) => {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const [imageUrl, setImageUrl] = useState<File>();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();

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
                                {imageUrl && <Image src={URL.createObjectURL(imageUrl)} alt="img"/>}
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Close
                                </Button>
                                <Button isLoading={isSubmitting} color="primary" onPress={async () => {
                                    setIsSubmitting(true)
                                    if (!imageUrl) {
                                        onClose()
                                        return
                                    }
                                    const badgeUrl = await uploadBadge(imageUrl);

                                    const result = await updateBadgeUrl(badgeUrl, 1);

                                    router.refresh()

                                    setIsSubmitting(false)
                                    onClose()
                                }}>
                                    Change Badge
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