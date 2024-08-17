"use client"
import {useState} from "react";
import {PencilIcon} from "@heroicons/react/16/solid";
import {
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    Button,
    useDisclosure,
    Image,
    image
} from "@nextui-org/react";
import FileInput from "@/app/components/fileUpload";
import {uploadAvatar} from "@/lib/upload";
import {updateAvatarUrl} from "@/lib/actions/user";
import {useRouter} from "next/navigation";


interface IProps {
    userId: string
}


const UploadAvatar = ({userId}: IProps) => {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const [imageUrl, setImageUrl] = useState<File>();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();

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
                                <Button isLoading={isSubmitting} color="primary" onPress={async () => {
                                    setIsSubmitting(true)
                                    if (!imageUrl) {
                                        onClose()
                                        return
                                    }
                                    const avatarUtl = await uploadAvatar(imageUrl);

                                    const result = await updateAvatarUrl(avatarUtl, userId);

                                    router.refresh()

                                    setIsSubmitting(false)
                                    onClose()
                                }}>
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