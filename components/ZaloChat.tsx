'use client';

import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X } from 'lucide-react';

export default function ZaloChat() {
    const [isOpen, setIsOpen] = useState(false);
    const [isChatVisible, setIsChatVisible] = useState(false);
    const [showScrollTop, setShowScrollTop] = useState(false);

    // Theo dõi scroll để biết khi nào nút scroll-to-top xuất hiện
    useEffect(() => {
        const handleScroll = () => {
            setShowScrollTop(window.scrollY > 400);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Đóng chat khi click bên ngoài
    useEffect(() => {
        if (!isOpen) return;

        const handleClickOutside = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (!target.closest('.zalo-chat-container') && !target.closest('.zalo-chat-button')) {
                setIsOpen(false);
                setIsChatVisible(false);
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, [isOpen]);

    const toggleChat = () => {
        setIsOpen(!isOpen);
        if (!isOpen) {
            // Delay showing chat content for smooth animation
            setTimeout(() => setIsChatVisible(true), 100);
        } else {
            setIsChatVisible(false);
        }
    };

    // Tính toán vị trí dựa trên trạng thái của nút scroll-to-top
    const buttonPosition = showScrollTop ? "bottom-[110px]" : "bottom-6";

    return (
        <div className={`fixed right-6 z-50 flex flex-col items-end ${buttonPosition} transition-all duration-300`}>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.9 }}
                        transition={{ duration: 0.2 }}
                        className="mb-3 zalo-chat-container"
                    >
                        <Card className="w-[350px] overflow-hidden shadow-xl rounded-2xl border-0">
                            {/* Header */}
                            <div className="bg-blue-600 p-4 flex items-center justify-between">
                                <div className="flex items-center">
                                    <div className="relative w-10 h-10 mr-3">
                                        <div className="rounded-full bg-white p-1 w-10 h-10 flex items-center justify-center">
                                            <span className="text-blue-600 font-bold text-xl">GIC</span>
                                        </div>
                                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                                    </div>
                                    <div className="text-white">
                                        <h3 className="font-medium text-lg">Công ty cổ phần hạ tầng Toàn Cầu</h3>
                                        <div className="text-sm opacity-80">Xin chào!</div>
                                    </div>
                                </div>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setIsOpen(false);
                                        setIsChatVisible(false);
                                    }}
                                    className="text-white hover:bg-blue-700 p-1 rounded-full transition-colors"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            {/* Chat content - only shows after animation completes */}
                            <AnimatePresence>
                                {isChatVisible && (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <div className="p-5 bg-gray-50">
                                            <p className="text-lg font-medium">Rất vui khi được hỗ trợ bạn</p>
                                            <div className="mt-5 mb-8 space-y-3">
                                                <Button
                                                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6 rounded-xl shadow-md hover:shadow-lg transition-all"
                                                    onClick={() => window.open('https://zalo.me/yourcompanyid', '_blank')}
                                                >
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        width="20"
                                                        height="20"
                                                        viewBox="0 0 512 512"
                                                        className="mr-2"
                                                        fill="currentColor"
                                                    >
                                                        <path d="M307.63,203.254c-.089-.08-.175-.164-.261-.244-3.826-3.559-9.077-5.754-14.809-5.754s-10.983,2.195-14.809,5.754c-.086.08-.172.164-.261.244-6.02,5.605-8.92,13.26-8.92,20.744v63.728c0,7.484,2.9,15.139,8.92,20.744.089.08.175.164.261.244,3.826,3.559,9.077,5.754,14.809,5.754s10.983-2.195,14.809-5.754c.086-.08.172-.164.261-.244,6.02-5.605,8.92-13.26,8.92-20.744V223.998C316.55,216.513,313.65,208.859,307.63,203.254Z" />
                                                        <path d="M256,0C114.615,0,0,114.615,0,256S114.615,512,256,512,512,397.385,512,256,397.385,0,256,0ZM170.777,307.842a15.712,15.712,0,0,1-12.692,6.255h-7.58a15.1,15.1,0,0,1-15.085-15.084V212.917a15.1,15.1,0,0,1,15.085-15.085h7.58a15.712,15.712,0,0,1,12.692,6.255c.84.972,1.065.972,1.065,1
                                                        .594V306.258A2.1,2.1,0,0,1,170.777,307.842Zm115.1,0c-9.566,8.93-22.016,14.163-35.317,14.163s-25.751-5.233-35.317-14.163c-11.692-10.92-14.275-23-14.275-35.1V223.998c0-12.089,2.583-24.176,14.275-35.1,9.566-8.93,22.016-14.163,35.317-14.163s25.751,5.233,35.317,14.163c11.692,10.919,14.275,23.006,14.275,35.1v48.749C300.15,284.854,297.568,296.929,285.876,307.842Zm71.578-14.654c0,6.647-3.044,11.557-3.8,12.482-.163.305-2.321,3.811-5.758,3.811-2.261,0-4.385-1.2-6.32-3.568-1.51-1.857-3.161-4.7-4.985-7.87-.993-1.711-4.385-7.736-5.3-9.2l-1.822-2.9c-.628-1.026-1.1-1.819-1.237-2.048l-.394-.634c-4.88-7.789-10.934-17.475-18.3-17.475a10.625,10.625,0,0,0-4.35.945c-5.588,2.558-6.5,7.772-6.5,15.988v16.5a12.841,12.841,0,0,1-12.827,12.808h-.03a12.841,12.841,0,0,1-12.8-12.805V222.834c0-7.034,5.241-18.775,19.412-18.775,8.089,0,14.856,5.184,21.1,10.015,1.221.95,9.709,7.726,11.845,9.192,1.12.758,3.734,2.3,5.26,2.3.626,0,2.536,0,4.182-2.535.488-.756,1.743-2.853,1.743-7.284V213.12a12.837,12.837,0,0,1,12.8-12.805h.03a12.841,12.841,0,0,1,12.827,12.808v70.068Z"/>
                                                    </svg>
                                                    Chat bằng Zalo
                                                </Button>
                                                <Button
                                                    variant="outline"
                                                    className="w-full border-gray-300 py-6 rounded-xl shadow-sm hover:shadow-md transition-all"
                                                >
                                                    <MessageCircle className="mr-2 h-5 w-5" />
                                                    Chat nhanh
                                                </Button>
                                            </div>
                                            <div className="text-center text-sm text-gray-500 mt-3">
                                                Bắt đầu trò chuyện với Công ty cổ phần hạ tầng Toàn Cầu
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </Card>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Zalo button */}
            <motion.button
                onClick={(e) => {
                    e.stopPropagation();
                    toggleChat();
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="zalo-chat-button rounded-full w-14 h-14 flex items-center justify-center shadow-lg transition-all duration-300"
                style={{ backgroundColor: '#0068ff' }}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                </svg>
            </motion.button>
        </div>
    );
} 