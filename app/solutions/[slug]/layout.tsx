import { baseNavigation } from "@/data/navigation-data";

export async function generateStaticParams() {
    // Tìm menu Solutions
    const solutionsMenu = baseNavigation.find(item => item.name === 'Solution' || item.href === '/solutions');

    if (!solutionsMenu?.submenu) {
        return [];
    }

    // Tạo danh sách các slug từ tất cả các giải pháp
    const params = solutionsMenu.submenu.flatMap(category => {
        if (!category.items) return [];

        return category.items.map(item => {
            // Lấy slug từ href hoặc tạo slug từ tên
            const slug = item.href.split('/').pop() || item.name.toLowerCase().replace(/\s+/g, '-');
            return { slug };
        });
    });

    return params;
}

export default function SolutionLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
} 