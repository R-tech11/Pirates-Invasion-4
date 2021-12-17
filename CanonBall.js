class CanonBall
{
    constructor(x, y)
    {
        this.x = x;
        this.y = y;

        var options = {
         isStatic: true
        }

        this.r = 30;
        this.t = [];

        this.body = Bodies.circle(this.x, this.y, this.r, options);
        World.add(world, this.body);

        this.image = loadImage("assets/cannonBall.png");
    }

    display()
    {
        push();
        
        imageMode(CENTER);
        image(this.image, this.body.position.x, this.body.position.y, this.r, this.r)

        pop();

        if(this.body.velocity.x > 0 && this.body.position.x > 200)
        {
            var position = [this.body.position.x, this.body.position.y];
            this.t.push(position);  
        }

        for(var i = 0; i < this.t.length; i++)
        {
            image(this.image, this.t[i][0], this.t[i][1], 5, 5);
        }
    }

    shoot()
    {
        var newAngle = canon.angle - 25;
        newAngle = newAngle * (3.14/180);
        var velocity = p5.Vector.fromAngle(newAngle);
        velocity.mult(0.5);


        Matter.Body.setStatic(this.body,false);

        Matter.Body.setVelocity(this.body, {
            x:velocity.x * (180/3.14), 
            y:velocity.y * (180/3.14)});
    }

    remove(index)
    {
        //Matter.Body.setVelocity(this.body, {x:0, y:0});
        setTimeout(() => {
            Matter.World.remove(world, this.body);
            delete balls[index];
        }, 1000);
    }
}