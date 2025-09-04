import React from 'react';
import { useAppStore } from '../../store/useAppStore';
import { TabBar } from './TabBar';
import { ImageTab } from './ImageTab';
import { VideoTab } from './VideoTab';
import { AudioTab } from './AudioTab';

export const MainContent: React.FC = () => {
  const { scriptData, activeSceneIndex, activeTab, setActiveTab } = useAppStore();

  if (!scriptData) {
    return (
      <div className="flex-1 flex items-center justify-center bg-dark-bg">
        <div className="text-center card-dark p-8 rounded-lg max-w-md">
          <svg
            className="mx-auto h-12 w-12 text-text-muted mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
            />
          </svg>
          <p className="text-text-primary text-lg font-medium mb-2">JSON 파일을 업로드하여 시작하세요</p>
          <p className="text-sm text-text-secondary">
            헤더의 업로드 버튼을 클릭하거나 파일을 드래그하여 업로드할 수 있습니다.
          </p>
        </div>
      </div>
    );
  }

  const currentScene = scriptData.output.timeline[activeSceneIndex];

  if (!currentScene) {
    return (
      <div className="flex-1 flex items-center justify-center bg-dark-bg">
        <p className="text-text-secondary">선택된 씬이 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-dark-bg">
      <div className="px-6 py-4 bg-dark-card border-b border-dark-border">
        <h2 className="text-lg font-semibold text-text-primary">
          Scene {activeSceneIndex + 1} - {currentScene.timestamp}
        </h2>
      </div>
      
      <TabBar activeTab={activeTab} onTabChange={setActiveTab} />
      
      <div className="flex-1 p-6 overflow-y-auto bg-dark-bg">
        {activeTab === 'image' && (
          <ImageTab scene={currentScene} sceneIndex={activeSceneIndex} />
        )}
        {activeTab === 'video' && (
          <VideoTab scene={currentScene} sceneIndex={activeSceneIndex} />
        )}
        {activeTab === 'audio' && (
          <AudioTab scene={currentScene} sceneIndex={activeSceneIndex} />
        )}
      </div>
    </div>
  );
};