class MenuAnimation{
    constructor(frames,elements){
        this.frames = frames;
        this.elements = elements;
        this.timeTillHide = 300;
        this.counter = 0;
    }
    animateForward( displayBlock ){
        const displayState = displayBlock ? displayBlock : '';
        for (const element of this.elements) {
            this.counter >= this.elements.length ? this.counter = 0 : ``;
            // console.log(this.counter , this.elements.length)
            const animated = element.animate(
                this.frames[this.counter] ,
                {
                    fill : 'forwards',
                    duration : this.timeTillHide,
                    iteration: 1,
                }
            );
            element.style.display = displayState;
            animated.onfinish = (e) => {
                animated.commitStyles();
            }
            // console.log(animated)
            animated.play();
            this.counter++;
        }
    }
    animateBack(displayNone){
        const displayState = displayNone ? displayNone : ``;
        for (const element of this.elements) {
            this.counter >= this.elements.length ? this.counter = 0 : ``;
            
            const animated = element.animate(
                this.frames[this.counter] ,
                {
                    fill : 'forwards',
                    direction : 'reverse',
                    duration : this.timeTillHide,
                    iteration: 1,
                }
            );
            animated.onfinish = (e) => {
                animated.commitStyles();
                element.style.display = displayState;
            }
            // console.log(animated)
            animated.play();
            this.counter++;
        }
    }
}

export default MenuAnimation;