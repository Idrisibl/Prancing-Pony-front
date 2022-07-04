const Members = ({members}) => {
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