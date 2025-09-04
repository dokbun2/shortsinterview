import React from 'react';
import type { TabType } from '../../types/script.types';

interface TabBarProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

export const TabBar: React.FC<TabBarProps> = ({ activeTab, onTabChange }) => {
  const tabs: { id: TabType; label: string }[] = [
    { id: 'image', label: '이미지' },
    { id: 'video', label: '영상' },
    { id: 'audio', label: '오디오' },
  ];

  return (
    <div className="flex gap-2 px-6 py-3 bg-dark-card border-b border-dark-border">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
            activeTab === tab.id
              ? 'bg-accent-blue text-white'
              : 'bg-dark-bg text-text-secondary hover:bg-dark-hover hover:text-text-primary'
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};