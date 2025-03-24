import { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, Phone, MapPin, Clock } from "lucide-react"

export const metadata: Metadata = {
    title: "Hỗ trợ & Liên hệ | Cosmos",
    description: "Liên hệ với chúng tôi để được hỗ trợ và tư vấn",
}

export default function SupportPage() {
    return (
        <div className="container mx-auto py-12">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold mb-4">Hỗ trợ & Liên hệ</h1>
                <p className="text-muted-foreground">
                    Chúng tôi luôn sẵn sàng hỗ trợ và giải đáp mọi thắc mắc của bạn
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                <Card>
                    <CardHeader>
                        <CardTitle>Thông tin liên hệ</CardTitle>
                        <CardDescription>
                            Hãy liên hệ với chúng tôi qua các kênh sau
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center space-x-4">
                            <Mail className="h-5 w-5" />
                            <div>
                                <p className="font-medium">Email</p>
                                <p className="text-muted-foreground">support@cosmos.com</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4">
                            <Phone className="h-5 w-5" />
                            <div>
                                <p className="font-medium">Điện thoại</p>
                                <p className="text-muted-foreground">+84 123 456 789</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4">
                            <MapPin className="h-5 w-5" />
                            <div>
                                <p className="font-medium">Địa chỉ</p>
                                <p className="text-muted-foreground">123 Đường ABC, Quận 1, TP.HCM</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4">
                            <Clock className="h-5 w-5" />
                            <div>
                                <p className="font-medium">Giờ làm việc</p>
                                <p className="text-muted-foreground">Thứ 2 - Thứ 6: 9:00 - 18:00</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Gửi tin nhắn</CardTitle>
                        <CardDescription>
                            Điền thông tin và nội dung tin nhắn của bạn
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form className="space-y-4">
                            <div className="space-y-2">
                                <label htmlFor="name" className="text-sm font-medium">
                                    Họ và tên
                                </label>
                                <Input id="name" placeholder="Nhập họ và tên của bạn" />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="email" className="text-sm font-medium">
                                    Email
                                </label>
                                <Input id="email" type="email" placeholder="Nhập email của bạn" />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="phone" className="text-sm font-medium">
                                    Số điện thoại
                                </label>
                                <Input id="phone" type="tel" placeholder="Nhập số điện thoại của bạn" />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="message" className="text-sm font-medium">
                                    Nội dung tin nhắn
                                </label>
                                <Textarea
                                    id="message"
                                    placeholder="Nhập nội dung tin nhắn của bạn"
                                    className="min-h-[150px]"
                                />
                            </div>
                            <Button className="w-full">Gửi tin nhắn</Button>
                        </form>
                    </CardContent>
                </Card>
            </div>

            <div className="text-center">
                <h2 className="text-2xl font-bold mb-4">Câu hỏi thường gặp</h2>
                <p className="text-muted-foreground mb-8">
                    Tìm câu trả lời cho những câu hỏi phổ biến
                </p>
                <Button variant="outline">Xem FAQ</Button>
            </div>
        </div>
    )
} 