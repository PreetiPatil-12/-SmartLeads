import { useEffect, useState } from 'react';
import API from '../api/axios';
import type { Lead } from '../types/lead';
import Sidebar from '../components/Sidebar';
import AddLeadModal from '../components/AddLeadModal';
import useDebounce from '../hooks/useDebounce';

const Dashboard = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const [source, setSource] = useState('');
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);

  const debouncedSearch = useDebounce(search, 500);
  const fetchLeads = async () => {
    try {
      const res = await API.get('/leads', {
        params: {
          search: debouncedSearch,
          status,
          source,
          page,
        },
      });

      setLeads(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, [debouncedSearch, status, source, page]);
  const handleDelete = async (id: string) => {
  try {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this lead?'
    );

    if (!confirmDelete) return;

    await API.delete(`/leads/${id}`);

    fetchLeads();
  } catch (error) {
    console.log(error);
    alert('Failed to delete lead');
  }
};

  return (
    <div className="flex min-h-screen bg-[#f5f7fb]">
      <Sidebar />

      <div className="flex-1 p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-8">
            <div>
              <h1 className="text-4xl font-bold text-gray-800">
                Dashboard
              </h1>

              <p className="text-gray-500 mt-2">
                Track and manage your business leads
              </p>
            </div>

            <button
              onClick={() => setShowModal(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-4 rounded-2xl font-semibold shadow-lg transition"
            >
              + Add Lead
            </button>
          </div>

          {/* Stats Cards */}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
            <div className="bg-white p-6 rounded-3xl shadow-md">
              <p className="text-gray-500">Total Leads</p>

              <h2 className="text-4xl font-bold mt-3 text-gray-800">
                {leads.length}
              </h2>
            </div>

            <div className="bg-blue-600 text-white p-6 rounded-3xl shadow-md">
              <p>New Leads</p>

              <h2 className="text-4xl font-bold mt-3">
                {
                  leads.filter((lead) => lead.status === 'New')
                    .length
                }
              </h2>
            </div>

            <div className="bg-green-500 text-white p-6 rounded-3xl shadow-md">
              <p>Qualified</p>

              <h2 className="text-4xl font-bold mt-3">
                {
                  leads.filter(
                    (lead) => lead.status === 'Qualified'
                  ).length
                }
              </h2>
            </div>

            <div className="bg-yellow-500 text-white p-6 rounded-3xl shadow-md">
              <p>Contacted</p>

              <h2 className="text-4xl font-bold mt-3">
                {
                  leads.filter(
                    (lead) => lead.status === 'Contacted'
                  ).length
                }
              </h2>
            </div>

            <div className="bg-red-500 text-white p-6 rounded-3xl shadow-md">
              <p>Lost</p>

              <h2 className="text-4xl font-bold mt-3">
                {
                  leads.filter((lead) => lead.status === 'Lost')
                    .length
                }
              </h2>
            </div>
          </div>

          {/* Filters */}

          <div className="bg-white rounded-3xl p-6 shadow-md mb-8">
            <div className="grid md:grid-cols-3 gap-5">
              <input
                type="text"
                placeholder="Search by name or email..."
                className="border border-gray-300 p-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />

              <select
                className="border border-gray-300 p-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="">All Status</option>
                <option value="New">New</option>
                <option value="Contacted">Contacted</option>
                <option value="Qualified">Qualified</option>
                <option value="Lost">Lost</option>
              </select>

              <select
                className="border border-gray-300 p-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={source}
                onChange={(e) => setSource(e.target.value)}
              >
                <option value="">All Sources</option>
                <option value="Website">Website</option>
                <option value="Instagram">Instagram</option>
                <option value="Referral">Referral</option>
              </select>
            </div>
          </div>

          {/* Leads Cards */}

          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
            {leads.map((lead) => (
              <div
                key={lead._id}
                className="bg-white rounded-3xl p-6 shadow-md hover:shadow-xl transition"
              >
                <div className="flex items-center gap-4 mb-5">
                  <div className="w-14 h-14 rounded-full bg-blue-600 text-white flex items-center justify-center text-xl font-bold">
                    {lead.name.charAt(0)}
                  </div>

                  <div>
                    <h2 className="text-xl font-bold text-gray-800">
                      {lead.name}
                    </h2>

                    <p className="text-gray-500 text-sm">
                      {lead.email}
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500">
                      Status
                    </span>

                    <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-semibold">
                      {lead.status}
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-gray-500">
                      Source
                    </span>

                    <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold">
                      {lead.source}
                    </span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500">
                    Created
                    </span>
                    <span className="text-sm text-gray-700">
                      {new Date(
                        lead.createdAt
                        ).toLocaleDateString()}
                    </span>
                </div>

                <div className="flex gap-3 mt-6">
                  <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-2xl font-semibold">
                    Edit
                  </button>
                  <button
                  onClick={() => handleDelete(lead._id)}
                  className="flex-1 bg-red-500 hover:bg-red-600 text-white py-3 rounded-2xl font-semibold transition">
                    Delete 
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}

          <div className="flex justify-end gap-4 mt-10">
            <button
              onClick={() =>
                setPage((prev) => Math.max(prev - 1, 1))
              }
              className="bg-white px-6 py-3 rounded-2xl shadow-md font-semibold"
            >
              Previous
            </button>

            <button
              onClick={() => setPage((prev) => prev + 1)}
              className="bg-blue-600 text-white px-6 py-3 rounded-2xl shadow-md font-semibold"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {showModal && (
        <AddLeadModal
          closeModal={() => setShowModal(false)}
          refreshLeads={fetchLeads}
        />
      )}
    </div>
  );
};

export default Dashboard;