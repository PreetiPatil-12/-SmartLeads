import { useState } from 'react';
import API from '../api/axios';

interface Props {
  closeModal: () => void;
  refreshLeads: () => void;
}

const AddLeadModal = ({
  closeModal,
  refreshLeads,
}: Props) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    status: 'New',
    source: 'Website',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      await API.post('/leads', formData);

      refreshLeads();

      closeModal();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white w-full max-w-lg rounded-3xl p-8 shadow-2xl">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          Add New Lead
        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          <input
            type="text"
            name="name"
            placeholder="Lead Name"
            className="w-full border border-gray-300 p-4 rounded-2xl"
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Lead Email"
            className="w-full border border-gray-300 p-4 rounded-2xl"
            onChange={handleChange}
            required
          />

          <select
            name="status"
            className="w-full border border-gray-300 p-4 rounded-2xl"
            onChange={handleChange}
          >
            <option value="New">New</option>
            <option value="Contacted">
              Contacted
            </option>
            <option value="Qualified">
              Qualified
            </option>
            <option value="Lost">Lost</option>
          </select>

          <select
            name="source"
            className="w-full border border-gray-300 p-4 rounded-2xl"
            onChange={handleChange}
          >
            <option value="Website">Website</option>
            <option value="Instagram">
              Instagram
            </option>
            <option value="Referral">
              Referral
            </option>
          </select>

          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-2xl font-semibold"
            >
              Add Lead
            </button>

            <button
              type="button"
              onClick={closeModal}
              className="flex-1 bg-gray-200 py-3 rounded-2xl font-semibold"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddLeadModal;