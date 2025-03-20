// Định nghĩa các interface cho cấu trúc dữ liệu
export interface NavigationItem {
    id: string;
    name: string;
    href: string;
    level: number;
}

export interface Category extends NavigationItem {
    subcategories: SubCategory[];
    description?: string;
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
        description: "Giải pháp nguồn điện dự phòng UPS chất lượng cao, bảo vệ thiết bị của bạn khỏi sự cố mất điện và dao động điện áp.",
        subcategories: [
            {
                id: "acm-series",
                name: "ACM Series Modular UPS",
                href: "/products/ups-power-supply/acm-series",
                level: 2,
                image: "/images/categories/acm-series.jpg",
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
                        subcategoryId: "acm-series",
                        image: "/images/products/acm-series-5.jpg",
                        shortDescription: "UPS module 250kVA với công nghệ tiên tiến nhất và hiệu suất vượt trội.",
                        specifications: {
                            "Công suất": "250kVA",
                            "Hiệu suất": "98.5%",
                            "Kích thước": "482.6 x 975 x 175 mm",
                            "Trọng lượng": "60kg",
                            "Nhiệt độ hoạt động": "0-40°C"
                        },
                        features: [
                            "Công nghệ tiết kiệm năng lượng thế hệ mới",
                            "Khả năng chịu tải lớn",
                            "Thiết kế module dễ dàng thay thế",
                            "Hỗ trợ kết nối thông minh"
                        ]
                    }
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
                description: "UPS module 208V hiệu suất cao cho các ứng dụng thương mại và doanh nghiệp vừa.",
                products: [
                    {
                        id: "acm-208-1",
                        name: "ACM 208 1",
                        href: "/products/ups-power-supply/acm-series-208v/acm-208-1",
                        level: 3,
                        categoryId: "ups",
                        subcategoryId: "acm-series-208v",
                        image: "/images/products/acm-208-1.jpg",
                        shortDescription: "UPS module 208V hiệu suất cao với công nghệ tiết kiệm năng lượng tiên tiến.",
                        specifications: {
                            "Điện áp đầu vào": "208V",
                            "Công suất": "100kVA",
                            "Hiệu suất": "96.5%",
                            "Kích thước": "600 x 1800 x 800 mm",
                            "Trọng lượng": "650kg"
                        },
                        features: [
                            "Thiết kế module linh hoạt",
                            "Giao diện quản lý dễ sử dụng",
                            "Hỗ trợ cài đặt song song",
                            "Khả năng mở rộng linh hoạt"
                        ],
                        isRepresentative: true
                    },
                    {
                        id: "acm-208-2",
                        name: "ACM 208 2",
                        href: "/products/ups-power-supply/acm-series-208v/acm-208-2",
                        level: 3,
                        categoryId: "ups",
                        subcategoryId: "acm-series-208v",
                        image: "/images/products/acm-208-2.jpg",
                        shortDescription: "UPS module 208V công suất trung bình với hiệu năng ổn định cho môi trường văn phòng.",
                        specifications: {
                            "Điện áp đầu vào": "208V",
                            "Công suất": "50kVA",
                            "Hiệu suất": "96%",
                            "Kích thước": "520 x 1600 x 800 mm",
                            "Trọng lượng": "450kg"
                        },
                        features: [
                            "Hệ thống giám sát từ xa",
                            "Bảo vệ quá tải toàn diện",
                            "Cổng giao tiếp RS232/USB",
                            "Thiết kế tiết kiệm không gian"
                        ]
                    },
                    {
                        id: "acm-208-3",
                        name: "ACM 208 3",
                        href: "/products/ups-power-supply/acm-series-208v/acm-208-3",
                        level: 3,
                        categoryId: "ups",
                        subcategoryId: "acm-series-208v",
                        image: "/images/products/acm-208-3.jpg",
                        shortDescription: "UPS module 208V hiệu suất cao dành cho các hệ thống đòi hỏi độ ổn định cao.",
                        specifications: {
                            "Điện áp đầu vào": "208V",
                            "Công suất": "150kVA",
                            "Hiệu suất": "97%",
                            "Kích thước": "650 x 1800 x 850 mm",
                            "Trọng lượng": "750kg"
                        },
                        features: [
                            "Công nghệ inverter hiện đại",
                            "Giao diện màn hình cảm ứng LCD",
                            "Hệ thống cảnh báo thông minh",
                            "Khả năng dự phòng N+1"
                        ]
                    }
                ],
            },
            {
                id: "acs-tower",
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
                        subcategoryId: "acs-tower",
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
                        id: "acs-tower-2",
                        name: "ACS Tower 3kVA",
                        href: "/products/ups-power-supply/acs-tower/acs-tower-2",
                        level: 3,
                        categoryId: "ups",
                        subcategoryId: "acs-tower",
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
                        id: "acs-tower-3",
                        name: "ACS Tower 6kVA",
                        href: "/products/ups-power-supply/acs-tower/acs-tower-3",
                        level: 3,
                        categoryId: "ups",
                        subcategoryId: "acs-tower",
                        image: "/images/products/acs-tower-3.jpg",
                        shortDescription: "UPS dạng tháp 6kVA dành cho ứng dụng doanh nghiệp vừa và hệ thống trọng yếu.",
                        specifications: {
                            "Công suất": "6kVA/5.4kW",
                            "Thời gian backup": "10-40 phút",
                            "Kích thước": "225 x 360 x 470 mm",
                            "Trọng lượng": "40kg"
                        },
                        features: [
                            "Quản lý pin thông minh",
                            "Chức năng mở rộng thời gian backup",
                            "Cổng giao tiếp đa dạng",
                            "Công nghệ DSP tiên tiến"
                        ]
                    }
                ],
            },
            {
                id: "acs-rack",
                name: "ACS Rack Series",
                href: "/products/ups-power-supply/acs-rack",
                level: 2,
                image: "/images/categories/acs-rack.jpg",
                description: "UPS dạng rack tiết kiệm không gian, phù hợp cho hệ thống máy chủ và trung tâm dữ liệu.",
                products: [
                    {
                        id: "acs-rack-1",
                        name: "ACS Rack 1kVA",
                        href: "/products/ups-power-supply/acs-rack/acs-rack-1",
                        level: 3,
                        categoryId: "ups",
                        subcategoryId: "acs-rack",
                        image: "/images/products/acs-rack-1.jpg",
                        shortDescription: "UPS rack mount 1kVA tiết kiệm không gian cho tủ rack nhỏ và thiết bị mạng.",
                        specifications: {
                            "Công suất": "1kVA/0.9kW",
                            "Chiều cao": "2U",
                            "Kích thước": "482 x 500 x 88 mm",
                            "Trọng lượng": "15kg"
                        },
                        features: [
                            "Thiết kế rack 19-inch tiêu chuẩn",
                            "Cài đặt dễ dàng",
                            "Phần mềm giám sát chuyên nghiệp",
                            "Độ ồn thấp"
                        ],
                        isRepresentative: true
                    },
                    {
                        id: "acs-rack-2",
                        name: "ACS Rack 3kVA",
                        href: "/products/ups-power-supply/acs-rack/acs-rack-2",
                        level: 3,
                        categoryId: "ups",
                        subcategoryId: "acs-rack",
                        image: "/images/products/acs-rack-2.jpg",
                        shortDescription: "UPS rack mount 3kVA mạnh mẽ, phù hợp cho các hệ thống máy chủ tầm trung.",
                        specifications: {
                            "Công suất": "3kVA/2.7kW",
                            "Chiều cao": "2U",
                            "Kích thước": "482 x 600 x 88 mm",
                            "Trọng lượng": "28kg"
                        },
                        features: [
                            "Hỗ trợ kết nối SNMP",
                            "Quản lý qua mạng",
                            "Mở rộng thời gian chạy với bộ pin mở rộng",
                            "Màn hình LCD thông minh"
                        ]
                    },
                    {
                        id: "acs-rack-3",
                        name: "ACS Rack 10kVA",
                        href: "/products/ups-power-supply/acs-rack/acs-rack-3",
                        level: 3,
                        categoryId: "ups",
                        subcategoryId: "acs-rack",
                        image: "/images/products/acs-rack-3.jpg",
                        shortDescription: "UPS rack mount 10kVA hiệu năng cao cho trung tâm dữ liệu nhỏ và trung bình.",
                        specifications: {
                            "Công suất": "10kVA/9kW",
                            "Chiều cao": "3U",
                            "Kích thước": "482 x 650 x 132 mm",
                            "Trọng lượng": "65kg"
                        },
                        features: [
                            "Công nghệ Online Double Conversion",
                            "Hệ số công suất đầu ra cao",
                            "Hỗ trợ song song hóa",
                            "Card SNMP tích hợp"
                        ]
                    }
                ],
            }
        ],
    },
    {
        id: "mdc",
        name: "Modular Data Center",
        href: "/products/modular-data-center",
        level: 1,
        description: "Giải pháp trung tâm dữ liệu module toàn diện, thiết kế linh hoạt và dễ dàng triển khai.",
        subcategories: [
            {
                id: "ac500",
                name: "AC500",
                href: "/products/modular-data-center/ac500",
                level: 2,
                image: "/images/categories/ac500.jpg",
                description: "Hệ thống trung tâm dữ liệu module AC500 - giải pháp toàn diện cho không gian hạn chế.",
                products: [
                    {
                        id: "ac500-series",
                        name: "AC500 Series",
                        href: "/products/modular-data-center/ac500/ac500-series",
                        level: 3,
                        categoryId: "mdc",
                        subcategoryId: "ac500",
                        image: "/images/products/ac500-series.jpg",
                        shortDescription: "Trung tâm dữ liệu module AC500 với thiết kế tối ưu và hệ thống làm mát hiệu quả.",
                        specifications: {
                            "Dung lượng": "Lên đến 12 rack",
                            "Làm mát": "Precision Cooling tích hợp",
                            "Công suất điện": "Lên đến 400kW",
                            "UPS": "Redundant N+1"
                        },
                        features: [
                            "Thiết kế tất cả trong một",
                            "Triển khai nhanh chóng",
                            "Hệ thống giám sát DCIM",
                            "Tiết kiệm năng lượng"
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
        description: "Giải pháp làm mát chính xác tiên tiến cho trung tâm dữ liệu và các ứng dụng đặc biệt.",
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
                name: "BA series",
                href: "/products/precision-cooling/ba-series",
                level: 2,
                image: "/images/categories/ba-series.jpg",
                description: "Hệ thống làm mát phòng nhỏ BA Series với hiệu suất cao và độ ồn thấp.",
                products: [
                    {
                        id: "ba-series-10",
                        name: "BA Series 10kW",
                        href: "/products/precision-cooling/ba-series/ba-series-10",
                        level: 3,
                        categoryId: "precision-cooling",
                        subcategoryId: "ba-series",
                        image: "/images/products/ba-series-10.jpg",
                        shortDescription: "Hệ thống làm mát phòng 10kW cho không gian IT nhỏ và trung bình.",
                        specifications: {
                            "Công suất làm mát": "10kW",
                            "Luồng khí": "3,000 m³/h",
                            "Kích thước": "850 x 1900 x 750 mm",
                            "Trọng lượng": "180kg"
                        },
                        features: [
                            "Độ ồn thấp",
                            "Điều khiển EC Fan",
                            "Màn hình cảm ứng màu",
                            "Cấu trúc gọn gàng"
                        ],
                        isRepresentative: true
                    }
                ],
            },
            {
                id: "ma-series",
                name: "MA Series",
                href: "/products/precision-cooling/ma-series",
                level: 2,
                image: "/images/categories/ma-series.jpg",
                description: "Hệ thống làm mát cho phòng lớn MA Series, thiết kế cho trung tâm dữ liệu quy mô lớn.",
                products: [
                    {
                        id: "ma-series-100",
                        name: "MA Series 100kW",
                        href: "/products/precision-cooling/ma-series/ma-series-100",
                        level: 3,
                        categoryId: "precision-cooling",
                        subcategoryId: "ma-series",
                        image: "/images/products/ma-series-100.jpg",
                        shortDescription: "Hệ thống làm mát phòng lớn 100kW với hiệu năng cao và khả năng kiểm soát độ ẩm chính xác.",
                        specifications: {
                            "Công suất làm mát": "100kW",
                            "Luồng khí": "25,000 m³/h",
                            "Kích thước": "2800 x 2200 x 900 mm",
                            "Trọng lượng": "1200kg"
                        },
                        features: [
                            "Điều khiển độ ẩm chính xác",
                            "Chế độ tiết kiệm năng lượng",
                            "Hệ thống điều khiển thông minh",
                            "Quản lý từ xa"
                        ],
                        isRepresentative: true
                    }
                ],
            }
        ],
    },
    {
        id: "household-hybrid",
        name: "Household Hybrid",
        href: "/products/household-hybrid",
        level: 1,
        description: "Hệ thống inverter hybrid dành cho hộ gia đình, kết hợp giữa năng lượng mặt trời và lưới điện.",
        subcategories: [
            {
                id: "sh-series",
                name: "SH Series",
                href: "/products/household-hybrid/sh-series",
                level: 2,
                image: "/images/categories/sh-series.jpg",
                description: "Inverter hybrid SH Series công suất nhỏ dành cho hộ gia đình với nhiều tính năng thông minh.",
                products: [
                    {
                        id: "sh-series-5kw",
                        name: "SH Series 5kW",
                        href: "/products/household-hybrid/sh-series/sh-series-5kw",
                        level: 3,
                        categoryId: "household-hybrid",
                        subcategoryId: "sh-series",
                        image: "/images/products/sh-series-5kw.jpg",
                        shortDescription: "Inverter hybrid 5kW cho hộ gia đình với khả năng tích hợp năng lượng mặt trời.",
                        specifications: {
                            "Công suất": "5kW",
                            "Điện áp đầu ra": "220V-240V",
                            "Hiệu suất": "97.5%",
                            "Kích thước": "480 x 630 x 200 mm",
                            "Trọng lượng": "30kg"
                        },
                        features: [
                            "Tích hợp với năng lượng mặt trời",
                            "Ứng dụng giám sát qua điện thoại",
                            "Chế độ UPS khi mất điện",
                            "Lưu trữ năng lượng trong pin"
                        ],
                        isRepresentative: true
                    }
                ],
            },
            {
                id: "th-series",
                name: "TH Series",
                href: "/products/household-hybrid/th-series",
                level: 2,
                image: "/images/categories/th-series.jpg",
                description: "Inverter hybrid TH Series cao cấp cho hộ gia đình với khả năng mở rộng lưu trữ năng lượng.",
                products: [
                    {
                        id: "th-series-10kw",
                        name: "TH Series 10kW",
                        href: "/products/household-hybrid/th-series/th-series-10kw",
                        level: 3,
                        categoryId: "household-hybrid",
                        subcategoryId: "th-series",
                        image: "/images/products/th-series-10kw.jpg",
                        shortDescription: "Inverter hybrid 10kW cao cấp cho hộ gia đình lớn với khả năng lưu trữ năng lượng mở rộng.",
                        specifications: {
                            "Công suất": "10kW",
                            "Điện áp đầu ra": "220V-240V",
                            "Hiệu suất": "98%",
                            "Kích thước": "520 x 650 x 220 mm",
                            "Trọng lượng": "45kg"
                        },
                        features: [
                            "Khả năng mở rộng lưu trữ năng lượng",
                            "Tương thích với pin lithium",
                            "Giám sát và điều khiển thông minh",
                            "Tối ưu hóa tự động"
                        ],
                        isRepresentative: true
                    }
                ],
            }
        ],
    },
    {
        id: "industrial-hybrid",
        name: "Industrial Hybrid",
        href: "/products/industrial-hybrid",
        level: 1,
        description: "Hệ thống inverter hybrid công nghiệp, thiết kế cho các ứng dụng công suất lớn và yêu cầu cao.",
        subcategories: [
            {
                id: "csh-series",
                name: "CSH Series",
                href: "/products/industrial-hybrid/csh-series",
                level: 2,
                image: "/images/categories/csh-series.jpg",
                description: "Inverter hybrid CSH Series cho ứng dụng công nghiệp với độ tin cậy cao và khả năng mở rộng.",
                products: [
                    {
                        id: "csh-series-50kw",
                        name: "CSH Series 50kW",
                        href: "/products/industrial-hybrid/csh-series/csh-series-50kw",
                        level: 3,
                        categoryId: "industrial-hybrid",
                        subcategoryId: "csh-series",
                        image: "/images/products/csh-series-50kw.jpg",
                        shortDescription: "Inverter hybrid 50kW cho ứng dụng công nghiệp với công nghệ điều khiển DSP tiên tiến.",
                        specifications: {
                            "Công suất": "50kW",
                            "Điện áp đầu ra": "400V ba pha",
                            "Hiệu suất": "98.2%",
                            "Kích thước": "800 x 1800 x 600 mm",
                            "Trọng lượng": "350kg"
                        },
                        features: [
                            "Thiết kế module dễ mở rộng",
                            "Công nghệ điều khiển DSP",
                            "Hệ thống giám sát từ xa",
                            "Tương thích với nhiều loại pin"
                        ],
                        isRepresentative: true
                    }
                ],
            },
            {
                id: "csr-series",
                name: "CSR Series",
                href: "/products/industrial-hybrid/csr-series",
                level: 2,
                image: "/images/categories/csr-series.jpg",
                description: "Inverter hybrid CSR Series cho ứng dụng công nghiệp với khả năng tích hợp đa dạng nguồn năng lượng.",
                products: [
                    {
                        id: "csr-series-100kw",
                        name: "CSR Series 100kW",
                        href: "/products/industrial-hybrid/csr-series/csr-series-100kw",
                        level: 3,
                        categoryId: "industrial-hybrid",
                        subcategoryId: "csr-series",
                        image: "/images/products/csr-series-100kw.jpg",
                        shortDescription: "Inverter hybrid 100kW cho ứng dụng thương mại và công nghiệp lớn với khả năng tích hợp đa nguồn năng lượng.",
                        specifications: {
                            "Công suất": "100kW",
                            "Điện áp đầu ra": "400V ba pha",
                            "Hiệu suất": "98.5%",
                            "Kích thước": "1200 x 2000 x 800 mm",
                            "Trọng lượng": "650kg"
                        },
                        features: [
                            "Tích hợp đa nguồn năng lượng",
                            "Quản lý năng lượng thông minh",
                            "Khả năng hoạt động độc lập hoặc song song",
                            "Hệ thống giám sát và điều khiển từ xa"
                        ],
                        isRepresentative: true
                    }
                ],
            },
            {
                id: "cst-series",
                name: "CST Series",
                href: "/products/industrial-hybrid/cst-series",
                level: 2,
                image: "/images/categories/cst-series.jpg",
                description: "Inverter hybrid CST Series cao cấp dành cho các ứng dụng năng lượng quy mô lớn và yêu cầu kỹ thuật cao.",
                products: [
                    {
                        id: "cst-series-250kw",
                        name: "CST Series 250kW",
                        href: "/products/industrial-hybrid/cst-series/cst-series-250kw",
                        level: 3,
                        categoryId: "industrial-hybrid",
                        subcategoryId: "cst-series",
                        image: "/images/products/cst-series-250kw.jpg",
                        shortDescription: "Inverter hybrid 250kW dành cho các ứng dụng năng lượng quy mô lớn với độ tin cậy và hiệu suất vượt trội.",
                        specifications: {
                            "Công suất": "250kW",
                            "Điện áp đầu ra": "400V ba pha",
                            "Hiệu suất": "99%",
                            "Kích thước": "2400 x 2200 x 1000 mm",
                            "Trọng lượng": "1500kg"
                        },
                        features: [
                            "Công nghệ điều khiển tiên tiến",
                            "Khả năng song song hoá đến 10 thiết bị",
                            "Tương thích với các hệ thống quản lý năng lượng lớn",
                            "Bảo vệ toàn diện"
                        ],
                        isRepresentative: true
                    }
                ],
            }
        ],
    }
];

// Dữ liệu cho tab navigation - chỉ chứa cấp độ 1
export const tabNavigationData = navigationData.map(category => ({
    id: category.id,
    name: category.name,
    href: category.href
}));

// Dữ liệu cho header navigation và sidebar - chứa cấp độ 1 và 2
export const headerNavigationData = navigationData.map(category => {
    // Tạo danh sách submenu từ subcategories
    const submenu = category.subcategories.map(subcategory => ({
        id: subcategory.id,
        title: subcategory.name,
        href: subcategory.href
    }));

    return {
        id: category.id,
        name: category.name,
        href: category.href,
        submenu
    };
});

// Hàm helper để lấy tất cả sản phẩm theo ID danh mục
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