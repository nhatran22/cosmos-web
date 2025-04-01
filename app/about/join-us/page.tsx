'use client';

import { Metadata } from 'next';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
    title: 'Join Us | COSMOS RF',
    description: 'Join our team at COSMOS RF and be part of the future of RF technology.',
};

const JobCard = ({ title, location, type, description }: {
    title: string;
    location: string;
    type: string;
    description: string;
}) => (
    <div className="border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow">
        <h3 className="text-xl font-medium">{title}</h3>
        <p className="text-gray-600 mt-1">{type} · {location}</p>
        <p className="text-gray-700 mt-3">{description}</p>
        <Button className="mt-4" variant="default">
            Apply Now
        </Button>
    </div>
);

const WhyWorkWithUs = () => (
    <div>
        <h2 className="text-2xl font-semibold mb-4 text-green-600">Why Work With Us</h2>
        <p className="text-gray-700 mb-4">
            At Cosmos, we're more than just a clean energy company. We're a team of passionate individuals committed to creating a sustainable future for our planet.
        </p>
        <p className="text-gray-700 mb-4">
            We believe in fostering a collaborative environment where innovative ideas are encouraged and professional growth is supported.
        </p>
        <div className="bg-gray-100 p-6 rounded-lg mt-8">
            <h3 className="text-xl font-medium mb-3 text-green-600">Our Values</h3>
            <ul className="list-disc pl-5 text-gray-700 space-y-2">
                <li>Innovation and continuous improvement</li>
                <li>Environmental responsibility</li>
                <li>Collaboration and teamwork</li>
                <li>Customer-focused solutions</li>
                <li>Integrity and transparency</li>
            </ul>
        </div>
    </div>
);

const CurrentOpenings = () => {
    const jobs = [
        {
            title: "Senior Renewable Energy Engineer",
            location: "Shanghai, China",
            type: "Full-time",
            description: "Lead the design and implementation of renewable energy systems for our commercial clients."
        },
        {
            title: "Energy Storage Solutions Specialist",
            location: "Remote",
            type: "Full-time",
            description: "Develop and optimize energy storage solutions for residential and commercial applications."
        },
        {
            title: "Clean Energy Marketing Specialist",
            location: "Flexible",
            type: "Part-time",
            description: "Create compelling marketing campaigns to promote our clean energy products and services."
        }
    ];

    return (
        <div>
            <h2 className="text-2xl font-semibold mb-4 text-green-600">Current Openings</h2>
            <div className="space-y-6">
                {jobs.map((job, index) => (
                    <JobCard key={index} {...job} />
                ))}
            </div>
        </div>
    );
};

export default function JoinUsPage() {
    return (
        <div className="container mx-auto px-4 py-12">
            <h1 className="text-3xl font-bold mb-8 text-center">Join Our Team</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16">
                <WhyWorkWithUs />
                <CurrentOpenings />
            </div>

            <div className="text-center">
                <h2 className="text-2xl font-semibold mb-4">Don't see a position that fits?</h2>
                <p className="text-gray-700 mb-6">
                    We're always looking for talented individuals to join our team. Send us your resume and we'll keep it on file for future opportunities.
                </p>
                <Button variant="default">
                    Send Your Resume
                </Button>
            </div>
        </div>
    );
} 