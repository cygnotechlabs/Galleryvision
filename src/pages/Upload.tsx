// file path: src/pages/Upload.tsx

import React, { useState, useCallback } from "react";
import axios from "axios";

import LogTable from "../components/Upload/LogTable";
import UploadChannelCSV from "../components/Upload/UploadChannel";
import UploadMusic from "../components/Upload/UploadMusic";
import UploadPayment from "../components/Upload/UploadPayment";
import API_ENDPOINTS from "../config/apiConfig";

type Log = {
  _id: string;
  fileName: string;
  fileType: string;
  dateTime: string;
  status: string;
};

type Props = {};

const Upload: React.FC<Props> = () => {
  const [log, setLog] = useState<Log[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get(API_ENDPOINTS.FILE_LOG);
      setLog(response.data);
    } catch (error) {
      setError("Error fetching log data");
      console.error("Error fetching log data", error);
    }
  }, []);

  return (
    <div className="mx-6 my-6">
      <div className="flex flex-col">
        <div className="mb-2 lg:mb-0">
          <p className="text-xl font-bold">Upload</p>
          <h1 className="text-sm font-normal text-gray-400 pt-1">
            Upload your Youtube Channel CSV file, Music partner XLXS file &
            Payment report
          </h1>
        </div>
      </div>
      <div className="flex gap-4 w-full">
        <UploadChannelCSV onSave={fetchData} />
        <UploadMusic onSave={fetchData} />
        <UploadPayment onSave={fetchData} />
      </div>
      <LogTable fetchData={fetchData} log={log} error={error} />
    </div>
  );
};

export default Upload;
