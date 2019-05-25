import axios from 'axios';

export default {
    postUserData: (newUserData) => {
        return axios.post("/user/newUser", newUserData);
    },
    postUserLogin: (loginInput) => {
        return axios.post("/user/checkLogin", loginInput);
    },
    
}