import axios from 'axios'

const url = 'https://employee-base-app.firebaseio.com/employeeList'

export default class Store {
    employeeList = []
    employeeFilterList = []
    filters = []

    defaultEmployee = {
        firstname: '',
        lastname: '',
        patronymic: '',
        birthDate: {
            year: 2020, day: 1, month: 0,
        },
        post: '',
        department: '',
        education: '',
    }

    createEmployee = async (employeeData) => {
        const finishData = Object.assign(this.defaultEmployee, employeeData)
        const response = await axios.post(`${url}.json`, finishData)
        const data = response.data

        if (data) {
            const id = data.name
            await axios.patch(`${url}/${id}.json`, {id: id})
            this.employeeList.push({...finishData, id})
        }

        return this.getList()
    }

    editEmployee = async (id, employeeData) => {
        const index = this.getElementById(this.employeeList, id)
        if (index === -1)
            return this.getList()
        const finishData = Object.assign(this.employeeList[index], employeeData)
        await axios.patch(`${url}/${id}.json`, finishData)
        this.employeeList[index] = finishData
        return this.getList()
    }

    getEmployeeList = async () => {
        const response = await axios.get(`${url}.json`)
        const data = response.data
        const employeeList = []
        if (data)
            Object.keys(data).forEach((key, index) => {
                employeeList.push(data[key])
            })

        this.employeeList = employeeList
        return this.getList()
    }

    removeEmployee = async (id) => {
        await axios.delete(`${url}/${id}.json`)
        const index = this.getElementById(this.employeeList, id)
        if (index === -1)
            return this.getList()
        this.employeeList.splice(index, 1)
        return this.getList()
    }

    setFilters = (filters) => {
        this.filters = filters
        return this.getList()
    }

    getList = () => {
        this.employeeFilterList = JSON.parse(JSON.stringify(this.employeeList))

        for (const element of this.filters) {
            switch (element.type) {
                case 'accordance': {
                    this.accordanceFilter(element)
                    break
                }
                case 'ageInterval': {
                    this.intervalFilter(element)
                    break
                }
                default:
                    break
            }
        }
        return this.employeeFilterList
    }

    accordanceFilter = (element) => {
        const {filter, value} = element

        this.employeeFilterList = this.employeeFilterList.filter((employeeFilter, i) => {
            if (employeeFilter[filter] === value)
                return employeeFilter
        })
    }

    intervalFilter = (element) => {
        const {value, filter} = element,
            {lowerBorder, upperBorder, incorrectInterval} = value,
            currentYear = new Date().getFullYear()
        // currentDay = new Date().getDay(),
        // currentMonth = new Date().getMonth(),

        if (incorrectInterval)
            return null

        this.employeeFilterList = this.employeeFilterList.filter((employeeFilter, i) => {
            const {year, day, month} = employeeFilter[filter]
            const numberOfFullYear = currentYear - year
            if (numberOfFullYear >= lowerBorder && numberOfFullYear <= upperBorder)
                return employeeFilter
        })
    }

    getElementById(arr, id) {
        return arr.findIndex(x => x.id === id)
    }
}