import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./Components/Header";
import TopHeadlines from "./Pages/TopHeadlines";
import BreakingNews from "./Pages/BreakingNews";
import Category from "./Pages/Category";
import Footer from "./Components/Footer";
import SearchNews from "./Pages/SearchNews";

const App = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<TopHeadlines />} />
            <Route path="/breaking-news" element={<BreakingNews />} />
            <Route path="/category" element={<Category />} />
            <Route path="/search" element={<SearchNews />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;