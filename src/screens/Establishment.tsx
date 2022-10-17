import React from 'react';
import { View, StyleSheet } from 'react-native';
import establishment from '../services/establishment';
import { Card, Text } from '@rneui/themed';
import { Layout } from 'react-native-rapi-ui';
import { ScrollView } from 'react-native-gesture-handler';
import { Cell, Row } from '../components/Grid';
import { Avatar } from "@rneui/themed";

export default function Establishment(props:any) {
    // const establishment = {
    //     name:'Fexssa',
    //     description:'loLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum',
    //     address:'',
    //     sch_establishment:[
    //     {
    //         day_week:'Segunda-Feira',
    //         shift:'24 horas',
    //         sch_begin_shift:'08:00',
    //         sch_end_shift:'12:00',
    //     },
    //     {
    //         day_week:'Terca-Feira',
    //         shift:'24 horas',
    //         sch_begin_shift:'08:00',
    //         sch_end_shift:'12:00',
    //     },
    //     {
    //         day_week:'Quarta-Feira',
    //         shift:'24 horas',
    //         sch_begin_shift:'08:00',
    //         sch_end_shift:'12:00',
    //     },
    //     {
    //         day_week:'Quinta-Feira',
    //         shift:'24 horas',
    //         sch_begin_shift:'08:00',
    //         sch_end_shift:'12:00',
    //     },
    // ]
    // }

    const establishment = props.route.params.item
console.log("estavblishment || ", establishment)
    return(
        <Layout style={{flex:1}}>
            <ScrollView contentContainerStyle={{ alignItems:'center'}}>
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
                    {/* <View style={{flex:1, flexDirection:'row'}}>
                        <Avatar
                            size={64}
                            rounded
                            containerStyle={{margin:5}}
                            source={{uri:'https://randomuser.me/api/portraits/men/36.jpg'}}
                            // key={`${chunkIndex}-${i}`}
                        />
                        <View>
                            <Text>JULIO FELIX</Text>
                            <Text>Restaurante Bom</Text>
                            <Avatar
                                size={32}
                                rounded
                                icon={{ name: 'thumbs-up', type: 'font-awesome' }}
                                containerStyle={{ backgroundColor: 'green' }}
                            />

                        </View>

                    </View>
                    <View style={{flex:1, flexDirection:'row'}}>
                        <Avatar
                            size={64}
                            rounded
                            containerStyle={{margin:5}}
                            source={{uri:'https://drive.google.com/file/d/0B90xW-QMSOZSM3J6NVlDMEl1ZFE/view?usp=sharing&resourcekey=0-5hLGHQ8TxTQzNsq1qLV_xA'}}
                            // key={`${chunkIndex}-${i}`}
                        />
                        <View>
                            <Text>DANILO FELIX</Text>
                            <Text>Restaurante RUIM</Text>
                            <Avatar
                                size={32}
                                rounded
                                icon={{ name: 'thumbs-down', type: 'font-awesome' }}
                                containerStyle={{ backgroundColor: 'red' }}
                            />

                        </View>

                    </View> */}
                </Card>

                
            </ScrollView>
            
        </Layout>
    )
}