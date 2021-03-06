import React, {Component} from 'react'
import {
  Container, Header, Content, Text, Fab, Button, Icon,
  Card, CardItem, Spinner, Body
} from 'native-base'

import {Image, FlatList, View, } from 'react-native'

import firebase from 'react-native-firebase'

export default class Home extends Component{
  constructor(props){
    super(props)
    this.state = {
      listBeaches:[],
      loading: false
    }
  }

  componentDidMount(){
    //get the list of Beaches from firebase
    //this.setState({loading:true, listBeaches:[]})
    var listOfDocs = []
    firebase.firestore().collection('beaches')
    .orderBy('time')
    .onSnapshot((docs)=>{
      docs.forEach((doc)=>{
        //alert(doc.data().name)
        const {name, img} = doc.data()
        listOfDocs.unshift(
          {
            name: name,
            img: img,
            id: doc.id
          }
        )
        //alert(img)
      })
      this.setState({listBeaches: [...listOfDocs],
        loading:false
      })
    })
  }

  render(){
    const {listBeaches, loading} = this.state
    //alert(listBeaches)
    if (loading){
      return(<Spinner />)
    }
    return(
      <Container>
        <Content >
          <FlatList
            data={listBeaches}
            keyExtractor={(item)=>item.id}
            renderItem={({item})=>{
              //alert(item.name)
              return(
                <Card>
                  <CardItem cardBody>
                    <Image source={{uri: item.img}}
                      style={{width: 400, height:300}}
                     />
                  </CardItem>
                  <CardItem>
                    <Body>
                      <Text>{item.name}</Text>
                    </Body>
                  </CardItem>
                </Card>
              )
            }}
          />

        </Content>
        <Fab
          onPress={()=>this.props.navigation.navigate('Cars')}
        >
          <Icon name='ios-return-right' />
        </Fab>
      </Container>
    )
  }
}
