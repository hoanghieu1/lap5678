import React from "react";
import data from "../../db.json";

function List() {
  const tours = data?.tours || [];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Danh sách tour</h1>

      <div className="overflow-x-auto">
        {tours.length === 0 ? (
          <p>Không có tour để hiển thị.</p>
        ) : (
          <table className="w-full border border-gray-300 rounded-lg">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 border border-gray-300 text-left">ID</th>
                <th className="px-4 py-2 border border-gray-300 text-left">Tên tour</th>
                <th className="px-4 py-2 border border-gray-300 text-left">Điểm đến</th>
                <th className="px-4 py-2 border border-gray-300 text-left">Thời gian</th>
                <th className="px-4 py-2 border border-gray-300 text-left">Giá</th>
                <th className="px-4 py-2 border border-gray-300 text-left">Còn lại</th>
                <th className="px-4 py-2 border border-gray-300 text-left">Thao tác</th>
              </tr>
            </thead>

            <tbody>
              {tours.map((t) => (
                <tr key={t.id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border border-gray-300">{t.id}</td>
                  <td className="px-4 py-2 border border-gray-300">{t.name}</td>
                  <td className="px-4 py-2 border border-gray-300">{t.destination}</td>
                  <td className="px-4 py-2 border border-gray-300">{t.duration}</td>
                  <td className="px-4 py-2 border border-gray-300">
                    {t.price.toLocaleString("vi-VN")} ₫
                  </td>
                  <td className="px-4 py-2 border border-gray-300">{t.available}</td>
                  <td className="px-4 py-2 border border-gray-300">
                    <a className="text-blue-600 mr-3" href={`#/edit/${t.id}`}>
                      Sửa
                    </a>
                    <a className="text-red-600" href="#" onClick={(e) => e.preventDefault()}>
                      Xóa
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default List;
