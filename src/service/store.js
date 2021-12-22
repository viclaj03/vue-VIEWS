export const store = {
    debug: true,
    state:{
        messages: []
    },
    addErrorMensage(newError){
        this.state.messages.push(newError)
    }

}