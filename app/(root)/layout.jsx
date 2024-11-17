'use client'
import Image from "next/image"

const rootLayout = ({ children }) => {
  return (
    <main>
      <div className="absolute top-[-45px] right-[-25px]">
        <Image
          src={"/icons/edge.svg"}
          width={20}
          height={20}
          alt="edge"
        />
      </div>
      {children}
    </main>
  )
}
export default rootLayout