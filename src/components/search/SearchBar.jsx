import SearchHistory from "./SearchHistory";
import { useState, useEffect, useRef } from "react";

const SearchBar = ({
  searchTerm,
  setSearchTerm,
  isLoggedIn,

  onRetry,
  searchHistory,
  deleteSearchHistoryItem,
  deleteAllSearchHistory,
  fillSearchBarInput,
  errorHistory,
  loadingHistory
}) => {



  const inputRef = useRef(null);
  // Detta skapar en referens till input-fältet i sökfältet.
  // useRef används för att skapa en mutable referens som kan användas för att direkt manipulera DOM-elementet.

  const outsideClickRef = useRef(null);
  // Detta skapar en referens som kan användas för att detektera klick utanför dropdown-menyn.
  // Denna referens kommer att användas i en event listener för att stänga dropdown-menyn när användaren klickar utanför den.

  useEffect(() => {
    inputRef.current.focus();
  }, [])
  // Denna useEffect-krok körs när komponenten mountas (första renderingen).
  // Den fokuserar automatiskt på input-fältet när komponenten laddas.
  // Detta förbättrar användarupplevelsen genom att låta användaren börja skriva direkt utan att behöva klicka på fältet först.

  useEffect (() => {
    const handleClick = (e) => {
      if(outsideClickRef.current && !outsideClickRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('click', handleClick);

    return () => {
    document.removeEventListener('click', handleClick);
    };
  }, []);

 


  return (
    <div>

      <div>
        
      </div>

    </div>
  )
}

export default SearchBar
