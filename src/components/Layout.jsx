import Header from "./Header";
import Footer from "./Footer";

const Layout = ({ currentNo, children }) => {
  return (
    <div className="relative text-gray-900 dark:text-gray-100 dark:bg-gray-800">
      <div className="relative">
        <Header current={currentNo} />
        <div className="mx-auto overflow-x-hidden max-w-2xl px-4 pb-4 lg:max-w-6xl lg:px-12">
          {children}
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
