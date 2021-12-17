class Boat
{
    constructor(x, y, w, h, bp)
    {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.bp = bp;

        var options = {
            restiution: 0.8,
            friction: 1.0,
            density: 1.0
        }

        this.body = Bodies.rectangle(x, y, w, h, options);
        World.add(world, this.body);
        this.image= loadImage("assets/boat.png");
    }

    display()
    {
        push();
         
        translate(this.body.position.x, this.body.position.y);
        imageMode(CENTER);
        image(this.image, 0, this.bp, this.w, this.h);

        pop();
    }

    remove(index)
    {
        setTimeout(() => {
            Matter.World.remove(world, this.body);
            delete boats[index];
        },2000);
    }
}