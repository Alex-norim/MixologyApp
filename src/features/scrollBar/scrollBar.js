import { Model } from "./model";
import { View } from "./view";
const scrollBar = {
    init(settings ){
        const scrollBarID = 'scrollbar';
        const progressBarID = 'progressBar';
        const defSetting = {
            scrollbar : {
                top : '0',
                left : '0',
                background : 'white',
                width : "100%",
                height : '4px'
            },
            progressbar : {
                background : 'red',
                height : '100%',
            }
        };
        const userSetting = settings ? settings : defSetting; 
        // 
        const scrollEvent= Model.scrollEvent;
        const drawScrollBar = View.drawScrollBar;
        //
        const bar = drawScrollBar( userSetting , scrollEvent, scrollBarID , progressBarID);
        // console.log(bar)
        //
        document.body.append(bar);
    }
}

export default scrollBar;