import { useState } from "react";
import { useDispatch } from "react-redux";
import { editCommunity, getCommunityById } from "../../features/communitySlice";

const EditProfileCommunity = ({community, setEditProfile}) => {
    const dispatch = useDispatch()
    const [formData, setFormData] = useState({
        name: community.name,
        description: community.description,
        
      });

      const editHandler = (e) => {
        e.preventDefault()
        dispatch(editCommunity({formData, community, getCommunityById}))
        setEditProfile(false)
      }
    return(<div>
        <div>
            <button onClick={()=>setEditProfile(false)}>x</button>
        </div>
        <form onSubmit={editHandler}>

       
        <input
              type="text"
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              value={formData.name}
              placeholder="Название"
              maxLength="12"
            />
             <input
              type="text"
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              value={formData.description}
              placeholder="Описание"
            />
             <button type="submit">
              submit
            </button>
            </form>
    </div>)
}
export default EditProfileCommunity