import fs from 'fs';
import path from 'path';
import { PassThrough } from 'stream';
import { finished } from 'stream/promises';
import { ZipArchive } from 'archiver';

const NGHIEM_THU_DIR = path.join(process.cwd(), 'public', 'nghiem-thu');

async function createZip(sourceDir, outputPath) {
  await fs.promises.mkdir(path.dirname(outputPath), { recursive: true });

  const passThrough = new PassThrough();
  const archive = new ZipArchive({ zlib: { level: 9 } });
  const writeStream = fs.createWriteStream(outputPath);

  archive.pipe(passThrough);
  passThrough.pipe(writeStream);
  archive.directory(sourceDir, false);
  await archive.finalize();
  await finished(writeStream);
}

async function main() {
  if (!fs.existsSync(NGHIEM_THU_DIR)) {
    console.log('Không tìm thấy thư mục public/nghiem-thu');
    return;
  }

  const entries = fs.readdirSync(NGHIEM_THU_DIR, { withFileTypes: true });

  for (const entry of entries) {
    if (!entry.isDirectory()) continue;

    const sourceDir = path.join(NGHIEM_THU_DIR, entry.name);
    const outputPath = path.join(NGHIEM_THU_DIR, `${entry.name}.zip`);

    console.log(`Đang tạo ${entry.name}.zip...`);
    await createZip(sourceDir, outputPath);
  }

  console.log('Hoàn tất tạo file ZIP nghiệm thu.');
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
