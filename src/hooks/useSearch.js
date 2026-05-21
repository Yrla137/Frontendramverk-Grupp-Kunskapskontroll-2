import { useState, useEffect } from "react";
import { mockSpaceData } from "./api/mockData";

const useSearch = () => {

  // Search states //
  const [searchTerm, setSearchTerm] = useState("");
  const [submittedSearchTerm, setSubmittedSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);

  // Search history //
  const [searchHistory, setSearchHistory] = useState([]);

  // Loading & error //
  const [loadingSearch, setLoadingSearch] = useState(false);
  const [errorSearch, setErrorSearch] = useState(null);


  
  // All states and functions to be used in the component //
  return {

  };
};

export default useSearch;