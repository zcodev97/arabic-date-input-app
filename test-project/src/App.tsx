import { ArabicDateInput } from "arabic-date-input-app";
import "./App.css";
import "react-datepicker/dist/react-datepicker.css";
import "arabic-date-input-app/dist/index.css";

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
