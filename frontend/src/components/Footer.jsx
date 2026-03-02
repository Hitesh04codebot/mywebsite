const Footer = () => {
  return (
    <footer className="bg-primary text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo */}
          <div>
            <h2 className="text-2xl font-bold">MUJStays</h2>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#home" className="hover:underline">Home</a></li>
              <li><a href="#pgs" className="hover:underline">More PGs</a></li>
              <li><a href="#contact" className="hover:underline">Contact Us</a></li>
              <li><a href="#login" className="hover:underline">Login</a></li>
            </ul>
          </div>

          {/* Social Icons */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-light-blue">Instagram</a>
              <a href="#" className="hover:text-light-blue">LinkedIn</a>
              <a href="#" className="hover:text-light-blue">Twitter</a>
            </div>
          </div>

          {/* Copyright */}
          <div>
            <p className="text-sm">© 2026 MUJStays. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
