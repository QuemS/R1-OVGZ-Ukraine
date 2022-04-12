import { createApp } from "../../node_modules/vue/dist/vue.esm-browser.prod.js";
import {  } from "../../node_modules/particlesjs/dist/particles.js";

let rateUsdUrl = 'https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json';
var t0 = performance.now();

createApp({
    data(){
        return{
            title:'Калькулятор ОВГЗ Украины',
            list:[],
            inputFromOne: null,
            inputToOne: null,
            inputFromTwo: null,
            inputToTwo: null,
        }
    },
    methods:{
        
    },
    computed:{
        showCalcPeriodOnePaydate(){
            if (this.inputFromOne &&  this.inputToOne) {
                let data = this.list.filter(item => item.paydate >= this.inputFromOne && item.paydate <= this.inputToOne)
                                    .reduce((summ,item) => summ + item.attraction,0) / 1000000;
                return data = Math.round(data *100)/100;
            }
            
        },
        showCalcPeriodOneRepaydate(){
            if (this.inputFromOne &&  this.inputToOne) {
                let data = this.list.filter(item => item.repaydate >= this.inputFromOne && item.repaydate <= this.inputToOne)
                                    .reduce((summ,item) => summ + item.attraction,0) / 1000000;
                return data = Math.round(data *100)/100
            }
            
        },
        showCalcPeriodTwoPaydate(){
            if (this.inputFromTwo &&  this.inputToTwo) {
                let data = this.list.filter(item => item.paydate >= this.inputFromTwo && item.paydate <= this.inputToTwo)
                                    .reduce((summ,item) => summ + item.attraction,0) / 1000000;
                return data = Math.round(data *100)/100;
            }
            
        },
        showCalcPeriodTwoRepaydate(){
            if (this.inputFromTwo &&  this.inputToTwo) {
                let data = this.list.filter(item => item.repaydate >= this.inputFromTwo && item.repaydate <= this.inputToTwo)
                                    .reduce((summ,item) => summ + item.attraction,0) / 1000000;
                return data = Math.round(data *100)/100
            }
            
        },
        showCaclPercentPaydate(){
            return (this.showCalcPeriodTwoPaydate   && this.showCalcPeriodOnePaydate ) ? Math.round(( this.showCalcPeriodTwoPaydate - this.showCalcPeriodOnePaydate  )/ this.showCalcPeriodOnePaydate * 10000 )/100 + ' %' :  ' '; 
            
            
           
           
        },
        showCaclPercentRepaydate(){
            
            return (this.showCalcPeriodTwoRepaydate   && this.showCalcPeriodOneRepaydate ) ? Math.round(( this.showCalcPeriodTwoRepaydate - this.showCalcPeriodOneRepaydate  )/ this.showCalcPeriodOneRepaydate * 10000 )/100 + ' %' : ' ';
            
            
            
        },   
    },

    async mounted(){
        let data = await fetch('./assets/json/fetch.json');
            data = await data.json();
        let rate = await fetch(rateUsdUrl);
            rate = await rate.json();
            
            let rateEUR = rate.filter(item => item.cc == 'EUR');
                rateEUR = rateEUR[0].rate;

            let rateUSD = rate.filter(item => item.cc == 'USD');
                rateUSD = rateUSD[0].rate;

            let resultData = data.map(item => {
                    item.paydate = item.paydate.split('.').reverse().join('-');
                    item.repaydate = item.repaydate.split('.').reverse().join('-');

                if (item.valcode == 'USD' && item.attraction != 0 ) {
                    let newAttraction = Math.round(item.attraction * rateUSD *100)/100;
                    
                    return ({...item, attraction:newAttraction})
                }else if (item.valcode == 'EUR' && item.attraction != 0 ) {
                    let newAttraction = Math.round(item.attraction * rateEUR *100)/100;
                    
                    return ({...item, attraction:newAttraction})
                } 
                return ({...item})
                
            })
            
            this.list = resultData;
            console.log('resultData:', this.list);
            Particles.init({
                selector: '.background',
                connectParticles : true,
                sizeVariations: 0.2,
                speed: 0.2,
                maxParticles: 50,
                color:['#00FFFF','#3399ff','#80aaff']
              });
            
            
    }
}).mount('#app')


/**performance**/
var t1 = performance.now();
console.log("Call to app " + (t1 - t0) + " milliseconds.")

/*************background**************/









