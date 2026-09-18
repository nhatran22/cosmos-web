import fs from 'fs';
import path from 'path';

export default function BackupTimePage() {
    // Đọc file HTML trực tiếp từ thư mục public trên Server
    const filePath = path.join(process.cwd(), 'public', 'solution-file', 'cosmos-backup-time-calculation_1.html');
    const htmlContent = fs.readFileSync(filePath, 'utf8');

    return (
        <div className="w-full bg-white p-4">
            <div
                dangerouslySetInnerHTML={{ __html: htmlContent }}
            />
        </div>
    );
}