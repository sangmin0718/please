'use client';

import { useState } from 'react';
import Image from 'next/image';
import DocumentContent, { TAB_NAME as DOC_NAME } from './components/DocumentContent';
import SNSContent, { TAB_NAME as SNS_NAME } from './components/SNSContent';
import VideoContent, { TAB_NAME as VIDEO_NAME } from './components/VideoContent';
import EtcContent, { TAB_NAME as ETC_NAME } from './components/EtcContent';

type TabType = 'document' | 'sns' | 'video' | 'etc';

export default function GameScreen() {
  const [currentTab, setCurrentTab] = useState<TabType>('document');
  const [isGameStarted, setIsGameStarted] = useState(false); // 게임 시작 상태 추가
  const [caseNumber] = useState(1); // 사건번호 상태

  const gilty = () => {
    alert("gilty!!!")
  }
  
  const innocent = () => {
    alert("innocent!!!")
  }

  const renderContent = () => {
    // 게임이 시작되지 않았으면 사건번호 표시
    if (!isGameStarted) {
      return (
        <div className="w-full h-full flex items-center justify-center">
          <h2 className="text-4xl font-bold" style={{ fontFamily: 'var(--font-bm)' }}>
            사건번호 {caseNumber}
          </h2>
        </div>
      );
    }

    // 게임 시작 후 탭별 콘텐츠 표시
    switch(currentTab) {
      case 'document':
        return <DocumentContent />;
      case 'sns':
        return <SNSContent />;
      case 'video':
        return <VideoContent />;
      case 'etc':
        return <EtcContent />;
      default:
        return <DocumentContent />;
    }
  };

  return (
    <div className="w-screen h-screen bg-black flex items-center justify-center overflow-hidden">
      <div 
        className="relative"
        style={{
          width: '100vw',
          height: '56.25vw',
          maxHeight: '100vh',
          maxWidth: '177.78vh',
        }}
      >
        <Image 
          src="/images/game-background.png"
          alt="Game Background"
          fill
          className="object-contain select-none pointer-events-none"
          priority
          quality={100}
        />

        {/* 중앙 콘텐츠 영역 */}
        <div className="absolute" style={{
          top: '11.8%',
          left: '31.7%',
          width: '58.4%',
          height: '73%',
          clipPath: 'polygon(0 0, 100% 0, 100% 100%, 13.4% 100%, 0 81%)'
        }}>
          {renderContent()}
        </div>

        {/* 4개의 메뉴 버튼 - 게임 시작 전에는 클릭 불가 */}
        <button
          onClick={() => isGameStarted && setCurrentTab('document')}
          disabled={!isGameStarted}
          className={`absolute transition-all duration-300
            ${!isGameStarted ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}
            ${currentTab === 'document' && isGameStarted ? 'bg-black/25' : ''}`}
          style={{
            top: '17%',
            right: '6.8%',
            width: '3%',
            height: '15%',
            writingMode: 'vertical-rl',
            fontSize: '1.2vw',
            fontFamily: 'var(--font-bm)',
            clipPath: 'polygon(0 0, 100% 10%, 100% 90%, 0% 100%)',
          }}
        >
          {DOC_NAME}
        </button>
        <button
          onClick={() => isGameStarted && setCurrentTab('sns')}
          disabled={!isGameStarted}
          className={`absolute transition-all duration-300
            ${!isGameStarted ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}
            ${currentTab === 'sns' && isGameStarted ? 'bg-black/25' : ''}`}
          style={{
            top: '33.8%',
            right: '6.8%',
            width: '3%',
            height: '15%',
            writingMode: 'vertical-rl',
            fontSize: '1.2vw',
            fontFamily: 'var(--font-bm)',
            clipPath: 'polygon(0 0, 100% 10%, 100% 90%, 0% 100%)',
          }}
        >
          {SNS_NAME}
        </button>

        <button
          onClick={() => isGameStarted && setCurrentTab('video')}
          disabled={!isGameStarted}
          className={`absolute transition-all duration-300
            ${!isGameStarted ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}
            ${currentTab === 'video' && isGameStarted ? 'bg-black/25' : ''}`}
          style={{
            top: '50.3%',
            right: '6.8%',
            width: '3%',
            height: '15%',
            writingMode: 'vertical-rl',
            fontSize: '1.2vw',
            fontFamily: 'var(--font-bm)',
            clipPath: 'polygon(0 0, 100% 10%, 100% 90%, 0% 100%)',
          }}
        >
          {VIDEO_NAME}
        </button>
        <button
          onClick={() => isGameStarted && setCurrentTab('etc')}
          disabled={!isGameStarted}
          className={`absolute transition-all duration-300
            ${!isGameStarted ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}
            ${currentTab === 'etc' && isGameStarted ? 'bg-black/25' : ''}`}
          style={{
            top: '67.3%',
            right: '6.8%',
            width: '3%',
            height: '15%',
            writingMode: 'vertical-rl',
            fontSize: '1.2vw',
            fontFamily: 'var(--font-bm)',
            clipPath: 'polygon(0 0, 100% 10%, 100% 90%, 0% 100%)',
          }}
        >
          {ETC_NAME}
        </button>

        {/* 유죄 무죄 버튼 - 게임 시작 전에는 클릭 불가 */}
        <button
          onClick={gilty}
          disabled={!isGameStarted}
          className={`absolute transition-all duration-300
            ${!isGameStarted ? 'cursor-not-allowed opacity-50' : 'cursor-pointer hover:shadow-[0_0_20px_rgba(255,255,255,0.8)] hover:brightness-110'}`}
          style={{
            top: '57.7%',
            right: '84.1%',
            width: '10.3%',
            height: '6.4%'
          }}
        />
        <button
          onClick={innocent}
          disabled={!isGameStarted}
          className={`absolute transition-all duration-300
            ${!isGameStarted ? 'cursor-not-allowed opacity-50' : 'cursor-pointer hover:shadow-[0_0_20px_rgba(255,255,255,0.8)] hover:brightness-110'}`}
          style={{
            top: '57.7%',
            right: '72.4%',
            width: '10.3%',
            height: '6.4%'
          }}
        />

        {/* 4개의 메뉴 버튼 (오른쪽) - 게임 시작 전에는 클릭 불가 */}
        <button
          onClick={() => isGameStarted && setCurrentTab('document')}
          disabled={!isGameStarted}
          className={`absolute transition-all duration-300
            ${!isGameStarted ? 'cursor-not-allowed opacity-50' : 'cursor-pointer hover:brightness-110'}
            ${currentTab === 'document' && isGameStarted ? 'brightness-125' : ''}`}
          style={{
            top: '15%',
            right: '2%',
            width: '7%',
            height: '12%'
          }}
        />
        <button
          onClick={() => isGameStarted && setCurrentTab('sns')}
          disabled={!isGameStarted}
          className={`absolute transition-all duration-300
            ${!isGameStarted ? 'cursor-not-allowed opacity-50' : 'cursor-pointer hover:brightness-110'}
            ${currentTab === 'sns' && isGameStarted ? 'brightness-125' : ''}`}
          style={{
            top: '30%',
            right: '2%',
            width: '7%',
            height: '12%'
          }}
        />
        <button
          onClick={() => isGameStarted && setCurrentTab('video')}
          disabled={!isGameStarted}
          className={`absolute transition-all duration-300
            ${!isGameStarted ? 'cursor-not-allowed opacity-50' : 'cursor-pointer hover:brightness-110'}
            ${currentTab === 'video' && isGameStarted ? 'brightness-125' : ''}`}
          style={{
            top: '45%',
            right: '2%',
            width: '7%',
            height: '12%'
          }}
        />
        <button
          onClick={() => isGameStarted && setCurrentTab('etc')}
          disabled={!isGameStarted}
          className={`absolute transition-all duration-300
            ${!isGameStarted ? 'cursor-not-allowed opacity-50' : 'cursor-pointer hover:brightness-110'}
            ${currentTab === 'etc' && isGameStarted ? 'brightness-125' : ''}`}
          style={{
            top: '60%',
            right: '2%',
            width: '7%',
            height: '12%'
          }}
        />

        {/* 게임 시작 버튼 (예시) - 필요시 추가 */}
        {!isGameStarted && (
          <button
            onClick={() => setIsGameStarted(true)}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 translate-y-10 px-8 py-4 bg-white text-black font-bold rounded hover:bg-gray-200"
            style={{ fontFamily: 'var(--font-bm)' }}
          >
            게임 시작
          </button>
        )}
      </div>
    </div>
  );
}
