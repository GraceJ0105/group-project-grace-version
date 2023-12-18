import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footerLinks">
        <a
          href="https://www.buymeacoffee.com/gitgals"
          target="_blank"
          rel="noreferrer"
        >
          Buy us a coffee
        </a>
        <a
          href="https://github.com/kasiawalsh/group-project-fullstack-group5-cfg"
          target="_blank"
          rel="noreferrer"
        >
          GitGals GitHub
        </a>

        <a href="mailto:gitgals@gmail.com">Contact Us</a>
      </div>
    </div>
  );
};

export default Footer;
