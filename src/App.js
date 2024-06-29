
import {useAuthState} from 'react-firebase-hooks/auth';
import {auth} from './firebase.js';
import Welcome from './Welcome.js'





const App = () => {
    const [user] = useAuthState(auth);



    return (
        <div>
            
            {!user ? <Welcome /> : <div>Signed in</div>}

        </div>
        

       )
}

export default App;