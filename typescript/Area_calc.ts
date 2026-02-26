abstract class shape{

    abstract calc_area():number;


}
class circle extends shape{

    constructor(public radius:number){
       super();

    }
    calc_area(): number {
        return Math.PI*this.radius*this.radius;
    }
}

let c = new circle(5);
console.log(c.calc_area);


