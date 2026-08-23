'use client';

import { useState } from 'react';
import { Copy, Download, FolderArchive, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

interface CardNghiemThuFolderProps {
  name: string;
  fileCount: number;
  formattedSize: string;
  downloadPath: string;
}

export default function CardNghiemThuFolder({
  name,
  fileCount,
  formattedSize,
  downloadPath,
}: CardNghiemThuFolderProps) {
  const [hasCopied, setHasCopied] = useState(false);

  const handleCopyLink = async () => {
    const shareUrl = `${window.location.origin}${downloadPath}`;

    try {
      await navigator.clipboard.writeText(shareUrl);
      setHasCopied(true);
      window.setTimeout(() => setHasCopied(false), 2000);
    } catch {
      window.prompt('Sao chép link tải:', shareUrl);
    }
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3 min-w-0">
            <div className="rounded-lg bg-green-50 p-2 text-green-600 shrink-0">
              <FolderArchive className="h-5 w-5" />
            </div>
            <div className="min-w-0">
              <CardTitle className="text-base md:text-lg leading-snug break-words">
                {name}
              </CardTitle>
              <CardDescription className="mt-1">
                {fileCount} tệp · {formattedSize}
              </CardDescription>
            </div>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="shrink-0 h-8 w-8">
                <MoreHorizontal className="h-4 w-4" />
                <span className="sr-only">Tùy chọn</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={handleCopyLink}>
                <Copy className="mr-2 h-4 w-4" />
                {hasCopied ? 'Đã sao chép link' : 'Sao chép link tải'}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>

      <CardContent className="pb-3">
        <p className="text-sm text-muted-foreground">
          Tải toàn bộ tài liệu trong folder dưới dạng file ZIP.
        </p>
      </CardContent>

      <CardFooter>
        <Button asChild className="w-full sm:w-auto">
          <a href={downloadPath} download={`${name}.zip`}>
            <Download className="mr-2 h-4 w-4" />
            Tải folder
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
}
