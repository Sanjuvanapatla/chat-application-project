import React from "react";
export default function TableResponse({ data = [] }) {
  if (!Array.isArray(data) || data.length === 0) return <div className="text-sm text-gray-500">No structured data.</div>;

  const cols = Object.keys(data[0]);

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full table-auto border-collapse">
        <thead>
          <tr>
            {cols.map(c => <th key={c} className="px-3 py-2 text-left text-xs font-medium uppercase text-gray-600 dark:text-gray-300">{c}</th>)}
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <tr key={idx} className={idx % 2 === 0 ? "bg-white dark:bg-gray-800" : "bg-gray-50 dark:bg-gray-700"}>
              {cols.map(c => <td key={c} className="px-3 py-2 text-sm">{String(row[c])}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
