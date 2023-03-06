import NavigationBar from "./components/NavigationBar";
import RouteSwitch from "./RouteSwitch";

function App() {
  return (
    <div className="App">
      <link rel="stylesheet" 
        href="https://cdn.jsdelivr.net/npm/bootstrap@4.1.3/dist/css/bootstrap.min.css" 
        integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" 
        crossOrigin="anonymous">
      </link>
      <NavigationBar />
      <RouteSwitch />
    </div>
  );
}

export default App;
