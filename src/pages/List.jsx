import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";

function ListPage() {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchTours() {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:3000/tours");
      setTours(res.data || []);
    } catch (err) {
      console.error(err);
      toast.error("Không thể lấy danh sách tour — kiểm tra server");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchTours();
  }, []);

  async function handleDelete(id) {
    if (!confirm("Bạn có chắc muốn xóa tour này không?")) return;
    try {
      await axios.delete(`http://localhost:3000/tours/${id}`);
      toast.success("Xóa tour thành công");
      setTours((t) => t.filter((i) => i.id !== id));
    } catch (err) {
      console.error(err);
      toast.error("Xóa thất bại — kiểm tra server");
    }
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Danh sách tour</h1>
        <Link to="/add" className="px-4 py-2 bg-blue-600 text-white rounded-lg">
          Thêm tour
        </Link>
      </div>

      <div className="overflow-x-auto">
        {loading ? (
          <p>Đang tải...</p>
        ) : tours.length === 0 ? (
          <p>Không có tour để hiển thị.</p>
        ) : (
          <table className="w-full border border-gray-300 rounded-lg">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 border border-gray-300 text-left">ID</th>
                <th className="px-4 py-2 border border-gray-300 text-left">Ảnh</th>
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
                  <td className="px-4 py-2 border border-gray-300 align-top">{t.id}</td>
                  <td className="px-4 py-2 border border-gray-300">
                    {t.image ? (
                      <img src={t.image} alt={t.name} className="w-28 h-20 object-cover rounded" />
                    ) : (
                      <div className="w-28 h-20 bg-gray-100 flex items-center justify-center">No image</div>
                    )}
                  </td>
                  <td className="px-4 py-2 border border-gray-300 text-left align-top">{t.name}</td>
                  <td className="px-4 py-2 border border-gray-300 text-left align-top">{t.destination}</td>
                  <td className="px-4 py-2 border border-gray-300 text-left align-top">{t.duration}</td>
                  <td className="px-4 py-2 border border-gray-300 text-left align-top">{Number(t.price).toLocaleString("vi-VN")} ₫</td>
                  <td className="px-4 py-2 border border-gray-300 text-left align-top">{t.available}</td>
                  <td className="px-4 py-2 border border-gray-300 text-left align-top">
                    <Link to={`/edit/${t.id}`} className="text-blue-600 mr-3">Sửa</Link>
                    <button onClick={() => handleDelete(t.id)} className="text-red-600">Xóa</button>
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

export default ListPage;
