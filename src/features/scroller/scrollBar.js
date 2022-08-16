import { Model } from "./model";
import { View } from "./view";
const scrollBar = {
    init(root , settings){
        const windowHight = Model.getWinHeight();
        const documentHeight = Model.getDocHeight();
        const scrollEvent = Model.scrollEvent;
        const drawScrollBar = View.drawScrollBar;
        const isExistBar = Model.isExistBar();
        
        document.body.removeEventListener('wheel' , scrollEvent);
        if(!isExistBar){
            let bar = drawScrollBar(settings);
            document.body.append(bar);
        }
        document.body.addEventListener('wheel' , scrollEvent)
    }
}

export default scrollBar;