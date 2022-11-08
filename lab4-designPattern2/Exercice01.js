

class Regular{
    constructor(){
        this.lumRange=[5,100];
        this.age=1;
    }
}
class Energy{
    constructor(color){
        this.lumRange=[5,40];
        this.age=10;
        this.color=color;
    }
}

class Factory{
    createBulb(type,color){
        if (type==='regular'){
            return new Regular();
        }else{
            return new Energy(color);
        }
      
    }
}

const bulbs = [];
const factory = new Factory();

bulbs.push(factory.createBulb("regular"));
bulbs.push(factory.createBulb("energy", "red"));


for (let i = 0, len = bulbs.length; i < len; i++) {
    console.log(bulbs[i]);
}
