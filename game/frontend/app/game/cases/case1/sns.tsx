'use client';

import { useState } from 'react';
import Image from 'next/image';

const images = [
  '/images/cases/case1/sns1.png',
  '/images/cases/case1/sns2.png',
  '/images/cases/case1/sns3.png',
  '/images/cases/case1/sns4.png',
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
          [SNS 기록] 사건 전후 민지의 SNS 활동입니다.
        </p>

        <div className="relative flex items-center justify-center">
  {/* 왼쪽 버튼 */}
          <button
            onClick={prev}
            className="absolute left-1/2 -translate-x-[180px] z-10
                      px-3 py-2 bg-black/50 text-white rounded-full
                      hover:bg-black/70"
          >
            ◀
          </button>

          {/* 이미지 */}
          <Image
            src={images[index]}
            alt={`SNS 기록 ${index + 1}`}
            width={250}
            height={150}
            className="rounded-lg"
          />

          {/* 오른쪽 버튼 */}
          <button
            onClick={next}
            className="absolute left-1/2 translate-x-[140px] z-10
                      px-3 py-2 bg-black/50 text-white rounded-full
                      hover:bg-black/70"
          >
            ▶
          </button>
        </div>

      </div>

  );
}
