'use client';

import React from 'react';

export default function JoinUsPage() {
    return (
        <div className="container mx-auto px-4 py-12">
            <h1 className="text-3xl font-bold mb-8 text-center">Join Our Team</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16">
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

                <div>
                    <h2 className="text-2xl font-semibold mb-4 text-green-600">Current Openings</h2>

                    <div className="space-y-6">
                        <div className="border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow">
                            <h3 className="text-xl font-medium">Senior Renewable Energy Engineer</h3>
                            <p className="text-gray-600 mt-1">Full-time · Shanghai, China</p>
                            <p className="text-gray-700 mt-3">
                                Lead the design and implementation of renewable energy systems for our commercial clients.
                            </p>
                            <button className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors">
                                Apply Now
                            </button>
                        </div>

                        <div className="border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow">
                            <h3 className="text-xl font-medium">Energy Storage Solutions Specialist</h3>
                            <p className="text-gray-600 mt-1">Full-time · Remote</p>
                            <p className="text-gray-700 mt-3">
                                Develop and optimize energy storage solutions for residential and commercial applications.
                            </p>
                            <button className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors">
                                Apply Now
                            </button>
                        </div>

                        <div className="border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow">
                            <h3 className="text-xl font-medium">Clean Energy Marketing Specialist</h3>
                            <p className="text-gray-600 mt-1">Part-time · Flexible</p>
                            <p className="text-gray-700 mt-3">
                                Create compelling marketing campaigns to promote our clean energy products and services.
                            </p>
                            <button className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors">
                                Apply Now
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="text-center">
                <h2 className="text-2xl font-semibold mb-4">Don't see a position that fits?</h2>
                <p className="text-gray-700 mb-6">
                    We're always looking for talented individuals to join our team. Send us your resume and we'll keep it on file for future opportunities.
                </p>
                <button className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                    Send Your Resume
                </button>
            </div>
        </div>
    );
} 