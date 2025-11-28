
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

  function handleFileChange(e) {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Ảnh quá lớn (tối đa 5MB)");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setForm((s) => ({ ...s, image: reader.result }));
    };
    reader.readAsDataURL(file);
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
          <label className="block font-medium mb-2">Ảnh (URL hoặc upload từ máy)</label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* URL Input */}
            <div>
              <p className="text-xs text-gray-500 mb-1">Dán URL ảnh:</p>
              <input
                name="image"
                value={form.image}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2"
                placeholder="https://picsum.photos/400/300?random=3"
              />
            </div>

            {/* File Upload */}
            <div>
              <p className="text-xs text-gray-500 mb-1">Hoặc chọn từ máy:</p>
              <div className="relative">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                  id="fileInputEdit"
                />
                <label
                  htmlFor="fileInputEdit"
                  className="block w-full border-2 border-dashed border-blue-300 rounded-lg px-4 py-3 text-center cursor-pointer hover:bg-blue-50 hover:border-blue-500 transition"
                >
                  <svg className="w-6 h-6 mx-auto text-blue-600 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  <p className="text-blue-600 font-medium text-sm">Chọn ảnh</p>
                  <p className="text-xs text-gray-500">hoặc kéo thả vào</p>
                </label>
              </div>
            </div>
          </div>

          {form.image && (
            <div className="mt-4">
              <p className="text-sm font-medium text-gray-700 mb-2">Preview ảnh:</p>
              <img src={form.image} alt="preview" className="w-full md:w-80 h-48 object-cover rounded-lg shadow" />
            </div>
          )}
          {!form.image && (
            <div className="mt-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
              <p className="text-sm text-gray-500">Chưa chọn ảnh — vui lòng dán URL hoặc upload từ máy</p>
            </div>
          )}
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