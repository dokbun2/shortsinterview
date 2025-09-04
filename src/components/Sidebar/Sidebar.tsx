import React from 'react';
import { useAppStore } from '../../store/useAppStore';
import { Clock } from 'lucide-react';

export const Sidebar: React.FC = () => {
  const { scriptData, activeSceneIndex, setActiveSceneIndex } = useAppStore();
  // const [expandedSections, setExpandedSections] = useState<string[]>(['scenes']);

  // const toggleSection = (section: string) => {
  //   setExpandedSections(prev =>
  //     prev.includes(section)
  //       ? prev.filter(s => s !== section)
  //       : [...prev, section]
  //   );
  // };

  if (!scriptData) {
    return (
      <aside className="w-64 bg-dark-card border-r border-dark-border p-4 h-full">
        <div className="mb-4">
          <h2 className="text-sm font-medium text-white mb-1">
            씬 목록
          </h2>
          <p className="text-xs text-gray-400">
            JSON 파일을 업로드하면 씬 목록이 표시됩니다.
          </p>
        </div>
      </aside>
    );
  }

  return (
    <aside className="w-64 bg-dark-card border-r border-dark-border h-full flex flex-col">
      {/* Title Section */}
      <div className="p-4 border-b border-dark-border">
        <h2 className="text-sm font-medium text-white mb-1">
          씬 목록
        </h2>
        <p className="text-xs text-gray-400">
          총 {scriptData.output.timeline.length}개의 씬
        </p>
      </div>

      {/* Scene List */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-2">
          {scriptData.output.timeline.map((scene, index) => (
            <div
              key={index}
              onClick={() => setActiveSceneIndex(index)}
              className={`w-full rounded-lg p-3 border transition-all duration-200 cursor-pointer ${
                activeSceneIndex === index
                  ? 'bg-accent-blue/5 border-accent-blue/30 shadow-sm shadow-accent-blue/20'
                  : 'bg-dark-card/50 border-dark-border hover:bg-dark-card hover:border-dark-hover hover:shadow-sm hover:shadow-black/20'
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className={`text-xs font-bold px-2 py-0.5 rounded ${
                    activeSceneIndex === index 
                      ? 'bg-accent-blue/20 text-accent-blue'
                      : 'bg-dark-hover text-gray-400'
                  }`}>
                    S{String(index + 1).padStart(2, '0')}
                  </span>
                  <span className={`text-sm font-medium ${
                    activeSceneIndex === index ? 'text-white' : 'text-gray-300'
                  }`}>
                    씬 {index + 1}
                  </span>
                </div>
                <span className="text-xs text-gray-500 flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {scene.timestamp}
                </span>
              </div>
              <p className={`text-xs leading-relaxed line-clamp-2 ${
                activeSceneIndex === index ? 'text-gray-300' : 'text-gray-500'
              }`}>
                {scene.scene_description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Info */}
      <div className="p-3 border-t border-dark-border">
        <div className="text-xs text-gray-400">
          <div>총 씬: {scriptData.output.timeline.length}개</div>
          {/* <div>총 길이: {scriptData.output.total_duration || 'N/A'}</div> */}
        </div>
      </div>
    </aside>
  );
};