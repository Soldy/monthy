

const HistoryClass = class{
    #points = [];
    #results = [];
    #steps = [];
    #outClone(in_){
       const out = []
       for (const player of in_){
           const out_player = [];
           for (const record of player)
               out_player.push(record);
           out.push(out_player);
       };
       return out;
    }
    step(){

    };

    getPoints(){
        return this.#outClone(this.#points);
    };
    getSteps(){
        return this.#outClone(this.#steps);
    };
    getResults(){
        return this.#outClone(this.#results);
    };

}

const HistoryReadOnly = class{
    #history ;
    constructor(history_) {
        this.#history = history_;
    }
    getPoints(){
        return this.#history.getSteps();
    }
    getSteps(){
        return this.#history.getSteps();
    }
    getResults(){
        return this.#history.getResults();
    }

}

const RuleClass = class{
    #point_matrix = [
        [5,0],
        [0,5],
        [3,3],
        [1,1]
    ]
    #current = [];
    #history = [];
    #history_points = [];
    #player_count = 0;
    #registered = false;

    /**
     * @private
     * @return {.Array<number>}
    **/
    #cloneCurrent(){
        return [
            parseInt(this.#current[0]),
            parseInt(this.#current[1])
        ];
    };

    /**
     *
     * @param {.Array<number>}
     * @private
     * @return {.Array<number>}
    **/
    #cloneResult(in_){
        return [
          parseInt(in_[0]),
          parseInt(in_[1])
        ];
    };

    /**
     *
     * @param {number}
     * @private
    **/
    #pushPoint(result_){
       this.#history_points.push(
         this.#cloneResult(
           this.#point_matrix(result_)
         )
       );
    };

    #judgeTurn(){
        if(this.#current[0] > this.#current[1])
            this.#pushPoint(0);
        if(this.#current[1] > this.#current[0])
            this.#pushPoint(1);
        if(this.#current[0] === 0 && this.#current[0] === 0)
            this.#pushPoint(1);
        if(this.#current[0] === 1 && this.#current[0] === 1)
            this.#pushPoint(1);
    };
    #cleanTurn(){
        this.#current = [];
        for(let i = 0 ; this.#player_count > i ; i++)
            this.#current[i] = -1;
    };
    #endTurn(){
        for(let i of this.#current)
            if(i === -1)
                return false;
        this.#history.push(
            this.#cloneCurrent()
        );
        this.#judgeTurn();
        this.#cleanTurn();
    };

    #newTurn(){
        this.#endTurn();
    };

    /**
     *
     * @public
     * @return {number}
    **/
    register_player(){
        if(this.#registered)
            return -1;
        this.#player_count++;
        return this.#player_count-1;
    };

    /**
     * @param {number}
     * @param {number} 0 = cooperative, 1= defeat
     * @public
     * @return {bool}
    **/
    step(player_, decesion_){
        if(
             (2 > this.#player_count) ||
             (!Number.isInteger(player_)) ||
             (0 > player_) ||
             (player_ > this.#player_count) ||
             (!Number.isInteger(decession_)) ||
             (decession_ !== 0 && decession_ !== 1)
        ) return false; // error handle should come here...
        this.#registered = true;
        this.#current[player_] = decesion_;
        return true;
    };
    /**
     *
     * @public
    **/
    newTurn(){
       return this.#newTurn();
    };

    /**
     *
     *
     **/
     lastStepGet(player_){

     }

    /**
     *
     *
     **/
     lastStep(player_){

     }

}

const PlayerClass = class{
    #logic = ()=>{return 0};
    #logic_exit = false;
   /**
     * @private
     * @type {string}
    **/
    #name = "example";
    /**
     * @private
     * @type {bool}
    **/
    #stepped = false;
    /**
     * @private
     * @type {Array<int>}
    **/
    #points = [];
    /**
     * @private
     * @type {Array<int>}
    **/
    #steps = [];
    /**
     * @private
     * @type {Array<int>}
    **/
    #enemy_steps = [];
    /**
     * @private
     * @type {Array<int>}
    **/
    #enemy_points = [];

    constructor(name_, logic_) {
        this.#name = name_.toString();
        if(typeof logic_ !== 'function')
          return ;
        this.#logic = new logic_();
        this.#logic_exit = true;
    };
    /**
     *
     * @public
     * @return {number}
    **/
    logic(){ // abstract function
       if (this.#logic_exit === false)
         return 0;
    }

    /**
     *
     * @param {number}
     * @param {number}
     * @param {numbe
    **/
    result(point_, enemy_step_, enemy_point_){
        if(
          (this.#stepped === false) ||
          (typeof point_ === 'undefined') ||
          (typeof enemy_step_ === 'undefined') ||
          (typeof enemy_point_ === 'undefined')
        ) return false; // error handle should come here...
        this.#points.push(parseInt(point_));
        this.#enemy_steps.push(parseInt(enemy_step_));
        this.#enemy_points.push(parseInt(enemy_point_));
        this.#stepped = false;
        return true;
    };

    /**
     *
     * @public
     * @return {number}
    **/
    getStep(){
        if(this.#stepped === false)
            this.#steps.push(0);
        this.#stepped = true;
        return this.#steps[this.#steps.length-1];
    };
};

const GamesClass = function(players_, ruler_ ){
    let _RulerClass = new RuleClass();
    if (typeof ruler_ === 'function')
        _RulerClass = ruler_;
    const _ruler  = _RuleClass;
    const _players = [];
    for (const player of players_)
        _players.push(players_);

    this.turn = function(){
        for (let i = 0 ; _players.length > i ; i++)
            _ruler.step(
              i,
              _players[i].getStep()
            );
        _ruler.newTurn();
        _players[0].result();
        _players[1].result();
    };

};


