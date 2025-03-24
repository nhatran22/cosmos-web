import { redirect } from 'next/navigation';
import SolutionDetail from '../[slug]/page';

// Trang này sẽ redirect đến trang chi tiết với slug là commercial-storage
export default function CommercialStoragePage() {
    // Render trang chi tiết solution với slug là commercial-storage
    return <SolutionDetail params={{ slug: 'commercial-storage' }} />;
} 