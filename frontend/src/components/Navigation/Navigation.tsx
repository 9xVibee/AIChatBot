/* eslint-disable @typescript-eslint/no-unused-vars */
import { Link } from "react-router-dom";

type Props = {
  to: string;
  text: string;
  onClick?: () => Promise<void>;
};

const Navigation = (Props: Props) => {
  return (
    <Link to={Props.to}>
      <button className="login button-54">{Props.text}</button>
    </Link>
  );
};

export default Navigation;
