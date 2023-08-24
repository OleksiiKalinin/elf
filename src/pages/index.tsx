import { View } from "react-native";
import Typography from "../components/atoms/Typography";
import Button from "../components/molecules/Button";
import { useLink } from "solito/link";

const HomePage = () => (
  <View>
    <Typography>
      Witamy w ELF
    </Typography>
    <Button {...useLink({href: '/home'})}>go home</Button>
  </View>
);

export default HomePage;
