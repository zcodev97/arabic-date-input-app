import { FaAddressBook } from "react-icons/fa";
import ArabicDateInput from "./components/ADISA";

function App() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <ArabicDateInput
        placeholder="سنة - شهر - يوم"
        iconStyle={{
          position: "absolute",
          top: "50%",
          transform: "translateY(-50%)",
          cursor: "pointer",
          marginRight: "20px",
        }}
        inputStyle={{
          width: "150px",
          paddingRight: "50px",
          border: "3px solid #000",
          borderRadius: "30px",
          fontWeight: "bold",
          fontSize: "16px",
        }}
        field={{
          value: "",
          onChange: () => {},
        }}
        form={{}}
        debounceMilliseconds={1500}
      />
    </div>
  );
}

export default App;
