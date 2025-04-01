import React from 'react';
import Image from 'next/image';
import { ChevronDown, Mail, Phone, Clock, MapPin, Send } from 'lucide-react';
import { Metadata } from 'next';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';

export const metadata: Metadata = {
    title: 'Support & Services | COSMOS RF',
    description: '24/7 technical support and customer service for COSMOS RF products',
}

const ServiceCard = ({ icon: Icon, title, description }: {
    icon: React.ElementType;
    title: string;
    description: string;
}) => (
    <Card className="p-8 text-center shadow-sm hover:shadow-md transition-shadow">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon className="text-blue-600 h-8 w-8" />
        </div>
        <h3 className="text-xl font-semibold mb-3">{title}</h3>
        <p className="text-gray-600">{description}</p>
    </Card>
);

const ContactInfo = () => (
    <div className="space-y-6">
        <Card className="p-6">
            <h3 className="text-xl font-semibold mb-4">Contact Information</h3>
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
                        <p className="text-gray-600">support@cosmosrf.com</p>
                        <p className="text-sm text-gray-500">(Response within 24h)</p>
                    </div>
                </div>

                <div className="flex items-start">
                    <MapPin className="text-blue-600 h-5 w-5 mt-1 mr-3" />
                    <div>
                        <p className="font-medium">Service Center</p>
                        <p className="text-gray-600">COSMOS RF TECHNOLOGIES LP</p>
                        <p className="text-gray-500">45B West Wilmost st. – Richmond Hill City – Ontario – Canada</p>
                    </div>
                </div>
            </div>
        </Card>

        <Card className="bg-blue-900 text-white p-6">
            <h3 className="text-xl font-semibold mb-4">Emergency Support</h3>
            <p className="mb-4">For urgent issues, please call our 24/7 hotline</p>
            <Button variant="secondary" asChild>
                <a href="tel:18001234">Call now 1800-1234</a>
            </Button>
        </Card>
    </div>
);

const SupportForm = () => (
    <Card className="p-8">
        <h3 className="text-xl font-semibold mb-6">Submit Support Request</h3>
        <form className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <Input
                        type="text"
                        id="name"
                        placeholder="John Doe"
                    />
                </div>
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <Input
                        type="email"
                        id="email"
                        placeholder="example@gmail.com"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                    <Input
                        type="tel"
                        id="phone"
                        placeholder="+1 (555) 123-4567"
                    />
                </div>
                <div>
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                    <Input
                        type="text"
                        id="address"
                        placeholder="Your address"
                    />
                </div>
            </div>

            <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                <Input
                    type="text"
                    id="subject"
                    placeholder="What you need help with"
                />
            </div>

            <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <Textarea
                    id="message"
                    rows={5}
                    placeholder="Describe your issue in detail"
                />
            </div>

            <div>
                <label htmlFor="file" className="block text-sm font-medium text-gray-700 mb-1">Attach File (Optional)</label>
                <Input
                    type="file"
                    id="file"
                />
                <p className="text-xs text-gray-500 mt-1">Supported formats: JPG, PNG, PDF, DOC. Max size: 5MB</p>
            </div>

            <Button type="submit" className="inline-flex items-center">
                <Send className="h-4 w-4 mr-2" />
                Submit Request
            </Button>
        </form>
    </Card>
);

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
                        <h1 className="text-3xl md:text-5xl font-bold mb-6">Support & Services</h1>
                        <p className="text-lg md:text-xl text-blue-100 mb-8">
                            Our expert team is available 24/7 to assist you with any technical issues
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button variant="secondary" asChild>
                                <a href="#contact">Contact Now</a>
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Services section */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-16">Our Support Services</h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <ServiceCard
                            icon={Phone}
                            title="Technical Support"
                            description="Professional technical team to resolve any product-related issues"
                        />
                        <ServiceCard
                            icon={Clock}
                            title="Regular Maintenance"
                            description="Periodic inspection and maintenance service to ensure stable operation"
                        />
                        <ServiceCard
                            icon={MapPin}
                            title="On-site Support"
                            description="Technicians will visit your location to resolve complex issues"
                        />
                    </div>
                </div>
            </section>

            {/* Contact section */}
            <section id="contact" className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-16">Contact Support</h2>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        <div className="lg:col-span-1">
                            <ContactInfo />
                        </div>

                        <div className="lg:col-span-2">
                            <SupportForm />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
} 