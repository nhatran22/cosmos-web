import { redirect } from 'next/navigation';
import SolutionDetail from '../[slug]/page';

// Trang này sẽ redirect đến trang chi tiết với slug là household-storage
export default function HouseholdStoragePage() {
    // Render trang chi tiết solution với slug là household-storage
    return <SolutionDetail params={{ slug: 'household-storage' }} />;
} 