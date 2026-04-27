import { useEffect, useState } from "react";
import { formatter, navIcons, navLinks } from "#/constants";

const Navbar = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <nav>
      <div>
        <img src="/images/logo.svg" alt="logo" />
        <p className="font-bold">Shyam's Portfolio</p>
        <ul>
          {navLinks.map(({ id, name }) => (
            <li key={id}>{name}</li>
          ))}
        </ul>
      </div>
      <div>
        <ul>
          {navIcons.map(({ id, img }) => (
            <li key={id}>
              <img src={img} className="icon-hover" alt={`icon-${id}`} />
            </li>
          ))}
        </ul>
        <time>
         {formatter.format(time).replace(/,/g, "")}
        </time>
      </div>
    </nav>
  );
};

export default Navbar;
