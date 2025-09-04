import React, { useState, useEffect } from 'react';
import type { Scene } from '../../types/script.types';
import { useAppStore } from '../../store/useAppStore';
import { isValidMediaUrl } from '../../utils/fileHandlers';
import { CopyButton } from '../CopyButton';

interface ImageTabProps {
  scene: Scene;
  sceneIndex: number;
}

export const ImageTab: React.FC<ImageTabProps> = ({ scene, sceneIndex }) => {
  const { mediaUrls, setMediaUrl } = useAppStore();
  const [imageUrl, setImageUrl] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    setImageUrl(mediaUrls[sceneIndex]?.imageUrl || '');
  }, [sceneIndex, mediaUrls]);

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;
    setImageUrl(url);
    setError('');
    
    if (url && !isValidMediaUrl(url)) {
      setError('유효한 URL을 입력해주세요.');
    } else if (url) {
      setMediaUrl(sceneIndex, 'image', url);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-3 text-white">이미지 프롬프트</h3>
        
        <div className="space-y-4">
          <div className="bg-gray-900 p-4 rounded-lg border border-gray-700">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium text-sm text-gray-400">Midjourney</h4>
              <CopyButton text={scene.image_prompts.midjourney} />
            </div>
            <p className="text-white text-sm leading-relaxed">
              {scene.image_prompts.midjourney}
            </p>
          </div>
          
          <div className="bg-gray-900 p-4 rounded-lg border border-gray-700">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium text-sm text-gray-400">Narobanana</h4>
              <CopyButton text={scene.image_prompts.narobanana} />
            </div>
            <p className="text-white text-sm leading-relaxed">
              {scene.image_prompts.narobanana}
            </p>
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          이미지 URL 입력
        </label>
        <input
          type="url"
          value={imageUrl}
          onChange={handleUrlChange}
          placeholder="https://example.com/image.jpg"
          className="w-full px-4 py-2 bg-gray-900 text-white border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-500"
        />
        {error && (
          <p className="mt-1 text-sm text-red-600">{error}</p>
        )}
      </div>

      {imageUrl && !error && (
        <div className="border border-gray-700 rounded-lg overflow-hidden">
          <img
            src={imageUrl}
            alt="Preview"
            className="w-full h-auto max-h-96 object-contain bg-gray-900"
            onError={() => setError('이미지를 불러올 수 없습니다.')}
          />
        </div>
      )}
    </div>
  );
};