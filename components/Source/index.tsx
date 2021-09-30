import { FaGithub } from "react-icons/fa";
import IconComponent from "../Icon";
import Left from "../../styles/Left";

const Source = (): JSX.Element => (
  <Left bottom>
    <IconComponent
      Icon={<FaGithub color="black" aria-describedby="Github Icon" />}
      txt="GitHub Source"
      href="https://github.com/YutaMoriJP/next-forum"
    />
  </Left>
);

export default Source;
