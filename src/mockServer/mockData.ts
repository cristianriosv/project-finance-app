import { UNITS } from "../constants/units"

type MockDataProps = {
    projects: ProjectType[]
}

export const mockData: MockDataProps = {
    projects: [
        {
            id: 1,
            title: 'Project 1',
            client: 'Client 1',
            total: 1056,
            invoices: [
                {
                    id: 1,
                    discountOrFee: -102,
                    taxPercentage: 10,
                    total: 877.8,
                    subTotal: 912,
                    dueDate: new Date(),
                    items: [
                        {
                            id: 1,
                            title: 'Item 1',
                            unit: UNITS.UN,
                            quantity: 1,
                            unitPrice: 12
                        },
                        {
                            id: 2,
                            title: 'Item 2',
                            unit: UNITS.HS,
                            quantity: 30,
                            unitPrice: 30
                        }
                    ]
                },
                {
                    id: 2,
                    discountOrFee: 0,
                    taxPercentage: 10,
                    total: 178.2,
                    subTotal: 162,
                    dueDate: new Date(),
                    items: [
                        {
                            id: 1,
                            title: 'Item 1',
                            unit: UNITS.UN,
                            quantity: 1,
                            unitPrice: 12
                        },
                        {
                            id: 2,
                            title: 'Item 2',
                            unit: UNITS.HS,
                            quantity: 5,
                            unitPrice: 30
                        }
                    ]
                }
            ]
        },
        {
            id: 2,
            title: 'Project 2',
            client: 'Client 2',
            total: 0,
            invoices: []
        }
    ]
}
