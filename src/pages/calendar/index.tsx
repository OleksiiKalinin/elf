import { View } from "react-native";
import { useLink } from "solito/link";
import Typography from "../../components/atoms/Typography";
import Button from "../../components/molecules/Button";

const CalendarPage = () => (
    <View>
        <Typography>
            CalendarPage
        </Typography>
        <Button {...useLink({ href: '/home' })}>go home</Button>
    </View>
);

export default CalendarPage;
