import { UNITS } from "../constants/units"

type MockDataProps = {
    projects: ProjectType[]
}

export const mockData: MockDataProps = {
    projects: [
        {
            "id": 1,
            "title": "Marketing Barcelona",
            "client": "Rafael Esso",
            "total": 17930,
            "invoices": [
                {
                    "id": 1,
                    "discountOrFee": -200,
                    "taxPercentage": 10,
                    "total": 8140.000000000001,
                    "subTotal": 7600,
                    "dueDate": "2023-07-12",
                    "items": [
                        {
                            "id": 1,
                            "title": "Research general",
                            "unit": "HS",
                            "quantity": 80,
                            "unitPrice": 40
                        },
                        {
                            "id": 2,
                            "title": "Design and development",
                            "unit": "HS",
                            "quantity": 30,
                            "unitPrice": 30
                        },
                        {
                            "id": 2,
                            "title": "Platform implementation",
                            "quantity": 1,
                            "unit": "UN",
                            "unitPrice": 1000
                        },
                        {
                            "id": 3,
                            "title": "Social advertsement",
                            "quantity": 1,
                            "unit": "UN",
                            "unitPrice": 2500
                        }
                    ]
                },
                {
                    "id": 2,
                    "discountOrFee": 0,
                    "taxPercentage": 5,
                    "total": 8820,
                    "subTotal": 8400,
                    "dueDate": "2023-07-23",
                    "items": [
                        {
                            "id": 1,
                            "title": "Web widget designs",
                            "unit": "HS",
                            "quantity": 120,
                            "unitPrice": 50
                        },
                        {
                            "id": 2,
                            "title": "Implementation",
                            "unit": "HS",
                            "quantity": 80,
                            "unitPrice": 30
                        }
                    ]
                },
                {
                    "id": 3,
                    "discountOrFee": 20,
                    "taxPercentage": 0,
                    "items": [
                        {
                            "id": 0,
                            "title": "Documentation",
                            "quantity": 1,
                            "unit": "UN",
                            "unitPrice": 500
                        },
                        {
                            "id": 1,
                            "title": "Resources",
                            "quantity": 1,
                            "unit": "UN",
                            "unitPrice": 450
                        }
                    ],
                    "total": 970,
                    "subTotal": 950,
                    "dueDate": "2023-07-23"
                }
            ]
        },
        {
            "id": 2,
            "title": "Capacitation: Internal tools",
            "client": "THE MONKEYS B.V.",
            "total": 869.0000000000001,
            "invoices": [
                {
                    "id": 4,
                    "discountOrFee": -10,
                    "taxPercentage": 10,
                    "items": [
                        {
                            "id": 0,
                            "title": "Capacitation group 20 p.",
                            "quantity": 10,
                            "unit": "UN",
                            "unitPrice": 40
                        },
                        {
                            "id": 1,
                            "title": "Materials",
                            "quantity": 20,
                            "unit": "UN",
                            "unitPrice": 20
                        }
                    ],
                    "total": 869.0000000000001,
                    "subTotal": 800,
                    "dueDate": "2023-07-23"
                }
            ]
        },
        {
            "id": 3,
            "title": "Capacitation internal tools",
            "client": "Zoomers B.V.",
            "total": 0,
            "invoices": []
        },
        {
            "id": 4,
            "title": "Marketing research",
            "client": "Martijn Zevolt",
            "total": 0,
            "invoices": []
        },
        {
            "id": 5,
            "title": "Web widget proposal for social networks",
            "client": "Rafael Esso",
            "total": 0,
            "invoices": []
        }
    ]
}
