'use client';

import { useState } from 'react';
import Image from 'next/image';

const images = [
  '/images/cases/case1/hwp1.png',
  '/images/cases/case1/hwp2.png',
  '/images/cases/case1/hwp3.png',
  '/images/cases/case1/hwp4.png',
];

export default function Case1SNS() {
  const [index, setIndex] = useState(0);

  const prev = () => {
    setIndex((i) => (i === 0 ? images.length - 1 : i - 1));
  };

  const next = () => {
    setIndex((i) => (i === images.length - 1 ? 0 : i + 1));
  };

  return (
      <div className="w-full h-full m-8 flex flex-col justify-center -translate-y-8">
        <p className="mb-4 text-sm text-gray-300 text-center">
          [문서 기록] 사건과 관련된 민지의 자료들입니다.
        </p>

       <div className="relative w-[500px] h-[400px] flex items-center justify-center translate-x-35">
  {/* 왼쪽 버튼 */}
          <button
            onClick={prev}
            className="absolute left-1/2 -translate-x-[310px] z-10
                      px-3 py-2 bg-black/50 text-white rounded-full
                      hover:bg-black/70"
          >
            ◀
          </button>

          {/* 이미지 */}
           <Image
              src={images[index]}
              alt={`문서 기록 ${index + 1}`}
              fill
              className="object-contain rounded-lg"
            />

          {/* 오른쪽 버튼 */}
          <button
            onClick={next}
            className="absolute left-1/2 translate-x-[270px] z-10
                      px-3 py-2 bg-black/50 text-white rounded-full
                      hover:bg-black/70"
          >
            ▶
          </button>
        </div>

      </div>

  );
}
