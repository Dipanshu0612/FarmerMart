import Image from "next/image";

export default function Home() {
  return (
    <>
      <div className="flex items-center justify-center flex-1 text-center p-2">
        <div className="flex items-center justify-center w-[50%] h-full">
          <Image src="/Home.png" alt="Home" width={900} height={500} />
        </div>
        <div className="flex items-center justify-center w-[50%] h-full flex-col">
          <h1>Welcome to the Local Marketplace</h1>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem fuga, accusamus ipsam provident labore error tenetur illo unde id nemo. Nisi quaerat et modi fuga, minima nemo vero corporis ea dolorem asperiores debitis, iste alias praesentium aspernatur perferendis temporibus, expedita quibusdam eligendi maxime libero incidunt.</p>
        </div>
      </div>
    </>
  );
}
