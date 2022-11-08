

class User{
    constructor(name){
        this.name=name;

    }
    

}
class DecoratedUser{
    constructor(user,city,state){
        this.user=user;
        this.city=city;
        this.state=state;
        this.name=user.name;
    }
    logger(){
        console.log(`${this.name} lives in ${this.city} ${this.state}`)
    }
}

const user=new User('kelly');
const decorated=new DecoratedUser(user,'Broadway','New york')

decorated.logger()
