import { Solution, Tab } from '@/app/interface/solutions';

const relatedProducts = [
    {
        id: 'acm-15',
        title: 'ACM Series',
        slug: 'inverter-5kw',
        description: 'is widely used in government, finance, communications, education, transportation, meteorology, radio and television, industrial and commercial taxation, medical and health, energy and power and other industries.',
        features: ['15 ~ 120kVA', 'Rack Modular UPS'],
        image: '/product/acm-series/acm-series-15.png',
        href: '/products/inverter-5kw',
    },
    {
        id: 'acm-50',
        title: 'ACM Series',
        slug: 'battery-10kwh',
        description: 'is widely used in government, finance, communications, education, transportation, meteorology, radio and television, industrial and commercial taxation, medical and health, energy and power and other industries.',
        features: ['50 ~ 600kVA', 'Modular UPS'],
        image: '/product/acm-series/acm-series-50.png',
        href: '/products/battery-10kwh',
    },
    {
        id: 'ha-series',
        title: 'HA Series',
        slug: 'battery-10kwh',
        description: 'Application site Data center, computer room, networkroom, Server room, switch room, communication basestation.',
        features: ['In-Row', 'Precision Cooling'],
        image: '/product/precision-cooling/ha-series.png',
        href: '/products/battery-10kwh',
    },
    {
        id: 'act-10',
        title: 'ACT Series',
        slug: 'battery-10kwh',
        description: 'is widely used in government, finance, communications, education, transportation, meteorology, radio and television, industrial and commercial taxation, medical and health, energy and power and other industries.',
        features: ['10 ~ 40kVA', 'Three Phase Rack UPS'],
        image: '/product/act-series/act-series-10.png',
        href: '/products/battery-10kwh',
    }
]
// Danh sách tabs
export const TABS: Tab[] = [
    {
        id: 'data-center',
        label: 'Data Center Critical Infrastructure',
        category: 'Data Center Critical Infrastructure'
    },
    {
        id: 'energy-storage',
        label: 'New Energy Storage System',
        category: 'New Energy Storage System'
    }
];

// Dữ liệu giải pháp thống nhất
export const SOLUTIONS_DATA: Record<string, Solution[]> = {
    'Data Center Critical Infrastructure': [
        {
            id: 'data-center',
            name: "Data Center Solution",
            title: "Data Center Critical Infrastructure",
            description: 'The key infrastructure system solution for the data center adopts a modular, prefabricated, and intelligent design concept. It efficiently integrates and integrates power supply and distribution systems, UPS power supply systems, intelligent temperature control systems, cabinet systems, closed channel systems, dynamic and environmental monitoring systems, and is equipped with various environmental data sampling sensors for unified monitoring and management, achieving automatic control, intelligent operation and maintenance, and improving the reliability of the data center Availability and maintainability.',
            image: '/solutions/data-center-solution.png',
            href: '/solutions/data-center',
            category: 'Data Center Critical Infrastructure',
        }
    ],
    'New Energy Storage System': [
        {
            id: 'residential-storage',
            name: "Household Energy Storage",
            title: 'Household Hybrid Inverter',
            description: 'ACwatt household energy storage solutions include "energy storage converter energy storage battery" as complete solution, with a variety of energy storage converter and battery products, suitable for new optical storage power station, the original household grid system transformation or no (weak) grid areas. Acwatt household energy storage solution realizes a higher proportion of green electricity for self-use and reduces electricity',
            textContent: 'ACwatt household energy storage solutions include "energy storage converter energy storage battery" complete solution, with a variety of energy storage converter and battery products, suitable for new optical storage power station, the original household grid-connected system transformation or no (weak) grid areas. Aichen digital energy household energy storage solution realizes a higher proportion of green electricity for self-use and reduces electricity expenses. At the same time, UPS uninterruptible power supply function can be provided to ensure that key equipment is not powered off. Users can easily grasp the power consumption situation through Aichen Digital Cloud Monitoring and enjoy a zero-carbon home.',
            image: '/solutions/household-storage.png',
            representiveImage: '/product/household-inverter/th-series.png',
            href: '/solutions/household-storage',
            category: 'New Energy Storage System',
            relatedProducts: relatedProducts
        },
        {
            id: 'commercial-storage',
            name: "Industrial Solution",
            title: 'Industrial and Commercial Hybrid Inverter',
            description: 'ACwatt industrial and commercial roofs include not only standard industrial and commercial roofs such as factory roofs, supermarkets and office buildings, but also party and government organs (courts, government buildings, etc.), roofs of public buildings (schools, hospitals, stations, etc.) and some application scenarios of "photovoltaic energy storage". The industrial and commercial roof area is large, the electricity consumption of users is large and the electricity price is relatively high. The return on',
            textContent: 'ACwatt industrial and commercial roofs include not only standard industrial and commercial roofs such as factory roofs, supermarkets and office buildings, but also party and government organs (courts, government buildings, etc.), roofs of public buildings (schools, hospitals, stations, etc.) and some application scenarios of "photovoltaic energy storage". The industrial and commercial roof area is large, the electricity consumption of users is large and the electricity price is relatively high. The return on investment is more considerable, the effect of energy saving and emission reduction, green environmental protection. ACwatt industrial and commercial solutions bring "higher income, lower investment, safe and reliable, intelligent operation and maintenance" etc value, covering the application of the above-mentioned industrial and commercial scenarios.',
            image: '/solutions/commercial-storage.png',
            representiveImage: '/product/industrial-commercial/csh-series.png',
            href: '/solutions/commercial-storage',
            category: 'New Energy Storage System',
            relatedProducts: relatedProducts
        }
    ]
};

// Helper function để lấy solution theo slug
export function getSolutionBySlug(slug: string): Solution | undefined {
    let foundSolution: Solution | undefined;

    // Search through all solutions in all categories
    Object.values(SOLUTIONS_DATA).forEach(solutionsArray => {
        solutionsArray.forEach(solution => {
            // Match by URL path segment
            const urlPath = solution.href || '';
            const segments = urlPath.split('/');
            const lastSegment = segments[segments.length - 1];

            if (lastSegment === slug || solution.id === slug) {
                foundSolution = solution;
            }
        });
    });

    return foundSolution;
}
