// Định nghĩa các interface cho cấu trúc dữ liệu
export interface NavigationItem {
    id: string;
    name: string;
    href: string;
    level: number;
}

export interface Category extends NavigationItem {
    subcategories: SubCategory[];
}

export interface SubCategory extends NavigationItem {
    products: ProductItem[];
    image?: string; // Hình ảnh đại diện cho danh mục phụ
    description?: string; // Mô tả ngắn về danh mục
}

export interface ProductItem extends NavigationItem {
    categoryId: string;
    subcategoryId: string;
    image?: string; // Hình ảnh sản phẩm
    shortDescription?: string; // Mô tả ngắn
    specifications?: {
        [key: string]: string | number;
    }; // Thông số kỹ thuật
    features?: string[]; // Tính năng nổi bật
    isRepresentative?: boolean; // Đánh dấu là sản phẩm đại diện
}

// Dữ liệu chính chứa tất cả các cấp
export const navigationData: Category[] = [
    {
        id: "ups",
        name: "UPS Power Supply",
        href: "/products/ups-power-supply",
        level: 1,
        subcategories: [
            {
                id: "acm-series",
                name: "ACM Series Modular UPS",
                href: "/products/ups-power-supply/acm-series",
                level: 2,
                description: "Hệ thống UPS dạng module linh hoạt với khả năng mở rộng dễ dàng và độ tin cậy cao.",
                products: [
                    {
                        id: "acm-series-1",
                        name: "ACM Series 1",
                        href: "/products/ups-power-supply/acm-series/acm-series-1",
                        level: 3,
                        categoryId: "ups",
                        subcategoryId: "acm-series",
                        image: "/images/products/acm-series-1.jpg",
                        shortDescription: "UPS module 50kVA với hiệu suất cao và thiết kế tiết kiệm không gian.",
                        specifications: {
                            "Công suất": "50kVA",
                            "Hiệu suất": "96%",
                            "Kích thước": "482.6 x 916 x 173 mm",
                            "Trọng lượng": "42kg",
                            "Nhiệt độ hoạt động": "0-40°C"
                        },
                        features: [
                            "Thiết kế module hot-swappable",
                            "Quản lý nhiệt thông minh",
                            "Hỗ trợ N+X redundancy",
                            "Hệ thống giám sát từ xa"
                        ],
                        isRepresentative: true
                    },
                    {
                        id: "acm-series-2",
                        name: "ACM Series 2",
                        href: "/products/ups-power-supply/acm-series/acm-series-2",
                        level: 3,
                        categoryId: "ups",
                        subcategoryId: "acm-series",
                        image: "/images/products/acm-series-2.jpg",
                        shortDescription: "UPS module 100kVA với khả năng mở rộng cao và quản lý năng lượng tiên tiến.",
                        specifications: {
                            "Công suất": "100kVA",
                            "Hiệu suất": "97%",
                            "Kích thước": "482.6 x 916 x 173 mm",
                            "Trọng lượng": "45kg",
                            "Nhiệt độ hoạt động": "0-40°C"
                        },
                        features: [
                            "Tính năng ECO mode tiết kiệm năng lượng",
                            "Quản lý pin thông minh",
                            "Dung sai điện áp đầu vào rộng",
                            "Giao diện quản lý thân thiện"
                        ]
                    },
                    {
                        id: "acm-series-3",
                        name: "ACM Series 3",
                        href: "/products/ups-power-supply/acm-series/acm-series-3",
                        level: 3,
                        categoryId: "ups",
                        subcategoryId: "acm-series",
                        image: "/images/products/acm-series-3.jpg",
                        shortDescription: "UPS module 150kVA với công nghệ điều khiển DSP và khả năng song song hóa cao.",
                        specifications: {
                            "Công suất": "150kVA",
                            "Hiệu suất": "97.5%",
                            "Kích thước": "482.6 x 975 x 175 mm",
                            "Trọng lượng": "50kg",
                            "Nhiệt độ hoạt động": "0-40°C"
                        },
                        features: [
                            "Công nghệ điều khiển DSP 3 lớp",
                            "Hỗ trợ đến 8 module song song",
                            "Cổng giao tiếp đa dạng",
                            "Tương thích với các hệ thống giám sát DCIM"
                        ]
                    },
                    {
                        id: "acm-series-4",
                        name: "ACM Series 4",
                        href: "/products/ups-power-supply/acm-series/acm-series-4",
                        level: 3,
                        categoryId: "ups",
                        subcategoryId: "acm-series",
                        image: "/images/products/acm-series-4.jpg",
                        shortDescription: "UPS module 200kVA với dung lượng cao và khả năng mở rộng linh hoạt.",
                        specifications: {
                            "Công suất": "200kVA",
                            "Hiệu suất": "98%",
                            "Kích thước": "482.6 x 975 x 175 mm",
                            "Trọng lượng": "55kg",
                            "Nhiệt độ hoạt động": "0-40°C"
                        },
                        features: [
                            "Tích hợp bộ chuyển mạch tĩnh (STS)",
                            "Hệ thống quản lý pin thông minh",
                            "Giao diện màn hình cảm ứng LCD",
                            "Khả năng tương thích cao với các hệ thống điện khác nhau"
                        ]
                    },
                    {
                        id: "acm-series-5",
                        name: "ACM Series 5",
                        href: "/products/ups-power-supply/acm-series/acm-series-5",
                        level: 3,
                        categoryId: "ups",
                        subcategoryId: "acm-series"
                    },
                ],
            },
            {
                id: "act-series",
                name: "ACT Series Three-Phase UPS",
                href: "/products/ups-power-supply/act-series",
                level: 2,
                image: "/images/categories/act-series.jpg",
                description: "Hệ thống UPS ba pha mạnh mẽ, tin cậy với hiệu suất cao và khả năng bảo vệ tuyệt vời.",
                products: [
                    {
                        id: "act-series-1",
                        name: "ACT Series 1",
                        href: "/products/ups-power-supply/act-series/act-series-1",
                        level: 3,
                        categoryId: "ups",
                        subcategoryId: "act-series",
                        image: "/images/products/act-series-1.jpg",
                        shortDescription: "UPS ba pha 100kVA với công nghệ IGBT và khả năng chịu tải cao.",
                        specifications: {
                            "Công suất": "100kVA",
                            "Hiệu suất": "95%",
                            "Kích thước": "850 x 1900 x 960 mm",
                            "Trọng lượng": "800kg",
                            "Nhiệt độ hoạt động": "0-40°C"
                        },
                        features: [
                            "Công nghệ IGBT hoàn toàn",
                            "Hệ số công suất đầu ra 1.0",
                            "Khả năng chịu tải không cân bằng cao",
                            "Chức năng tự chẩn đoán"
                        ],
                        isRepresentative: true
                    },
                    {
                        id: "act-series-2",
                        name: "ACT Series 2",
                        href: "/products/ups-power-supply/act-series/act-series-2",
                        level: 3,
                        categoryId: "ups",
                        subcategoryId: "act-series",
                        image: "/images/products/act-series-2.jpg",
                        shortDescription: "UPS ba pha 200kVA với thiết kế chắc chắn và khả năng mở rộng linh hoạt.",
                        specifications: {
                            "Công suất": "200kVA",
                            "Hiệu suất": "96%",
                            "Kích thước": "850 x 1900 x 960 mm",
                            "Trọng lượng": "900kg",
                            "Nhiệt độ hoạt động": "0-40°C"
                        },
                        features: [
                            "Thiết kế dự phòng nội bộ cho các thành phần quan trọng",
                            "Khả năng song song hóa đến 6 máy",
                            "Hỗ trợ kết nối với máy phát điện",
                            "Quản lý pin thông minh"
                        ]
                    }
                ],
            },
            {
                id: "acm-series-480v",
                name: "ACM Series Modular UPS (480W)",
                href: "/products/ups-power-supply/acm-series-480v",
                level: 2,
                image: "/images/categories/acm-series-480v.jpg",
                description: "UPS module 480V cao cấp dành cho trung tâm dữ liệu lớn và ứng dụng công nghiệp.",
                products: [
                    {
                        id: "acm-480v",
                        name: "ACM Series 480V",
                        href: "/products/ups-power-supply/acm-series-480v/acm-480v",
                        level: 3,
                        categoryId: "ups",
                        subcategoryId: "acm-series-480v",
                        image: "/images/products/acm-480v.jpg",
                        shortDescription: "UPS module 480V với công suất lớn và độ tin cậy cao cho hệ thống trung tâm dữ liệu.",
                        specifications: {
                            "Điện áp đầu vào": "480V",
                            "Công suất": "300kVA",
                            "Hiệu suất": "97%",
                            "Kích thước": "900 x 2000 x 1000 mm",
                            "Trọng lượng": "1000kg"
                        },
                        features: [
                            "Hỗ trợ lắp đặt song song lên đến 8 máy",
                            "Tính năng tiết kiệm năng lượng nâng cao",
                            "Hệ thống làm mát dự phòng",
                            "Tương thích với các hệ thống pin Li-ion"
                        ],
                        isRepresentative: true
                    }
                ],
            },
            {
                id: "acm-series-208v",
                name: "ACM Series Modular UPS (208V)",
                href: "/products/ups-power-supply/acm-series-208v",
                level: 2,
                image: "/images/categories/acm-series-208v.jpg",
                description: "UPS module 208V hiệu suất cao phù hợp cho các trung tâm dữ liệu nhỏ và vừa.",
                products: [
                    {
                        id: "acm-208-1",
                        name: "ACM 208 1",
                        href: "/products/ups-power-supply/acm-series-208v/acm-208-1",
                        level: 3,
                        categoryId: "ups",
                        subcategoryId: "acm-series-208v",
                        image: "/images/products/acm-208-1.jpg",
                        shortDescription: "UPS module 208V với khả năng tương thích cao và quản lý năng lượng tối ưu.",
                        specifications: {
                            "Điện áp đầu vào": "208V",
                            "Công suất": "100kVA",
                            "Hiệu suất": "96%",
                            "Kích thước": "600 x 1800 x 850 mm",
                            "Trọng lượng": "450kg"
                        },
                        features: [
                            "Màn hình cảm ứng 10 inch",
                            "Chẩn đoán lỗi từ xa",
                            "Quản lý không gian cho phép",
                            "Khả năng nâng cấp firmware từ xa"
                        ],
                        isRepresentative: true
                    },
                    {
                        id: "acm-208-2",
                        name: "ACM 208 2",
                        href: "/products/ups-power-supply/acm-series-208v/acm-208-2",
                        level: 3,
                        categoryId: "ups",
                        subcategoryId: "acm-series-208v"
                    },
                    {
                        id: "acm-208-3",
                        name: "ACM 208 3",
                        href: "/products/ups-power-supply/acm-series-208v/acm-208-3",
                        level: 3,
                        categoryId: "ups",
                        subcategoryId: "acm-series-208v"
                    },
                ],
            },
            {
                id: "acs-series",
                name: "ACS Tower Series",
                href: "/products/ups-power-supply/acs-tower",
                level: 2,
                image: "/images/categories/acs-tower.jpg",
                description: "UPS dạng tháp chất lượng cao với thiết kế tinh tế và hiệu suất tối ưu.",
                products: [
                    {
                        id: "acs-tower-1",
                        name: "ACS Tower 1kVA",
                        href: "/products/ups-power-supply/acs-tower/acs-tower-1",
                        level: 3,
                        categoryId: "ups",
                        subcategoryId: "acs-series",
                        image: "/images/products/acs-tower-1.jpg",
                        shortDescription: "UPS dạng tháp 1kVA hoàn hảo cho văn phòng nhỏ và máy trạm.",
                        specifications: {
                            "Công suất": "1kVA/0.9kW",
                            "Thời gian backup": "5-30 phút",
                            "Kích thước": "145 x 220 x 405 mm",
                            "Trọng lượng": "13kg"
                        },
                        features: [
                            "Thiết kế nhỏ gọn",
                            "Vận hành êm ái",
                            "Quản lý pin thông minh",
                            "Cổng USB và phần mềm giám sát"
                        ],
                        isRepresentative: true
                    },
                    {
                        id: "acs-series-2",
                        name: "ACS Tower 3kVA",
                        href: "/products/ups-power-supply/acs-tower/acs-tower-2",
                        level: 3,
                        categoryId: "ups",
                        subcategoryId: "acs-series",
                        image: "/images/products/acs-tower-2.jpg",
                        shortDescription: "UPS dạng tháp 3kVA lý tưởng cho văn phòng vừa và các thiết bị quan trọng.",
                        specifications: {
                            "Công suất": "3kVA/2.7kW",
                            "Thời gian backup": "5-30 phút",
                            "Kích thước": "190 x 318 x 421 mm",
                            "Trọng lượng": "26kg"
                        },
                        features: [
                            "Dạng sóng đầu ra sine chuẩn",
                            "Thiết kế dự phòng fan",
                            "Hỗ trợ SNMP",
                            "Màn hình LCD hiển thị thông số"
                        ]
                    },
                    {
                        id: "acs-series-3",
                        name: "ACS Tower 3",
                        href: "/products/ups-power-supply/acs-tower/acs-tower-3",
                        level: 3,
                        categoryId: "ups",
                        subcategoryId: "acs-series"
                    },
                ],
            },
            {
                id: "acs-rack-series",
                name: "ACS Rack Series",
                href: "/products/ups-power-supply/acs-rack",
                level: 2,
                image: "/images/categories/acs-rack.jpg",
                description: "UPS dạng rack tiết kiệm không gian với hiệu suất cao dành cho phòng máy chủ.",
                products: [
                    {
                        id: "acs-rack-1",
                        name: "ACS Rack 1",
                        href: "/products/ups-power-supply/acs-rack/acs-rack-1",
                        level: 3,
                        categoryId: "ups",
                        subcategoryId: "acs-rack-series",
                        image: "/images/products/acs-rack-1.jpg",
                        shortDescription: "UPS dạng rack 1kVA hiệu suất cao với thiết kế tiết kiệm không gian.",
                        specifications: {
                            "Công suất": "1kVA/0.9kW",
                            "Cao": "2U",
                            "Kích thước": "440 x 460 x 86 mm",
                            "Trọng lượng": "13.5kg"
                        },
                        features: [
                            "Thiết kế tối ưu 2U",
                            "Giao diện người dùng trực quan",
                            "Quản lý từ xa qua SNMP",
                            "Tự động khởi động sau khi mất điện"
                        ],
                        isRepresentative: true
                    },
                    {
                        id: "acs-rack-2",
                        name: "ACS Rack 2",
                        href: "/products/ups-power-supply/acs-rack/acs-rack-2",
                        level: 3,
                        categoryId: "ups",
                        subcategoryId: "acs-rack-series"
                    },
                    {
                        id: "acs-rack-3",
                        name: "ACS Rack 3",
                        href: "/products/ups-power-supply/acs-rack/acs-rack-3",
                        level: 3,
                        categoryId: "ups",
                        subcategoryId: "acs-rack-series"
                    },
                ],
            },
        ],
    },
    {
        id: "mdc",
        name: "Modular Data Center",
        href: "/products/modular-data-center",
        level: 1,
        subcategories: [
            {
                id: "ac500",
                name: "AC500",
                href: "/products/modular/ac500",
                level: 2,
                image: "/images/categories/ac500.jpg",
                description: "Giải pháp trung tâm dữ liệu module hoàn chỉnh, hiệu quả về chi phí và nhanh chóng triển khai.",
                products: [
                    {
                        id: "ac500-standard",
                        name: "AC500 Standard",
                        href: "/products/modular/ac500/standard",
                        level: 3,
                        categoryId: "mdc",
                        subcategoryId: "ac500",
                        image: "/images/products/ac500-standard.jpg",
                        shortDescription: "Trung tâm dữ liệu module tiêu chuẩn với thiết kế tối ưu năng lượng và khả năng mở rộng cao.",
                        specifications: {
                            "Kích thước": "40ft Container",
                            "Số rack tối đa": "10 racks",
                            "Công suất IT": "Lên đến 250kW",
                            "PUE": "<1.5",
                            "Thời gian triển khai": "12-16 tuần"
                        },
                        features: [
                            "Thiết kế module hoàn chỉnh",
                            "Hệ thống làm mát hiệu quả cao",
                            "Hệ thống giám sát tích hợp DCIM",
                            "Hệ thống phòng cháy chữa cháy tự động"
                        ],
                        isRepresentative: true
                    }
                ],
            },
        ],
    },
    {
        id: "precision-cooling",
        name: "Precision Cooling",
        href: "/products/precision-cooling",
        level: 1,
        subcategories: [
            {
                id: "ha-series",
                name: "HA-Series In-row Precision Cooling",
                href: "/products/precision-cooling/ha-series",
                level: 2,
                image: "/images/categories/ha-series.jpg",
                description: "Giải pháp làm mát chính xác dạng hàng cho trung tâm dữ liệu hiện đại.",
                products: [
                    {
                        id: "ha-series-20",
                        name: "HA Series 20kW",
                        href: "/products/precision-cooling/ha-series/ha-series-20",
                        level: 3,
                        categoryId: "precision-cooling",
                        subcategoryId: "ha-series",
                        image: "/images/products/ha-series-20.jpg",
                        shortDescription: "Hệ thống làm mát hàng 20kW với hiệu suất năng lượng cao và thiết kế tối ưu.",
                        specifications: {
                            "Công suất làm mát": "20kW",
                            "Luồng khí": "5,400 m³/h",
                            "Kích thước": "300 x 2000 x 1200 mm",
                            "Trọng lượng": "230kg",
                            "Loại gas làm lạnh": "R410A"
                        },
                        features: [
                            "Điều khiển EC Fan tiết kiệm năng lượng",
                            "Điều khiển bằng vi xử lý",
                            "Thiết kế module dễ dàng mở rộng",
                            "Công nghệ biến tần tiết kiệm điện"
                        ],
                        isRepresentative: true
                    },
                    {
                        id: "ha-series-35",
                        name: "HA Series 35kW",
                        href: "/products/precision-cooling/ha-series/ha-series-35",
                        level: 3,
                        categoryId: "precision-cooling",
                        subcategoryId: "ha-series",
                        image: "/images/products/ha-series-35.jpg",
                        shortDescription: "Hệ thống làm mát hàng 35kW với công suất cao và khả năng phân phối không khí hiệu quả.",
                        specifications: {
                            "Công suất làm mát": "35kW",
                            "Luồng khí": "8,500 m³/h",
                            "Kích thước": "600 x 2000 x 1200 mm",
                            "Trọng lượng": "350kg",
                            "Loại gas làm lạnh": "R410A"
                        },
                        features: [
                            "Hệ thống đa cảm biến",
                            "Chế độ thông minh tự điều chỉnh",
                            "Tính năng khởi động mềm",
                            "Hệ thống báo động toàn diện"
                        ]
                    }
                ],
            },
            {
                id: "ba-series",
                name: "BA series Small and Medium Room Cooling",
                href: "/products/precision-cooling/ba-series",
                level: 2,
                image: "/images/categories/ba-series.jpg",
                description: "Giải pháp làm mát chính xác cho phòng máy chủ nhỏ và vừa với khả năng kiểm soát độ ẩm tối ưu.",
                products: [],
            },
            {
                id: "ma-series",
                name: "MA Series Large Room Cooling",
                href: "/products/precision-cooling/ma-series",
                level: 2,
                image: "/images/categories/ma-series.jpg",
                description: "Giải pháp làm mát quy mô lớn với hiệu suất cao và độ tin cậy tuyệt đối cho các trung tâm dữ liệu lớn.",
                products: [],
            },
        ],
    },
    {
        id: "household-hybrid",
        name: "Household Hybrid",
        href: "/products/household-hybrid",
        level: 1,
        subcategories: [
            {
                id: "sh-series",
                name: "SH Series Household PCS",
                href: "/products/household-hybrid/sh-series",
                level: 2,
                image: "/images/categories/sh-series.jpg",
                description: "Hệ thống chuyển đổi điện hybrid cho hộ gia đình với thiết kế nhỏ gọn và hiệu suất cao.",
                products: [],
            },
            {
                id: "th-series",
                name: "TH Series Household PCS",
                href: "/products/household-hybrid/th-series",
                level: 2,
                image: "/images/categories/th-series.jpg",
                description: "Hệ thống chuyển đổi điện cấp cao cho hộ gia đình với tính năng thông minh và khả năng tích hợp cao.",
                products: [],
            },
        ],
    },
    {
        id: "industrial-hybrid",
        name: "Industrial Hybrid",
        href: "/products/industrial-hybrid",
        level: 1,
        subcategories: [
            {
                id: "csh-series",
                name: "CSH Series Industrial and Commercial Hybrid Inverter",
                href: "/products/industrial-hybrid/csh-series",
                level: 2,
                image: "/images/categories/csh-series.jpg",
                description: "Bộ biến tần hybrid công nghiệp và thương mại với hiệu suất cao và khả năng tích hợp đa dạng.",
                products: [],
            },
            {
                id: "csr-series",
                name: "CSR Series Industrial and Commercial Hybrid Inverter",
                href: "/products/industrial-hybrid/csr-series",
                level: 2,
                image: "/images/categories/csr-series.jpg",
                description: "Bộ biến tần hybrid công suất cao với khả năng chịu tải lớn và độ bền cao.",
                products: [],
            },
            {
                id: "cst-series",
                name: "CST Series Industrial and Commercial Hybrid Inverter",
                href: "/products/industrial-hybrid/cst-series",
                level: 2,
                image: "/images/categories/cst-series.jpg",
                description: "Bộ biến tần hybrid ba pha với công nghệ tiên tiến và độ tin cậy cao.",
                products: [],
            },
        ],
    },
];

