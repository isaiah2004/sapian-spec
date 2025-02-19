import React from "react";
import Link from "next/link";

const NavBar: React.FC = () => {
  return (
    <div className="navbar bg-background absolute">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">3pi4</a>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li>
            <a>Portfolio</a>
          </li>
          <li>
            <details>
              <summary>Contact me</summary>
              <ul className="bg-background rounded-t-none p-2">
                <li>
                  <a>LinkedIn</a>
                </li>
                <li>
                  <a>Email</a>
                </li>
                <li>
                  <a>Fiver</a>
                </li>
              </ul>
            </details>
          </li>
        </ul>
      </div>
    </div>
  );
};

// const styles = {
//     nav: {
//         padding: '1rem',
//         backgroundColor: '#333',
//     },
//     ul: {
//         listStyle: 'none',
//         display: 'flex',
//         justifyContent: 'space-around',
//         margin: 0,
//         padding: 0,
//     },
//     li: {
//         margin: 0,
//     },
//     a: {
//         color: '#fff',
//         textDecoration: 'none',
//     },
// };

export default NavBar;
