
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";

function EditPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    name: "",
    destination: "",
    duration: "",
    price: "",
    image: "",
    description: "",
    available: "",
    category: "tour nội địa",
    active: true,
  });

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    axios
      .get(`http://localhost:3000/tours/${id}`)
      .then((res) => {
        const data = res.data;
        setForm({
          name: data.name || "",
          destination: data.destination || "",
          duration: data.duration || "",
          price: data.price || "",
          image: data.image || "",
          description: data.description || "",
          available: data.available || "",
          category: data.category || "tour nội địa",
          active: data.active ?? true,
        });
      })
      .catch((err) => {
        console.error(err);
        toast.error("Không thể tải tour — kiểm tra server");
      })
      .finally(() => setLoading(false));
  }, [id]);

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm((s) => ({ ...s, [name]: type === "checkbox" ? checked : value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const payload = {
        ...form,
        price: Number(form.price),
        available: Number(form.available),
      };
      await axios.put(`http://localhost:3000/tours/${id}`, payload);
      toast.success("Cập nhật tour thành công");
      navigate("/list");
    } catch (err) {
      console.error(err);
      toast.error("Cập nhật thất bại — kiểm tra server");
    }
  }

  if (loading) return <div className="p-6">Đang tải...</div>;

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-semibold mb-6">Cập nhật Tour</h1>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="block font-medium mb-1">Tên tour</label>
          <input name="name" value={form.name} onChange={handleChange} className="w-full border rounded-lg px-3 py-2" />
        </div>

        <div>
          <label className="block font-medium mb-1">Điểm đến</label>
          <input name="destination" value={form.destination} onChange={handleChange} className="w-full border rounded-lg px-3 py-2" />
        </div>

        <div>
          <label className="block font-medium mb-1">Thời gian</label>
          <input name="duration" value={form.duration} onChange={handleChange} className="w-full border rounded-lg px-3 py-2" />
        </div>

        <div>
          <label className="block font-medium mb-1">Giá (VNĐ)</label>
          <input name="price" value={form.price} onChange={handleChange} type="number" className="w-full border rounded-lg px-3 py-2" />
        </div>

        <div>
          <label className="block font-medium mb-1">Ảnh (URL)</label>
          <input name="image" value={form.image} onChange={handleChange} className="w-full border rounded-lg px-3 py-2" placeholder="https://picsum.photos/400/300?random=3" />
        </div>

        <div>
          <label className="block font-medium mb-1">Mô tả</label>
          <textarea name="description" value={form.description} onChange={handleChange} className="w-full border rounded-lg px-3 py-2 h-28" />
        </div>

        <div>
          <label className="block font-medium mb-1">Còn lại</label>
          <input name="available" value={form.available} onChange={handleChange} type="number" className="w-full border rounded-lg px-3 py-2" />
        </div>

        <div>
          <label className="block font-medium mb-1">Category</label>
          <select name="category" value={form.category} onChange={handleChange} className="w-full border rounded-lg px-3 py-2 bg-white">
            <option value="tour nội địa">Tour nội địa</option>
            <option value="tour quốc tế">Tour quốc tế</option>
          </select>
        </div>

        <div className="flex items-center space-x-2">
          <input id="active" name="active" type="checkbox" checked={!!form.active} onChange={handleChange} className="h-4 w-4 text-blue-600" />
          <label htmlFor="active" className="text-gray-700">Active</label>
        </div>

        <div className="pt-4">
          <button type="submit" className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">Lưu thay đổi</button>
        </div>
      </form>
    </div>
  );
}

export default EditPage;