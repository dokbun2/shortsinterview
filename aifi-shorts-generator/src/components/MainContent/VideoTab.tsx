import React, { useState, useEffect } from 'react';
import type { Scene } from '../../types/script.types';
import { useAppStore } from '../../store/useAppStore';
import { isValidMediaUrl } from '../../utils/fileHandlers';
import { CopyButton } from '../CopyButton';

interface VideoTabProps {
  scene: Scene;
  sceneIndex: number;
}

export const VideoTab: React.FC<VideoTabProps> = ({ scene, sceneIndex }) => {
  const { mediaUrls, setMediaUrl } = useAppStore();
  const [videoUrl, setVideoUrl] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    setVideoUrl(mediaUrls[sceneIndex]?.videoUrl || '');
  }, [sceneIndex, mediaUrls]);

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;
    setVideoUrl(url);
    setError('');
    
    if (url && !isValidMediaUrl(url)) {
      setError('유효한 URL을 입력해주세요.');
    } else if (url) {
      setMediaUrl(sceneIndex, 'video', url);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-3 text-white">영상 프롬프트</h3>
        
        <div className="space-y-4">
          <div className="bg-gray-900 p-4 rounded-lg border border-gray-700">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium text-sm text-gray-400">Kling</h4>
              <CopyButton text={scene.video_prompts.kling} />
            </div>
            <p className="text-white text-sm leading-relaxed">
              {scene.video_prompts.kling}
            </p>
          </div>
          
          <div className="bg-gray-900 p-4 rounded-lg border border-gray-700">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium text-sm text-gray-400">Veo3</h4>
              <CopyButton text={scene.video_prompts.veo3} />
            </div>
            <p className="text-white text-sm leading-relaxed">
              {scene.video_prompts.veo3}
            </p>
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          비디오 URL 입력
        </label>
        <input
          type="url"
          value={videoUrl}
          onChange={handleUrlChange}
          placeholder="https://example.com/video.mp4"
          className="w-full px-4 py-2 bg-gray-900 text-white border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-500"
        />
        {error && (
          <p className="mt-1 text-sm text-red-600">{error}</p>
        )}
      </div>

      {videoUrl && !error && (
        <div className="border border-gray-700 rounded-lg overflow-hidden">
          <video
            src={videoUrl}
            controls
            className="w-full h-auto max-h-96 bg-gray-900"
            onError={() => setError('비디오를 불러올 수 없습니다.')}
          >
            브라우저가 비디오 재생을 지원하지 않습니다.
          </video>
        </div>
      )}
    </div>
  );
};