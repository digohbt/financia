import React , {useEffect, useState} from "react";
import{useForm} from 'react-hook-form'
import { Modal, TouchableWithoutFeedback , Keyboard, Alert} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage'
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from "yup";
import uuid from 'react-native-uuid'

import { Button } from "../../components/Form/Button";

import {InputForm} from '../../components/Form/InputForm'
import { useNavigation} from '@react-navigation/native'
import { TransactionTypeButton } from "../../components/Form/TransactionTypeButton";
import { CategorySelectedButton } from "../../components/Form/CategorySelectedButton";
import {CategorySelect} from '../CategorySelect'
import { 
    Container,
    Header,
    Title,
    Form,
    Fields,
    TransactionTypes
  } from "./styles";
 
  interface FormDara {
      name:string;
      amount:string
  }
  const schema = Yup.object().shape( {
      name: Yup.string().required('Nome e Obrigatorio'),
      amount: Yup.number()
      .typeError('Informe um valor numerico')
      .positive("vamor nao pode ser negativo").required()
  })
  
export function Register() {
    const [category , setCategory] = useState({
        key:"category",
        name:"categoria",
    })
    const navigation = useNavigation()

    const  { 
        control,
        handleSubmit,
        reset,
        formState:{errors}
    } = useForm( {
        resolver: yupResolver(schema)
    })
    const [TransactionType , SetTransactionType] = useState("")
    const [categoryModalOpen, setCategoryModalOpen ] = useState(false)

    function handleTransactionType (type :'positive'   | "negative" ) {
        SetTransactionType(type)
    }
    function handleOpenSelectCategoryModal() {
        setCategoryModalOpen(true)
    }
    function handleCloseSelectCategoryModal() {
        setCategoryModalOpen(false)
    }
    // useEffect(( ) => {
    //     AsyncStorage.removeItem('@gofinances:transactions')
    // },[ ])

     async function handleRegister(form : FormDara) {
        if(!TransactionType )
         return Alert.alert("Selecione Tipo da tansação ")
         if(category.name === 'categoria' )
         return Alert.alert("Selecione Tipo da Categoria ")

       const newTransaction =  {
        id : String(uuid.v4()),
        name :form.name,
        amount: form.amount,
        type:TransactionType,
        category:category.key,
        date: new Date()
       } 
      try {
        const dataKey = '@gofinances:transactions'
        console.log(newTransaction.id)
        const datatotal =   await AsyncStorage.getItem(dataKey)
        const currentData = datatotal ? JSON.parse(datatotal) : []
        const dataFormated = [
            ...currentData,
            newTransaction
        ]
         await AsyncStorage.setItem(dataKey ,  JSON.stringify(dataFormated))
         SetTransactionType("")
         setCategory({
            key:"category",
            name:"categoria",
        })
        reset()
        navigation.navigate('Listagem')

      } catch (error) {
          console.log(error)
          Alert.alert("nao foi possivel salvar ")
      }
    }
    useEffect( () => {
        async function data2 () {
            const dataKey = '@gofinances:transactions'
            const dia =   await AsyncStorage.getItem(dataKey)
            console.log( JSON.parse(dia!) )
        }
        data2()
    } ,[])
    return (
        <TouchableWithoutFeedback  onPress={Keyboard.dismiss}>
        <Container>
            <Header>
                <Title>Cadastro</Title>
            </Header>
            <Form>
                <Fields>
                    <InputForm
                        error={errors.name && errors.name.message }
                        control={control}
                        name="name"
                        autoCapitalize="sentences"
                        autoCorrect={false}
                        placeholder="Nome" />
                    <InputForm
                          error={errors.amount && errors.amount.message }
                        control={control}
                        name="amount"
                        keyboardType="numeric"
                        placeholder="Preço"
                     />
                    <TransactionTypes> 
                        <TransactionTypeButton 
                            isActive={TransactionType ==="positive"}  
                            onPress={() => handleTransactionType("positive")}  
                            title="Income"  type="up"/> 

                        <TransactionTypeButton 
                             isActive={TransactionType === "negative"}
                             onPress={ () => handleTransactionType("negative" )} 
                             title="Outcome" type="down"/> 
                    </TransactionTypes> 

                   <CategorySelectedButton onPress={handleOpenSelectCategoryModal}         title={category.name}/>
                </Fields>

                <Button onPress={ handleSubmit(handleRegister)} title="Enviar" />
            </Form>
          
            <Modal  visible={categoryModalOpen} >
                <CategorySelect 
                category={category}
                setCategory={setCategory}
                closeSelectCategory={handleCloseSelectCategoryModal}
                /> 
            </Modal>

        </Container>
        
        </TouchableWithoutFeedback>

    );
}