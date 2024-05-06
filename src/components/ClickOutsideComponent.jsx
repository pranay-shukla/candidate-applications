import { useRef, useEffect } from "react";

const ClickOutsideComponent = ({ children, onClickOutside }) => {
  const wrapperRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      // Check if the click is outside the wrapperRef
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        onClickOutside();
      }
    };

    // Add event listener to detect clicks on the document
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      // Clean up the event listener when the component unmounts
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClickOutside]);

  return (
    <div ref={wrapperRef} className="d-flex justify-content-end">
      {children}
    </div>
  );
};

export default ClickOutsideComponent;
