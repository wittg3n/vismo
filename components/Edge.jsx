import Image from "next/image";

const Edge = () => {
    return (
        <div className="relative">

            <div
                className="absolute top-[-45px] right-[-25px] hidden md:block"
                style={{ userSelect: "none", pointerEvents: "none" }}
            >
                <Image
                    src={"/icons/edge.svg"}
                    width={20}
                    height={20}
                    alt="edge"
                    draggable={false}
                />
            </div>
        </div>
    );
};

export default Edge;