// Helper Functions

// Hàm lấy tất cả sản phẩm theo ID danh mục
export const getProductsByCategoryId = (
    categoryId: string
): ProductItem[] => {
    const category = navigationData.find((cat) => cat.id === categoryId);

    if (!category) return [];

    const products: ProductItem[] = [];

    category.subcategories.forEach((subcategory) => {
        products.push(...subcategory.products);
    });

    return products;
};

// Hàm lấy sản phẩm đại diện cho mỗi danh mục cấp 2
export const getRepresentativeProducts = (): ProductItem[] => {
    const representatives: ProductItem[] = [];

    navigationData.forEach((category) => {
        category.subcategories.forEach((subcategory) => {
            const representative = subcategory.products.find(product => product.isRepresentative) ||
                (subcategory.products.length > 0 ? subcategory.products[0] : null);

            if (representative) {
                representatives.push({
                    ...representative,
                    name: `${subcategory.name} - ${representative.name}` // Đổi tên để hiển thị cả tên danh mục
                });
            }
        });
    });

    return representatives;
};

// Hàm lấy sản phẩm đại diện theo categoryId
export const getRepresentativeProductsByCategory = (categoryId: string): ProductItem[] => {
    const category = navigationData.find((cat) => cat.id === categoryId);
    if (!category) return [];

    const representatives: ProductItem[] = [];

    category.subcategories.forEach((subcategory) => {
        const representative = subcategory.products.find(product => product.isRepresentative) ||
            (subcategory.products.length > 0 ? subcategory.products[0] : null);

        if (representative) {
            representatives.push({
                ...representative,
                name: `${subcategory.name} - ${representative.name}` // Đổi tên để hiển thị cả tên danh mục
            });
        }
    });

    return representatives;
};

