'use client';

import { ArrowUp } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export default function FloatingIcons() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleZaloChat = () => {
    window.location.href = 'https://zalo.me/your-zalo-id';
  };

  return (
    <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-50">
      <Dialog>
        <DialogTrigger asChild>
          <button className="bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <Image
              src="https://stc-zaloprofile.zdn.vn/pc/v1/images/zalo_sharelogo.png"
              alt="Zalo"
              width={30}
              height={30}
              className="min-w-[30px]"
            />
          </button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[400px] p-0 gap-0">
          <DialogTitle className="sr-only">Zalo Chat</DialogTitle>
          <div className="bg-blue-500 p-4 rounded-t-lg">
            <div className="flex items-center gap-2">
              <div className="relative w-10 h-10 rounded-full overflow-hidden bg-white">
                <Image
                  src="https://stc-zaloprofile.zdn.vn/pc/v1/images/zalo_sharelogo.png"
                  alt="GIC"
                  fill
                  className="object-contain p-1"
                />
              </div>
              <div className="flex-1 text-white">
                <h3 className="font-medium text-sm">Công ty cổ phần hạ t...</h3>
                <div className="flex items-center gap-1">
                  <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                  <span className="text-xs">Đang hoạt động</span>
                </div>
              </div>
              <button className="text-white">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </div>
          
          <div className="p-4">
            <div className="text-center mb-4">
              <p className="text-gray-500 text-sm">Bắt đầu trò chuyện nhanh với Công ty cổ phần hạ tầng Toàn Cầu.</p>
              <p className="text-gray-500 text-xs mt-2">Thông tin của bạn được ẩn và tin nhắn trò chuyện chỉ lưu trên trình duyệt web.</p>
            </div>

            <div className="space-y-2">
              <Button 
                className="w-full bg-blue-500 hover:bg-blue-600 text-white"
                onClick={handleZaloChat}
              >
                Chat bằng Zalo
              </Button>
              <Button 
                variant="secondary"
                className="w-full text-gray-500 bg-gray-100"
                disabled
              >
                Chat nhanh
              </Button>
            </div>

            <div className="flex justify-center gap-4 mt-6 text-sm border-t pt-4">
              <button className="text-blue-500 hover:underline">Tiếng Việt</button>
              <button className="text-gray-400">English</button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="bg-gray-800 rounded-full p-3 shadow-lg hover:shadow-xl transition-shadow duration-300"
        >
          <ArrowUp className="w-[30px] h-[30px] text-white" />
        </button>
      )}
    </div>
  );
}