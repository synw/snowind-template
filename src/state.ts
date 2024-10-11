import { User } from "@snowind/state";
import { ref } from "vue";


const user = new User();
const theme = ref("bluestar");

export {
    user,
    theme,
}