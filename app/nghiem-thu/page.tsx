import { Metadata } from 'next';
import CardNghiemThuFolder from '@/app/nghiem-thu/components/CardNghiemThuFolder';
import { formatFileSize, getNghiemThuFolders } from '@/lib/nghiem-thu';

export const metadata: Metadata = {
  title: 'Nghiệm thu | COSMOS RF',
  description: 'Tải tài liệu nghiệm thu sản phẩm COSMOS RF.',
};

export default function NghiemThuPage() {
  const folders = getNghiemThuFolders();

  return (
    <div className="container mx-auto px-4 py-6 md:py-12">
      <div className="max-w-3xl mx-auto text-center mb-8 md:mb-10">
        <h1 className="text-2xl md:text-3xl font-bold mb-3">Tài liệu nghiệm thu</h1>
        <p className="text-sm md:text-base text-gray-600">
          Chọn folder để tải về hoặc dùng menu &quot;...&quot; để sao chép link chia sẻ cho người khác.
        </p>
      </div>

      {folders.length === 0 ? (
        <div className="max-w-xl mx-auto rounded-lg border border-dashed p-8 text-center text-gray-600">
          Chưa có folder nào trong thư mục nghiệm thu.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {folders.map((folder) => (
            <CardNghiemThuFolder
              key={folder.name}
              name={folder.name}
              fileCount={folder.fileCount}
              formattedSize={formatFileSize(folder.totalSize)}
              downloadPath={folder.downloadPath}
            />
          ))}
        </div>
      )}
    </div>
  );
}
