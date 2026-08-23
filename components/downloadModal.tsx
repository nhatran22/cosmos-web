import React from 'react';
import { Download, X, FileText } from 'lucide-react';

interface DownloadModalProps {
    isOpen: boolean;
    onClose: () => void;
    filePaths: string | string[];
}

export const DownloadModal: React.FC<DownloadModalProps> = ({ isOpen, onClose, filePaths }) => {
    if (!isOpen) return null;

    const files = Array.isArray(filePaths) ? filePaths : [filePaths];

    // Hàm trích xuất tên file từ đường dẫn URL
    const getFileName = (url: string) => {
        const decodedUrl = decodeURIComponent(url);
        return decodedUrl.split('/').pop() || 'Document.pdf';
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="w-full max-w-md rounded-lg bg-gray-800 p-6 text-white shadow-xl border border-gray-700">
                {/* Header */}
                <div className="flex items-center justify-between border-b border-gray-700 pb-3">
                    <h3 className="text-lg font-semibold">Tài liệu tải xuống</h3>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-white transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Danh sách File */}
                <div className="mt-4 space-y-3 max-h-60 overflow-y-auto">
                    {files.map((fileUrl, index) => (
                        <div
                            key={index}
                            className="flex items-center justify-between p-3 rounded-md bg-gray-700/50 hover:bg-gray-700 transition-colors"
                        >
                            <div className="flex items-center space-x-3 truncate mr-2">
                                <FileText className="text-blue-400 shrink-0" size={20} />
                                <span className="text-sm font-medium truncate" title={getFileName(fileUrl)}>
                                    {getFileName(fileUrl)}
                                </span>
                            </div>

                            <a
                                href={fileUrl}
                                download
                                target="_blank"
                                rel="noreferrer"
                                className="flex items-center space-x-1 px-3 py-1.5 text-xs bg-blue-600 hover:bg-blue-500 text-white rounded transition-colors shrink-0"
                            >
                                <Download size={14} />
                                <span>Tải</span>
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};