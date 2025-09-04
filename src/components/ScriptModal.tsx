import React from 'react';
import { useAppStore } from '../store/useAppStore';
import { CopyButton } from './CopyButton';

interface ScriptModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ScriptModal: React.FC<ScriptModalProps> = ({ isOpen, onClose }) => {
  const { scriptData } = useAppStore();

  if (!isOpen || !scriptData) return null;

  // 전체 나레이션 텍스트 생성 (순수 텍스트만)
  const fullScript = scriptData.output.timeline
    .map((scene) => scene.dialogue)
    .join('\n\n');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-75"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-dark-card rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-dark-border flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-white">전체 대본</h2>
            <p className="text-sm text-gray-400 mt-1">
              {scriptData.output.title} - 총 {scriptData.output.timeline.length}개 씬
            </p>
          </div>
          <div className="flex items-center gap-2">
            <CopyButton text={fullScript} className="!px-4 !py-2" />
            <button
              onClick={onClose}
              className="p-2 hover:bg-dark-hover rounded-lg transition-colors"
            >
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="space-y-6">
            {scriptData.output.timeline.map((scene, index) => (
              <div key={index} className="bg-gray-900 rounded-lg p-4 border border-gray-700">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <span className="px-2.5 py-1 bg-accent-blue/20 text-accent-blue text-xs font-bold rounded">
                      Scene {index + 1}
                    </span>
                    <span className="text-sm text-gray-400">{scene.timestamp}</span>
                  </div>
                  <CopyButton text={scene.dialogue} className="!text-xs !px-2 !py-1" />
                </div>
                <p className="text-white leading-relaxed whitespace-pre-wrap">
                  {scene.dialogue}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-dark-border bg-dark-hover/50">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-400">
              총 {fullScript.split(' ').length}개 단어 · {fullScript.length}자
            </div>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-dark-hover text-white rounded-lg hover:bg-dark-border transition-colors"
            >
              닫기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};