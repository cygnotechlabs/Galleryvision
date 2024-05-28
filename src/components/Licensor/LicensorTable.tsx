import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { DeleteModalLicensor } from "../../UI/DeleteModal";
import API_ENDPOINTS from "../../config/apiConfig";
import Modal from "../../layouts/Modal";
import { Edit, Eye, Filter, Search, Trash } from "../icons/icon";
import LicensorView from "./LicensorView";

type Props = {};
interface Licensor {
  _id: string;
  companyName: string;
  companyEmail: string;
  companyLogo: string;
  licensorName: string;
  licensorEmail: string;
  licensorAddress: string;
  licensorPhno: string;
  paymentMethod: string;
  bankAccNum: string;
  ifsc_iban: string;
  currency: string;
  channel: Channel[];
  music: Music[];
}

interface Channel {
  channelId: string;
  channelName?: string;
}

interface Music {
  musicId: string;
  musicName?: string;
}

function LicensorTable({}: Props) {
  const [openDelete, setOpenDelete] = useState(false);
  const [licensorDeleteId, setLicensorDeleteId] = useState<string>("");
  const [licensors, setLicensors] = useState<Licensor[]>([]);
  const [filteredLicensors, setFilteredLicensors] = useState<Licensor[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 12;

  const [licensor, setLicensor] = useState<Licensor>({
    _id: "",
    companyName: "",
    companyEmail: "",
    companyLogo: "",
    licensorName: "",
    licensorEmail: "",
    licensorAddress: "",
    licensorPhno: "",
    paymentMethod: "",
    bankAccNum: "",
    ifsc_iban: "",
    currency: "",
    channel: [], // Initialize as an empty array of Channel type
    music: [],
  });
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(API_ENDPOINTS.GET_LICENSOR);
      setLicensors(response.data);
      setFilteredLicensors(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(API_ENDPOINTS.REMOVE_LICENSOR(licensorDeleteId));
      setLicensors((prevLicensors) =>
        prevLicensors.filter((licensor) => licensor._id !== licensorDeleteId)
      );
      setFilteredLicensors((prevLicensors) =>
        prevLicensors.filter((licensor) => licensor._id !== licensorDeleteId)
      );
      setOpenDelete(false);
    } catch (error) {
      console.error("Error deleting licensor:", error);
    }
    fetchData();
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    if (term === "") {
      setFilteredLicensors(licensors);
    } else {
      const filtered = licensors.filter((licensor) =>
        licensor.licensorName.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredLicensors(filtered);
    }
  };

  const handleSuggestionClick = (licensorName: string) => {
    setSearchTerm(licensorName);
    const filtered = licensors.filter(
      (licensor) =>
        licensor.licensorName.toLowerCase() === licensorName.toLowerCase()
    );
    setFilteredLicensors(filtered);
  };

  const indexOfLastLicensor = currentPage * rowsPerPage;
  const indexOfFirstLicensor = indexOfLastLicensor - rowsPerPage;
  const currentLicensors = filteredLicensors.slice(
    indexOfFirstLicensor,
    indexOfLastLicensor
  );

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => (prevPage > 1 ? prevPage - 1 : prevPage));
  };

  return (
    <div className="bg-white shadow-md rounded-xl my-6 px-4 py-2">
      {/* Search and Filter */}
      <div className="relative px-4 py-4 ">
        {/* Search Input */}
        <div className="flex justify-between text-sm">
          <div className="flex flex-col w-1/3">
            <div className="flex">

         
              <input
              type="text"
                placeholder="Search"
                className="border border-gray-300 rounded-md px-4 w-full py-2"
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
              />
               <i className="m-3" style={{marginLeft:'-35px'}}><Search/></i> 
            
              
            </div>
            {searchTerm && (
              <ul className="border border-gray-300 rounded-b-md bg-white max-h-48 overflow-y-auto">
                {filteredLicensors.map((licensor) => (
                  <li
                    key={licensor._id}
                    className="px-4 py-2 cursor-pointer hover:bg-gray-200"
                    onClick={() => handleSuggestionClick(licensor.licensorName)}
                  >
                    {licensor.licensorName}
                  </li>
                ))}
              </ul>
            )}
          </div>
          {/* Filter Button */}
          <button className="flex items-center px-4 gap-2  border border-gray-400 text-black font-medium bg-gray-100 rounded-lg">
            Filter
            <span>
              <Filter />
            </span>
          </button>
        </div>
      </div>
      {/* Table */}
      <div className="overflow-x-auto px-4 rounded-lg">
        <table className="w-full  table-auto ">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-1 text-left text-sm">Licensor Name</th>
              <th className="px-4 py-1 text-left text-sm">Email</th>
              <th className="px-4 py-1 text-left text-sm">Company Name</th>
              <th className="px-4 py-1 text-left text-sm">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentLicensors.map((licensor, index) => (
              <tr key={index} className="bg-white">
                <td className="px-4 py-1 border-gray-200 text-sm">
                  {licensor.licensorName}
                </td>
                <td className="px-4 py-1 border-gray-200 text-sm">
                  {licensor.licensorEmail}
                </td>
                <td className="px-4 py-1 border-gray-200 text-sm">
                  {licensor.companyName}
                </td>
                <td className="px-4 py-1 border-gray-200">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => {
                        setOpen(true);
                        setLicensor(licensor);
                      }}
                      className="flex gap-2 bg-red-100 hover:bg-red-200 text-black font-medium py-2 px-3 border border-black text-sm items-center rounded-lg"
                    >
                      <Eye />
                      View
                    </button>
                    <Link to={`/home/update-licensor/${licensor._id}`}>
                      <button className="flex gap-2 bg-gray-100 hover:bg-gray-400 text-black font-medium py-2 px-3 border border-black text-sm items-center rounded-lg">
                        <Edit />
                        Edit
                      </button>
                    </Link>

                    <button
                      onClick={() => {
                        setOpenDelete(true);
                        setLicensorDeleteId(licensor._id);
                      }}
                      className="flex gap-2 bg-red-400 hover:bg-gray-400 text-white hover:text-black  font-medium py-2 px-3 border border-black text-sm items-center rounded-lg"
                    >
                      <Trash />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Pagination */}
      <div className="pt-4 flex justify-center">
        <nav className="flex items-center gap-96" aria-label="Pagination">
          <div>
            Showing {indexOfFirstLicensor + 1} to{" "}
            {Math.min(indexOfLastLicensor, filteredLicensors.length)} of{" "}
            {filteredLicensors.length} entries
          </div>
          <ul className="flex list-style-none">
            <li>
              <button
                onClick={handlePrevPage}
                disabled={currentPage === 1}
                className="px-3 py-1 border border-gray-400 bg-gray-100 rounded-lg mr-1"
              >
                Previous
              </button>
            </li>
            <li>
              <button
                onClick={handleNextPage}
                disabled={indexOfLastLicensor >= licensors.length}
                className="px-3 py-1 border border-gray-400 bg-gray-100 rounded-lg"
              >
                Next
              </button>
            </li>
          </ul>
        </nav>
      </div>
      {/* Modal */}
      <Modal open={open} onClose={() => setOpen(false)}>
        <LicensorView licensor={licensor} onClose={() => setOpen(false)} />
      </Modal>
      <Modal
        onClose={() => {
          setOpenDelete(false);
        }}
        open={openDelete}
      >
        <DeleteModalLicensor
          onClose={() => setOpenDelete(false)}
          handleDelete={() => handleDelete()}
        />
      </Modal>
    </div>
  );
}

export default LicensorTable;
