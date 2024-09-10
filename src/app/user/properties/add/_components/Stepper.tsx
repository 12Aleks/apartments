import { cn } from "@nextui-org/react";

interface Props {
    items: { label: string }[];
    activeItem: number;
    setActiveItem: (index: number) => void;
    className?: string;
}

const Stepper = (props: Props) => {
    return (
        <div className={cn("flex items-center justify-around ps-3 pe-3 pt-4", props.className)}>
            {props.items.map((item, index) => (
                <div key={index} className={ cn("flex items-center", { "w-full" : index <= 3})}>
                    <div className="flex flex-col items-center">
                        <div
                            className={cn("rounded-full w-6 h-6 flex justify-center items-center transition", {
                                "bg-primary-400 text-white": index === props.activeItem,
                                "bg-gray-400 text-white": index > props.activeItem,
                                "bg-primary-600 text-white": index < props.activeItem,
                                "cursor-pointer": index <= props.activeItem,
                            })}
                            {...(index < props.activeItem ? { onClick: () => props.setActiveItem(index) } : {})}
                        >
                            {index + 1}
                        </div>
                        <p className="text-xs uppercase pt-2 tracking-wider">{item.label}</p>
                    </div>
                    {index !== props.items.length  - 1  && (
                        <div
                            className={cn(
                                "border h-0 w-full -mt-5 relative after:absolute after:left-0 after:top-0 after:border after:transition-all after:duration-300 after:ease-in",
                                {
                                    "after:w-full after:border-primary-400": index < props.activeItem,
                                    "after:w-0": index >= props.activeItem,
                                }
                            )}
                        ></div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default Stepper;
