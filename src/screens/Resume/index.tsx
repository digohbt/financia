import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {useState, useEffect} from "react";
import { HistoryCard } from "../../components/HistoryCard";
import { categories } from "../../utils/categories";
import {Container , Header, Title,Content ,ChartContaner ,
    MonthSelect,
    MonthSelectButton,
    MonthSelectIcon,
    Month
} from './styles'
import {useBottomTabBarHeight } from '@react-navigation/bottom-tabs'
import {VictoryPie} from 'victory-native'
import { ScrollView } from "react-native";
import {addMonths , subMonths, format } from 'date-fns'
import {ptBR} from 'date-fns/locale'

interface transactionData {
    type: 'positive'| 'negative';
    name: string;
    amount:string;
    category: string;
    date:string
}
interface CategoryData {
    key:string
    name: string;
    total :number;
    totalFormated :string;
    color: string;
    percent : number;
    percentFormatted : string
}



export function Resume() {
    const [selectedDate ,setSelectedDate ] = useState( new Date())
    const [totalByCategory, setTotalByCategory] = useState<CategoryData[]> ([])

    function hanldDateChange (action : 'next' | 'prev' )   {
        if ( action == 'next') {
            setSelectedDate(addMonths(selectedDate , 1 ))
        }else {
            setSelectedDate(subMonths(selectedDate , 1 ))

        }

    }

    async function loadData () {
        const dataKey = '@gofinances:transactions'
        const response =   await AsyncStorage.getItem(dataKey)
        const responseFormated = response ? JSON.parse(response) : []


        const expensive = responseFormated.filter( ( item :transactionData ) => 
        item.type  == 'negative' && new Date( item.date).getMonth() === selectedDate.getMonth() &&
        new Date( item.date).getFullYear() === selectedDate.getFullYear()
        )
        
        const expensivesTotal = expensive.reduce( ( acc : number, expensive : transactionData )  => {
            return acc + Number( expensive.amount)
        } ,0)
     
        const totalCategory : CategoryData[]= []

        categories.forEach(( category ) => {
            let categorySun = 0 

            expensive.forEach((expensive :transactionData ) => {

                if ( category.key === expensive.category) {

                    categorySun += Number( expensive.amount)
                }
            });
            const  percent =  Number((categorySun / expensivesTotal * 100))
            const percentFormatted =  `${percent.toFixed(0)}%`

            if( categorySun > 0) {
                const total = categorySun.toLocaleString('pt-BR', { style:'currency' , currency:'BRL'} )
                totalCategory.push({
                    key: category.key,
                    name: category.name,
                    color:category.color,
                    total : categorySun,
                    totalFormated : total,
                    percent,
                    percentFormatted 
                })
            }
        } )
       console.log(totalCategory)
       setTotalByCategory(totalCategory)
    }

    useEffect(() => {
        loadData()
    } ,[selectedDate] )
    return (

        <Container>
            <Header>
                <Title> Resumo por categoria </Title>
            </Header>

                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{padding: 24, paddingBottom:useBottomTabBarHeight() } } >
               <MonthSelect>
                   <MonthSelectButton onPress={() => hanldDateChange('prev')}>
                       <MonthSelectIcon name="chevron-left" /> 
                   </MonthSelectButton>

                   <Month> {format(selectedDate,'MMMM , yyyy',{locale:ptBR})} </Month>

                   <MonthSelectButton onPress={() => hanldDateChange('next')}>
                       <MonthSelectIcon  name="chevron-right"/> 
                   </MonthSelectButton>

               </MonthSelect>

                <ChartContaner> 
                    < VictoryPie labelRadius={50} style={{labels : {fontSize : 14 , fontWeight:'bold', fill:'white' }}}  colorScale={totalByCategory.map( category => category.color) } data={totalByCategory} x="percentFormatted" y='total' />
                </ChartContaner> 
               
                 {
                    totalByCategory.map((item) => { 
                        return (
                            <HistoryCard key={item.key} title={item.name} amount={item.totalFormated} color={item.color}/> 
                        )
                    })
                }
                
            </ScrollView>
        </Container>
    )
}