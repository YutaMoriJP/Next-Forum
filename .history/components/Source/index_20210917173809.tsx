import { FaGithub } from "react-icons/fa";
import IconComponent from "../Icon";
import Left from "../../styles/Left";

const Source = (): JSX.Element => (
  <Left>
    <IconComponent
      Icon={<FaGithub />}
      txt="Source Code - GitHub"
      href="https://github.com/YutaMoriJP/next-forum"
    />
  </Left>
);

export default Source;
