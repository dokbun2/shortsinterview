import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Link } from 'react-router-dom';
import { useAppStore } from '../../store/useAppStore';
import { handleFileUpload, downloadJSON } from '../../utils/fileHandlers';
import { Upload, Download, Home, Images, FileText } from 'lucide-react';
import { Button } from '../ui/Button';
import { ScriptModal } from '../ScriptModal';

export const Header: React.FC = () => {
  const { scriptData, setScriptData } = useAppStore();
  const [isScriptModalOpen, setIsScriptModalOpen] = useState(false);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      try {
        const data = await handleFileUpload(acceptedFiles[0]);
        setScriptData(data);
        alert('파일이 성공적으로 업로드되었습니다!');
      } catch (error) {
        alert('파일 업로드 중 오류가 발생했습니다. JSON 형식을 확인해주세요.');
        console.error(error);
      }
    }
  }, [setScriptData]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/json': ['.json'],
    },
    maxFiles: 1,
  });

  const handleDownload = () => {
    if (scriptData) {
      downloadJSON(scriptData);
    } else {
      alert('다운로드할 데이터가 없습니다.');
    }
  };

  return (
    <>
      <header className="bg-black border-b border-dark-border shadow-dark-md">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-8">
              <h1 className="text-xl font-bold text-text-primary">
                AIFI 숏츠생성기
              </h1>
              
              <nav className="flex items-center">
                <Link to="/" className="nav-item">
                  <Home className="h-4 w-4 mr-2" />
                  <span>메인</span>
                </Link>
                <Link to="/gallery" className="nav-item ml-1">
                  <Images className="h-4 w-4 mr-2" />
                  <span>갤러리</span>
                </Link>
              </nav>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsScriptModalOpen(true)}
                disabled={!scriptData}
                className={`btn-secondary flex items-center gap-2 text-sm ${
                  !scriptData ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                <FileText className="h-4 w-4" />
                <span>대본</span>
              </button>

              <div {...getRootProps()}>
                <input {...getInputProps()} />
                <button
                  className={`${
                    isDragActive ? 'btn-primary' : 'btn-secondary'
                  } flex items-center gap-2 text-sm`}
                >
                  <Upload className="h-4 w-4" />
                  <span>{isDragActive ? '파일을 놓아주세요' : '업로드'}</span>
                </button>
              </div>

              <button
                onClick={handleDownload}
                disabled={!scriptData}
                className={`btn-secondary flex items-center gap-2 text-sm ${
                  !scriptData ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                <Download className="h-4 w-4" />
                <span>다운로드</span>
              </button>
            </div>
          </div>
        </div>
      </header>
      
      <ScriptModal 
        isOpen={isScriptModalOpen}
        onClose={() => setIsScriptModalOpen(false)}
      />
    </>
  );
};