import { useSelector } from "react-redux"; 
import {useAuth} from '../components/auth'


const Profile = () => {

  const auth=useAuth()

  return (
    <div>
      <h3>Welcome {auth.user}</h3>

    </div>
  );
};

export default Profile;
