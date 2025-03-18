interface NavBar extends SubItem {
    submenu?: SubMenu[];
}

interface SubMenu {
    title: string;
    href?: string;
    image?: string;
    items?: SubItem[];
}

interface SubItem {
    name: string;
    href: string;
}

export const navigation: NavBar[] = [
    {
        name: 'Home',
        href: '/',
    },
    {
        name: 'About Us',
        href: '/about',
        submenu: [
            {
                title: 'Our Company',
                href: '/about/overview',
                image: '/images/our-company.jpg'  // Thêm hình ảnh cho submenu này
            },
            {
                title: 'Join Us',
                href: '/about/join-us',
                image: '/images/join-us.jpg'  // Thêm hình ảnh cho submenu này
            }
        ]
    },
    {
        name: 'Product',
        href: '#',
        submenu: [
            {
                title: 'Residental Hybrid Inverter',
                items: [
                    { name: 'SH Series Residental PCS', href: '/products/sh-series' },
                    { name: 'TH Series Residental PCS', href: '/products/th-series' },
                ]
            },
            {
                title: 'Industrial & commercial',
                items: [
                    { name: 'CSH Series Industrial & comm...', href: '/products/csh-series' },
                    { name: 'CSR Series Industrial & comm...', href: '/products/csr-series' },
                    { name: 'CST Series Industrial & comm...', href: '/products/cst-series' },
                ]
            },
            {
                title: 'UPS Power Supply',
                items: [
                    { name: 'ACM Series Modular UPS', href: '/products/acm-series' },
                    { name: 'ACT Series Three-Phase UPS', href: '/products/act-series' },
                    { name: 'ACM Series Modular UPS(480V)', href: '/products/acm-series-480v' },
                    { name: 'ACM Series Modular UPS(208V)', href: '/products/acm-series-208v' },
                    { name: 'ACS Tower Series', href: '/products/acs-tower' },
                    { name: 'ACS Rack Series', href: '/products/acs-rack' },
                ]
            },
            {
                title: 'Modular Data Center',
                items: [
                    { name: 'AC5000 Series MDC', href: '/products/ac5000-series' },
                ]
            },
            {
                title: 'Precision Cooling',
                items: [
                    { name: 'HA Series In-row cooling', href: '/products/ha-series' },
                    { name: 'BA Series Room Cooling', href: '/products/ba-series' },
                    { name: 'MA Series Large Room Cooling', href: '/products/ma-series' },
                ]
            }
        ]
    },
    {
        name: 'Solution',
        href: '#',
        submenu: [
            {
                title: 'Data Center Critical Infrastructure',
                items: [
                    { name: 'Intelligent Modular Data Center', href: '/solutions/data-center' },
                ]
            },
            {
                title: 'New Energy Storage System',
                items: [
                    { name: 'Residential Storage Hybrid Inverter', href: '/solutions/residential-storage' },
                    { name: 'Industrial & commercial Storage', href: '/solutions/commercial-storage' },
                ]
            }
        ]
    },
    {
        name: 'Service Support',
        href: '#',
        submenu: [
            {
                title: 'Contact Us', href: '/support/technical'
            }
        ]
    }
];