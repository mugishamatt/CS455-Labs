

class Info{
    logging(message){
        console.info(message)
    }
    

}
class Warn{
    logging(message){
        console.warn(message)
    }

}
class Error{
    logging(message){
        console.error(message)
    }
}
class Table{
    logging(message){
        console.table(message)
    }

}

class Strategy{
   setStrategy(logMethod){
    this.logMethod=logMethod
   }
   logging(message){
    this.logMethod.logging(message)
   }
}


const strategy = new Strategy();

strategy.setStrategy(new Info());
strategy.logging('info....');

strategy.setStrategy(new Warn());
strategy.logging('warn....');

strategy.setStrategy(new Error());
strategy.logging('error....');

strategy.setStrategy(new Table());
strategy.logging(['table', 'table']);
