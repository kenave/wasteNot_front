import { StyleSheet } from 'react-native';

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: '5%',
  },
  sliderContainer: {
    flex: 1,
    alignItems: 'center',
    paddingTop: '50%',
    backgroundColor: 'teal'
  },
  titleText: {
    fontSize: 18,
    color: '#333',
  },
  titleTextName: {
    flex: 1,
    fontSize: 18,
    color: '#333',
    textAlign: 'center'
    // backgroundColor: 'red',
  },  
  titleTextQuantity: {
    flex: 1,
    fontSize: 18,
    color: '#333',
    // backgroundColor: 'green',
    textAlign: 'center'
  },
  paragraph: {
    marginVertical: 8,
    lineHeight: 20
  },
  card: {
    borderRadius: 6,
    elevation: 3,
    backgroundColor: '#fff',
    shadowOffset: {
      width: 1,
      height: 1
    },
    shadowColor: '#333',
    shadowOpacity: 0.3,
    shadowRadius: 2,
    marginHorizontal: 4,
    marginVertical: 6
  },
  cardContent: {
    marginHorizontal: 18,
    marginVertical: 10,
    flexDirection: 'row'
  },
  itemCardContent: {
    marginHorizontal: 18,
    marginVertical: 10,
  },
  modalToggle: {
    // marginBottom: 10,
    borderWidth: 0,
    borderColor: '#f2f2f2',
    padding: 10,
    borderRadius: 10,
    alignSelf: 'center',
    color: 'teal'
  },
  modalClose: {
    marginBottom: '5%',
    alignSelf: 'center',
    color: 'teal'
  },
  modalContent: {
    paddingTop: '10%',
    flex: 1
  }
})