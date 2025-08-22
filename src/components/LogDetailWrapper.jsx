import React from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import LogDetail from "./LogDetail";
import { getAllCaptainLogs } from "../model/logs";

const LogDetailWrapper = () => {
  const { captainName, logId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  // Check if log and captain are passed via state (from LogList link)
  let log = location.state?.log;
  let captain = location.state?.captain;

  // Fallback: fetch from logs if state is undefined (direct URL visit)
  if (!log || !captain) {
    const allCaptains = getAllCaptainLogs();
    captain = allCaptains.find((c) => c.captainName === captainName);
    if (captain) log = captain.logs.find((l) => l.id === logId);
  }

  if (!log || !captain) return <p className="text-center mt-10">Log not found.</p>;

  return <LogDetail log={log} captain={captain} onClose={() => navigate(-1)} />;
};

export default LogDetailWrapper;
