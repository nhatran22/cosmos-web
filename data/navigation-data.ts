import { NavBar } from "@/app/interface/navigation";

export const baseNavigation: NavBar[] = [
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
        name: 'Products',
        href: '/products',
    },
    {
        name: 'Solution',
        href: '/solutions',
        submenu: [
            {
                title: 'Data Center Critical Infrastructure',
                href: `/solutions?category=${encodeURIComponent('Data Center Critical Infrastructure')}`,
                items: [
                    { name: 'Intelligent Micro Module System Solution', href: '/solutions' },
                ]
            },
            {
                title: 'New Energy Storage System',
                href: `/solutions?category=${encodeURIComponent('New Energy Storage System')}`,
                items: [
                    { name: 'Household Storage PCS System Solution', href: '/solutions/household-storage' },
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
                title: 'Contact Us', href: '/support'
            }
        ]
    },
    {
        name: 'Nghiệm Thu',
        href: '/nghiem-thu'
    }
];