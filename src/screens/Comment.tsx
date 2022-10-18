import React, {useState} from 'react';
import { Text } from '@rneui/themed';
import { TextInput, View, TouchableOpacity } from 'react-native';
import { Avatar } from "@rneui/themed";
import { SafeAreaView } from 'react-native-safe-area-context';
import establishment from '../services/establishment';
import { AxiosError } from "axios";
import { showMessage, hideMessage } from "react-native-flash-message";


export default function Comment(props:any){
    const [comment, setComment] = useState('')
    const [liked, setLiked] = useState<any>(null)
    const [refreshing, setRefreshing] = useState(false)

    const establishment_id = props.route.params.establishment.id

    
    async function send(){
        if(liked != null){
            setRefreshing(true)
            try{
                // let coords = {lat:location.coords.latitude, long:location.coords.longitude}
                // const response = await establishment.getEstablishments(coords)
                const response = await establishment.addComment(comment, liked, establishment_id)
                setRefreshing(false)
                // console.log('response || ', response)
                if(response){
                    props.navigation.navigate('Home')
                }
            }catch(e){
                if(e instanceof AxiosError){
                    setRefreshing(false)
                    showMessage({
                        message: e.response ? e.response.data.msg : 'Nao deu Listar os Estabelecimentos, Verifique sua conexao',
                        type: "danger",
                    });
                } else{
                    console.log('error || ', e)
                    showMessage({
                        message: "Nao deu Pegar os dados de estabelecimento.",
                        type: "danger",
                    });
                }
            }
            
        } else{
            showMessage({
                message: 'Precisa selecionar se e like ou dislike.',
                type: "danger",
            });
            
        }
        
    }

    return(
        <SafeAreaView style={{flex:1,justifyContent:'center', alignItems:'center'}}>
            <View style={{flex:2, width:'100%', alignItems:'center', justifyContent:'center'}}>
                <Text h2>Escreva seu Comentario sobre o Estabelecimento</Text>
                <View style={{height:120,width:'80%', borderColor:'black', borderWidth:.3, borderRadius:20}}>
                    
                    <TextInput
                    // containerStyle={{ marginTop: 15 }}
                        placeholder="Comentario"
                        value={comment}
                        style={{width:'100%', height:'100%', margin:5}}
                        
                        autoCapitalize="none"
                        autoComplete='off'
                        autoCorrect={false}
                        // ={{width:'80%', }}
                        multiline
                        numberOfLines={3}
                        onChangeText={(text) => setComment(text)}
                    />
                    <View style={{flex:1, flexDirection:'row', justifyContent:'center'}}>
                        <Avatar
                            size={64}
                            rounded
                            onPress={() => setLiked(true)}
                            icon={{ name: 'thumbs-up', type: 'font-awesome' }}
                            containerStyle={{ backgroundColor: liked ? 'green' : 'gray' }}
                        />
                        <Avatar
                            size={64}
                            rounded
                            onPress={() => setLiked(false)}
                            icon={{ name: 'thumbs-down', type: 'font-awesome' }}
                            containerStyle={{ backgroundColor: !liked ? liked != null ? 'red' : 'gray' : 'gray' }}
                        />
                        
                    </View>
                </View>
            </View>
            <View style={{flex:1,width:'80%', justifyContent:'flex-end', padding:20}}>
                <TouchableOpacity
                    style={{height:60, backgroundColor:'blue', borderRadius:120, alignItems:'center', justifyContent:'center'}}
                    onPress={() => send()}
                >
                    <Text style={{ color: "white", fontWeight:'bold', fontSize:16 }}>Enviar</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )

}