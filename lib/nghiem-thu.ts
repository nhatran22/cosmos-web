import fs from 'fs';
import path from 'path';

export interface NghiemThuFolder {
  name: string;
  fileCount: number;
  totalSize: number;
  downloadPath: string;
}

const NGHIEM_THU_DIR = path.join(process.cwd(), 'public', 'nghiem-thu');

export function getNghiemThuDir(): string {
  return NGHIEM_THU_DIR;
}

export function getNghiemThuFolders(): NghiemThuFolder[] {
  if (!fs.existsSync(NGHIEM_THU_DIR)) {
    return [];
  }

  return fs
    .readdirSync(NGHIEM_THU_DIR, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => {
      const folderPath = path.join(NGHIEM_THU_DIR, entry.name);
      const files = fs.readdirSync(folderPath, { withFileTypes: true });

      let fileCount = 0;
      let totalSize = 0;

      for (const file of files) {
        if (!file.isFile()) continue;
        fileCount += 1;
        totalSize += fs.statSync(path.join(folderPath, file.name)).size;
      }

      return {
        name: entry.name,
        fileCount,
        totalSize,
        downloadPath: `/nghiem-thu/${encodeURIComponent(`${entry.name}.zip`)}`,
      };
    })
    .sort((a, b) => a.name.localeCompare(b.name, 'vi'));
}

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 B';

  const units = ['B', 'KB', 'MB', 'GB'];
  const unitIndex = Math.min(
    Math.floor(Math.log(bytes) / Math.log(1024)),
    units.length - 1
  );
  const size = bytes / 1024 ** unitIndex;

  return `${size.toFixed(unitIndex === 0 ? 0 : 1)} ${units[unitIndex]}`;
}
