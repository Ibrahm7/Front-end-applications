import { useState, useContext } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { ThemeContext } from "../contexts/ThemeContext";

export default function SearchForm() {
  const [searchQuery, SetSearchQuery] = useState("");
  const navigate = useNavigate();

  const { theme } = useContext(ThemeContext);

  const color = theme == "dark" ? "light" : "dark";

  function handleSubmit(e) {
    e.preventDefault();
    const query = searchQuery.trim();
    if (query) {
      navigate(`/search?q=${encodeURIComponent(query)}`);
      SetSearchQuery("");
    }
  }
  return (
    <form className="d-flex mb-2 mb-lg-0 " onSubmit={handleSubmit}>
      <input
        type="search"
        className="form-control me-1"
        placeholder="Search"
        value={searchQuery}
        onChange={(e) => SetSearchQuery(e.target.value)}
      />
      <button className={`btn btn-${theme} border`} type="submit">
        <i className="bi bi-search"></i>
      </button>
    </form>
  );
}
