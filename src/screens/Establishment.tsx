import React, {useState} from 'react';
import { View, StyleSheet, RefreshControl} from 'react-native';
import establishment from '../services/establishment';
import { Card, Text } from '@rneui/themed';
import { Layout } from 'react-native-rapi-ui';
import { ScrollView } from 'react-native-gesture-handler';
import { Cell, Row } from '../components/Grid';
import { Avatar } from "@rneui/themed";
import { SafeAreaView } from 'react-native-safe-area-context';
import * as service_est from '../services/establishment';
import { AxiosError } from "axios";
import { showMessage, hideMessage } from "react-native-flash-message";

export default function Establishment(props:any) {
    const [establishment, setEstablishment] = useState(props.route.params.item)
    const [refreshing, setRefreshing] = useState(false)
    async function getEstablishment(){
        try{
            setRefreshing(true)
            const response = await service_est.default.getEstablishment_by_id(establishment.id)
            setEstablishment(response.data)
            setRefreshing(false)
        }catch(e){
            setRefreshing(false)
            if(e instanceof AxiosError){
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
        
    }

    // const establishment = props.route.params.item
    return(
        <SafeAreaView style={{flex:1}}>
            <ScrollView  contentContainerStyle={{ alignItems:'center'}} 
            refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={() => getEstablishment()}
                />
            }>
                <View style={{justifyContent:'center'}}>
                    <Text h1>
                        {establishment.name}
                    </Text>
                </View>
                <Card wrapperStyle={{alignItems:'center'}} containerStyle={{ width:"90%", marginBottom:5,}}>
                    <Card.Title>Detalhes do Estabelecimento</Card.Title>
                    <Card.Divider />
                    <View>
                        <Text>{establishment.description}</Text>
                    </View>
                    <Card containerStyle={{width:'100%'}}>
                        <Card.Title>Horarios</Card.Title>
                        <Row column={['Dia', 'Turno', 'Horario', 'FINAL']}/>
                        {establishment.sch_establishment.map((item:any)=>{
                            return(
                                <View style={{width:'100%'}}>
                                    <Row column={[item.day_week.split('-')[0], item.shift, item.sch_begin_shift, item.sch_end_shift]} />
                                </View>
                                
                            )
                        })}
                    </Card>                    
                    
                </Card>
                <Card containerStyle={{width:'100%'}}>
                    <View style={{flex:1, flexDirection:'row', alignItems:'flex-end', justifyContent:'flex-end'}}>
                        <Card.Title style={{marginRight:'30%'}} >Comentarios</Card.Title>
                        <Avatar
                            size={32}
                            icon={{ name:'plus' , type: 'font-awesome' }}
                            containerStyle={{ backgroundColor: 'green', justifyContent:'flex-end', marginBottom:10 }}
                            onPress={() => {props.navigation.navigate('Comment', {establishment})}}
                        />
                    </View>
                    
                    <Card.Divider/>
                    {establishment.comment_establishment.map((item:any) => {
                        return (
                            <View style={{flex:1, flexDirection:'row', borderColor:'black', borderWidth:.2, marginBottom:15}}>
                                <Avatar
                                    size={64}
                                    rounded
                                    containerStyle={{margin:5}}
                                    source={{uri:item.user.picture}}
                                    // key={`${chunkIndex}-${i}`}
                                />
                                <View style={{flex:1,width:'100%'}}>
                                    <Text>{item.user.full_name}</Text>
                                    <Card.Divider/>
                                    <Text 
                                        numberOfLines={5}
                                        ellipsizeMode={"tail"}
                                    >
                                        {item.text}
                                    </Text>
                                    <Avatar
                                        size={32}
                                        rounded
                                        icon={{ name: item.linked ? 'thumbs-up' : 'thumbs-down', type: 'font-awesome' }}
                                        containerStyle={{ backgroundColor: item.linked ? 'green' : 'red' }}
                                    />

                                </View>
                                
                            </View>
                        )
                    })}
                   
                </Card>

                
            </ScrollView>
            
        </SafeAreaView>
    )
}