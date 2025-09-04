import React, { useMemo, useState } from 'react';
import { useAppStore } from '../../store/useAppStore';
import type { MediaItem } from '../../types/script.types';

type TabType = 'images' | 'videos';

export const Gallery: React.FC = () => {
  const { scriptData, mediaUrls } = useAppStore();
  const [activeTab, setActiveTab] = useState<TabType>('images');

  const { imagesByScene, videosByScene } = useMemo(() => {
    if (!scriptData) return { imagesByScene: [], videosByScene: [] };

    const images: (MediaItem | null)[] = [];
    const videos: (MediaItem | null)[] = [];

    scriptData.output.timeline.forEach((scene, index) => {
      const sceneMedia = mediaUrls[index];
      
      // Add image for this scene (or null if no image)
      if (sceneMedia?.imageUrl) {
        images.push({
          type: 'image',
          url: sceneMedia.imageUrl,
          sceneIndex: index,
          sceneName: `Scene ${index + 1}`,
          timestamp: scene.timestamp,
        });
      } else {
        images.push(null);
      }

      // Add video for this scene (or null if no video)
      if (sceneMedia?.videoUrl) {
        videos.push({
          type: 'video',
          url: sceneMedia.videoUrl,
          sceneIndex: index,
          sceneName: `Scene ${index + 1}`,
          timestamp: scene.timestamp,
        });
      } else {
        videos.push(null);
      }
    });

    return { imagesByScene: images, videosByScene: videos };
  }, [scriptData, mediaUrls]);

  if (!scriptData) {
    return (
      <div className="min-h-screen bg-dark-bg flex items-center justify-center">
        <div className="text-center card-dark p-8 rounded-lg max-w-md">
          <h2 className="text-2xl font-semibold text-white mb-2">갤러리</h2>
          <p className="text-gray-400">
            먼저 JSON 파일을 업로드하고 미디어 URL을 추가해주세요.
          </p>
        </div>
      </div>
    );
  }

  const hasImages = imagesByScene.some(item => item !== null);
  const hasVideos = videosByScene.some(item => item !== null);

  if (!hasImages && !hasVideos) {
    return (
      <div className="min-h-screen bg-dark-bg flex items-center justify-center">
        <div className="text-center card-dark p-8 rounded-lg max-w-md">
          <h2 className="text-2xl font-semibold text-white mb-2">갤러리</h2>
          <p className="text-gray-400">
            아직 추가된 미디어가 없습니다. 메인 페이지에서 URL을 추가해주세요.
          </p>
        </div>
      </div>
    );
  }

  const renderMediaGrid = (items: (MediaItem | null)[]) => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {items.map((item, index) => (
          <div key={index} className="card-dark rounded-lg overflow-hidden hover:shadow-dark-lg transition-all duration-200">
            <div className="p-3 bg-dark-hover border-b border-dark-border">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold px-2 py-0.5 rounded bg-accent-blue/20 text-accent-blue">
                    S{String(index + 1).padStart(2, '0')}
                  </span>
                  <h3 className="text-sm font-medium text-white">Scene {index + 1}</h3>
                </div>
                {item && (
                  <p className="text-xs text-gray-400">{item.timestamp}</p>
                )}
              </div>
            </div>
            
            <div className="p-4">
              {item ? (
                <>
                  {item.type === 'image' && (
                    <div className="relative group">
                      <img
                        src={item.url}
                        alt={item.sceneName}
                        className="w-full h-56 object-cover rounded-lg shadow-sm transition-transform group-hover:scale-105"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0iI2VlZSIvPjx0ZXh0IHRleHQtYW5jaG9yPSJtaWRkbGUiIHg9IjIwMCIgeT0iMTUwIiBzdHlsZT0iZmlsbDojYWFhO2ZvbnQtd2VpZ2h0OmJvbGQ7Zm9udC1zaXplOjE5cHg7Zm9udC1mYW1pbHk6QXJpYWwsSGVsdmV0aWNhLHNhbnMtc2VyaWY7ZG9taW5hbnQtYmFzZWxpbmU6Y2VudHJhbCI+SW1hZ2UgTm90IEZvdW5kPC90ZXh0Pjwvc3ZnPg==';
                        }}
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all rounded-lg"></div>
                    </div>
                  )}
                  
                  {item.type === 'video' && (
                    <div className="relative">
                      <video
                        src={item.url}
                        controls
                        className="w-full h-56 bg-black rounded-lg shadow-sm"
                        poster=""
                      >
                        비디오를 재생할 수 없습니다.
                      </video>
                    </div>
                  )}
                </>
              ) : (
                <div className="w-full h-56 bg-dark-hover rounded-lg flex items-center justify-center border border-dark-border">
                  <div className="text-center">
                    <svg className="w-16 h-16 mx-auto text-gray-600 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} 
                            d={activeTab === 'images' 
                              ? "M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                              : "M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"} />
                    </svg>
                    <p className="text-sm text-gray-500">
                      {activeTab === 'images' ? '이미지 없음' : '비디오 없음'}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-dark-bg p-6">
      <div className="container mx-auto max-w-7xl">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-white mb-4">갤러리</h2>
          
          {/* Tab Navigation */}
          <div className="flex gap-2 p-1 rounded-lg max-w-md">
            <button
              onClick={() => setActiveTab('images')}
              className={`flex-1 flex items-center justify-center px-4 py-2.5 rounded-md font-medium transition-all ${
                activeTab === 'images'
                  ? 'bg-accent-blue text-white'
                  : 'bg-dark-card text-gray-400 hover:text-white hover:bg-dark-hover'
              }`}
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              이미지
              {hasImages && (
                <span className="ml-2 px-2 py-0.5 bg-accent-blue/20 text-accent-blue text-xs rounded-full">
                  {imagesByScene.filter(item => item !== null).length}
                </span>
              )}
            </button>
            
            <button
              onClick={() => setActiveTab('videos')}
              className={`flex-1 flex items-center justify-center px-4 py-2.5 rounded-md font-medium transition-all ${
                activeTab === 'videos'
                  ? 'bg-accent-blue text-white'
                  : 'bg-dark-card text-gray-400 hover:text-white hover:bg-dark-hover'
              }`}
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                      d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              비디오
              {hasVideos && (
                <span className="ml-2 px-2 py-0.5 bg-accent-blue/20 text-accent-blue text-xs rounded-full">
                  {videosByScene.filter(item => item !== null).length}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div className="mt-6">
          {activeTab === 'images' ? (
            hasImages ? (
              renderMediaGrid(imagesByScene)
            ) : (
              <div className="text-center py-12 card-dark rounded-lg">
                <svg className="w-24 h-24 mx-auto text-gray-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} 
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p className="text-gray-400">아직 추가된 이미지가 없습니다.</p>
              </div>
            )
          ) : (
            hasVideos ? (
              renderMediaGrid(videosByScene)
            ) : (
              <div className="text-center py-12 card-dark rounded-lg">
                <svg className="w-24 h-24 mx-auto text-gray-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} 
                        d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                <p className="text-gray-400">아직 추가된 비디오가 없습니다.</p>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};