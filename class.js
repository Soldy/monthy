exports.base = (rounds)=>{
    const prepare=()=>{
        let out=[0,0,0,0,0];
        for(let i =0;100>i;i++)
            out[Math.floor(Math.random()*5)]++;
        return out;
    };
    const calculator=function(rounds){
        let out=[];
        for(let i=0;100>i;i++)
            out.push(0);
        for(let j=0;rounds>j;j++){
            let round=prepare();
            for(let i in round)
                out[round[i]]++;
        }
        return out;
    };
    return parseInt(calculator(rounds)[20]/10000);
};
