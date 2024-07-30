//auth
import axios from "axios";
import { useEffect, useState } from "react";
import API_ENDPOINTS from "../../config/apiConfig";
import { authInstance } from "../../hooks/axiosInstances";

type Props = {
  onSubmit?: () => void;
};

type Tax = {
  date: string;
  taxPercentage: string;
};

type INR = {
  date: string;
  INR: string;
};

const Table = ({ onSubmit }: Props) => {
  const [tax, setTax] = useState<Tax[]>([]);
  const [currency, setCurrency] = useState<INR[]>([]);

  const fetchDataTax = async () => {
    try {
      const response = await axios.get(API_ENDPOINTS.VIEW_TAX,{
        headers: authInstance(),
      });
      setTax(response.data);
    } catch (error) {
      console.error("Error fetching tax data", error);
    }
  };

  const fetchDataCurrency = async () => {
    try {
      const response = await axios.get(API_ENDPOINTS.VIEW_CURRENCY,{
        headers: authInstance(),
      });
      setCurrency(response.data);
    } catch (error) {
      console.error("Error fetching currency data", error);
    }
  };

  useEffect(() => {
    fetchDataTax();
    fetchDataCurrency();
  }, [onSubmit]);

  return (
    <div className="bg-white mt-4 flex gap-8 py-10 border rounded-lg px-10">
      <div className="Currency-Table w-1/2">
        <p className="font-bold text-xl mb-3">Currency Table</p>
        <table className="min-w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 py-2 px-2 text-center">
                Date
              </th>
              <th className="border border-gray-300 py-2 px-2 text-center">
                Currency Rate
              </th>
            </tr>
          </thead>
          <tbody>
            {[...currency]
              .reverse()
              .slice(0, 3)
              .map((entry) => (
                <tr key={entry.date}>
                  <td className="border border-gray-300 font-normal py-2 px-4 text-center">
                    {entry.date}
                  </td>
                  <td className="border border-gray-300 font-normal py-2 px-4 text-center">
                    $1 = ₹ {entry.INR}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <div className="Tax-Table font-bold w-1/2">
        <p className="font-bold text-xl mb-3">Tax Table</p>
        <table className="min-w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 py-2 px-2 text-center">
                Date
              </th>
              <th className="border border-gray-300 py-2 px-2 text-center">
                Tax Rate
              </th>
            </tr>
          </thead>
          <tbody>
            {[...tax]
              .reverse()
              .slice(0, 3)
              .map((entry) => (
                <tr key={entry.date}>
                  <td className="border border-gray-300 font-normal py-2 px-4 text-center">
                    {entry.date}
                  </td>
                  <td className="border border-gray-300 font-normal py-2 px-4 text-center">
                    {entry.taxPercentage} %
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
