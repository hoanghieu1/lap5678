import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

function AddPage() {
  const navigate = useNavigate();
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

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm((s) => ({
      ...s,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!form.name.trim()) return toast.error("Vui lòng nhập tên tour");
    if (!form.destination.trim()) return toast.error("Vui lòng nhập điểm đến");
    if (!form.duration.trim()) return toast.error("Vui lòng nhập thời gian");
    const priceNum = Number(form.price);
    if (!priceNum || priceNum <= 0) return toast.error("Giá không hợp lệ");
    const availableNum = Number(form.available);
    if (!Number.isInteger(availableNum) || availableNum < 0)
      return toast.error("Số lượng còn lại không hợp lệ");

    const payload = {
      name: form.name,
      destination: form.destination,
      duration: form.duration,
      price: priceNum,
      image: form.image,
      description: form.description,
      available: availableNum,
      category: form.category,
      active: !!form.active,
    };

    try {
      await axios.post("http://localhost:3000/tours", payload);
      toast.success("Thêm tour thành công");
      navigate("/list");
    } catch (err) {
      console.error(err);
      toast.error("Không thể thêm tour — kiểm tra server json-server");
    }
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-semibold mb-6">Thêm Tour</h1>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="block font-medium mb-1">Tên tour</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2"
            placeholder="Ví dụ: Đà Lạt 4N3D"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Điểm đến</label>
          <input
            name="destination"
            value={form.destination}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2"
            placeholder="Ví dụ: Đà Lạt"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Thời gian</label>
          <input
            name="duration"
            value={form.duration}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2"
            placeholder="Ví dụ: 4 ngày 3 đêm"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Giá (VNĐ)</label>
          <input
            name="price"
            value={form.price}
            onChange={handleChange}
            type="number"
            className="w-full border rounded-lg px-3 py-2"
            placeholder="3200000"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Ảnh (URL)</label>
          <input
            name="image"
            value={form.image}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2"
            placeholder="https://picsum.photos/400/300?random=3"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Mô tả</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 h-28"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Còn lại</label>
          <input
            name="available"
            value={form.available}
            onChange={handleChange}
            type="number"
            className="w-full border rounded-lg px-3 py-2"
            placeholder="10"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Category</label>
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 bg-white"
          >
            <option value="tour nội địa">Tour nội địa</option>
            <option value="tour quốc tế">Tour quốc tế</option>
          </select>
        </div>

        <div className="flex items-center space-x-2">
          <input
            id="active"
            name="active"
            type="checkbox"
            checked={!!form.active}
            onChange={handleChange}
            className="h-4 w-4 text-blue-600"
          />
          <label htmlFor="active" className="text-gray-700">
            Active
          </label>
        </div>

        <div className="pt-4">
          <button
            type="submit"
            className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Thêm tour
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddPage;

