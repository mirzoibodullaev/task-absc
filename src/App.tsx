import Form from "./components/Form";
import { Toaster } from "./components/ui/toaster";

function App() {
    return (
        <div
            className="flex justify-center"
            style={{ paddingTop: "2rem", paddingBottom: "2rem" }}
        >
            <Form />
            <Toaster />
        </div>
    );
}

export default App;
