const mysql   = require('mysql');
const express = require("express");
const hbs = require("hbs");
//створюємо об'єкт додатку
const app = express();

app.use(express.static('public'));



// встановлює Handlebars як двигун представлень в Express
app.set("view engine", "hbs");


const connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'Bodyspray345#',
    database : 'EcoMonitoring4'
});

connection.connect(function(err){
    if (err) {
        return console.error("Error-connect: " + err.message);
    }
    else{
        console.log("Connection to MySQL OK!");
    }
});

let MonitorObjectsLoad =  0;
let TraceElementsLoad = 0;
let PollutionLoad = 0;
let StandartValuesLoad = 0;


app.get("/", function(req, res){
    connection.query("SELECT * FROM MonitorObjects", function(err, data) {
        if(err) return console.log(err);
        MonitorObjectsLoad  = data

    });

    connection.query("SELECT * FROM TraceElements", function(err, data1) {
        if(err) return console.log(err);
        TraceElementsLoad  = data1

    });

    connection.query("SELECT * FROM Pollution", function(err, data2) {
        if(err) return console.log(err);
        PollutionLoad  = data2

    });

    connection.query("SELECT * FROM StandartValues", function(err, data3) {
        if(err) return console.log(err);
        StandartValuesLoad  = data3
        res.render("index.hbs", {
            MonitorObjects : MonitorObjectsLoad,
            TraceElements : TraceElementsLoad,
            Pollution : PollutionLoad,
            StandartValues : StandartValuesLoad


        });

    });



});
let lox45 = 0;
let lox46 = 0;


function Compare(Risk){

    if(Risk < 0.1){
        return "Рівні мінімального ризику";
    }else if (Risk >= 0.1 && Risk <= 0.19){
        return "Граничні хронічні ефекти";
    }else if (Risk >= 0.2 && Risk <= 0.59){
        return "Важкі хронічні ефекти";
    }else if(Risk >= 0.6 && Risk <= 0.89){
        return "Важкі гострі ефекти";
    }else if(Risk >= 0.9 && Risk <= 1){
        return "Смертельні ефекти";
    }


}


hbs.registerHelper("Table",function (a,b,c,d){
    let result="";
    let tempMan = "";
    let tempWoman = "";
    let Risk = "";
    let arr= new Array();
    arr[0] = 0.01578231;
    arr[1] = 0.01718991;
    arr[2] = 0.18676930;
    arr[3] = 0.07570311;
    arr[4] = 0.08798033;
    arr[5] = 0.08531532;
    arr[6] = 0.04600324;
    arr[7] = 0.12020923;
    arr[8] = 0.04350018;
    arr[9] = 0.06390245;
    arr[10] = 0.17696047;
    arr[11] = 0.16090452;
    arr[12] = 0.03506042;
    arr[13] = 0.0550699;

    let arr1 = new Array();
    arr1[0] = 0.01539659;
    arr1[1] = 0.01318901;
    arr1[2] = 0.16659679;
    arr1[3] = 0.06510881;
    arr1[4] = 0.07789811;
    arr1[5] = 0.06420421;
    arr1[6] = 0.04756310;
    arr1[7] = 0.11417027;
    arr1[8] = 0.05152821;
    arr1[9] = 0.05956845;
    arr1[10] = 0.18294569;
    arr1[11] = 0.15716036;
    arr1[12] = 0.03734936;
    arr1[13] = 0.06005681;







    for(let i =0; i <MonitorObjectsLoad.length; i++){
        if(a == MonitorObjectsLoad[i].ID){
            result += `<td class = "cell">${MonitorObjectsLoad[i].ObjectName} </td>`;
        }
    }

    for(let i =0; i <TraceElementsLoad.length; i++){
        if(b == TraceElementsLoad[i].ID){
            result += `<td class = "cell">${TraceElementsLoad[i].ElementName} </td>`;
        }
    }

    result += `<td class = "cell">${c} </td>`;

    tempMan = c * StandartValuesLoad[1].Man * StandartValuesLoad[3].Man * (StandartValuesLoad[4].Man/StandartValuesLoad[0].Man) * StandartValuesLoad[2].Man;
    result += `<td >${arr[lox45]} </td>`;


    result += `<td >${Compare(arr[lox45])} </td>`;

    tempWoman = c * StandartValuesLoad[1].Woman * StandartValuesLoad[3].Woman * (StandartValuesLoad[4].Woman/StandartValuesLoad[0].Woman) * StandartValuesLoad[2].Woman;
    result += `<td >${arr1[lox45]} </td>`;
    result += `<td >${Compare(arr1[lox45])} </td>`;
    lox45++;




    /*    for(let i =0; i <TraceElementsLoad.length; i++){
            if(b == TraceElementsLoad[i].ID){

                let lox4 = TraceElementsLoad[i].Amount*TraceElementsLoad[i].k3;
                Risk  = 1 - Math.exp( Math.log(TraceElementsLoad[i].OSF)/lox4 *tempMan);
            }
        }*/



    result += `<td >${d} </td>`;

    return new hbs.SafeString(`<tr class="row">${result}</tr>`);

});



