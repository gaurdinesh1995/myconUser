import {StyleSheet} from 'react-native'

export default StyleSheet.create({
    material:{ 
      flex:0.5,
      height:64,
      width:'95%',
      // justifyContent:'space-between',
      alignItems:"center",
      flexDirection:'row',
        backgroundColor:"#FFF",
      borderRadius: 12 ,
      margin:5,
      },
      checkImage:{
        position:"absolute",
        resizeMode:'contain',
        // top:5,
        right:10,
        height:12.1,
        width:15.5
      },
      materialImg:{
        height:29.4,
        width:23,
        resizeMode:'contain'
    }
})