import React, { useState, useEffect } from 'react';
import type { Scene } from '../../types/script.types';
import { useAppStore } from '../../store/useAppStore';
import { isValidMediaUrl } from '../../utils/fileHandlers';

interface AudioTabProps {
  scene: Scene;
  sceneIndex: number;
}

export const AudioTab: React.FC<AudioTabProps> = ({ scene, sceneIndex }) => {
  const { mediaUrls, setMediaUrl } = useAppStore();
  const [audioUrl, setAudioUrl] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    setAudioUrl(mediaUrls[sceneIndex]?.audioUrl || '');
  }, [sceneIndex, mediaUrls]);

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let url = e.target.value;
    
    // Dropbox URL 변환: dl=0을 raw=1로 변경
    if (url.includes('dropbox.com') && url.includes('dl=0')) {
      url = url.replace('dl=0', 'raw=1');
    }
    
    setAudioUrl(url);
    setError('');
    
    if (url && !isValidMediaUrl(url)) {
      setError('유효한 URL을 입력해주세요.');
    } else if (url) {
      setMediaUrl(sceneIndex, 'audio', url);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-3 text-white">나레이션</h3>
        
        <div className="bg-gray-900 p-6 rounded-lg border border-gray-700">
          <p className="text-white leading-relaxed whitespace-pre-wrap">
            {scene.dialogue}
          </p>
        </div>
        
        <div className="mt-4 p-4 bg-gray-900 rounded-lg border border-gray-700">
          <h4 className="font-medium text-sm text-gray-400 mb-2">씬 설명</h4>
          <p className="text-white text-sm leading-relaxed">
            {scene.scene_description}
          </p>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          오디오 URL 입력
        </label>
        <input
          type="url"
          value={audioUrl}
          onChange={handleUrlChange}
          placeholder="https://example.com/audio.mp3"
          className="w-full px-4 py-2 bg-gray-900 text-white border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-500"
        />
        {audioUrl.includes('dropbox.com') && audioUrl.includes('raw=1') && (
          <p className="mt-1 text-sm text-green-500">
            ✓ Dropbox URL이 자동으로 변환되었습니다.
          </p>
        )}
        {error && (
          <p className="mt-1 text-sm text-red-600">{error}</p>
        )}
      </div>

      {audioUrl && !error && (
        <div className="border border-gray-700 rounded-lg p-4 bg-gray-900">
          <audio
            src={audioUrl}
            controls
            className="w-full"
            onError={() => setError('오디오를 불러올 수 없습니다.')}
          >
            브라우저가 오디오 재생을 지원하지 않습니다.
          </audio>
        </div>
      )}
    </div>
  );
};