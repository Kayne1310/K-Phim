export default function Footer() {
  return (
    <footer className="w-full py-8 px-4 md:px-12 bg-black/80 text-center text-text-secondary text-sm mt-auto">
      <p>
        © {new Date().getFullYear()} <span className="text-accent font-bold">K-Phim</span>. All rights reserved.
      </p>
      <div className="mt-2 flex justify-center gap-4">
        <a href="#" className="hover:text-white transition-colors">Điều khoản sử dụng</a>
        <a href="#" className="hover:text-white transition-colors">Chính sách bảo mật</a>
        <a href="#" className="hover:text-white transition-colors">Liên hệ</a>
      </div>
 
    </footer>
  );
}
