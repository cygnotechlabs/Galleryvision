
type Props = {};
interface Licensor {
  id: string;
  name: string;
  email: string;
  country: string;
}

const licensors: Licensor[] = [
  {
    id: "LIC001",
    name: "T-SERIES",
    email: "tseries@email.com",
    country: "India",
  },
  {
    id: "LIC001",
    name: "Eagle tale",
    email: "tseries@email.com",
    country: "United states",
  },
  {
    id: "LIC001",
    name: "Star Sports",
    email: "tseries@email.com",
    country: "India",
  },
  {
    id: "LIC001",
    name: "Arun Smoki",
    email: "tseries@email.com",
    country: "India",
  },
  {
    id: "LIC001",
    name: "Mazhavil Manorama",
    email: "tseries@email.com",
    country: "India",
  },
  // Add more licensors here
];

function LicensorTable({}: Props) {
  return (
    <div className="bg-white shadow-md rounded-xl ml-[34px] mt-[24px] pr-9">
      <div className="relative pl-8 pb-5 pt-8 pr-8 ">
        <div className="flex justify-between text-sm">
          <input
            type="text"
            placeholder="             Search"
            className="border border-gray-300 rounded-md w-[566px] h-[42px] pr-[40px]"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="absolute left-12 top-[53px] transform -translate-y-1/2 w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>
          <button className="flex items-center px-4 gap-2 w-[93px] h-[34px] border border-gray-400 text-black font-medium bg-gray-100 rounded-lg">
            Filter
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 font-extrabold"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z"
                />
              </svg>
            </span>
          </button>
        </div>
      </div>
      <div className="overflow-x-auto px-9 rounded-lg">
        <table className="w-full h-[368px] table-auto ">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 text-left">Licensor ID</th>
              <th className="px-4 py-2 text-left">Licensor name</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">Country</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {licensors.map((licensor, index) => (
              <tr key={index} className="bg-white">
                <td className="px-4 py-2  border-gray-200">{licensor.id}</td>
                <td className="px-4 py-2  border-gray-200">{licensor.name}</td>
                <td className="px-4 py-2  border-gray-200">{licensor.email}</td>
                <td className="px-4 py-2  border-gray-200">
                  {licensor.country}
                </td>
                <td className="px-4 py-2  border-gray-200">
                  <div className="flex items-center space-x-2">
                    <button className="flex gap-2 bg-red-100 hover:bg-pink-600 text-black font-medium py-2 px-2 w-[90px] border text-sm items-center border-red-500 rounded-lg">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-5 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                        />
                      </svg>
                      View
                    </button>
                    <button className="flex bg-gray-300 gap-2 hover:bg-gray-600 text-black font-medium py-2 px-2 w-[90px] border text-sm items-center border-black rounded-lg">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-4 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                        />
                      </svg>
                      Edit
                    </button>
                    <button className="bg-gray-300 hover:bg-red-600 text-black font-medium py-2 px-3 border border-black text-xs items-center rounded-lg">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 0 1-2.25 2.25M16.5 7.5V18a2.25 2.25 0 0 0 2.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 0 0 2.25 2.25h13.5M6 7.5h3v3H6v-3Z"
                        />
                      </svg>
                    </button>

                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4 flex justify-center">
        <nav className="flex items-center gap-96" aria-label="Pagination">
          <div>Showing 1 of 5 of 20 entries</div>
          <ul className="flex list-style-none">
            <li>
              <a
                href="#"
                className="py-2 px-3 ml-0 leading-tight text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
              >
                Previous
              </a>
            </li>
            <li>
              <a
                href="#"
                className="py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
              >
                1
              </a>
            </li>
            <li>
              <a
                href="#"
                className="py-2 px-3 leading-tight bg-red-500 text-white border border-gray-300 hover:bg-red-600 hover:text-white"
              >
                2
              </a>
            </li>
            <li>
              <a
                href="#"
                className="py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
              >
                3
              </a>
            </li>
            <li>
              <a
                href="#"
                className="py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
              >
                4
              </a>
            </li>
            <li>
              <a
                href="#"
                className="py-2 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
              >
                Next
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default LicensorTable;
