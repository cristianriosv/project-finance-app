import { UNITS } from "../constants/units"

type MockDataProps = {
    projects: ProjectProps[]
}

export const mockData: MockDataProps = {
    projects: [
        {
            id: 1,
            title: 'Project 1',
            client: 'Client 1',
            total: 877.8,
            dueDate: new Date(),
            invoices: [
                {
                    id: 1,
                    title: 'Invoice 1',
                    discountOrFee: -102,
                    taxPercentage: 10,
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
                }
            ]
        },
        {
            id: 2,
            title: 'Project 2',
            client: 'Client 2',
            total: 3434,
            dueDate: new Date(),
            invoices: []
        }
    ]
}