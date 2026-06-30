"use client";

import Image from "next/image";

export function NevitubbiesBlock() {
  return (
    <div className="my-3 w-full max-w-[260px] md:max-w-xs">
      <p className="mb-2 text-center text-base font-bold text-[#6b4c9a] md:text-lg">
        et les <span className="text-[#e05090]">Névitubbies</span>
      </p>
      <div className="overflow-hidden rounded-2xl border-[3px] border-white shadow-lg">
        <Image
          src="/images/nevitubbies.png"
          alt="Les Névitubbies"
          width={400}
          height={300}
          className="h-auto w-full"
        />
      </div>
    </div>
  );
}
