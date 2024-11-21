import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import Image from "next/image";
import { cn } from "@/lib/utils";
const MeetingModal = ({ isOpen, onClose, title, className, children, buttonText, handleClick, image, buttonIcon }) => {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className={'flex w-full max-w-[520px] bg-dark-1 flex-col gap-6 border-none px-6 py-9 text-white'}>
                <div className="flex flex-col gap-6 ">
                    {image && (
                        <div className="flex justify-center">
                            <Image src={image} alt="image" width={72} height={72} />
                        </div>
                    )}
                    <h1 className={cn('text-3xl font-bold leadin-[42px] ', className)}>{title}</h1>
                    {children}
                    <Button className="bg-white text-dark-2 hover:bg-gray-300 transition-all duration-500 ring-0" onClick={handleClick}>
                        {buttonIcon && (
                            <Image src={buttonIcon} alt="button icon" width={13} height={13} />
                        )} &nbsp;
                        {buttonText || 'برنامه‌ریزی گفتگو'}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}
export default MeetingModal