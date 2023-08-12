import { useSelector } from "react-redux";
import { RootStateType } from "../../store/store";

const useAppSelector = useSelector<RootStateType, unknown>
export default useAppSelector