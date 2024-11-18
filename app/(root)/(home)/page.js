import Image from "next/image";
import Edge from "@/components/Edge";
const Home = () => {
  return (
    <section className="relative flex size-full flex-col gap-10">
      <Edge />
      <h1 className="text-3xl font-bold">
        خانه
      </h1>
    </section>
  );
};
export default Home;
