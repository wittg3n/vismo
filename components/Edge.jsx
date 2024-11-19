import Image from "next/image";

const Edge = () => {
    return (
        <section className="relative flex size-full flex-col gap-10">

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
        </section>
    );
};

export default Edge;
