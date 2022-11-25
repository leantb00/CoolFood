import AsyncStorage from "@react-native-async-storage/async-storage";

export default class Storage {

    static async getToken(){
        let token = await AsyncStorage.getItem('token')
        return token
    }

    static setToken(token:string) {
        AsyncStorage.setItem('token', token)
    }
    
}