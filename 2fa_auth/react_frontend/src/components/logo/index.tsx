import { Link } from "react-router-dom";

const Logo = (props: { url?: string; size?: string; fontSize?: string }) => {
  const { url = "/", size = "40px", fontSize = "24px" } = props;
  return (
    <div className="flex items-center justify-center sm:justify-start">
      <Link
        to={url}
        className={`rounded-lg  flex items-center border-2 dark:border-gray-200 justify-center  bg-gradient-to-br from-blue-500 to-primary to-90% `}
        style={{ width: size, height: size }}
      >
        <span
          className={`font-bold text-gray-50`}
          style={{ fontSize: fontSize }}
        >
          S
        </span>
      </Link>
    </div>
  );
};

export default Logo;
