import createElement from "../appSettings/createElement"
export const View = {
    drawScrollBar : (obj , scrollEvent) => {
        const barOrientation = obj.vertical ? 'scrollBar verticalbar' : obj.horizont ? 'scrollBar horizontalbar' : ``;
        const container = new createElement({
            tagname : 'div',
            attr : {
                class : barOrientation ,
            }
        });
        const progressBar = new createElement({
            tagname : 'div' ,
            attr : {
                class : 'progressBar'
            }
        })
        
        container.append(progressBar);
        return container;
    }
}