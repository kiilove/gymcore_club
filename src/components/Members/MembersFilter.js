"use client"

import { useState } from "react"
import Button from "../Shared/Button"

const MembersFilter = ({ onFilter }) => {
  const [filters, setFilters] = useState({
    name: "",
    status: "",
    membershipType: "",
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onFilter(filters)
  }

  const handleReset = () => {
    setFilters({
      name: "",
      status: "",
      membershipType: "",
    })
    onFilter({
      name: "",
      status: "",
      membershipType: "",
    })
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            이름
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={filters.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
            placeholder="회원 이름 검색"
          />
        </div>

        <div>
          <label htmlFor="status" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            상태
          </label>
          <select
            id="status"
            name="status"
            value={filters.status}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
          >
            <option value="">모든 상태</option>
            <option value="active">활성</option>
            <option value="expired">만료</option>
          </select>
        </div>

        <div>
          <label htmlFor="membershipType" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            회원권 종류
          </label>
          <select
            id="membershipType"
            name="membershipType"
            value={filters.membershipType}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
          >
            <option value="">모든 회원권</option>
            <option value="1개월 정기권">1개월 정기권</option>
            <option value="3개월 정기권">3개월 정기권</option>
            <option value="6개월 정기권">6개월 정기권</option>
            <option value="1년 정기권">1년 정기권</option>
          </select>
        </div>
      </div>

      <div className="mt-4 flex justify-end space-x-3">
        <Button type="button" variant="secondary" onClick={handleReset}>
          초기화
        </Button>
        <Button type="submit" variant="primary">
          검색
        </Button>
      </div>
    </form>
  )
}

export default MembersFilter

