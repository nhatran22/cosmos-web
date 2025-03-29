import React from 'react';
import Image from 'next/image';
import { ChevronDown, Mail, Phone, Clock, MapPin, Send } from 'lucide-react';

export const metadata = {
    title: 'Hỗ trợ & Dịch vụ | Cosmos',
    description: 'Hỗ trợ kỹ thuật và dịch vụ khách hàng 24/7 cho các sản phẩm Cosmos',
}

export default function SupportPage() {
    return (
        <div className="min-h-screen flex flex-col">
            {/* Hero section */}
            <section className="relative bg-gradient-to-r from-blue-900 to-indigo-900 text-white py-16 md:py-24 overflow-hidden">
                <div className="absolute inset-0">
                    <Image
                        src="/images/support-banner.svg"
                        alt="Support Background"
                        fill
                        className="object-cover"
                        priority
                    />
                </div>
                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-4xl mx-auto text-center">
                        <h1 className="text-3xl md:text-5xl font-bold mb-6">Hỗ trợ & Dịch vụ</h1>
                        <p className="text-lg md:text-xl text-blue-100 mb-8">
                            Đội ngũ chuyên gia của chúng tôi luôn sẵn sàng hỗ trợ bạn 24/7 với mọi vấn đề kỹ thuật
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <a
                                href="#contact"
                                className="bg-white text-blue-900 hover:bg-blue-50 px-6 py-3 rounded-lg font-medium transition-colors"
                            >
                                Liên hệ ngay
                            </a>
                            <a
                                href="#faq"
                                className="bg-transparent border border-white text-white hover:bg-white/10 px-6 py-3 rounded-lg font-medium transition-colors"
                            >
                                Xem câu hỏi thường gặp
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* Services section */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-16">Dịch vụ hỗ trợ của chúng tôi</h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-blue-50 rounded-xl p-8 text-center shadow-sm hover:shadow-md transition-shadow">
                            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Phone className="text-blue-600 h-8 w-8" />
                            </div>
                            <h3 className="text-xl font-semibold mb-3">Hỗ trợ kỹ thuật</h3>
                            <p className="text-gray-600">Đội ngũ kỹ thuật viên chuyên nghiệp giải quyết mọi vấn đề về sản phẩm</p>
                        </div>

                        <div className="bg-blue-50 rounded-xl p-8 text-center shadow-sm hover:shadow-md transition-shadow">
                            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Clock className="text-blue-600 h-8 w-8" />
                            </div>
                            <h3 className="text-xl font-semibold mb-3">Bảo trì định kỳ</h3>
                            <p className="text-gray-600">Dịch vụ kiểm tra và bảo dưỡng định kỳ giúp sản phẩm hoạt động ổn định</p>
                        </div>

                        <div className="bg-blue-50 rounded-xl p-8 text-center shadow-sm hover:shadow-md transition-shadow">
                            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <MapPin className="text-blue-600 h-8 w-8" />
                            </div>
                            <h3 className="text-xl font-semibold mb-3">Hỗ trợ tại chỗ</h3>
                            <p className="text-gray-600">Kỹ thuật viên sẽ đến tận nơi để giải quyết các vấn đề phức tạp</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ section */}
            <section id="faq" className="py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-16">Câu hỏi thường gặp</h2>

                    <div className="max-w-3xl mx-auto space-y-4">
                        <FaqItem
                            question="UPS cần được bảo trì định kỳ như thế nào?"
                            answer="UPS nên được bảo trì ít nhất 1-2 lần mỗi năm tùy theo môi trường hoạt động. Việc bảo trì bao gồm kiểm tra pin, kiểm tra các kết nối điện, làm sạch bụi bẩn và kiểm tra các thông số vận hành."
                        />
                        <FaqItem
                            question="Thời gian sử dụng pin UPS là bao lâu?"
                            answer="Thông thường, pin UPS có tuổi thọ từ 3-5 năm tùy thuộc vào điều kiện sử dụng, nhiệt độ môi trường và số lần xả-sạc. Để đảm bảo hiệu suất tối ưu, nên thay pin theo khuyến nghị của nhà sản xuất."
                        />
                        <FaqItem
                            question="Làm thế nào để chọn UPS phù hợp cho hệ thống của tôi?"
                            answer="Để chọn UPS phù hợp, bạn cần xác định tổng công suất tiêu thụ của thiết bị cần bảo vệ, thời gian dự phòng mong muốn, và môi trường lắp đặt. Đội ngũ kỹ thuật của chúng tôi có thể hỗ trợ bạn đánh giá nhu cầu và đề xuất giải pháp phù hợp."
                        />
                        <FaqItem
                            question="UPS có thể hoạt động trong môi trường nhiệt độ cao không?"
                            answer="UPS của chúng tôi được thiết kế để hoạt động trong khoảng nhiệt độ từ 0°C đến 40°C. Tuy nhiên, nhiệt độ cao có thể làm giảm tuổi thọ pin và hiệu suất của thiết bị. Nên đảm bảo không khí lưu thông tốt và nhiệt độ phòng phù hợp để tối ưu hóa hiệu suất."
                        />
                        <FaqItem
                            question="Thời gian phản hồi khi có sự cố khẩn cấp là bao lâu?"
                            answer="Đối với khách hàng có hợp đồng bảo trì, chúng tôi cam kết thời gian phản hồi trong vòng 2-4 giờ cho sự cố khẩn cấp và hỗ trợ kỹ thuật viên đến hiện trường trong vòng 24 giờ tùy theo khu vực địa lý."
                        />
                    </div>
                </div>
            </section>

            {/* Contact section */}
            <section id="contact" className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-16">Liên hệ hỗ trợ</h2>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        <div className="lg:col-span-1 space-y-6">
                            <div className="bg-blue-50 p-6 rounded-lg">
                                <h3 className="text-xl font-semibold mb-4">Thông tin liên hệ</h3>
                                <div className="space-y-4">
                                    <div className="flex items-start">
                                        <Phone className="text-blue-600 h-5 w-5 mt-1 mr-3" />
                                        <div>
                                            <p className="font-medium">Hotline</p>
                                            <p className="text-gray-600">1800-1234</p>
                                            <p className="text-sm text-gray-500">(24/7 support)</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start">
                                        <Mail className="text-blue-600 h-5 w-5 mt-1 mr-3" />
                                        <div>
                                            <p className="font-medium">Email</p>
                                            <p className="text-gray-600">support@cosmospower.com</p>
                                            <p className="text-sm text-gray-500">(Phản hồi trong 24h)</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start">
                                        <MapPin className="text-blue-600 h-5 w-5 mt-1 mr-3" />
                                        <div>
                                            <p className="font-medium">Trung tâm dịch vụ</p>
                                            <p className="text-gray-600">123 Đường Nguyễn Văn Linh, Quận 7, TP.HCM</p>
                                            <p className="text-sm text-gray-500">(8:00 - 17:30, Thứ 2 - Thứ 6)</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-blue-900 text-white p-6 rounded-lg">
                                <h3 className="text-xl font-semibold mb-4">Hỗ trợ khẩn cấp</h3>
                                <p className="mb-4">Đối với sự cố khẩn cấp, vui lòng gọi hotline 24/7 của chúng tôi</p>
                                <a href="tel:18001234" className="inline-block bg-white text-blue-900 py-3 px-6 rounded-lg font-medium hover:bg-blue-50 transition-colors">
                                    Gọi ngay 1800-1234
                                </a>
                            </div>
                        </div>

                        <div className="lg:col-span-2 bg-gray-50 p-8 rounded-lg">
                            <h3 className="text-xl font-semibold mb-6">Gửi yêu cầu hỗ trợ</h3>
                            <form className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Họ tên</label>
                                        <input
                                            type="text"
                                            id="name"
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            placeholder="Nguyễn Văn A"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                        <input
                                            type="email"
                                            id="email"
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            placeholder="example@gmail.com"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Số điện thoại</label>
                                        <input
                                            type="tel"
                                            id="phone"
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            placeholder="0912 345 678"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="product" className="block text-sm font-medium text-gray-700 mb-1">Sản phẩm/Dịch vụ</label>
                                        <select
                                            id="product"
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        >
                                            <option value="">Chọn sản phẩm/dịch vụ</option>
                                            <option value="ups">UPS</option>
                                            <option value="battery">Battery</option>
                                            <option value="solar">Solar Solutions</option>
                                            <option value="maintenance">Bảo trì/Bảo dưỡng</option>
                                            <option value="other">Khác</option>
                                        </select>
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Tiêu đề</label>
                                    <input
                                        type="text"
                                        id="subject"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="Vấn đề bạn cần hỗ trợ"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Nội dung</label>
                                    <textarea
                                        id="message"
                                        rows={5}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="Mô tả chi tiết vấn đề của bạn"
                                    ></textarea>
                                </div>

                                <div>
                                    <label htmlFor="file" className="block text-sm font-medium text-gray-700 mb-1">Đính kèm file (nếu có)</label>
                                    <input
                                        type="file"
                                        id="file"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    />
                                    <p className="text-xs text-gray-500 mt-1">Định dạng hỗ trợ: JPG, PNG, PDF, DOC. Kích thước tối đa: 5MB</p>
                                </div>

                                <button type="submit" className="inline-flex items-center bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                                    <Send className="h-4 w-4 mr-2" />
                                    Gửi yêu cầu
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

            {/* Installation & Guides section */}
            <section className="py-16 bg-gray-900 text-white">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-3xl font-bold mb-6">Tài liệu & Hướng dẫn</h2>
                        <p className="text-gray-300 mb-12">
                            Truy cập trung tâm tài liệu của chúng tôi để xem hướng dẫn sử dụng, cài đặt và xử lý sự cố
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <a href="#" className="block bg-gray-800 p-6 rounded-lg hover:bg-gray-700 transition-colors text-left">
                                <h3 className="text-xl font-semibold mb-3">Hướng dẫn sử dụng</h3>
                                <p className="text-gray-400 mb-4">Tài liệu hướng dẫn chi tiết cho từng sản phẩm</p>
                                <span className="text-blue-400">Xem hướng dẫn →</span>
                            </a>

                            <a href="#" className="block bg-gray-800 p-6 rounded-lg hover:bg-gray-700 transition-colors text-left">
                                <h3 className="text-xl font-semibold mb-3">Video hướng dẫn</h3>
                                <p className="text-gray-400 mb-4">Các video hướng dẫn cài đặt và xử lý sự cố</p>
                                <span className="text-blue-400">Xem video →</span>
                            </a>

                            <a href="#" className="block bg-gray-800 p-6 rounded-lg hover:bg-gray-700 transition-colors text-left">
                                <h3 className="text-xl font-semibold mb-3">Câu hỏi thường gặp</h3>
                                <p className="text-gray-400 mb-4">Danh sách đầy đủ các câu hỏi và giải pháp</p>
                                <span className="text-blue-400">Xem thêm →</span>
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

function FaqItem({ question, answer }: { question: string; answer: string }) {
    return (
        <div className="border border-gray-200 rounded-lg overflow-hidden">
            <details className="group">
                <summary className="flex items-center justify-between p-6 cursor-pointer bg-white">
                    <h3 className="text-lg font-medium">{question}</h3>
                    <span className="ml-6 flex-shrink-0 text-blue-600 group-open:rotate-180 transition-transform">
                        <ChevronDown size={20} />
                    </span>
                </summary>
                <div className="p-6 pt-0 border-t border-gray-100">
                    <p className="text-gray-600">{answer}</p>
                </div>
            </details>
        </div>
    );
} 