import React, {useState, useEffect} from 'react'
import { getUser } from '../../features/chatRequests'
import styles from "./style.module.css"

const Convaersation = ({data, currentUser}) => {
    const [userData, setUserData] = useState(null)
    useEffect(() => {

        const userId = data.members.find((id) => id !== currentUser)

        const getUserData = async() => {
            try {

                const {data} = await getUser(userId)
                setUserData(data)

            } catch (error) {
                console.log(error);
            }
        }
        getUserData()
    }, [])
  return (
    <div className={styles.name}>{userData?.name} {userData?.lastname} <hr />
    </div>
  )
}

export default Convaersation