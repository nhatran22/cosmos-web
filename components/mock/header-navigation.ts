interface NavBar extends SubItem {
    submenu?: SubMenu[];
}

interface SubMenu {
    title: string;
    href?: string;
    image?: string;
    fullName?: string;
    items?: SubItem[];
}

interface SubItem {
    name: string;
    href: string;
    fullName?: string;
}

export const navigation: NavBar[] = [
    {
        name: 'Home',
        href: '/',
    },
    {
        name: 'About Us',
        href: '/about/overview',
        submenu: [
            {
                title: 'Our Company',
                href: '/about/overview',
                image: '/images/our-company.jpg'
            },
            {
                title: 'Join Us',
                href: '/about/join-us',
                image: '/images/join-us.jpg'
            }
        ]
    },
    {
        name: 'Product',
        href: '/products',
        submenu: [
            {
                title: 'UPS Power Supply',
                fullName: 'UPS Power Suppy',
                href: '/products',
                items: [
                    {
                        name: 'ACM Series Modular UPS',
                        href: '/products/ups-power-supply',
                        fullName: 'ACM Series Modular UPS'
                    },
                    { name: 'ACT Series Three-Phase UPS', href: '#', fullName: 'ACT Series Three-Phase UPS' },
                    { name: 'ACM Series Modula UPS(480V)', href: '#', fullName: 'ACM Series Modula UPS(480V)' },
                    { name: 'ACM Series Modula UPS(208V)', href: '#', fullName: 'ACM Series Modula UPS(208V)' },
                    { name: 'ACS Tower Series', href: '#', fullName: 'ACS Tower Series' },
                    { name: 'ACS Rack Series', href: '#', fullName: 'ACS Rack Series' },
                ],
            },
            {
                title: 'Precision Cooling',
                fullName: 'Precision Cooling',
                href: '/products',
                items: [
                    {
                        name: 'HA-Series In-row Cooling',
                        href: '/products/precision-cooling',
                        fullName: 'HA-Series In-row Cooling'
                    },
                    { name: 'BA Series Room Cooling', href: '#', fullName: 'BA Series Small Room Precision Cooling' },
                    { name: 'MA Series Large Room Precision Cooling', href: '#', fullName: 'MA Series Large Room Precision Cooling' },
                ],
            },
            {
                title: 'Residental Hybrid Inverter',
                fullName: 'Residential Hybrid Inverter(Coming Soon)',
                href: '/products',
                items: [
                    { name: 'SH Series Residental PCS', href: '/products/sh-series', fullName: 'SH Series Residental PCS' },
                    { name: 'TH Series Residental PCS', href: '/products/th-series', fullName: 'TH Series Residental PCS' },
                ]
            },
            {
                title: 'Industrial & Commercial Hybrid',
                fullName: 'Industrial and Commercial Hybrid Inverter',
                href: '/products',
                items: [
                    { name: 'CSH Series', href: '/products/csh-series', fullName: 'CSH Series Industrial & Commercial Hybrid Inverter' },
                    { name: 'CSR Series', href: '/products/csr-series', fullName: 'CSR Series Industrial & Commercial Hybrid Inverter' },
                    { name: 'CST Series', href: '/products/cst-series', fullName: 'CST Series Industrial & Commercial Hybrid Inverter' },
                ]
            },
            {
                title: 'Modular Data Center',
                href: '/products',
                items: [
                    { name: 'AC5000 Series MDC', href: '/products/ac5000-series', fullName: 'AC5000 Series Modular Data Center' },
                ]
            },
        ]
    },
    {
        name: 'Solution',
        href: '/solutions',
        submenu: [
            {
                title: 'Data Center Critical Infrastructure',
                href: '/solutions',
                items: [
                    { name: 'Intelligent Micro Module System Solution', href: '/solutions/data-center' },
                ]
            },
            {
                title: 'New Energy Storage System',
                href: '/solutions',
                items: [
                    { name: 'Household Storage PCS System Solution', href: '/solutions/residential-storage' },
                    { name: 'Industrial and Commercial Storage PCS System Solution', href: '/solutions/commercial-storage' },
                ]
            }
        ]
    },
    {
        name: 'Service Support',
        href: '/support',
        submenu: [
            {
                title: 'Contact Us', href: '/support/technical'
            }
        ]
    }
];