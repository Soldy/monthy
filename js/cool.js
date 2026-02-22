/* monthy hall problem simulator Laszlo Dudas 2020 */ 
console.log((()=>{
    const prepare=()=>{
        let o=[0,0,0,0,0];
        for(let i =0;100>i;i++)
            o[Math.floor(Math.random()*5)]++;
        return o;
    };
    const calculator=function(){
        let o=[];
        for(let i=0;100>i;i++)
            o.push(0);
        for(let j=0;10000000>j;j++){
            let round=prepare();
            for(let i in round)
                o[round[i]]++;
        }
        return o;
    };
    return parseInt(calculator()[20]/10000);
})().toString());
// monthy hall problem simulator end  --- The Monty Hall problem is a brain teaser, in the form of a probability puzzle, loosely based on the American television game show Let's Make a Deal and named after its original host, Monty Hall. The problem was originally posed in a letter by Steve Selvin to the American Statistician in 1975 

