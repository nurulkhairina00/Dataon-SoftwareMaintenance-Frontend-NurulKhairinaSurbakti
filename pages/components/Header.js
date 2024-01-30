/* eslint-disable @next/next/no-img-element */
import React from "react";
import Link from "next/link";
import { signOut } from "next-auth/react";

const Header = () => {
  const menu = [
    {
      id: 1,
      name: "Home",
      slug: "/",
    },
    {
      id: 2,
      name: "Catalog",
      slug: "/catalog",
    },
    {
      id: 3,
      name: "Order Status",
      slug: "/order-status",
    },
    {
      id: 4,
      name: "Distributors",
      slug: "/distributor",
    },
    {
      id: 5,
      name: "Upload",
      slug: "/upload",
    },
    {
      id: 6,
      name: "Logout",
      slug: "/logout",
    },
  ];

  const handleLogout = async () => {
    await signOut({ callbackUrl: "/" });
  };

  return (
    <nav className="container p-4">
      <div className="row">
        <div className="col-1">
          <img
            src="/image/logo-coffee-vallay.png"
            alt="logo-coffee-vallay"
            width="100%"
          />
        </div>
        <div className="col">
          <h2 className="text-brown mb-0">
            <em>Coffee Valley</em>
          </h2>
          <p className="mb-0">
            <em>Taste the love in every cup</em>
          </p>
          <small className="text-secondary">One Alewife Center 3rd Floor</small>
          <br />
          <small className="text-secondary">Cambridge, MA 02140</small>
        </div>
      </div>
      <div className="pt-4">
        <ul className="nav nav-pills nav-fill">
          {menu.map((item) => {
            return (
              <li className="nav-item ms-1" key={item.id}>
                {item.slug === "/logout" ? (
                  <a
                    className="nav-link active"
                    style={{ backgroundColor: "brown" }}
                    onClick={handleLogout}
                  >
                    {item.name}
                  </a>
                ) : (
                  <Link href={item.slug}>
                    <a
                      className="nav-link active"
                      style={{ backgroundColor: "brown" }}
                    >
                      {item.name}
                    </a>
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
};

export default Header;
