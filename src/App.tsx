
import Sidebar from "./components/sidebar/sidebar"; // import your menu
import Main from "./pages/Main"; // main page component
import "./App.css"; // import the layout styles

export default function App() {
   return (
    <div className="app-container">
      {/* sidebar */}
      <Sidebar />
      
      {/* main content */}
      <main className="main-content">
        <Main />
      </main>
    </div>
  );
}
 

