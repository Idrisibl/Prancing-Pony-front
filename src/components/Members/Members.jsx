// import { useDispatch } from "react-redux"
// import { deleteUser } from "../../features/communitySlice"

const Members = ({members, founder, community}) => {
    // const dispatch = useDispatch()
    // const deleteHander = () => {
    //     dispatch(deleteUser({members, community }))
    // }

    return (<div className="container">
        <img  src={`http://localhost:3042/${members.avatar}`} alt="" />
     <div>
        <div className="wrapper1">
        <div>{members.name}</div>
        <div>{members.lastname}</div>
        </div>
        <div className="wrapper2">
        <div>Rank</div>
        <div>Очки: </div>
        </div>
     </div>
    <button>Добавить в друзья</button>
    </div>)
}
export default Members 
// {members._id !== founder._id ? (
// <button onClick={()=>deleteHander()}>Удалить</button>
// ) : (
//   ""
//   )}