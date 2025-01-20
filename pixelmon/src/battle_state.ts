export type State = {
    name : string ;
    onEnter ? : () => void ;

};

export class StateMachine{

    private states: Map<string, State>;
    private currentState?: State;
    private id: string;
    private context?:object;
    private isChangingState: boolean;
    private ChangingStateQueue: string[];


    constructor (id : string , context?: object ){
        this.id =id 
        this.context= context;
        this.isChangingState = false ;
        this.ChangingStateQueue = [];
        this.currentState= undefined ;
        this.states = new Map();

    }


    get currentStateName(): string | undefined{

        return this.currentState?.name

    }

    update(): void{
        if(this.ChangingStateQueue.length > 0 ){
            const nextState = this.ChangingStateQueue.shift();

            if(nextState){
                this.setState(nextState);

            }
            
        }
    }

    setState(name:string ): void {
        const methodName = "setState ";

        if(!this.states.has(name)){
            console.warn(`[${StateMachine.name}-${this.id} : ${methodName}]tried to change to unknown `);
            return ; 
        }

        if(this.isCurrentState(name)){
            return ;
        }
        if(this.isChangingState){
            this.ChangingStateQueue.push(name);
            return ; 

        }
        this.isChangingState = true ; 
        console.log (`[${StateMachine.name}-${this.id} : ${methodName}] change from ${this.currentState?.name ?? 'none'} to ${name} `);

        this.currentState = this.states.get(name);

        if( this.currentState?.onEnter){
            console.log (`[${StateMachine.name}-${this.id} : ${methodName}] ${this.currentState.name} on enter invoked`);

        }
        this.currentState?.onEnter

    }

    addState(state : State){
        this.states.set(state.name, {
            name : state.name ,
            onEnter:this.context ? state.onEnter?.bind(this.context) : state.onEnter,
        });
    }

    private isCurrentState ( name:string){
        if (!this.currentState){
            return false ; 
        }
        return this.currentState.name ===name ;
    }

}