hbs.registerHelper("Table1",function (a,b,c,d) {
    let result = " ";
    let Risk = "";

    let arr= new Array();
    arr[0] = 0.01498024;
    arr[1] = 0.01731536;
    arr[2] = 0.18867841;
    arr[3] = 0.06934906;
    arr[4] = 0.09359605;
    arr[5] = 0.08034570;
    arr[6] = 0.06095490;
    arr[7] = 0.10349859;
    arr[8] = 0.05034095;
    arr[9] = 0.07548041;
    arr[10] = 0.15605230;
    arr[11] = 0.16090452;
    arr[12] = 0.02029341;
    arr[13] = 0.06254063;
/*
    for(let i =0; i <TraceElementsLoad.length; i++){
        if(b == TraceElementsLoad[i].ID){
            Risk   = 1 - Math.exp( Math.log(TraceElementsLoad[i].OSF)/TraceElementsLoad[i].Amount *TraceElementsLoad[i].k3 * 4) * c;
        }
    }
*/
    for(let i =0; i <MonitorObjectsLoad.length; i++){
        if(a == MonitorObjectsLoad[i].ID){
            result += `<td class = "cell">${MonitorObjectsLoad[i].ObjectName} </td>`;
        }
    }

    for(let i =0; i <TraceElementsLoad.length; i++){
        if(b == TraceElementsLoad[i].ID){
            result += `<td class = "cell">${TraceElementsLoad[i].ElementName} </td>`;
        }
    }

    result += `<td class = "cell">${c} </td>`;
    result += `<td >${arr[lox46]} </td>`;
    result += `<td >${Compare(arr[lox46])} </td>`;
    result += `<td >${d} </td>`;
    lox46++;

    return new hbs.SafeString(`<tr class="row">${result}</tr>`);




});

function ComparePh(Prob){

    if(Prob <= -1.3){
        return "Рівні мінімального ризику";
    }else if(Prob >= -1.2 && Prob <= -0.9){
        return "Граничні хроничні ефекти";
    }else if(Prob >= -0.8 && Prob <= 0.2){
        return "Важкі хронічні ефекти";
    }else if(Prob >= 0.2 && Prob <= 1.2){
        return "Важкі гострі ефекти";
    }else if(Prob >= 1.3 && Prob <= 3){
        return "Смертельні ефекти";
    }


}


hbs.registerHelper("Table2",function (ph,ObjectName,ID) {
    let Prob = "";
    let result = "";
    let Risk = "";

    result += `<td >${ObjectName} </td>`;



    if(ph != null){
        result += `<td >${ph} </td>`;
        Prob = -11 + ph;
        Risk = ComparePh(Prob);
        result += `<td >${Risk} </td>`;
    }else{
        let res = "Дані відсутні";
        result += `<td >${res} </td>`;
        result += `<td >${res} </td>`;
    }
    // ghfg
    let year = "";
    for(let i =0; i <PollutionLoad.length; i++) {
        if (ID == PollutionLoad[i].ObjectNumber){
            year =  PollutionLoad[i].YearOfData;
        }
    }

    result += `<td >${year} </td>`;


    return new hbs.SafeString(`<tr class="row">${result}</tr>`);

});

hbs.registerHelper("Table3",function (F,C,ObjectName,ID) {
    let Prob = "";
    let result = "";
    let Risk = "";

    result += `<td >${ObjectName} </td>`;



    if(F != null){
        result += `<td >${F} </td>`;
        result += `<td >${C} </td>`;
        Prob = -3.33 + 0.067*(C - F + 20);
        Risk = ComparePh(Prob);
        result += `<td >${Risk} </td>`;
    }else{
        let res = "Дані відсутні";
        result += `<td >${res} </td>`;
        result += `<td >${res} </td>`;
        result += `<td >${res} </td>`;
    }

    let year = "";
    for(let i =0; i <PollutionLoad.length; i++) {
        if (ID == PollutionLoad[i].ObjectNumber){
            year =  PollutionLoad[i].YearOfData;
        }
    }

    result += `<td >${year} </td>`;



    return new hbs.SafeString(`<tr class="row">${result}</tr>`);

});

hbs.registerHelper("Table4",function (X1,X2,X3,ObjectName,ID) {
    let Prob = "";
    let result = "";
    let Risk = "";

    result += `<td >${ObjectName} </td>`;



    if(X1 != null){
        Prob = 2.894 - ((2.94 * Math.pow(10,-5)) * X1) + ((7.93 * Math.pow(10,-4)) * X2) + ((2.77 * Math.pow(10,-4)) * X3);
        Risk = ComparePh(Prob);
        result += `<td >${Risk} </td>`;
    }else{
        let res = "Дані відсутні";
        result += `<td >${res} </td>`;
    }

    let year = "";
    for(let i =0; i <PollutionLoad.length; i++) {
        if (ID == PollutionLoad[i].ObjectNumber){
            year =  PollutionLoad[i].YearOfData;
        }
    }

    result += `<td >${year} </td>`;



    return new hbs.SafeString(`<tr class="row">${result}</tr>`);

});






const port = 3307;
app.listen(port, () =>
    console.log(`App listening on port ${port}`)
);

