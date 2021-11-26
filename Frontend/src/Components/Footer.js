import React from "react";
import { Link } from "react-router-dom";
import "../index.css";
function Footer() {
  return (
    <div>
      <div className="footer ">
        <ul>
          <li id="footeritem-1">
            <Link href="https://www.facebook.com/profile.php?id=100028892232243">
              <i class="fab fa-facebook fa-2x"></i>
            </Link>
          </li>
          <li id="footeritem-2" style={{ color: "red" }}>
            <Link href="https://www.instagram.com/namangarg0802/">
              <i class="fab fa-instagram fa-2x"></i>
            </Link>
          </li>
          <li id="footeritem-3">
            <Link href="https://www.linkedin.com/in/naman-garg-a01b34200/">
              <i class="fab fa-linkedin fa-2x"></i>
            </Link>
          </li>
          <li id="footeritem-4">
            <Link href="https://github.com/namangarg802">
              <i class="fab fa-github fa-2x"></i>
            </Link>
          </li>
          <li id="footeritem-5">
            <Link href="https://namangarg802@gmail.com">
              <i class="fas fa-envelope fa-2x"></i>
            </Link>
          </li>
        </ul>
        <p>© 2021Copyright Naman Garg</p>
      </div>
      <div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          viewBox="0 0 680 91"
          class="w-full"
        >
          <path fill="#ACE4D6" d="M349 76.499L286 113V40z"></path>
          <path fill="#0C3C32" d="M480 74.5L446 94V55z"></path>
          <path
            fill="#1CC29F"
            d="M223 76.5l63 36.5V40zm182 1.999L446 102V55z"
          ></path>
          <path fill="#137863" d="M169 48v82l71-41z"></path>
          <path fill="#1CC29F" d="M121 75.499L169 103V48z"></path>
          <path fill="#373B3F" d="M456 101h-96V46z"></path>
          <path fill="#52595F" d="M360 46v55h-96z"></path>
          <path fill="#A473DB" d="M436 93h63V57z"></path>
          <path fill="#D0B3EB" d="M499 57v36h63z"></path>
          <path fill="#0C3C32" d="M491 93h84.18V44z"></path>
          <path fill="#1CC29F" d="M575.18 93h84.179l-84.18-49z"></path>
          <path fill="#FF2900" d="M601 94h48V66z"></path>
          <path fill="#FF692C" d="M649 66v28h48z"></path>
          <path fill="#FF815C" d="M170.385 93h76V49z"></path>
          <path fill="#FF2900" d="M246.385 49v44h76z"></path>
          <path fill="#373B3F" d="M166 93H70V38z"></path>
          <path fill="#52595F" d="M70 38v55h-96z"></path>
        </svg>
      </div>
    </div>
  );
}

export default Footer;
