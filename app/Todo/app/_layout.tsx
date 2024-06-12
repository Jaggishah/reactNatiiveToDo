
import { Stack } from 'expo-router';
import { StyleSheet,  View } from 'react-native';
import Button from "../components/Button"
import { ThemeProvider } from '@shopify/restyle';
import theme, { Text } from '@/utils/theme';


export default function RootLayout() {
 

  return (
    <ThemeProvider theme={theme}>
      <View style={styles.container}>
        <Text variant='text3Xl'>Heelo Jaggi shah</Text>
        <Button/>
      </View>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:"#fff",
    justifyContent:"center",
    alignItems:"center"
  }
})
