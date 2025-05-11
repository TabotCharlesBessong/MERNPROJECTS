import { useQuery, gql } from "@apollo/client";
import { useState } from "react";
import { format } from "date-fns";

const GET_EXPENSES = gql`
  query GetExpenses($filter: ExpenseFilterInput) {
    getExpenses(filter: $filter) {
      id
      title
      amount
      category
      createdAt
    }
  }
`;

const categories = ["food", "transport", "entertainment", "other"];

export default function Dashboard() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedDate, setSelectedDate] = useState("");

  const { data, loading, refetch } = useQuery(GET_EXPENSES, {
    variables: {
      filter: {
        category: selectedCategory || undefined,
        date: selectedDate || undefined,
      },
    },
  });

  const handleFilter = () => {
    refetch({
      filter: {
        category: selectedCategory || undefined,
        date: selectedDate || undefined,
      },
    });
  };

  return (
    <div className="max-w-4xl mx-auto mt-6 p-4">
      <h2 className="text-2xl font-bold mb-4">Your Expenses</h2>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-6">
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option value={cat} key={cat}>
              {cat}
            </option>
          ))}
        </select>

        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="p-2 border rounded"
        />

        <button
          onClick={handleFilter}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Filter
        </button>
      </div>

      {/* List */}
      {loading ? (
        <p>Loading...</p>
      ) : data?.getExpenses?.length ? (
        <div className="space-y-4">
          {data.getExpenses.map((expense: any) => (
            <div
              key={expense.id}
              className="p-4 bg-white shadow rounded flex justify-between items-center"
            >
              <div>
                <p className="text-lg font-semibold">{expense.title}</p>
                <p className="text-sm text-gray-600">
                  {expense.category} •{" "}
                  {format(new Date(expense.createdAt), "PPpp")}
                </p>
              </div>
              <p className="text-xl font-bold text-blue-600">
                ${expense.amount}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p>No expenses found.</p>
      )}
    </div>
  );
}