// Hàm kiểm tra và xử lý điều hướng cho danh mục cấp 2
export const handleSubcategoryNavigation = (subcategoryId: string): {
    shouldRedirect: boolean;
    redirectUrl?: string;
    products?: ProductItem[];
    subcategory?: SubCategory;
} => {
    // Tìm subcategory
    let foundSubcategory: SubCategory | undefined;
    let parentCategory: Category | undefined;

    for (const category of navigationData) {
        const subcategory = category.subcategories.find(sub => sub.id === subcategoryId);
        if (subcategory) {
            foundSubcategory = subcategory;
            parentCategory = category;
            break;
        }
    }

    if (!foundSubcategory) {
        return { shouldRedirect: false };
    }

    if (foundSubcategory.products.length === 1) {
        // Chỉ có 1 sản phẩm, chuyển hướng đến trang chi tiết
        return {
            shouldRedirect: true,
            redirectUrl: foundSubcategory.products[0].href,
            subcategory: foundSubcategory
        };
    } else if (foundSubcategory.products.length > 1) {
        // Có nhiều sản phẩm, trả về danh sách để hiển thị
        return {
            shouldRedirect: false,
            products: foundSubcategory.products,
            subcategory: foundSubcategory
        };
    } else {
        // Không có sản phẩm, giữ nguyên trang hiện tại
        return {
            shouldRedirect: false,
            products: [],
            subcategory: foundSubcategory
        };
    }
};

// Dữ liệu cho Tab Navigation (chỉ cấp 1)
export interface TabItem {
    id: string;
    name: string;
    href: string;
}

export const tabNavigationData: TabItem[] = navigationData.map((category) => ({
    id: category.id,
    name: category.name,
    href: category.href,
}));

// Dữ liệu cho Header Navigation và Sidebar (cấp 1 và cấp 2)
export interface HeaderNavItem {
    id: string;
    name: string;
    href: string;
    submenu?: HeaderSubmenuItem[];
}

export interface HeaderSubmenuItem {
    id: string;
    title: string;
    href: string;
    image?: string;
    description?: string;
    items?: {
        id: string;
        name: string;
        href: string;
    }[];
}

export const headerNavigationData: HeaderNavItem[] = navigationData.map(
    (category) => ({
        id: category.id,
        name: category.name,
        href: category.href,
        submenu: category.subcategories.map((subcategory) => ({
            id: subcategory.id,
            title: subcategory.name,
            href: subcategory.href,
            image: subcategory.image,
            description: subcategory.description,
            items: []
        })),
    })
); 