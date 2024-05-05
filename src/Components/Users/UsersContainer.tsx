import { FC } from "react";
import { useSelector } from "react-redux";
import Preloader from "../../Common/Preloader/Preloader";
import { getIsFetching } from "../../Redux/Users-selectors";
import Users from "./Users";

interface PropsType  {}

 const UsersContainer: FC<PropsType> = (props)=> {
  const isFetching = useSelector(getIsFetching)

  return ( <>
    {isFetching ? <Preloader /> : null}
    <Users/>
  </>)
}


export default UsersContainer