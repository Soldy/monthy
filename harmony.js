
const _max_number = 2;

const generatorZero = function(){
   let zeros = [];
   for (let i = 0 ; (_max_number + 1) > i ; i++)
       zeros.push(0);
   return zeros
};

const generatorZeroContainer = function(){
   let containers = [];
   for (let i = 0 ; (_max_number + 1) > i ; i++)
       containers.push(generatorZero());
   return containers
};

let _middle_effect = [];
const _last_effect = generatorZero();
const _count_effect = generatorZero();
const _max_distance_effect = generatorZero();
const _max_repeat_effect = generatorZero();
const _distances_effect =  generatorZeroContainer();
const _percent_effect =  generatorZeroContainer();


const generatorOfThree = function(count){
   for (let i = 0 ; count > i ; i++){
       _middle_effect.push(Math.floor(Math.random()*_max_number)+1);
   }
};

const effectCheck = function(){
    let mass = 0;
    let last = 0;
    let repeat = 0;
    for (let i of _middle_effect){
        mass = mass + i;
        for (let c = 1 ; (_max_number+1) > c ; c++ )
            _last_effect[c]++;
        if (typeof _distances_effect[i][_last_effect[i]] === 'undefined')
            _distances_effect[i][_last_effect[i]]=0;
        _distances_effect[i][_last_effect[i]]++; 
        _last_effect[i] = 0; 

        _count_effect[i]++;
        if (last === i){
           repeat ++;
        }else{
           if (repeat > _max_repeat_effect[last])   
               _max_repeat_effect[last] = parseInt(repeat);
           last = parseInt(i);
           repeat = 1;
        };
        for (let c = 1 ; (_max_number+1) > c ; c++ )
            if (_last_effect[c] > _max_distance_effect[c])
                _max_distance_effect[c] = parseInt(_last_effect[c]);
    }
    return (mass/_middle_effect.length);
};

const analyze = function(){
    for (let a = 0; _distances_effect.length > a ; a++){
        _percent_effect[a] = [];
        for (let b = 2; _distances_effect[a].length > b ; b++){
            _percent_effect[a].push(
                _distances_effect[a][b-1] / _distances_effect[a][b]
            );
        }
    }
};


generatorOfThree(10000);
console.log(effectCheck()*1000);
analyze();
console.log(_max_distance_effect);
console.log(_count_effect);
console.log(_max_repeat_effect);
console.log(_distances_effect); 
console.log(_percent_effect); 
