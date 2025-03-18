import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-gray-50 text-black">
      <div className="container mx-auto py-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-[18px] font-normal mb-4">About Us</h3>
            <ul className="space-y-2 text-gray-400 text-[12px]">
              <li><Link href="/about" className="hover:text-green-600">Our Company</Link></li>
              <li><Link href="/projects" className="hover:text-green-600">Join Us</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-[18px] font-normal mb-4">Product Center</h3>
            <ul className="space-y-2 text-gray-400 text-[12px]">
              <li><Link href="/about" className=" hover:text-green-600">UPS Power Supply</Link></li>
              <li><Link href="/projects" className=" hover:text-green-600">Modular Data Center</Link></li>
              <li><Link href="/projects" className=" hover:text-green-600">Precision Cooling</Link></li>
              <li><Link href="/projects" className=" hover:text-green-600">Household Hybrid Inverter</Link></li>
              <li><Link href="/projects" className=" hover:text-green-600">Industrial Hybrid Inverter</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-[18px] font-normal mb-4">Solution</h3>
            <ul className="space-y-2 text-gray-400 text-[12px]">
              <li><Link href="/about" className="hover:text-green-600">Data Center Critical Infrastructure</Link></li>
              <li><Link href="/projects" className="hover:text-green-600">New Energy Storage System Solutions</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-[18px] font-normal mb-4">Service Support</h3>
            <ul className="space-y-2 text-gray-400 text-[12px]">
              <li><Link href="/about" className="hover:text-green-600">Contact Us</Link></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="bg-gray-100 py-6 text-center text-gray-400">
        <p>&copy; {new Date().getFullYear()} Cosmos. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;