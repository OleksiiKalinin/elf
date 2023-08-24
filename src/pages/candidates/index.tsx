import { View } from "react-native";
import { useLink } from "solito/link";
import Typography from "../../components/atoms/Typography";
import Button from "../../components/molecules/Button";

const CandidatesPage = () => (
    <View>
        <Typography>
            CandidatesPage
        </Typography>
        <Button {...useLink({ href: '/home' })}>go home</Button>
    </View>
);

export default CandidatesPage;
