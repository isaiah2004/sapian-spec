import React from "react";
import Link from "next/link";

const NavBar: React.FC = () => {
  return (
    <div className="navbar bg-background absolute">
      <div className="flex-1">
        <Link href="/" className="btn btn-ghost text-xl">
          3pi4
        </Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link href="/portfolio">Portfolio</Link>
          </li>
          <li>
            <details>
              <summary>Contact me</summary>
              <ul className="bg-background rounded-t-none p-2">
                <li>
                  <Link 
                    href="https://linkedin.com/in/your-profile" 
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    LinkedIn
                  </Link>
                </li>
                <li>
                  <Link href="mailto:your.email@example.com">
                    Email
                  </Link>
                </li>
                <li>
                  <Link 
                    href="https://fiverr.com/your-profile" 
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Fiverr
                  </Link>
                </li>
              </ul>
            </details>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default NavBar;