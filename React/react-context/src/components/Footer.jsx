import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";

export default function Footer() {
  const { theme } = useContext(ThemeContext);

  const color = theme == "dark" ? "light" : "dark";

  return (
    <footer
      className={`bg-${theme} text-center text-${color} border-top border-body`}
    >
      <div className="container p-4">
        <section className="mb-4">
          <a
            className={`btn btn-outline-${color} btn-floating m-1`}
            href="#!"
            role="button"
          >
            <i className="bi bi-facebook"></i>
          </a>
          <a
            className={`btn btn-outline-${color} btn-floating m-1`}
            href="#!"
            role="button"
          >
            <i className="bi bi-twitter"></i>
          </a>
          <a
            className={`btn btn-outline-${color} btn-floating m-1`}
            href="#!"
            role="button"
          >
            <i className="bi bi-google"></i>
          </a>
          <a
            className={`btn btn-outline-${color} btn-floating m-1`}
            href="#!"
            role="button"
          >
            <i className="bi bi-instagram"></i>
          </a>
        </section>
      </div>

      <div className="text-center p-3">
        © 2026 Copyright:
        <a className={`text-${color}`} href="#!">
          Movie App
        </a>
      </div>
    </footer>
  );
}
