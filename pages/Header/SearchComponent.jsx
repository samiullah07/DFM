import { useEffect, useRef, useState } from "react";
import { db } from "../../FirebaseConfig";
import { getDocs, collection } from "firebase/firestore";
import Link from "next/link";

const SearchComponent = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const search = async () => {
    setLoading(true);
    const itemsColRef = collection(db, "items");
    const results = [];
    const trimmedSearchTerm = searchTerm.trim(); // Remove leading and trailing spaces

    if (!trimmedSearchTerm) {
      setSearchResults([]);
      setShowDropdown(true);
      setLoading(false);
      return;
    }

    try {
      const snapshot = await getDocs(itemsColRef);

      snapshot.docs.forEach((doc) => {
        doc.data().items.forEach((item) => {
          if (
            item.name.toLowerCase().includes(trimmedSearchTerm.toLowerCase())
          ) {
            results.push(item);
          }
        });
      });

      setSearchResults(results);
      setShowDropdown(true); // Show dropdown after search
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Hide dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      className="d-flex flex-column align-items-center position-relative mb-md-4 w-100"
      style={{ zIndex: "1" }}
    >
      {/* Search Input and Button */}
      <div className="d-flex justify-content-center w-100">
        <input
          type="text"
          className="form-control"
          placeholder="Search items..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ width: "40%" }}
        />
        <button
          className="btn text-white"
          style={{ backgroundColor: "#6d9900" }}
          onClick={search}
          disabled={loading}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width={20}
            height={20}
            viewBox="0 0 30 30"
            fill="white" // White color added
          >
            <path d="M 13 3 C 7.4889971 3 3 7.4889971 3 13 C 3 18.511003 7.4889971 23 13 23 C 15.396508 23 17.597385 22.148986 19.322266 20.736328 L 25.292969 26.707031 A 1.0001 1.0001 0 1 0 26.707031 25.292969 L 20.736328 19.322266 C 22.148986 17.597385 23 15.396508 23 13 C 23 7.4889971 18.511003 3 13 3 z M 13 5 C 17.430123 5 21 8.5698774 21 13 C 21 17.430123 17.430123 21 13 21 C 8.5698774 21 5 17.430123 5 13 C 5 8.5698774 8.5698774 5 13 5 z" />
          </svg>
        </button>
      </div>

      {/* Custom Dropdown */}
      {showDropdown && (
        <div
          className="custom-dropdown mt-2 bg-white shadow rounded p-2 "
          ref={dropdownRef}
          style={{
            position: "absolute",
            zIndex: 1000,
            top: "100%",
            left: "25%",
            width: "50%",
          }}
        >
          {searchResults.length > 0 ? (
            searchResults.map((item, index) => (
              <Link href={`/productId/${item.id}`} key={item.id}>
                <div
                  key={index}
                  className="dropdown-item d-flex gap-3 p-2 cursor-pointer"
                  onClick={() => setShowDropdown(false)}
                >
                  <img src={item.image} alt="item image" className="w-25" />
                  <div>
                    <p className="mb-0 text-black">{item.name}</p>
                    <p className="mb-0 text-secondary">
                      {item.description.split(" ").slice(0, 4).join(" ")}{" "}
                      {item.description.split(" ").length > 10 && "..."}
                    </p>
                    <p className="mb-0 text-secondary">Price: ${item.price}</p>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="dropdown-item text-muted">No found</div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchComponent;
