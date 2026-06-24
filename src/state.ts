import { User } from "@snowind/state";
import { ref } from "vue";
import { useMobileMenu } from "./services/mobile_menu";
import { useRouter } from "vue-router";

const router = useRouter();

const user = new User();
const theme = ref("bluestar");
const mobileMenu = useMobileMenu(router);

export {
    user,
    theme,
    mobileMenu,
}